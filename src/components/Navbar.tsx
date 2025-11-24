import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchCryptoData from "../services/fetchCryptoPrices";

interface CryptoToken {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
}

function Navbar() {
  const [cryptoData, setCryptoData] = useState<CryptoToken[] | null>(null);
  useEffect(() => {
    async function loadCryptoData() {
      const result = await fetchCryptoData();
      const filteredData = result.map((token: CryptoToken) => {
        return {
          ...token,
          lastPrice: parseFloat(token.lastPrice).toFixed(2), 
          priceChangePercent: parseFloat(token.priceChangePercent).toFixed(2),
        };
      });
      setCryptoData(filteredData);
    }

    const intervalId = setInterval(loadCryptoData, 10000);
    loadCryptoData();
    
    return () => clearInterval(intervalId);
  }, []);
  return (
    <nav className="flex justify-between px-128 py-4 text-base">
      <Link to="/" className="text-balance">
        CoinView
      </Link>
      <div className="flex gap-2">
        {cryptoData ? (
          cryptoData.map((token, index) => (
            <p key={token.symbol}>
              {token.symbol.replace("USDT", "")}: ${token.lastPrice}
              <span>
                {parseFloat(token.priceChangePercent) >= 0 ? (
                  <span> ▲ </span>
                ) : (
                  <span> ▼ </span>
                )}
                {token.priceChangePercent}%
              </span>
              {index < cryptoData.length - 1 && ' | '}
            </p>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">
          Login
        </Link>
        <Link to="/" className="hover:underline">
          Sign up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
