import React, { useState } from 'react';
import { 
    Card, CardContent, Button, TextField, Typography,
    Grid, Box, Chip, Stack
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BetTimer from './BetTimer';
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
        { value: 30, label: '30m' }
    ];

    const handleBet = async (direction) => {
        try {
            const provider = getStarkeyProvider();
            
            // Connect to StarKey
            const accounts = await provider.connect();
            if (!accounts || accounts.length === 0) {
                throw new Error('No accounts found');
            }
            
            setInitialPrice(currentPrice);
            setIsBetting(true);

            // Create transaction parameters
            const transaction = {
                to: process.env.REACT_APP_CONTRACT_ADDRESS,
                from: accounts[0],
                value: ethers.utils.parseEther(amount.toString()),
                data: ethers.utils.defaultAbiCoder.encode(
                    ['bool', 'uint256', 'uint256'],
                    [direction, selectedDuration, ethers.utils.parseUnits(currentPrice.toString(), 8)]
                )
            };

            // Send transaction
            const txHash = await provider.sendTransaction(transaction);
            
            // Wait for transaction confirmation
            await onPlaceBet(amount, direction, selectedDuration, currentPrice, txHash);

        } catch (error) {
            console.error('Betting error:', error);
            setIsBetting(false);
            alert(error.message || 'Transaction failed. Please try again.');
        }
    };

    const handleTimerComplete = () => {
        setIsBetting(false);
        // Result will be handled by the parent component
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