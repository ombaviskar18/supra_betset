import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const BetTimer = ({ duration, onComplete, initialPrice, currentPrice }) => {
    const [timeLeft, setTimeLeft] = useState(duration * 60);
    const progress = (timeLeft / (duration * 60)) * 100;

    const formatTime = (seconds) => {
        if (duration === 1440) { // 1 day
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            return `${hours}h ${minutes}m`;
        }
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (timeLeft <= 0) {
            onComplete();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onComplete, duration]);

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={60}
                    thickness={4}
                    sx={{ color: 'secondary.main' }}
                />
            </motion.div>
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography variant="body2" color="text.secondary">
                    {formatTime(timeLeft)}
                </Typography>
            </Box>
        </Box>
    );
};

export default BetTimer;