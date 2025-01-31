import React from 'react';
import { 
    Card, CardContent, Typography, Table, TableBody,
    TableCell, TableHead, TableRow, Chip, Box
} from '@mui/material';
import { motion } from 'framer-motion';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const BetHistory = ({ bets }) => {
    return (
        <Card sx={{ 
            background: 'rgba(19,47,76,0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4
        }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Bet History
                </Typography>
                <Box sx={{ overflowX: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Time</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Direction</TableCell>
                                <TableCell>Initial Price</TableCell>
                                <TableCell>Final Price</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Result</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bets.map((bet, index) => (
                                <TableRow 
                                    key={index}
                                    component={motion.tr}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <TableCell>{new Date(bet.timestamp).toLocaleString()}</TableCell>
                                    <TableCell>{bet.amount} SUPRA</TableCell>
                                    <TableCell>
                                        <Chip
                                            icon={bet.direction ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                                            label={bet.direction ? "UP" : "DOWN"}
                                            color={bet.direction ? "success" : "error"}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>${bet.initialPrice}</TableCell>
                                    <TableCell>${bet.finalPrice || '-'}</TableCell>
                                    <TableCell>{bet.duration}m</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={bet.status}
                                            color={
                                                bet.status === 'Pending' ? 'warning' :
                                                bet.status === 'Active' ? 'primary' :
                                                bet.status === 'Completed' ? 'success' :
                                                'error'
                                            }
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {bet.resolved && (
                                            <Chip
                                                label={bet.result}
                                                color={bet.result === 'Won' ? "success" : "error"}
                                                size="small"
                                            />
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </CardContent>
        </Card>
    );
};

export default BetHistory;
