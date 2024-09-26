import React from "react";
import { FlipWords } from "../ui/flip-words";

export function FlipWord() {
  const words = ["Surf", "Track", "Conquer!"];

  return (
    <div className="h-[40rem] flex justify-center items-center px-4 mt-20">
      <h1 className="text-5xl mx-auto font-bold text-neutral-600 dark:text-neutral-400">
        Ride the Crypto Wave:Surf, Track, Conquer!
        <span className="inline-block min-w-[230px]">
          <FlipWords words={words} />
        </span>
      </h1>
    </div>
  );
}
