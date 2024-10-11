import Link from "next/link";

const CurrencyDetailShimmer = () => {
  return (
    <div>
      <div className="p-4 px-6 md:p-8 md:px-10 md:mt-28">
        {/* Coin Header */}
        <div className="grid grid-cols-2 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 md:w-14 md:h-14"></div>
            <div>
              <p className="text-lg md:text-2xl font-semibold"></p>
              <p className="cursor-pointer text-sm md:text-xl font-semibold text-blue-600"></p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-base md:text-2xl font-semibold"></p>

            <div className="flex justify-end items-center gap-2">
              <p className="text-sm"></p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mt-6 dark:bg-gray-900 p-3 rounded-md">
          <p className="text-xl font-semibold"> </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 dark:text-white">
            <div className="border-1 p-3 bg-gray-300 dark:bg-gray-800 rounded-md">
              <p className="text-sm md:text-lg font-semibold"> </p>
              <p className="text-sm md:text-base font-medium"></p>
            </div>
            <div className="border-1 p-3 bg-gray-300 dark:bg-gray-800 rounded-md">
              <p className="text-sm md:text-lg font-semibold"> </p>
              <p className="text-sm md:text-base font-medium"></p>
            </div>
            <div className="border-1 p-3 bg-gray-300 dark:bg-gray-800 rounded-md">
              <p className="text-sm md:text-lg font-semibold"></p>
              <p className="text-sm md:text-base font-medium"></p>
            </div>
            <div className="border-1 p-3 bg-gray-300 dark:bg-gray-800 rounded-md">
              <p className="text-sm md:text-lg font-semibold"></p>
              <p className="text-sm md:text-base font-medium"></p>
            </div>
          </div>
        </div>

        {/* Chart Section */}

        {/* About Coin */}
        <div className="p-4 mt-6 bg-slate-200 dark:bg-gray-800 rounded-md text-wrap overflow-hidden">
          <div className="flex items-center gap-2">
            <p className="text-base md:text-xl font-semibold"></p>
          </div>
          <p className="text-sm md:text-base mt-2"></p>
        </div>

        {/* Docs & Whitepapers */}
        <div className="grid gap-2 p-3 mt-6 dark:bg-gray-900 rounded-md">
          <Link
            target="blank"
            className="flex justify-between items-center p-2 rounded-sm text-sm  md:text-base hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            href="/"
          ></Link>
          <Link
            target="blank"
            className="flex justify-between items-center p-2 rounded-sm text-sm  md:text-base hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            href="/"
          ></Link>
          <Link
            target="blank"
            className="flex justify-between items-center p-2 rounded-sm text-sm  md:text-base hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            href="/"
          ></Link>
        </div>
      </div>
    </div>
  );
};

export default CurrencyDetailShimmer;
