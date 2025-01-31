import { ethers } from 'ethers';

const ATMOS_ROUTER_ADDRESS = process.env.REACT_APP_ATMOS_ROUTER_ADDRESS;
const ATMOS_FACTORY_ADDRESS = process.env.REACT_APP_ATMOS_FACTORY_ADDRESS;

export const getAtmosProvider = (provider) => {
    const atmosRouter = new ethers.Contract(
        ATMOS_ROUTER_ADDRESS,
        ['function swapExactTokensForTokens(uint256,uint256,address[],address,uint256)'],
        provider
    );

    const atmosFactory = new ethers.Contract(
        ATMOS_FACTORY_ADDRESS,
        ['function getPair(address,address) view returns (address)'],
        provider
    );

    return { atmosRouter, atmosFactory };
};

export const addLiquidity = async (provider, tokenA, tokenB, amountA, amountB) => {
    const { atmosRouter } = getAtmosProvider(provider);
    
    // Add liquidity through Atmos Protocol
    const tx = await atmosRouter.addLiquidity(
        tokenA,
        tokenB,
        amountA,
        amountB,
        0, // slippage tolerance
        0, // slippage tolerance
        window.ethereum.selectedAddress,
        Date.now() + 1000 * 60 * 10 // 10 minutes deadline
    );

    return tx;
}; 