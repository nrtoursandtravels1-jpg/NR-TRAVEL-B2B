import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import StatCard from "../ui/StatCard";

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
        supabase.from("tour_packages").select("*", { count: "exact", head: true }),
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
      color: "bg-blue-600",
    },
    {
      title: "🏨 Hotels",
      value: stats.hotels,
      color: "bg-green-600",
    },
    {
      title: "🧳 Tour Packages",
      value: stats.packages,
      color: "bg-purple-600",
    },
    {
      title: "🚌 Bus Bookings",
      value: stats.buses,
      color: "bg-orange-500",
    },
    {
      title: "🚗 Cab Bookings",
      value: stats.cabs,
      color: "bg-cyan-600",
    },
    {
      title: "📅 Total Bookings",
      value: stats.bookings,
      color: "bg-red-600",
    },
    {
      title: "💰 Revenue",
      value: `₹ ${stats.revenue.toLocaleString("en-IN")}`,
      color: "bg-green-600",
    },
  ];

  if (loading) {
    return <h3>Loading Dashboard...</h3>;
  }

  return (
 <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
 {cards.map((card) => (
  <StatCard
    key={card.title}
    title={card.title}
    value={card.value}
    color={card.color}
    icon={card.title.split(" ")[0]}
  />
))}
    </div>
  );
}