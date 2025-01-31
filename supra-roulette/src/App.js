import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import WalletConnect from './components/WalletConnect';

import BetHistory from './components/BetHistory';
import PriceChart from './components/PriceChart';
import { theme } from './theme';
import { getStarkeyProvider } from './utils/starkey';
import { getRouletteContract } from './utils/contracts';
import BettingInterface from './components/BettingInterface';

const SUPRA_API_KEY = 'b92be6d207a9bc174f3a819d5f1f45b4d599deaadf7fce0b3142bb64a517abb4';
const SUPRA_API_URL = 'https://prod-kline-rest.supra.com';
const SUPRA_RPC = 'https://rpc-testnet.supra.com/';

const SUPPORTED_PAIRS = [
    { symbol: 'BTC/USDT', id: 'btc_usdt', icon: '₿', color: '#F7931A' },
    { symbol: 'ETH/USDT', id: 'eth_usdt', icon: 'Ξ', color: '#627EEA' },
    { symbol: 'SOL/USDT', id: 'sol_usdt', icon: 'S', color: '#00FFA3' },
    { symbol: 'BNB/USDT', id: 'bnb_usdt', icon: 'B', color: '#F3BA2F' },
    { symbol: 'ADA/USDT', id: 'ada_usdt', icon: '₳', color: '#0033AD' },
    { symbol: 'XRP/USDT', id: 'xrp_usdt', icon: 'X', color: '#23292F' }
];

function App() {
    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState('');
    const [currentPrice, setCurrentPrice] = useState(0);
    const [bets, setBets] = useState([]);
    const [selectedPair, setSelectedPair] = useState(SUPPORTED_PAIRS[0]);

    useEffect(() => {
        checkWalletConnection();
        fetchPrice(selectedPair.id);
        const interval = setInterval(() => fetchPrice(selectedPair.id), 30000);
        return () => clearInterval(interval);
    }, [selectedPair]); // eslint-disable-line react-hooks/exhaustive-deps

    const checkWalletConnection = async () => {
        try {
            const provider = getStarkeyProvider();
            const accounts = await provider.connect();
            if (accounts.length > 0) {
                setAddress(accounts[0]);
                setConnected(true);
                fetchBetHistory(accounts[0]);
            }
        } catch (error) {
            console.error('Error checking wallet connection:', error);
        }
    };

    const connectWallet = async () => {
        try {
            const provider = getStarkeyProvider();
            
            // Request accounts using supra provider
            const accounts = await provider.supra.connect();
            
            if (accounts && accounts.length > 0) {
                setAddress(accounts[0]);
                setConnected(true);
                fetchBetHistory(accounts[0]);

                // Listen for account changes
                provider.supra.on('accountsChanged', (newAccounts) => {
                    if (newAccounts.length > 0) {
                        setAddress(newAccounts[0]);
                        fetchBetHistory(newAccounts[0]);
                    } else {
                        setConnected(false);
                        setAddress('');
                    }
                });
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
            alert('Error connecting wallet. Please try again.');
        }
    };

    const handlePairSelect = (pair) => {
        setSelectedPair(pair);
        fetchPrice(pair.id);
    };

    const fetchPrice = async (tradingPair = 'btc_usdt') => {
        try {
            const response = await axios.get(`${SUPRA_API_URL}/latest`, {
                params: {
                    trading_pair: tradingPair
                },
                headers: {
                    'x-api-key': SUPRA_API_KEY,
                    'Accept': 'application/json'
                }
            });
            
            if (response.data && response.data.instruments && response.data.instruments[0]) {
                setCurrentPrice(parseFloat(response.data.instruments[0].currentPrice));
            }
        } catch (error) {
            console.error('Error fetching price:', error);
        }
    };

    const fetchBetHistory = async (userAddress) => {
        try {
            const response = await axios.get(`${SUPRA_API_URL}/bet/history`, {
                params: {
                    address: userAddress
                },
                headers: {
                    'x-api-key': SUPRA_API_KEY,
                    'Accept': 'application/json'
                }
            });
            setBets(response.data.bets || []);
        } catch (error) {
            console.error('Error fetching bet history:', error);
        }
    };

    const placeBet = async (amount, direction, duration, initialPrice, txHash) => {
        if (!connected) {
            alert('Please connect your wallet first');
            return;
        }

        try {
            const provider = getStarkeyProvider();
            const rouletteContract = getRouletteContract(provider);
            
            // Add bet to history
            const newBet = {
                amount: amount,
                direction: direction,
                initialPrice: initialPrice,
                timestamp: Date.now(),
                duration: duration,
                resolved: false,
                result: null,
                pair: selectedPair.symbol,
                txHash: txHash,
                status: 'Pending'
            };
            
            setBets(prevBets => [newBet, ...prevBets]);

            // Wait for confirmation
            const receipt = await provider.waitForTransaction(txHash);
            if (!receipt.status) {
                throw new Error('Transaction failed');
            }

            // Update bet status
            setBets(prevBets => prevBets.map(bet => 
                bet.txHash === txHash ? { ...bet, status: 'Active' } : bet
            ));

            // Set timeout to resolve bet
            setTimeout(async () => {
                try {
                    // Resolve bet through contract
                    const resolveTx = await rouletteContract.resolve_bet();
                    await resolveTx.wait();

                    // Get updated bet info
                    const [betAmount, betDirection, betInitialPrice, resolved] = 
                        await rouletteContract.get_bet_info(address);

                    // Update bet status
                    setBets(prevBets => prevBets.map(bet => 
                        bet.txHash === txHash ? {
                            ...bet,
                            resolved: resolved,
                            result: resolved ? (betDirection ? 'Won' : 'Lost') : null,
                            finalPrice: currentPrice,
                            payout: resolved && betDirection ? amount * 2 : 0,
                            status: 'Completed'
                        } : bet
                    ));

                } catch (error) {
                    console.error('Error resolving bet:', error);
                }
            }, duration * 60 * 1000);

        } catch (error) {
            console.error('Error placing bet:', error);
            alert('Error placing bet. Please try again.');
            
            setBets(prevBets => prevBets.map(bet => 
                bet.txHash === txHash ? { ...bet, status: 'Failed' } : bet
            ));
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h3" gutterBottom>
                            Supra Roulette
                        </Typography>
                        <WalletConnect 
                            onConnect={connectWallet}
                            connected={connected}
                            address={address}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PriceChart 
                            onPairSelect={handlePairSelect}
                            currentPrice={currentPrice}
                            selectedPair={selectedPair}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <BettingInterface 
                            onPlaceBet={placeBet}
                            currentPrice={currentPrice}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <BetHistory bets={bets} />
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default App;