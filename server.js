// Load environment variables
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

// Serve static files (index.html, style.css, script.js)
app.use(express.static(path.join(__dirname)));

// Route to serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API route to fetch SOL/USDT market data
app.get('/api/signal', async (req, res) => {
    const url = 'https://api.binance.com/api/v3/ticker/24hr?symbol=SOLUSDT';

    try {
        const response = await axios.get(url, {
            headers: {
                'X-MBX-APIKEY': process.env.BINANCE_API_KEY
            }
        });
        res.json({
            priceChangePercent: response.data.priceChangePercent,
            lastPrice: response.data.lastPrice
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
