import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function FlightDashboard({ refresh }) {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    paidBookings: 0,
    pendingPayments: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, [refresh]);

  async function loadDashboard() {
    setLoading(true);

    const { data, error } = await supabase
      .from("flight_bookings")
      .select("*");

    if (error) {
      console.error("FLIGHT DASHBOARD ERROR:", error);
      setLoading(false);
      return;
    }

    const bookings = data || [];

    const totalBookings = bookings.length;

    const totalRevenue = bookings.reduce(
      (sum, item) => sum + Number(item.fare || 0),
      0
    );

    const paidBookings = bookings.filter(
      (item) => item.payment_status === "Paid"
    ).length;

    const pendingPayments = bookings.filter(
      (item) => item.payment_status === "Pending"
    ).length;

    setStats({
      totalBookings,
      totalRevenue,
      paidBookings,
      pendingPayments,
    });

    setLoading(false);
  }

  const cardStyle = {
    background: "#ffffff",
    padding: "22px",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      {/* TOTAL BOOKINGS */}

      <div style={cardStyle}>
        <div
          style={{
            fontSize: "30px",
            marginBottom: "8px",
          }}
        >
          ✈️
        </div>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          Total Flight Bookings
        </p>

        <h1
          style={{
            margin: "8px 0 0",
            fontSize: "30px",
            color: "#0f172a",
          }}
        >
          {loading ? "..." : stats.totalBookings}
        </h1>
      </div>

      {/* REVENUE */}

      <div style={cardStyle}>
        <div
          style={{
            fontSize: "30px",
            marginBottom: "8px",
          }}
        >
          💰
        </div>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          Total Revenue
        </p>

        <h1
          style={{
            margin: "8px 0 0",
            fontSize: "30px",
            color: "#16a34a",
          }}
        >
          ₹{" "}
          {loading
            ? "..."
            : stats.totalRevenue.toLocaleString("en-IN")}
        </h1>
      </div>

      {/* PAID */}

      <div style={cardStyle}>
        <div
          style={{
            fontSize: "30px",
            marginBottom: "8px",
          }}
        >
          ✅
        </div>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          Paid Bookings
        </p>

        <h1
          style={{
            margin: "8px 0 0",
            fontSize: "30px",
            color: "#2563eb",
          }}
        >
          {loading ? "..." : stats.paidBookings}
        </h1>
      </div>

      {/* PENDING */}

      <div style={cardStyle}>
        <div
          style={{
            fontSize: "30px",
            marginBottom: "8px",
          }}
        >
          ⏳
        </div>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          Pending Payments
        </p>

        <h1
          style={{
            margin: "8px 0 0",
            fontSize: "30px",
            color: "#dc2626",
          }}
        >
          {loading ? "..." : stats.pendingPayments}
        </h1>
      </div>
    </div>
  );
}