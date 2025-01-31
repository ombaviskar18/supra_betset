import React, { useState } from 'react';
import { 
    Card, CardContent, Button, TextField, Typography,
    Grid, Box, Chip, Stack
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BetTimer from '../components/BetTimer';
import { getStarkeyProvider } from '../utils/starkey';
import { ethers } from 'ethers';

const BettingInterface = ({ onPlaceBet, currentPrice, selectedPair }) => {
    const [amount, setAmount] = useState('');
    const [isBetting, setIsBetting] = useState(false);
    const [selectedDuration, setSelectedDuration] = useState(1);
    const [initialPrice, setInitialPrice] = useState(null);

    const durations = [
        { value: 1, label: '1m' },
        { value: 5, label: '5m' },
        { value: 15, label: '15m' },
        { value: 1440, label: '1d' }
    ];

    const handleBet = async (direction) => {
        try {
            const provider = getStarkeyProvider();
            
            if (!provider || !provider.supra) {
                throw new Error("StarKey provider not found. Please install and connect.");
            }

            // Request account connection (this opens StarKey)
            const accounts = await provider.supra.connect();
            if (!accounts || accounts.length === 0) {
                throw new Error("No accounts found. Connect your StarKey wallet.");
            }

            setInitialPrice(currentPrice);
            setIsBetting(true);

            // Validate amount input
            if (!amount || isNaN(amount) || Number(amount) <= 0) {
                throw new Error("Enter a valid bet amount.");
            }

            // Convert amount to Ether format
            const formattedAmount = ethers.utils.parseEther(amount.toString());

            // Transaction object
            const transaction = {
                to: process.env.REACT_APP_CONTRACT_ADDRESS, // Ensure this is set in .env
                from: accounts[0],
                value: formattedAmount,
                data: ethers.utils.defaultAbiCoder.encode(
                    ['bool', 'uint256', 'uint256'],
                    [direction, selectedDuration, ethers.utils.parseUnits(currentPrice.toString(), 8)]
                ),
                gasLimit: ethers.utils.hexlify(500000), // Ensure it's in hex format
                gasPrice: ethers.utils.parseUnits('100', 'gwei').toString()
            };

            console.log("Sending transaction:", transaction);

            // Send transaction using StarKey provider
            const txHash = await provider.supra.sendTransaction(transaction);
            console.log("Transaction Hash:", txHash);

            // Callback after successful transaction
            await onPlaceBet(amount, direction, selectedDuration, currentPrice, txHash);

        } catch (error) {
            console.error("Betting error:", error);
            setIsBetting(false);

            if (error.message.includes("StarKey wallet")) {
                window.open("https://starkey.app/", "_blank");
            }

            alert(error.message || "Transaction failed. Please try again.");
        }
    };

    const handleTimerComplete = () => {
        setIsBetting(false);
        setAmount('');
    };

    return (
        <Card sx={{ background: 'rgba(19,47,76,0.9)', backdropFilter: 'blur(10px)' }}>
            <CardContent>
                <Stack spacing={3}>
                    {isBetting ? (
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" gutterBottom>Bet in Progress</Typography>
                            <BetTimer 
                                duration={selectedDuration} 
                                onComplete={handleTimerComplete}
                                initialPrice={initialPrice}
                                currentPrice={currentPrice}
                            />
                        </Box>
                    ) : (
                        <>
                            <Typography variant="h5" gutterBottom>
                                Place Your Bet
                            </Typography>
                            <Typography variant="h4" color="primary" sx={{ textAlign: 'center' }}>
                                ${currentPrice?.toFixed(2)}
                            </Typography>
                            
                            <TextField
                                fullWidth
                                label="Bet Amount (SUPRA)"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                sx={{ mt: 2 }}
                            />

                            <Stack direction="row" spacing={1} justifyContent="center">
                                {durations.map((duration) => (
                                    <Chip
                                        key={duration.value}
                                        label={duration.label}
                                        onClick={() => setSelectedDuration(duration.value)}
                                        color={selectedDuration === duration.value ? 'primary' : 'default'}
                                    />
                                ))}
                            </Stack>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="success"
                                        onClick={() => handleBet(true)}
                                        disabled={!amount || amount <= 0}
                                        startIcon={<ArrowUpwardIcon />}
                                    >
                                        BET UP
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleBet(false)}
                                        disabled={!amount || amount <= 0}
                                        startIcon={<ArrowDownwardIcon />}
                                    >
                                        BET DOWN
                                    </Button>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default BettingInterface;
