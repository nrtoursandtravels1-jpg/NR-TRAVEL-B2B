import { useEffect, useState } from "react";
import {
  CalendarCheck,
  IndianRupee,
  Wallet,
  BadgeCheck,
} from "lucide-react";
import { supabase } from "../../services/supabase";

export default function BookingCards() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    completedTours: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    const totalBookings = data.length;

    const totalRevenue = data.reduce(
      (sum, booking) =>
        sum + Number(booking.total_amount || 0),
      0
    );

    const pendingPayments = data.reduce(
      (sum, booking) =>
        booking.payment_status !== "Paid"
          ? sum + Number(booking.balance_amount || 0)
          : sum,
      0
    );

    const completedTours = data.filter(
      (booking) =>
        booking.booking_status === "Completed"
    ).length;

    setStats({
      totalBookings,
      totalRevenue,
      pendingPayments,
      completedTours,
    });
  }

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
      <Card
        title="Total Bookings"
        value={stats.totalBookings}
        color="#2563eb"
         icon={<CalendarCheck size={34} color="#2563eb" />}
      />

      <Card
        title=" Revenue"
        value={`₹ ${stats.totalRevenue.toLocaleString()}`}
        color="#16a34a"
        icon={<IndianRupee size={34} color="#16a34a" />}
      />

      <Card
        title=" Pending Payment"
        value={`₹ ${stats.pendingPayments.toLocaleString()}`}
        color="#f59e0b"
         icon={<Wallet size={34} color="#f59e0b" />}
      />

      <Card
        title=" Completed Tours"
        value={stats.completedTours}
        color="#7c3aed"
         icon={<BadgeCheck size={34} color="#7c3aed" />}
      />
    </div>
  );
}

function Card({
  title,
  value,
  color,
  icon,
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h4
          style={{
            color: "#64748b",
            marginBottom: "10px",
          }}
        >
          {title}
        </h4>

        <h2
          style={{
            color,
            fontSize: "30px",
            fontWeight: "700",
          }}
        >
          {value}
        </h2>
      </div>

      {icon}
    </div>
  );
}