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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js
import axios from "axios";

const CoinList = () => {
  const cryptoData = useSelector((state: RootState) => state.crypto.coins);

  // Make sure you're passing the coin to this function
  const handleToggleWatchlist = async (coin) => {
    const { id, name, symbol } = coin; // Get necessary details
    const targetPrice = 0; // Default value, can be updated later
    const notes = ""; // Default value, can be updated later

    const watchlistData = { name, symbol, targetPrice, notes };

    // Call your API to toggle watchlist status
    try {
      const response = await axios.post("/api/watchlist", watchlistData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show notification to the user)
    }
  };

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
          {cryptoData.map((coin, index) => {
            return (
              <TableRow key={coin.id}>
                <TableCell className="font-medium ">{index + 1}.</TableCell>
                <TableCell className="font-medium cursor-pointer ">
                  {/* Pass the coin object to the onClick handler */}
                  <button
                    onClick={() => handleToggleWatchlist(coin)}
                    className="w-8 flex items-center justify-center dark:hover:bg-gray-700 rounded-md  p-2"
                  >
                    <Star size={12} />
                  </button>
                </TableCell>

                {/* Correct use of Link component */}
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
            );
          })}
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
