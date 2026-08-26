import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", revenue: 120000 },
  { month: "Feb", revenue: 150000 },
  { month: "Mar", revenue: 180000 },
  { month: "Apr", revenue: 220000 },
  { month: "May", revenue: 260000 },
  { month: "Jun", revenue: 310000 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            📈 Revenue Analytics
          </h2>

          <p className="text-slate-500 mt-1">
            Monthly Business Growth
          </p>
        </div>

        <div className="bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-full">
          +18.4%
        </div>

      </div>

      <div className="h-[260px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `₹${value / 1000}K`}
            />

            <Tooltip
              formatter={(value) =>
                `₹${Number(value).toLocaleString()}`
              }
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}