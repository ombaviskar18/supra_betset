import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import { getStarkeyProvider } from '../utils/starkey';
import { addLiquidity } from '../utils/atmos';

const LiquidityPool = () => {
    const [amount, setAmount] = useState('');

    const handleAddLiquidity = async () => {
        try {
            const provider = getStarkeyProvider();
            const tx = await addLiquidity(
                provider,
                process.env.REACT_APP_SUPRA_TOKEN,
                process.env.REACT_APP_USDT_TOKEN,
                ethers.utils.parseEther(amount),
                ethers.utils.parseEther(amount)
            );
            await tx.wait();
            alert('Successfully added liquidity!');
        } catch (error) {
            console.error('Error adding liquidity:', error);
            alert('Failed to add liquidity. Please try again.');
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Add Liquidity</Typography>
                <TextField
                    fullWidth
                    label="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    sx={{ mt: 2 }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleAddLiquidity}
                    sx={{ mt: 2 }}
                >
                    Add Liquidity
                </Button>
            </CardContent>
        </Card>
    );
};

export default LiquidityPool; 