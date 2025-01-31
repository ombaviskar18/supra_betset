import { ethers } from 'ethers';

// Contract address from your deployment
const ROULETTE_ADDRESS = "0x27f518f899eebd0d6338a23836dc4c09780b14e8a6734692bdd8ef9231460a68";

// ABI for the Supra Roulette contract
const ROULETTE_ABI = [
    "function place_bet(uint256 amount, bool direction)",
    "function resolve_bet()",
    "function get_bet_info(address user) view returns (uint256, bool, uint256, bool)",
    "function initialize_treasury()"
];

// Network configuration
const NETWORK_CONFIG = {
    chainId: 6,
    name: 'Supra Testnet',
    rpcUrl: 'https://rpc-testnet.supra.com/'
};

/**
 * Get Roulette contract instance
 * @param {ethers.providers.Provider} provider - Ethereum provider
 * @returns {ethers.Contract} Contract instance
 */
export const getRouletteContract = (provider) => {
    if (!provider) {
        throw new Error('Provider is required');
    }

    return new ethers.Contract(
        ROULETTE_ADDRESS,
        ROULETTE_ABI,
        provider
    );
};

export const NETWORK = NETWORK_CONFIG; 