import axios from "axios";

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function fetchCryptoPrices() {
  const URL = 'https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT","ETHUSDT"]'
  const response = await axios.get(URL);
  return response.data;
}