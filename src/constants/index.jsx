import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";
import img7 from "../assets/img7.png";
import img8 from "../assets/img8.png";
import img9 from "../assets/img9.png";
import img10 from "../assets/img10.png";
import img11 from "../assets/img11.png";
import img12 from "../assets/img12.png";


import {
  RiBarChart2Line,
  RiCheckDoubleLine,
  RiMoneyDollarCircleLine,
  RiShieldCheckLine,
  RiTimerFlashLine,
  RiWalletLine,

} from "@remixicon/react";

export const HERO_CONTENT = {
  badgeText: "🚀 The Power of Prediction in Your Hands!",
  mainHeading: "Your Next Prediction \n Starts with BetSet",
  subHeading:
"Bet smarter, win bigger! Experience fast, secure betting with BetSet. Your odds, your game—anytime, anywhere!",
  callToAction: {
    primary: "Bet Now 💸",
  },

};



export const HOW_IT_WORKS_CONTENT = {  
  sectionTitle: "How it works!",  
  sectionDescription: 
    "Start betting securely on BetSet with our simple 6-step process. From wallet connection to winning predictions, BetSet uses blockchain for a transparent betting experience.",  
  steps: [    
    {      
      title: "Connect Your Wallet",      
      description: 
        "Seamlessly connect your crypto wallet to BetSet for secure transactions using blockchain technology.",        
    },    
    {      
      title: "Choose Your Bet",      
      description: 
        "Select the event or match on which you'd like to place a bet. Use our intuitive interface to find the right match.",    
    },    
    {      
      title: "Predict Yes/No",      
      description: 
        "Make your prediction by choosing a simple Yes or No option. Bet confidently using decentralized technology.",        
    },    
    {      
      title: "Confirm Your Bet",      
      description: 
        "Finalize and confirm your bet using smart contracts for added transparency and trust.",         
    },    
    {      
      title: "Wait for Results",      
      description: 
        "Once the event concludes, the blockchain verifies the outcome to ensure a fair result.",       
    },    
    {      
      title: "Claim Your Rewards",      
      description: 
        "If your prediction is correct, you will automatically receive 2x your initial stake in your wallet. If not, your bet is forfeited.",        
    },  
  ],  
};


export const KEY_FEATURES_CONTENT = {  
  sectionTitle: "Bet Smarter with These Key Features",  
  sectionDescription: 
    "Everything you need for a seamless blockchain-based betting experience, all in one place.",  
  features: [    
    {      
      id: 1,      
      icon: <RiWalletLine className="w-8 h-8" />,      
      title: "Secure Wallet Integration",      
      description: 
        "Connect your crypto wallet securely to place bets and receive payouts using blockchain technology.",    
    },    
    {      
      id: 2,      
      icon: <RiBarChart2Line className="w-8 h-8" />,      
      title: "Real-Time Bet Tracking",      
      description: 
        "Track your ongoing bets, view results in real-time, and stay informed with live updates.",    
    },    
    {      
      id: 3,      
      icon: <RiCheckDoubleLine className="w-8 h-8" />,      
      title: "Yes/No Bet Predictions",      
      description: 
        "Place simple Yes or No bets on various events with instant confirmations and transparency.",    
    },    
    {      
      id: 4,      
      icon: <RiShieldCheckLine className="w-8 h-8" />,      
      title: "Blockchain-Powered Transparency",      
      description: 
        "Enjoy trustless betting, where every transaction and outcome is verified using smart contracts.",    
    },    
    {      
      id: 5,      
      icon: <RiMoneyDollarCircleLine className="w-8 h-8" />,      
      title: "Instant Payouts",      
      description: 
        "Receive instant payouts if you predict correctly, with 2x returns straight to your wallet.",    
    },    
    {      
      id: 6,      
      icon: <RiTimerFlashLine className="w-8 h-8" />,      
      title: "Automated Betting Workflows",      
      description: 
        "Automate your betting strategies with advanced tools, allowing you to manage bets effortlessly.",    
    },  
  ],  
};


