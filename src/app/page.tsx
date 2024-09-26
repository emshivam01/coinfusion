import Circle from "@/components/Circle";
import MarqueeDemo from "@/components/helperComponents/MarqueeDemo";
import Searchbar from "@/components/Searchbar";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-full  gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Circle />
      <h1 className="text-center text-2xl md:text-5xl mx-auto font-bold text-neutral-600 dark:text-neutral-400 mt-10">
        Ride the Crypto Wave:Surf, Track, Conquer!
      </h1>
      {/* <FlipWord /> */}
      <Searchbar />
      <MarqueeDemo />
    </div>
  );
}
