import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const SupraWallet = ({ open, onClose, onConfirm, betAmount, betDirection, duration }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Your Bet</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Amount: {betAmount} SUPRA
        </Typography>
        <Typography variant="body1" gutterBottom>
          Direction: {betDirection ? 'UP' : 'DOWN'}
        </Typography>
        <Typography variant="body1">
          Duration: {duration} minutes
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={onConfirm}
            variant="contained" 
            color="primary"
          >
            Confirm Transaction
          </Button>
        </motion.div>
      </DialogActions>
    </Dialog>
  );
};

export default SupraWallet; 