"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Chart = ({ id, days }: { id: string; days: string }) => {
  const [data, setData] = useState<{ time: string; price: number }[]>([]);

  const fetchHistoricalChartData = async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
      );

      // Transform the data to make it compatible with the chart
      const processedData = response.data.prices.map(
        (item: [number, number]) => ({
          Time: new Date(item[0]).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }), // Convert timestamp
          Price: Math.floor(item[1]), // Price
        })
      );

      setData(processedData);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  useEffect(() => {
    fetchHistoricalChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, days]);

  return (
    <div className="p-2 flex flex-col items-center gap-4">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Time" />
          <YAxis
            domain={["auto", "auto"]}
            padding={{ top: 20, bottom: 20 }}
            stroke="#8884d8"
            fontSize={14}
            tickLine={{ stroke: "#ccc", strokeWidth: 1 }}
          />

          <Tooltip itemStyle={{ fontSize: 15, borderRadius: 10 }} />
          <Line type="linear" dataKey="Price" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex justify-between w-40 border dark:bg-gray-800 rounded-md p-1">
        <button className="w-full px-2 py-1 rounded-sm hover:bg-gray-600 dark:hover:bg-gray-700 border-r ">
          1d
        </button>
        <button className="w-full px-2 py-1 rounded-sm hover:bg-gray-600 dark:hover:bg-gray-700 border-r ">
          7d
        </button>
        <button className="w-full px-2 py-1 rounded-sm hover:bg-gray-600 dark:hover:bg-gray-700 border-r">
          365d
        </button>
      </div>
    </div>
  );
};

export default Chart;
