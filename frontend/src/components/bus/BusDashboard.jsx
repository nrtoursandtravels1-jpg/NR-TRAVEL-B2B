import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function BusDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    revenue: 0,
    pending: 0,
    confirmed: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);

    const { data, error } = await supabase
      .from("bus_bookings")
      .select("*");

    if (error) {
      console.error("BUS DASHBOARD ERROR:", error);
      setLoading(false);
      return;
    }

    const bookings = data || [];

    const total = bookings.length;

    const revenue = bookings.reduce(
      (sum, item) => sum + Number(item.fare || 0),
      0
    );

    const pending = bookings.filter(
      (item) =>
        String(item.payment_status || "").toLowerCase() ===
        "pending"
    ).length;

    const confirmed = bookings.filter(
      (item) =>
        String(item.booking_status || "").toLowerCase() ===
        "confirmed"
    ).length;

    setStats({
      total,
      revenue,
      pending,
      confirmed,
    });

    setLoading(false);
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        marginBottom: "25px",
      }}
    >
      {/* TOTAL BOOKINGS */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "14px",
          padding: "22px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          border: "1px solid #e2e8f0",
        }}
      >
        <p
          style={{
            color: "#64748b",
            marginBottom: "8px",
            fontSize: "14px",
          }}
        >
          Total Bookings
        </p>

        <h2
          style={{
            fontSize: "30px",
            fontWeight: "700",
            color: "#0f172a",
            margin: 0,
          }}
        >
          {loading ? "..." : stats.total}
        </h2>
      </div>

      {/* REVENUE */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "14px",
          padding: "22px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          border: "1px solid #e2e8f0",
        }}
      >
        <p
          style={{
            color: "#64748b",
            marginBottom: "8px",
            fontSize: "14px",
          }}
        >
          Total Revenue
        </p>

        <h2
          style={{
            fontSize: "30px",
            fontWeight: "700",
            color: "#16a34a",
            margin: 0,
          }}
        >
          {loading
            ? "..."
            : `₹ ${stats.revenue.toLocaleString("en-IN")}`}
        </h2>
      </div>

      {/* PENDING */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "14px",
          padding: "22px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          border: "1px solid #e2e8f0",
        }}
      >
        <p
          style={{
            color: "#64748b",
            marginBottom: "8px",
            fontSize: "14px",
          }}
        >
          Pending Payments
        </p>

        <h2
          style={{
            fontSize: "30px",
            fontWeight: "700",
            color: "#f59e0b",
            margin: 0,
          }}
        >
          {loading ? "..." : stats.pending}
        </h2>
      </div>

      {/* CONFIRMED */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "14px",
          padding: "22px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          border: "1px solid #e2e8f0",
        }}
      >
        <p
          style={{
            color: "#64748b",
            marginBottom: "8px",
            fontSize: "14px",
          }}
        >
          Confirmed Trips
        </p>

        <h2
          style={{
            fontSize: "30px",
            fontWeight: "700",
            color: "#2563eb",
            margin: 0,
          }}
        >
          {loading ? "..." : stats.confirmed}
        </h2>
      </div>
    </div>
  );
}