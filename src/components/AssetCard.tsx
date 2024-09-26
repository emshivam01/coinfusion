import { useEffect } from "react";

interface AssetCardProps {
  assetName: string;
  averagePrice: number;
  quantity: number;
  symbol: string;
}

const AssetCard = ({
  assetName,
  averagePrice,
  quantity,
  symbol,
}: AssetCardProps) => {
  return (
    <div className="flex justify-between w-full my-10 border px-8 py-4 rounded-md">
      <div className="flex justify-between">
        <h2>{assetName}</h2>
        <p>{symbol}</p>
      </div>
      <div>
        <p>${(averagePrice * quantity).toFixed(1)}</p>{" "}
        {/* Display total value */}
      </div>
      <div className="flex justify-between">
        <p>${averagePrice.toFixed(2)}</p> {/* Display price per unit */}
        <p>
          {quantity.toFixed(2)} {symbol}
        </p>{" "}
        {/* Use the symbol for quantity display */}
      </div>
      <div>
        <p>${(averagePrice * quantity).toFixed(2)}</p>{" "}
        {/* Total value again for clarity */}
      </div>
    </div>
  );
};

export default AssetCard;
