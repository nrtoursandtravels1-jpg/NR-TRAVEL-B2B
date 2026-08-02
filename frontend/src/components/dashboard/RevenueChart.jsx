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
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "25px",
        marginTop: "30px",
        boxShadow: "0 10px 25px rgba(15,23,42,.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: "#0f172a",
            }}
          >
            📈 Revenue Analytics
          </h2>

          <p
            style={{
              marginTop: "8px",
              color: "#64748b",
            }}
          >
            Monthly business growth
          </p>
        </div>

        <div
          style={{
            background: "#DCFCE7",
            color: "#166534",
            padding: "8px 16px",
            borderRadius: "999px",
            fontWeight: "700",
          }}
        >
            +18.4%
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 4" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2563EB"
            strokeWidth={4}
            dot={{
              r: 5,
              fill: "#2563EB",
            }}
            activeDot={{
              r: 8,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}