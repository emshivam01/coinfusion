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

const Chart = ({ id }: { id: string }) => {
  const [data, setData] = useState<{ time: string; price: number }[]>([]);
  const [filter, setFilter] = useState("1d");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHistoricalChartData = async () => {
    setLoading(true); // Show loading when fetching data
    setError("");
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${filter}`
      );

      const processedData = response.data.prices.map(
        (item: [number, number]) => ({
          Time: new Date(item[0]).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          Price: Math.floor(item[1]),
        })
      );

      setData(processedData);
    } catch (err) {
      setError("Failed to load data");
      console.error("Error fetching historical data:", err);
    } finally {
      setLoading(false); // Stop loading after data is fetched
    }
  };

  useEffect(() => {
    fetchHistoricalChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, filter]);

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  return (
    <div className="p-2 flex flex-col items-center gap-4">
      <ResponsiveContainer width="100%" height={400}>
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            {/* Simple spinner while maintaining layout */}
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
          </div>
        ) : error ? (
          <p className="text-red-500">Error loading chart data</p>
        ) : (
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
        )}
      </ResponsiveContainer>

      <div className="flex justify-between w-40 border bg-[#eff2f5] dark:bg-gray-800 rounded-md p-1">
        {["1d", "7d", "365d"].map((period) => (
          <button
            key={period}
            onClick={() => handleFilterChange(period)}
            className={`w-full px-2 py-1 rounded-sm hover:bg-gray-300 dark:hover:bg-gray-700 ${
              filter === period ? "bg-gray-300 dark:bg-gray-700" : ""
            }`}
            value={period}
            aria-label={`Show data for ${period}`}
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chart;
