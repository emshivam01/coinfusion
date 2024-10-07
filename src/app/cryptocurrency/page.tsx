"use client";

import { Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { setCoins } from "@/redux/slices/cryptoSlice";
import { useEffect, useState } from "react";

// Assuming Coin type is defined somewhere
// import { Coin } from "@/types";

const CoinList = () => {
  const [watchList, setWatchlist] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const coins = useSelector((state: RootState) => state.crypto.coins);

  const fetchCryptoData = async () => {
    try {
      const response = await axios("/api");
      const cryptoData = response.data.data;
      dispatch(setCoins(cryptoData));
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const response = await axios.get("/api/watchlist");
      setWatchlist(response.data.watchlist);
      console.log(response.data.watchlist);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  const isCoinInWatchlist = (symbol: string): boolean => {
    const res = watchList.some((coin) => coin.symbol === symbol);
    return res;
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchCryptoData(), fetchWatchlist()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleToggleWatchlist = async (coin) => {
    const isInWatchlist = isCoinInWatchlist(coin.symbol);
    const watchlistData = {
      name: coin.name,
      // Removed symbol from here
      current_price: coin.current_price,
      price_change_percentage_1h_in_currency:
        coin.price_change_percentage_1h_in_currency,
      price_change_percentage_24h_in_currency:
        coin.price_change_percentage_24h_in_currency,
      price_change_percentage_7d_in_currency:
        coin.price_change_percentage_7d_in_currency,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume,
      circulating_supply: coin.circulating_supply,
      targetPrice: 0,
      notes: "",
    };

    try {
      if (isInWatchlist) {
        await axios.delete(`/api/watchlist/${coin.symbol}`);
        setWatchlist((prev) =>
          prev.filter((item) => item.symbol !== coin.symbol)
        );
      } else {
        const response = await axios.post("/api/watchlist", watchlistData, {
          headers: { "Content-Type": "application/json" },
        });
        if (response.status === 201) {
          setWatchlist((prev) => [
            ...prev,
            { symbol: coin.symbol, ...watchlistData }, // Now `symbol` will not cause conflict
          ]);
        }
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8 mt-20">
      <Table>
        <TableCaption>A list of your popular coins.</TableCaption>
        <TableHeader>
          <TableRow className="text-base font-bold">
            <TableHead className="w-[80px]">S. No.</TableHead>
            <TableHead className="w-[60px]">Watchlist</TableHead>
            <TableHead>Coins</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>1h %</TableHead>
            <TableHead>24h %</TableHead>
            <TableHead>7d %</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>Volume (24h)</TableHead>
            <TableHead className="text-right">Circulating Supply</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coins?.map((coin, index) => (
            <TableRow key={coin.id}>
              <TableCell className="font-medium ">{index + 1}.</TableCell>
              <TableCell className="font-medium cursor-pointer ">
                <button
                  onClick={() => handleToggleWatchlist(coin)}
                  className="w-8 flex items-center justify-center dark:hover:bg-gray-700 rounded-md  p-2"
                >
                  <Star
                    size={12}
                    fill={
                      isCoinInWatchlist(coin.symbol) ? "currentColor" : "none"
                    }
                  />
                </button>
              </TableCell>
              <TableCell className="cursor-pointer">
                <Link
                  href={`/cryptocurrency/${coin.id}`}
                  className="flex gap-2 items-center"
                >
                  <Image
                    width={25}
                    height={25}
                    src={coin?.image}
                    alt={coin?.name}
                  />
                  {coin?.name}
                </Link>
              </TableCell>
              <TableCell>${coin?.current_price.toLocaleString()}</TableCell>
              <TableCell
                className={`${
                  coin?.price_change_percentage_1h_in_currency > 0
                    ? "text-[#28A745]"
                    : "text-[#DC3545]"
                }`}
              >
                {coin?.price_change_percentage_1h_in_currency?.toFixed(2)}%
              </TableCell>
              <TableCell
                className={`${
                  coin?.price_change_percentage_24h > 0
                    ? "text-[#28A745]"
                    : "text-[#DC3545]"
                }`}
              >
                {coin?.price_change_percentage_24h?.toFixed(2)}%
              </TableCell>
              <TableCell
                className={`${
                  coin?.price_change_percentage_7d_in_currency > 0
                    ? "text-[#28A745]"
                    : "text-[#DC3545]"
                }`}
              >
                {coin?.price_change_percentage_7d_in_currency?.toFixed(2)}%
              </TableCell>
              <TableCell>${coin?.market_cap.toLocaleString()}</TableCell>
              <TableCell>${coin?.total_volume.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                {coin?.circulating_supply.toLocaleString()}{" "}
                {coin?.symbol.toUpperCase()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CoinList;
