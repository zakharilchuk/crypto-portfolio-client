import { Link } from "react-router-dom";
import fetchCryptoData from "../services/fetchCryptoPrices";
import { Box, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

interface CryptoToken {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
}

function Navbar() {
  const { data: cryptoData } = useQuery<CryptoToken[]>({
    queryKey: ["cryptoPrices"],
    queryFn: async () => {
      const result = await fetchCryptoData();
      return result.map((token: CryptoToken) => ({
        ...token,
        lastPrice: Number(token.lastPrice).toFixed(2),
        priceChangePercent: Number(token.priceChangePercent).toFixed(2),
      }));
    },
    refetchInterval: 10000,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });

  if (!cryptoData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "black" }} />
      </Box>
    );
  }

  return (
    <nav className="flex justify-between items-center px-[15vw] py-4 text-base">
      <Link to="/" className="text-xl">
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
