const express = require('express');
const axios = require('axios');
const app = express();

app.get('/binance', async (req, res) => {
  try {
    const url = `https://api.binance.com/api/v3/klines`;
    
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Accept': 'application/json',
      'Accept-Language': 'en-US,en;q=0.9'
    };

    const response = await axios.get(url, {
      headers,
      params: req.query  // pasa symbol, interval, limit, etc.
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error al consultar Binance:', error.response?.status, error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Proxy Binance corriendo...');
});
