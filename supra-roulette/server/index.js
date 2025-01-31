const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const SUPRA_API_KEY = 'b92be6d207a9bc174f3a819d5f1f45b4d599deaadf7fce0b3142bb64a517abb4';

// Get latest price
app.get('/api/price/latest', async (req, res) => {
    try {
        console.log('Fetching latest price...');
        const response = await axios.get('https://prod-kline-rest.supra.com/latest', {
            params: {
                trading_pair: 'btc_usdt'
            },
            headers: {
                'x-api-key': SUPRA_API_KEY,
                'Accept': 'application/json'
            }
        });
        
        console.log('Response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        res.status(500).json({ 
            error: error.message,
            details: error.response?.data 
        });
    }
});

// Get price history
app.get('/api/price/history', async (req, res) => {
    try {
        const endDate = Date.now();
        const startDate = endDate - (30 * 60 * 1000); // Last 30 minutes

        const response = await axios.get('https://prod-kline-rest.supra.com/history', {
            params: {
                trading_pair: 'btc_usdt',
                startDate: startDate,
                endDate: endDate,
                interval: 5
            },
            headers: {
                'x-api-key': SUPRA_API_KEY,
                'Accept': 'application/json'
            }
        });
        
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching history:', error.response?.data || error.message);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Using Supra API Key: ${SUPRA_API_KEY}`);
});