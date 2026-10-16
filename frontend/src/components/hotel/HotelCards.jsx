import { useEffect, useState } from "react";
import {
  Building2,
  CheckCircle2,
  XCircle,
  MapPin,
  Loader2,
} from "lucide-react";
import { supabase } from "../../services/supabase";

export default function HotelCards() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    cities: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotelStats();
  }, []);

  async function fetchHotelStats() {
    setLoading(true);

    const { data, error } = await supabase
      .from("hotels")
      .select("id, status, city");

    if (error) {
      console.error("Hotel Stats Error:", error);
      setLoading(false);
      return;
    }

    const hotels = data || [];

    const uniqueCities = new Set(
      hotels
        .map((hotel) => hotel.city)
        .filter(Boolean)
    );

    setStats({
      total: hotels.length,

      active: hotels.filter(
        (hotel) =>
          String(hotel.status).toLowerCase() === "active"
      ).length,

      inactive: hotels.filter(
        (hotel) =>
          String(hotel.status).toLowerCase() === "inactive"
      ).length,

      cities: uniqueCities.size,
    });

    setLoading(false);
  }

  const cards = [
    {
      title: "Total Hotels",
      value: stats.total,
      icon: Building2,
      iconBg: "bg-blue-600",
      valueColor: "text-slate-900",
    },
    {
      title: "Active Hotels",
      value: stats.active,
      icon: CheckCircle2,
      iconBg: "bg-emerald-600",
      valueColor: "text-emerald-600",
    },
    {
      title: "Inactive Hotels",
      value: stats.inactive,
      icon: XCircle,
      iconBg: "bg-red-600",
      valueColor: "text-red-600",
    },
    {
      title: "Cities Covered",
      value: stats.cities,
      icon: MapPin,
      iconBg: "bg-purple-600",
      valueColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between gap-4">

              {/* =================================================
                  TEXT
              ================================================= */}
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                {loading ? (
                  <div className="mt-3">
                    <Loader2
                      size={27}
                      className="animate-spin text-slate-400"
                    />
                  </div>
                ) : (
                  <h2
                    className={`mt-2 text-4xl font-extrabold tracking-tight ${card.valueColor}`}
                  >
                    {card.value}
                  </h2>
                )}
              </div>

              {/* =================================================
                  ICON
              ================================================= */}
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${card.iconBg} shadow-md transition-transform duration-300 group-hover:scale-105`}
              >
                <Icon
                  size={28}
                  className="text-white"
                />
              </div>

            </div>

            {/* Bottom indicator */}
            <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
              <span
                className={`h-1.5 w-1.5 rounded-full ${card.iconBg}`}
              />

              Hotel management overview
            </div>
          </div>
        );
      })}
    </div>
  );
}