"use client";

import Circle from "@/components/Circle";
import MarqueeDemo from "@/components/helperComponents/MarqueeDemo";
import Searchbar from "@/components/Searchbar";
import { setCoins } from "@/redux/slices/cryptoSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  const fetchCryptoData = async () => {
    try {
      const response = await axios("/api");
      const cryptoData = response.data.data; // Ensure this path is correct
      dispatch(setCoins(cryptoData));
      console.log(cryptoData);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      // Optionally handle the error (e.g., dispatch an error action)
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-full  gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Circle />
      <h1 className="text-center text-2xl md:text-5xl mx-auto font-bold text-neutral-600 dark:text-neutral-400 mt-10">
        Ride the Crypto Wave:Surf, Track, Conquer!
      </h1>
      <Searchbar />
      <MarqueeDemo />
    </div>
  );
}
