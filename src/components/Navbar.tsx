import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import fetchCryptoData from "../services/fetchCryptoPrices";

interface CryptoToken {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
}

function Navbar() {
  const [cryptoData, setCryptoData] = useState<CryptoToken[] | null>(null);

  const loadCryptoData = useCallback(async () => {
    const result = await fetchCryptoData();
    setCryptoData(
      result.map((token: CryptoToken) => ({
        ...token,
        lastPrice: Number(token.lastPrice).toFixed(2),
        priceChangePercent: Number(token.priceChangePercent).toFixed(2),
      }))
    );
  }, []);

  useEffect(() => {
    const start = async () => loadCryptoData();
    start();
    const intervalId = setInterval(start, 10000);
    return () => clearInterval(intervalId);
  }, [loadCryptoData]);
  return (
    <nav className="flex justify-between items-center px-128 py-4 text-base">
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
              {index < cryptoData.length - 1 && " | "}
            </p>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="flex gap-4">
        <Link to="/login" className="hover:underline">
          Login
        </Link>
        <Link to="/signup" className="hover:underline">
          Sign up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
