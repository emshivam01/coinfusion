import Image from "next/image";
import { TrendingUp, Info } from "lucide-react";

const page = () => {
  return (
    <div className="p-4 px-6 md:p-8 md:px-10 ">
      <div className=" w-full flex justify-between ">
        <div className="flex items-center gap-2">
          <Image
            className="w-10 h-10 md:w-14 md:h-14"
            width={200}
            height={200}
            src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
            alt="bitcoin-logo"
          />
          <div>
            <p className="text-lg md:text-2xl font-semibold">Bitcoin (BTC)</p>
            <p className="cursor-pointer text-sm md:text-xl font-semibold text-blue-600">
              Rank #1
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-base md:text-2xl font-semibold">$74,000</p>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4" />
            <p className="text-sm">5.1%</p>
          </div>
        </div>
      </div>

      {/* <div className="border h-60 mt-6 flex items-center justify-center rounded-md bg-gray-900">
        Chart
      </div> */}
      <div className="mt-6">
        <p>Key Metrics</p>
        <div className="flex flex-wrap gap-4 justify-around mt-6 dark:text-white">
          <div className="w-40 border-1 p-3 bg-gray-300 dark:bg-gray-800 rounded-md">
            <p className=" text-sm font-semibold"> Market Cap</p>
            <p>$ 12,233,534,234</p>
          </div>
          <div className="w-40 border-1 p-3 bg-gray-300 dark:bg-gray-800 rounded-md">
            <p className=" text-sm font-semibold"> Volume (24h)</p>
            <p>$ 12,233,534,234</p>
          </div>
          <div className="w-40 border-1 p-3 bg-gray-300 dark:bg-gray-800 rounded-md">
            <p className=" text-sm font-semibold"> Circulating Supply</p>
            <p>$ 12,233,534,234</p>
          </div>
          <div className="w-40 border-1 p-3 bg-gray-300 dark:bg-gray-800 rounded-md">
            <p className=" text-sm font-semibold">All time high</p>
            <p>$ 73,000</p>
          </div>
        </div>
      </div>

      {/* About Bitcoin */}

      <div className="p-3 mt-6">
        <div className=" flex">
          <Info />
          <p>About</p>
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default page;
