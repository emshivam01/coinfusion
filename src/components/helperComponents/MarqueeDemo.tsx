import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useMemo } from "react";
import Link from "next/link";
import MarqueeShimmer from "../shimmer-ui/MarqueeShimmer";

const ReviewCard = ({
  image,
  name,
  current_price,
  symbol,
  price_change_percentage_1h_in_currency,
}: {
  image: string;
  name: string;
  current_price: number;
  symbol: string;
  price_change_percentage_1h_in_currency: number;
}) => {
  const isPositive = price_change_percentage_1h_in_currency > 0;

  return (
    <figure
      className={cn(
        "relative w-60 cursor-pointer overflow-hidden rounded-xl border p-4 ",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex justify-between items-center gap-2 ">
        <div className="flex flex-row items-center gap-2">
          <Image
            className="rounded-full"
            width="32"
            height="32"
            alt=""
            src={image}
          />
          <div className="flex flex-col">
            <figcaption
              className="text-sm w-24 font-medium dark:text-white truncate"
              title={name}
            >
              {name}
            </figcaption>
            <p className="text-xs font-medium dark:text-white/40">{symbol}</p>
          </div>
        </div>
        <div className="text-sm flex flex-col items-end">
          <p className="truncate">${current_price.toFixed(3)}</p>
          <div className="flex gap-2 items-center">
            {isPositive ? (
              <TrendingUp size={16} className="text-[#28A745]" />
            ) : (
              <TrendingDown size={16} className="text-[#DC3545]" />
            )}
            <p>{price_change_percentage_1h_in_currency.toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </figure>
  );
};

export default function MarqueeDemo() {
  const cryptoData = useSelector((state: RootState) => state.crypto.coins);

  // Use useMemo to calculate firstRow and secondRow
  const firstRow = useMemo(
    () => cryptoData.slice(0, Math.ceil(cryptoData.length / 2)),
    [cryptoData]
  );
  const secondRow = useMemo(
    () => cryptoData.slice(Math.ceil(cryptoData.length / 2)),
    [cryptoData]
  );

  const isLoading = !cryptoData || cryptoData.length === 0;

  return (
    <div className="relative flex h-[250px] md:h-[250px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background dark:bg-[#171f2e]">
      {isLoading ? (
        <MarqueeShimmer /> // Render the shimmer UI when loading
      ) : (
        <>
          <Marquee className="[--duration:200s] w-full" pauseOnHover>
            {firstRow.map((review) => (
              <Link href={`/cryptocurrency/${review.id}`} key={review.id}>
                <ReviewCard {...review} />
              </Link>
            ))}
          </Marquee>
          <Marquee className="[--duration:200s] w-full" reverse pauseOnHover>
            {secondRow.map((review) => (
              <Link href={`/cryptocurrency/${review.id}`} key={review.id}>
                <ReviewCard key={review.id} {...review} />
              </Link>
            ))}
          </Marquee>
        </>
      )}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-[#171f2e]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-[#171f2e]" />
    </div>
  );
}
