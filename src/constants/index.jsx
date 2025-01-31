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
    "BetSet offers real-time price prediction betting on major cryptocurrencies.",
    bets: [
      {
        id: 1,
        title: "Bitcoin Price Movement",
        description: "Predict if BTC price will be above your entry price after your chosen timeframe (1-60 mins)",
        shortDescription: "Bet on BTC's short-term price movement",
        image: img1,
        yesPercentage: 0,
        noPercentage: 100
      },
      {
        id: 2,
        title: "Ethereum Price Movement",
        description: "Predict if ETH price will be above your entry price after your chosen timeframe (1-60 mins)",
        shortDescription: "Bet on ETH's short-term price movement",
        image: img2,
        yesPercentage: 0,
        noPercentage: 100
      },
      {
        id: 3,
        title: "Solana Price Movement",
        description: "Predict if SOL price will be above your entry price after your chosen timeframe (1-60 mins)",
        shortDescription: "Bet on SOL's short-term price movement",
        image: img3,
        yesPercentage: 0,
        noPercentage: 100
      },
      {
        id: 4,
        title: "XRP Price Movement",
        description: "Predict if XRP price will be above your entry price after your chosen timeframe (1-60 mins)",
        shortDescription: "Bet on XRP's short-term price movement",
        image: img4,
        yesPercentage: 0,
        noPercentage: 100
      },
      {
        id: 5,
        title: "BNB Price Movement",
        description: "Predict if BNB price will be above your entry price after your chosen timeframe (1-60 mins)",
        shortDescription: "Bet on BNB's short-term price movement",
        image: img5,
        yesPercentage: 0,
        noPercentage: 100
      },
      {
        id: 6,
        title: "SHIB Price Movement",
        description: "Predict if SHIB price will be above your entry price after your chosen timeframe (1-60 mins)",
        shortDescription: "Bet on SHIB's short-term price movement",
        image: img6,
        yesPercentage: 0,
        noPercentage: 100
      },
      {
        id: 7,
        title: "DOT Price Movement",
        description: "Predict if DOT price will be above your entry price after your chosen timeframe (1-60 mins)",
        shortDescription: "Bet on DOT's short-term price movement",
        image: img7,
        yesPercentage: 0,
        noPercentage: 100
      },
      {
        id: 8,
        title: "AVAX Price Movement",
        description: "Predict if AVAX price will be above your entry price after your chosen timeframe (1-60 mins)",
        shortDescription: "Bet on AVAX's short-term price movement",
        image: img8,
        yesPercentage: 0,
        noPercentage: 100
      },
      {
        id: 9,
        title: "LUNA Price Movement",
        description: "Predict if LUNA price will be above your entry price after your chosen timeframe (1-60 mins)",
        shortDescription: "Bet on LUNA's short-term price movement",
        image: img9,
        yesPercentage: 0,
        noPercentage: 100
      },
      {
        id: 10,
        title: "ADA Price Movement",
        description: "Predict if ADA price will be above your entry price after your chosen timeframe (1-60 mins)",
        shortDescription: "Bet on ADA's short-term price movement",
        image: img10,
        yesPercentage: 0,
        noPercentage: 100
      },
      {
        id: 11,
        title: "DOGE Price Movement",
        description: "Predict if DOGE price will be above your entry price after your chosen timeframe (1-60 mins)",
        shortDescription: "Bet on DOGE's short-term price movement",
        image: img11,
        yesPercentage: 0,
        noPercentage: 100
      },
      {
        id: 12,
        title: "LTC Price Movement",
        description: "Predict if LTC price will be above your entry price after your chosen timeframe (1-60 mins)",
        shortDescription: "Bet on LTC's short-term price movement",
        image: img12,
        yesPercentage: 0,
        noPercentage: 100
      }
             
  ]
  
};
