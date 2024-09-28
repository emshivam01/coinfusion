import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";
import { TrendingDown } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useMemo } from "react";

// const reviews = [];

// const firstRow = reviews.slice(0, reviews.length / 2);
// const secondRow = reviews.slice(reviews.length / 2);

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
  return (
    <figure
      className={cn(
        "relative w-60 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2 border">
        <Image
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={image}
        />
        <div className="flex flex-col">
          <figcaption
            className="text-sm w-14 font-medium dark:text-white truncate"
            title={name}
          >
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{symbol}</p>
        </div>
        <div className="text-sm flex flex-col items-end">
          <p>${current_price}</p>
          <div className="flex gap-2 items-center">
            <TrendingDown size={16} />
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

  // reviews.push(cryptoData.coins);
  return (
    <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background  mt-36">
      <Marquee className="[--duration:70s] w-full" pauseOnHover>
        {firstRow.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </Marquee>
      <Marquee className="[--duration:70s] w-full" reverse pauseOnHover>
        {secondRow.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      {console.log(cryptoData)}
    </div>
  );
}
