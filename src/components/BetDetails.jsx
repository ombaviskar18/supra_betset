import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BET_CONTENT } from '../constants';

const BetDetails = () => {
  const { id } = useParams();
  const bet = BET_CONTENT.bets.find((bet) => bet.id === parseInt(id));

  if (!bet) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-neutral-400 text-5xl">
          Bet not found :( select specific Bet from BetMarket
        </div>
      </div>
    );
  }

  const handleBuyClick = () => {
    alert('Bet successful');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        className="bet-details p-6 bg-neutral-900 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center">
          <motion.img
            src={bet.image}
            alt={bet.title}
            className="rounded-lg mb-4 h-40 w-40"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4">{bet.title}</h2>
        <p className="text-neutral-400 mb-4">{bet.description}</p>
        <div className="flex justify-around mb-4">
          <motion.button
            className="bg-green-600 py-2 px-4 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Yes ({bet.yesPercentage}%)
          </motion.button>
          <motion.button
            className="bg-red-600 py-2 px-4 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            No ({bet.noPercentage}%)
          </motion.button>
        </div>
        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 mb-4 rounded-lg text-black"
        />
        <motion.button
          className="bg-blue-600 w-full py-3 px-4 rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBuyClick}
        >
          Buy
        </motion.button>
        <div className="text-neutral-400 mt-4">
          <p>Volume: {bet.volume} USDC</p>
          <p>Liquidity: {bet.liquidity} USDC</p>
          <p>Expires At: {bet.expiryDate}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default BetDetails;
