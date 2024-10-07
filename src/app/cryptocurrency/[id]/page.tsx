"use client";

import Image from "next/image";
import { TrendingUp, Info, ChevronRight } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Chart from "@/components/Chart";

// Define a type for the coin data
type CoinData = {
  id: string;
  name: string;
  image: { large: string };
  market_cap_rank: number;
  market_data: {
    current_price: { usd: number };
    price_change_percentage_24h: number;
    market_cap: { usd: number };
    total_volume: { usd: number };
    circulating_supply: number;
    ath: { usd: number };
  };
  description: { en: string };
  links: {
    homepage: string[];
    whitepaper: string;
    blockchain_site: string[];
  };
};

const Page = ({ params }: { params: { id: string } }) => {
  const [coinData, setCoinData] = useState<CoinData | null>(null); // State to hold the fetched coin data
  const [loading, setLoading] = useState(true); // Loading state

  const { id } = params;
  const fetchCoinData = async () => {
    try {
      if (!id) return; // Check if the id is available before making the API call

      const response = await axios.get(`/api/currencies/${id}`); // Fetch data from your API
      setCoinData(response.data.data); // Set the coin data
      setLoading(false); // Set loading to false once the data is fetched
    } catch (error) {
      console.error("Error fetching coin data:", error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  useEffect(() => {
    fetchCoinData(); // Fetch the coin data when the page loads or when `id` changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Check for loading state
  if (loading) {
    return <div className="mt-24">Loading...</div>;
  }

  // Check for missing coin data (if there's an issue fetching data)
  if (!coinData) {
    return <div>Error loading coin data.</div>;
  }

  return (
    <div className="p-4 px-6 md:p-8 md:px-10 md:mt-28">
      {/* Coin Header */}
      <div className="grid grid-cols-2 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image
            className="w-10 h-10 md:w-14 md:h-14"
            width={200}
            height={200}
            src={coinData.image.large}
            alt={coinData.name}
          />
          <div>
            <p className="text-lg md:text-2xl font-semibold">{coinData.name}</p>
            <p className="cursor-pointer text-sm md:text-xl font-semibold text-blue-600">
              Rank #{coinData.market_cap_rank}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-base md:text-2xl font-semibold">
            ${coinData.market_data.current_price.usd.toLocaleString()}
          </p>
          <div className="flex justify-end items-center gap-2">
            <TrendingUp className="w-4" />
            <p className="text-sm">
              {coinData.market_data.price_change_percentage_24h?.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mt-6 dark:bg-gray-900 p-3 rounded-md">
        <p className="text-xl font-semibold">Key Metrics</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 dark:text-white">
          <div className="border-1 p-3 bg-gray-300 dark:bg-gray-800 rounded-md">
            <p className="text-sm md:text-lg font-semibold">Market Cap</p>
            <p className="text-sm md:text-base font-medium">
              ${coinData.market_data.market_cap.usd.toLocaleString()}
            </p>
          </div>
          <div className="border-1 p-3 bg-gray-300 dark:bg-gray-800 rounded-md">
            <p className="text-sm md:text-lg font-semibold">Volume (24h)</p>
            <p className="text-sm md:text-base font-medium">
              ${coinData.market_data.total_volume.usd.toLocaleString()}
            </p>
          </div>
          <div className="border-1 p-3 bg-gray-300 dark:bg-gray-800 rounded-md">
            <p className="text-sm md:text-lg font-semibold">
              Circulating Supply
            </p>
            <p className="text-sm md:text-base font-medium">
              {coinData.market_data.circulating_supply.toLocaleString()}
            </p>
          </div>
          <div className="border-1 p-3 bg-gray-300 dark:bg-gray-800 rounded-md">
            <p className="text-sm md:text-lg font-semibold">All Time High</p>
            <p className="text-sm md:text-base font-medium">
              ${coinData.market_data.ath.usd.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Chart Section */}

      <Chart id={coinData.id} days="7" />

      {/* {console.log(coinData)} */}

      {/* About Coin */}
      <div className="p-4 mt-6 bg-slate-200 dark:bg-gray-800 rounded-md text-wrap overflow-hidden">
        <div className="flex items-center gap-2">
          <Info className="md:text-xl font-semibold" size={20} />
          <p className="text-base md:text-xl font-semibold">About</p>
        </div>
        <p className="text-sm md:text-base mt-2">{coinData.description.en}</p>
      </div>

      {/* Docs & Whitepapers */}
      <div className="grid gap-2 p-3 mt-6 dark:bg-gray-900 rounded-md">
        <Link
          target="blank"
          className="flex justify-between items-center p-2 rounded-sm text-sm  md:text-base hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          href={coinData.links.homepage[0]}
        >
          Official Website
          <ChevronRight />
        </Link>
        <Link
          target="blank"
          className="flex justify-between items-center p-2 rounded-sm text-sm  md:text-base hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          href={coinData.links.whitepaper}
        >
          Whitepaper
          <ChevronRight />
        </Link>
        <Link
          target="blank"
          className="flex justify-between items-center p-2 rounded-sm text-sm  md:text-base hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          href={coinData.links.blockchain_site[0]}
        >
          Block Explorer
          <ChevronRight />
        </Link>
      </div>
    </div>
  );
};

export default Page;