export const BET_CONTENT = {
  sectionTitle: "Choose Your Bet",
  sectionDescription:
    "BetSet offers multiple choices to users for betting, from beginner to pro.",
    bets: [
      {
        id: 1,
        title: "What will the Bitcoin Price be by End of 2025?",
        description: "Predict whether Bitcoin will cross the $150,000 mark by the end of 2024.",
        shortDescription: "Bet on Bitcoin's price by the end of 2025.",
        image: img1,
        yesPercentage: 0,
        noPercentage: 100,
        volume: 1200000, // Simulated volume in USD
        liquidity: 500000, // Simulated liquidity in USD
        expiryDate: "Dec 31, 2025"
      },
      {
        id: 2,
        title: "What will the Ethereum Price be by End of 2025?",
        description: "Predict whether Ethereum will surpass $10,000 by the end of 2024.",
        shortDescription: "Bet on Ethereum's price by the end of 2025.",
        image: img2,
        yesPercentage: 0,
        noPercentage: 100,
        volume: 800000, // Simulated volume in USD
        liquidity: 300000, // Simulated liquidity in USD
        expiryDate: "Dec 31, 2025"
      },
      {
        id: 3,
        title: "What will the Solana Price be by Mid-2025?",
        description: "Predict whether Solana will reach $500 by June 2025.",
        shortDescription: "Bet on Solana's price by mid-2025.",
        image: img3,
        yesPercentage: 0,
        noPercentage: 100,
        volume: 400000, // Simulated volume in USD
        liquidity: 150000, // Simulated liquidity in USD
        expiryDate: "June 30, 2025"
      },
      {
        id: 4,
        title: "Will XRP surpass $5 by End of 2025?",
        description: "Predict whether XRP will cross the $5 mark by the end of 2025.",
        shortDescription: "Bet on XRP's price by 2025.",
        image: img4,
        yesPercentage: 0,
        noPercentage: 100,
        volume: 300000, // Simulated volume in USD
        liquidity: 100000, // Simulated liquidity in USD
        expiryDate: "Dec 31, 2025"
      },
      {
        id: 5,
        title: "What will the BNB Price be by End of 2025?",
        description: "Predict whether BNB will cross the $1,000 mark by the end of 2025.",
        shortDescription: "Bet on BNB's price by 2025.",
        image: img5,
        yesPercentage: 0,
        noPercentage: 100,
        volume: 600000, // Simulated volume in USD
        liquidity: 250000, // Simulated liquidity in USD
        expiryDate: "Dec 31, 2025"
      },
      {
        id: 6,
        title: "Will Shiba Inu hit $0.01 by 2026?",
        description: "Predict whether Shiba Inu will reach $0.01 by 2026.",
        shortDescription: "Bet on Shiba Inu's price by 2026.",
        image: img6,
        yesPercentage: 0,
        noPercentage: 100,
        volume: 200000, // Simulated volume in USD
        liquidity: 75000, // Simulated liquidity in USD
        expiryDate: "Dec 31, 2026"
      },
      {
        id: 7,
        title: "Will Polkadot exceed $50 by Mid-2025?",
        description: "Predict whether Polkadot will surpass $50 by June 2025.",
        shortDescription: "Bet on Polkadot's price by mid-2025.",
        image: img7,
        yesPercentage: 0,
        noPercentage: 100,
        volume: 350000, // Simulated volume in USD
        liquidity: 120000, // Simulated liquidity in USD
        expiryDate: "June 30, 2025"
      },
      {
        id: 8,
        title: "Will Avalanche (AVAX) reach $200 by 2025?",
        description: "Predict whether Avalanche will hit $200 by the end of 2025.",
        shortDescription: "Bet on AVAX's price by 2025.",
        image: img8,
        yesPercentage: 0,
        noPercentage: 100,
        volume: 450000, // Simulated volume in USD
        liquidity: 180000, // Simulated liquidity in USD
        expiryDate: "Dec 31, 2025"
      },
      {
        id: 9,
        title: "Will Terra (LUNA) recover to $50 by 2026?",
        description: "Predict whether Terra will recover and reach $50 by 2026.",
        shortDescription: "Bet on LUNA's price recovery.",
        image: img9,
        yesPercentage: 0,
        noPercentage: 100,
        volume: 100000, // Simulated volume in USD
        liquidity: 40000, // Simulated liquidity in USD
        expiryDate: "Dec 31, 2026"
      },
      {
        id: 10,
        title: "What will the Cardano (ADA) Price be by 2025?",
        description: "Predict whether Cardano will cross the $5 mark by 2025.",
        shortDescription: "Bet on ADA's price by 2025.",
        image: img10,
        yesPercentage: 0,
        noPercentage: 100,
        volume: 500000, // Simulated volume in USD
        liquidity: 200000, // Simulated liquidity in USD
        expiryDate: "Dec 31, 2025"
      },
      {
        id: 11,
        title: "Will Dogecoin reach $1 by End of 2025?",
        description: "Predict whether Dogecoin will finally hit $1 by 2025.",
        shortDescription: "Bet on Dogecoin's price milestone.",
        image: img11,
        yesPercentage: 0,
        noPercentage: 100,
        volume: 700000, // Simulated volume in USD
        liquidity: 300000, // Simulated liquidity in USD
        expiryDate: "Dec 31, 2025"
      },
      {
        id: 12,
        title: "Will Litecoin (LTC) surpass $500 by 2025?",
        description: "Predict whether Litecoin will reach $500 by 2025.",
        shortDescription: "Bet on Litecoin's price performance.",
        image: img12,
        yesPercentage: 0,
        noPercentage: 100,
        volume: 250000, // Simulated volume in USD
        liquidity: 90000, // Simulated liquidity in USD
        expiryDate: "Dec 31, 2025"
      }
             
  ]
  
};


