import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
} from "recharts";

const performanceData = [
  { date: "Jan", value: 10000, profit: 0 },
  { date: "Feb", value: 12000, profit: 2000 },
  { date: "Mar", value: 11000, profit: 1000 },
  { date: "Apr", value: 13000, profit: 3000 },
  { date: "May", value: 14000, profit: 4000 },
  { date: "Jun", value: 13500, profit: 3500 },
  { date: "Jul", value: 15234.56, profit: 5234.56 },
];

const portfolioData = [
  { name: "Bitcoin", value: 8000, color: "#F7931A", amount: 0.5, price: 16000 },
  { name: "Ethereum", value: 4000, color: "#627EEA", amount: 2.5, price: 1600 },
  { name: "Cardano", value: 2000, color: "#0033AD", amount: 1000, price: 2 },
  {
    name: "Polkadot",
    value: 1234.56,
    color: "#E6007A",
    amount: 100,
    price: 12.35,
  },
];

const Overview = () => {
  return (
    <div className="grid gap-4 w-full ">
      {/* Value & Statistics */}

      <div className="  py-2 flex md:flex-col  justify-evenly bg-[#f4f4f5] dark:bg-[#1f2937] text-white dark:text-white p-4 w-full rounded-md  shadow-md">
        <div className="p-3  bg-gradient-to-br from-blue-600 to-blue-700 border-blue-500  rounded-md shadow-xl ">
          <p className="mb-2 text-lg font-semibold">Portfolio Value</p>
          <p className="text-2xl font-bold"> $ 20,254</p>
        </div>
        <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 border-blue-500  rounded-md shadow-xl">
          <p className="my-2  text-lg font-semibold">Best Performer</p>
          <p className="text-2xl font-bold"> EigenLayer</p>
        </div>
        <div className="p-3 bg-gradient-to-br from-red-600 to-red-700 border-red-500 rounded-md shadow-xl">
          <p className="my-2  text-lg font-semibold ">Worst Performer</p>
          <p className="text-2xl font-bold"> Arbitrium</p>
        </div>
      </div>

      {/* Performance Chart */}

      <div className=" py-1 bg-[#f4f4f5] dark:bg-[#1f2937]  p-4 w-full rounded-md shadow-md">
        <p className="mb-6 mt-2 text-lg font-semibold">Portfolio Performance</p>
        <div className="w-full flex items-center justify-center h-[300px]  ">
          <p className="mb-10 text-xl font-semibold z-10 dark:text-white">
            Coming Soon
          </p>
        </div>

        {/* <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "none",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer> */}
      </div>

      {/* Portfolio Allocation Chart */}

      <div className=" py-1 bg-[#f4f4f5] dark:bg-[#1f2937] p-4 w-full rounded-md shadow-md">
        <p className="mb-6 mt-2 text-lg font-semibold">Portfolio Allocation</p>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={portfolioData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {portfolioData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "none",
                borderRadius: "8px",
              }}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;
