import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function DashboardCards() {
  const [stats, setStats] = useState({
    leads: 0,
    hotels: 0,
    packages: 0,
    buses: 0,
    cabs: 0,
    bookings: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);

    try {
      const [
        leadRes,
        hotelRes,
        packageRes,
        busRes,
        cabRes,
        bookingRes,
      ] = await Promise.all([
        supabase.from("leads").select("*", { count: "exact", head: true }),
        supabase.from("hotels").select("*", { count: "exact", head: true }),
        supabase.from("packages").select("*", { count: "exact", head: true }),
        supabase.from("bus_bookings").select("*"),
        supabase.from("cab_bookings").select("*"),
        supabase.from("bookings").select("*", { count: "exact", head: true }),
      ]);

      const busRevenue =
        busRes.data?.reduce(
          (sum, item) => sum + Number(item.fare || 0),
          0
        ) || 0;

      const cabRevenue =
        cabRes.data?.reduce(
          (sum, item) => sum + Number(item.amount || 0),
          0
        ) || 0;

      setStats({
        leads: leadRes.count || 0,
        hotels: hotelRes.count || 0,
        packages: packageRes.count || 0,
        buses: busRes.data?.length || 0,
        cabs: cabRes.data?.length || 0,
        bookings: bookingRes.count || 0,
        revenue: busRevenue + cabRevenue,
      });
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  const cards = [
    {
      title: "👥 Total Leads",
      value: stats.leads,
      color: "#2563eb",
    },
    {
      title: "🏨 Hotels",
      value: stats.hotels,
      color: "#16a34a",
    },
    {
      title: "📦 Packages",
      value: stats.packages,
      color: "#9333ea",
    },
    {
      title: "🚌 Bus Bookings",
      value: stats.buses,
      color: "#ea580c",
    },
    {
      title: "🚗 Cab Bookings",
      value: stats.cabs,
      color: "#0891b2",
    },
    {
      title: "📅 Total Bookings",
      value: stats.bookings,
      color: "#dc2626",
    },
    {
      title: "💰 Revenue",
      value: `₹ ${stats.revenue}`,
      color: "#15803d",
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
          "repeat(auto-fit,minmax(230px,1fr))",
        gap: "20px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "25px",
            boxShadow: "0 8px 25px rgba(0,0,0,.08)",
            borderTop: `5px solid ${card.color}`,
          }}
        >
          <h3
            style={{
              color: "#64748b",
              marginBottom: "12px",
            }}
          >
            {card.title}
          </h3>

          <h1
            style={{
              margin: 0,
              color: "#0f172a",
              fontSize: "34px",
            }}
          >
            {card.value}
          </h1>
        </div>
      ))}
    </div>
  );
}