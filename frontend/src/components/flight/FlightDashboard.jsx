import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function FlightDashboard({ refresh }) {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    paidBookings: 0,
    pendingPayments: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, [refresh]);

  async function loadDashboard() {
    const { data, error } = await supabase
      .from("flight_bookings")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    const totalBookings = data.length;

    const totalRevenue = data.reduce(
      (sum, item) => sum + Number(item.fare || 0),
      0
    );

    const paidBookings = data.filter(
      (item) => item.payment_status === "Paid"
    ).length;

    const pendingPayments = data.filter(
      (item) => item.payment_status === "Pending"
    ).length;

    setStats({
      totalBookings,
      totalRevenue,
      paidBookings,
      pendingPayments,
    });
  }

  const cardStyle = {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,.08)",
    textAlign: "center",
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
      <div style={cardStyle}>
        <h3>Total Flight Bookings</h3>
        <h1>{stats.totalBookings}</h1>
      </div>

      <div style={cardStyle}>
        <h3>Total Revenue</h3>
        <h1>₹ {stats.totalRevenue}</h1>
      </div>

      <div style={cardStyle}>
        <h3>Paid Bookings</h3>
        <h1>{stats.paidBookings}</h1>
      </div>

      <div style={cardStyle}>
        <h3>Pending Payments</h3>
        <h1>{stats.pendingPayments}</h1>
      </div>
    </div>
  );
}