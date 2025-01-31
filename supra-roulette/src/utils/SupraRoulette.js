import { ethers } from 'ethers';

const ROULETTE_ABI = [
    "function place_bet(uint256 amount, bool direction)",
    "function resolve_bet()",
    "function get_bet_info(address user) view returns (uint256, bool, uint256, bool)"
];

const ROULETTE_ADDRESS = "0x27f518f899eebd0d6338a23836dc4c09780b14e8a6734692bdd8ef9231460a68";
const CHAIN_ID = 6;

export const getRouletteContract = (provider) => {
    return new ethers.Contract(ROULETTE_ADDRESS, ROULETTE_ABI, provider);
}; 