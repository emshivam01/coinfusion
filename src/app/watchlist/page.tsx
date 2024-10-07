"use client";

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
import axios from "axios";
import { useEffect, useState } from "react";

const CoinList = () => {
  const [watchlist, setWatchlist] = useState([]);

  const fetchWatchlist = async () => {
    const response = await axios.get("/api/watchlist");
    setWatchlist(response.data.watchlist);
    console.log(response.data.watchlist);
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div className=" p-8 md:mt-24">
      <Table>
        <TableCaption>Your watchlist.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S. No.</TableHead>
            <TableHead>Coins</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>1h %</TableHead>
            <TableHead>24h %</TableHead>
            <TableHead>7d %</TableHead>
            <TableHead>Market Cap</TableHead>
            <TableHead>Volume(24h)</TableHead>
            <TableHead className="text-right">Cirrculating Supply</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlist.map((coin, index) => {
            return (
              <TableRow key={coin?.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{coin?.name}</TableCell>
                <TableCell>${coin?.current_price}</TableCell>
                <TableCell>
                  {coin?.price_change_percentage_1h_in_currency.toFixed(2)}%
                </TableCell>
                <TableCell>
                  {coin?.price_change_percentage_24h_in_currency.toFixed(2)}%
                </TableCell>
                <TableCell>
                  {coin?.price_change_percentage_7d_in_currency.toFixed(2)}%
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
