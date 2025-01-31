import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BET_CONTENT } from '../constants';
import { RiErrorWarningLine } from "@remixicon/react";

const SUPRA_API_KEY = 'b92be6d207a9bc174f3a819d5f1f45b4d599deaadf7fce0b3142bb64a517abb4';
const SUPRA_API_URL = 'https://prod-kline-rest.supra.com';

const BetDetails = () => {
  const { id } = useParams();
  const bet = BET_CONTENT.bets.find((bet) => bet.id === parseInt(id));
  const [currentPrice, setCurrentPrice] = useState(null);
  const [betAmount, setBetAmount] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(1); // Default 1 minute
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bet) {
      fetchPrice();
      const interval = setInterval(fetchPrice, 30000);
      return () => clearInterval(interval);
    }
  }, [bet]);

  const fetchPrice = async () => {
    try {
      // Get trading pair from bet title and format it correctly
      const tradingPair = bet.title.split(' ')[0].toLowerCase();
      
      // Use Oracle API endpoint
      const response = await axios.get(`${SUPRA_API_URL}/oracle/prices`, {
        params: {
          pairs: tradingPair + '_usdt'
        },
        headers: {
          'x-api-key': SUPRA_API_KEY,
          'Accept': 'application/json'
        }
      });

      if (response.data && response.data.prices && response.data.prices.length > 0) {
        const priceData = response.data.prices[0];
        setCurrentPrice(parseFloat(priceData.price));
        setError(null);
      } else {
        // Fallback to REST API
        const restResponse = await axios.get(`${SUPRA_API_URL}/price`, {
          params: {
            symbol: tradingPair + '_usdt'
          },
          headers: {
            'x-api-key': SUPRA_API_KEY,
            'Accept': 'application/json'
          }
        });

        if (restResponse.data && restResponse.data.price) {
          setCurrentPrice(parseFloat(restResponse.data.price));
          setError(null);
        } else {
          setError('Invalid price data received');
          console.error('Invalid price data received:', restResponse.data);
        }
      }
    } catch (error) {
      console.error('Error fetching price:', error);
      setError('Failed to fetch price data');
      // Keep the last known price if there's an error
      if (!currentPrice) {
        setCurrentPrice(null);
      }
    }
  };

  const handleBet = async (direction) => {
    if (!betAmount || betAmount <= 0) {
      setError('Please enter a valid bet amount');
      return;
    }

    if (!currentPrice) {
      setError('Failed to load current price');
      return;
    }

    try {
      // Here you can implement your betting logic without wallet integration
      console.log('Placing bet:', {
        direction,
        amount: betAmount,
        currentPrice,
        pair: bet.title,
        duration: selectedDuration
      });
      
      setError(null);
      alert('Bet placed successfully!');
    } catch (err) {
      setError('Failed to place bet. Please try again.');
      console.error('Bet error:', err);
    }
  };

  if (!bet) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-neutral-400 text-5xl">
          <RiErrorWarningLine className="inline-block mr-2" />
          Bet not found :( select specific Bet from BetMarket
        </div>
      </div>
    );
  }

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
        
        {error && (
          <div className="bg-red-500/20 text-red-500 p-3 rounded-lg mb-4 flex items-center">
            <RiErrorWarningLine className="mr-2" />
            {error}
          </div>
        )}

        <div className="text-xl font-bold text-center mb-4">
          {currentPrice ? (
            `Current Price: $${currentPrice.toFixed(2)}`
          ) : (
            <span className="text-neutral-400">$103496.74</span>
          )}
        </div>

        <div className="flex justify-around mb-4">
          <motion.button
            className="bg-green-600 py-2 px-4 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleBet(true)}
          >
            UP 
          </motion.button>
          <motion.button
            className="bg-red-600 py-2 px-4 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleBet(false)}
          >
            DOWN 
          </motion.button>
        </div>

        <div className="flex justify-around mb-4">
          <motion.button
            className={`py-2 px-4 rounded-lg ${selectedDuration === 1 ? 'bg-blue-600' : 'bg-neutral-700'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedDuration(1)}
          >
            1 MIN
          </motion.button>
          <motion.button
            className={`py-2 px-4 rounded-lg ${selectedDuration === 5 ? 'bg-blue-600' : 'bg-neutral-700'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedDuration(5)}
          >
            5 MIN
          </motion.button>
          <motion.button
            className={`py-2 px-4 rounded-lg ${selectedDuration === 'all' ? 'bg-blue-600' : 'bg-neutral-700'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSelectedDuration('all')}
          >
            15 MIN
          </motion.button>
        </div>

        <input
          type="number"
          placeholder="Amount in supra"
          className="w-full p-2 mb-4 rounded-lg text-black"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
        />
        <div className="text-neutral-400 mt-4">
          <button 
            className="bg-blue-600 py-2 px-4 rounded-lg w-full text-white flex items-center justify-center"
            onClick={async () => {
              try {
                // Check if StarKey is installed
                const isStarkeyInstalled = window?.starkey;
                
                if (!isStarkeyInstalled) {
                  window.open('https://starkey.app/', '_blank');
                  return;
                }

                // Get provider
                const provider = window.starkey?.supra;
                
                // Connect wallet
                const accounts = await provider.connect();
                const fromAddress = accounts[0];
                
                // Create transaction with padded hex value
                const transaction = {
                  data: "0x" + betAmount.toString(16).padStart(64, '0'), // Pad hex to 32 bytes
                  from: fromAddress,
                  to: "0xContractAddress", // Replace with actual contract address
                  value: betAmount
                };

                // Send transaction
                const txHash = await provider.sendTransaction(transaction);
                console.log("Transaction hash:", txHash);

                // Listen for account changes
                provider.on('accountChanged', (accounts) => {
                  if (accounts.length > 0) {
                    console.log(`Switched to account ${accounts[0]}`);
                  }
                });

                setError(null);

              } catch (err) {
                console.error("Transaction failed:", err);
                setError("Transaction failed. Please try again.");
              }
            }}
          >
            <RiErrorWarningLine className="mr-2" />
            Place Bet
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BetDetails;
