import React, { useState } from 'react';
import { 
    Card, CardContent, Box, Typography, 
    CircularProgress, Chip, Stack
} from '@mui/material';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const SUPPORTED_PAIRS = [
    { symbol: 'BTC/USDT', id: 'btc_usdt', icon: '₿', color: '#F7931A' },
    { symbol: 'ETH/USDT', id: 'eth_usdt', icon: 'Ξ', color: '#627EEA' },
    { symbol: 'SOL/USDT', id: 'sol_usdt', icon: 'S', color: '#00FFA3' },
    { symbol: 'BNB/USDT', id: 'bnb_usdt', icon: 'B', color: '#F3BA2F' },
    { symbol: 'ADA/USDT', id: 'ada_usdt', icon: '₳', color: '#0033AD' },
    { symbol: 'XRP/USDT', id: 'xrp_usdt', icon: 'X', color: '#23292F' }
];

const PriceChart = ({ onPairSelect, currentPrice, selectedPair }) => {
    const [loading, setLoading] = useState(false);
    const priceChange24h = 2.5; // Placeholder value, should be passed as prop

    const handlePairSelect = (pair) => {
        setLoading(true);
        onPairSelect(pair);
        setTimeout(() => setLoading(false), 1000);
    };

    return (
        <Card sx={{ background: 'rgba(19,47,76,0.9)', backdropFilter: 'blur(10px)' }}>
            <CardContent>
                <Stack spacing={3}>
                    {/* Price Display */}
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" color="primary">
                            ${currentPrice?.toFixed(2)}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
                            {priceChange24h >= 0 ? (
                                <TrendingUpIcon color="success" />
                            ) : (
                                <TrendingDownIcon color="error" />
                            )}
                            <Typography 
                                color={priceChange24h >= 0 ? 'success.main' : 'error.main'}
                                variant="h6"
                                sx={{ ml: 1 }}
                            >
                                {Math.abs(priceChange24h)}%
                            </Typography>
                        </Box>
                    </Box>

                    {/* Pair Selection */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {SUPPORTED_PAIRS.map((pair) => (
                            <motion.div
                                key={pair.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Chip
                                    label={pair.symbol}
                                    onClick={() => handlePairSelect(pair)}
                                    sx={{
                                        bgcolor: selectedPair.id === pair.id ? pair.color : 'background.paper',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: pair.color + 'CC'
                                        }
                                    }}
                                    icon={<Typography sx={{ color: 'white', ml: 1 }}>{pair.icon}</Typography>}
                                />
                            </motion.div>
                        ))}
                    </Box>

                    {loading && (
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

export default PriceChart;