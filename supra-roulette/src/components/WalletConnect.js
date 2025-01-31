import React from 'react';
import { Button } from '@mui/material';

const WalletConnect = ({ onConnect, connected, address }) => {
    // Format address only if it exists and is connected
    const formattedAddress = connected && address ? 
        `${address.slice(0,6)}...${address.slice(-4)}` : 
        "Connect Wallet";

    return (
        <Button 
            variant="contained" 
            onClick={onConnect}
            color={connected ? "success" : "primary"}
        >
            {formattedAddress}
        </Button>
    );
};

export default WalletConnect;