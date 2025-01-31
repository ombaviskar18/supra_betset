import React from 'react';
import { Link } from 'react-router-dom';
import { BET_CONTENT } from '../constants'; // Assuming bet data is stored here
import  bets  from "../assets/bets.png"

const BetMarket = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 flex flex-col items-center text-center mt-40'>
      <div className="text-center text-neutral-400 text-5xl">💸 Welcome to BetSet Marketplace 💸</div>
       <div className="flex justify-center items-center">
              <img src={bets} alt="Prediction Image" className="w-64 h-64" />
            </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {BET_CONTENT.bets.map((bet, index) => (
          <div key={index} className="bg-neutral-900 p-6 rounded-xl shadow-lg flex flex-col items-center hover:bg-neutral-700 transition-all duration-300 ease-in-out transform hover:scale-105">
            <img src={bet.image} className="rounded-lg mb-4 h-20 w-20" />
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">{bet.title}</h3>
              <p className="text-neutral-400">{bet.description}</p>
            </div>
            <Link to={`/market/${bet.id}`}>
              <button className='w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 rounded-lg mt-5 text-xl'>
                Let's Bet 💰
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetMarket;
