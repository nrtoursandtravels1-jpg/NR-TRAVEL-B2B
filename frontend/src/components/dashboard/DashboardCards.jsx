import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function DashboardCards() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalHotels: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  async function fetchDashboardStats() {
    setLoading(true);

    try {
      const [
        leadResult,
        hotelResult,
        bookingResult,
      ] = await Promise.all([
        supabase
          .from("leads")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("hotels")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("bookings")
          .select("*", {
            count: "exact",
            head: true,
          }),
      ]);

      setStats({
        totalLeads: leadResult.count || 0,
        totalHotels: hotelResult.count || 0,
        totalBookings: bookingResult.count || 0,
        totalRevenue: 0,
      });
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  const cards = [
    {
      title: "Total Leads",
      value: stats.totalLeads,
    },
    {
      title: "Hotels",
      value: stats.totalHotels,
    },
    {
      title: "Bookings",
      value: stats.totalBookings,
    },
    {
      title: "Revenue",
      value: `₹${stats.totalRevenue}`,
    },
  ];

  if (loading) {
    return <h3>Loading Dashboard...</h3>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h2>{card.value}</h2>

          <p>{card.title}</p>
        </div>
      ))}
    </div>
  );
}