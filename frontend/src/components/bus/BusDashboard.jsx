import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function BusDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    revenue: 0,
    pending: 0,
    confirmed: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const { data, error } = await supabase
      .from("bus_bookings")
      .select("*");

    if (error) return;

    const total = data.length;

    const revenue = data.reduce(
      (sum, item) => sum + Number(item.fare || 0),
      0
    );

    const pending = data.filter(
      (item) => item.payment_status === "Pending"
    ).length;

    const confirmed = data.filter(
      (item) => item.booking_status === "Confirmed"
    ).length;

    setStats({
      total,
      revenue,
      pending,
      confirmed,
    });
  }

  return (
    <div className="grid grid-cols-4 gap-5 mb-6">

      <div className="bg-white rounded-xl shadow p-5">
        <h3>Total Bookings</h3>
        <h1>{stats.total}</h1>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h3>Total Revenue</h3>
        <h1>₹ {stats.revenue}</h1>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h3>Pending Payments</h3>
        <h1>{stats.pending}</h1>
      </div>

      <div className="bg-white rounded-xl shadow p-5">
        <h3>Confirmed Trips</h3>
        <h1>{stats.confirmed}</h1>
      </div>

    </div>
  );
}