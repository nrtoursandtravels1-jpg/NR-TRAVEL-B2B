import { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle,
  Clock3,
  FileText,
  Hotel,
  Plane,
  Bus,
  Car,
  Users,
  TrendingUp,
} from "lucide-react";

import { supabase } from "../../services/supabase";

export default function OperationsDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingOperations: 0,
    confirmedTrips: 0,
    upcomingDepartures: 0,
    flights: 0,
    hotels: 0,
    buses: 0,
    cabs: 0,
    vendors: 0,
    documents: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOperations();
  }, []);

  async function loadOperations() {
    setLoading(true);

    try {
      const results = await Promise.all([
        supabase.from("bookings").select("*"),
        supabase.from("flight_bookings").select("*"),
        supabase.from("hotel_bookings").select("*"),
        supabase.from("bus_bookings").select("*"),
        supabase.from("cab_bookings").select("*"),
        supabase.from("vendors").select("*"),
        supabase.from("documents").select("*"),
      ]);

      const [
        bookingsResult,
        flightsResult,
        hotelsResult,
        busesResult,
        cabsResult,
        vendorsResult,
        documentsResult,
      ] = results;

      const bookings = bookingsResult.data || [];
      const flights = flightsResult.data || [];
      const hotels = hotelsResult.data || [];
      const buses = busesResult.data || [];
      const cabs = cabsResult.data || [];
      const vendors = vendorsResult.data || [];
      const documents = documentsResult.data || [];

      const allBookings = [
        ...bookings,
        ...flights,
        ...hotels,
        ...buses,
        ...cabs,
      ];

      const pendingOperations = allBookings.filter((item) => {
        const status =
          item.booking_status ||
          item.status ||
          item.payment_status ||
          "";

        return ["Pending", "pending", "Waiting", "waiting"].includes(
          status
        );
      }).length;

      const confirmedTrips = allBookings.filter((item) => {
        const status = item.booking_status || item.status || "";

        return ["Confirmed", "confirmed", "Accepted", "accepted"].includes(
          status
        );
      }).length;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const upcomingDepartures = allBookings.filter((item) => {
        const date =
          item.journey_date ||
          item.departure_date ||
          item.check_in ||
          item.travel_date;

        if (!date) return false;

        const departure = new Date(date);
        departure.setHours(0, 0, 0, 0);

        return departure >= today;
      }).length;

      setStats({
        totalBookings: allBookings.length,
        pendingOperations,
        confirmedTrips,
        upcomingDepartures,
        flights: flights.length,
        hotels: hotels.length,
        buses: buses.length,
        cabs: cabs.length,
        vendors: vendors.length,
        documents: documents.length,
      });
    } catch (error) {
      console.error("Operations Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  }

  const statCards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: <CalendarDays size={28} />,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Pending Operations",
      value: stats.pendingOperations,
      icon: <Clock3 size={28} />,
      bg: "bg-orange-50",
      text: "text-orange-600",
    },
    {
      title: "Confirmed Trips",
      value: stats.confirmedTrips,
      icon: <CheckCircle size={28} />,
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "Upcoming Departures",
      value: stats.upcomingDepartures,
      icon: <TrendingUp size={28} />,
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
  ];

  const serviceCards = [
    {
      title: "Flights",
      value: stats.flights,
      icon: <Plane size={24} />,
      color: "text-blue-600",
    },
    {
      title: "Hotels",
      value: stats.hotels,
      icon: <Hotel size={24} />,
      color: "text-indigo-600",
    },
    {
      title: "Bus",
      value: stats.buses,
      icon: <Bus size={24} />,
      color: "text-orange-600",
    },
    {
      title: "Cab",
      value: stats.cabs,
      icon: <Car size={24} />,
      color: "text-green-600",
    },
    {
      title: "Vendors",
      value: stats.vendors,
      icon: <Users size={24} />,
      color: "text-purple-600",
    },
    {
      title: "Documents",
      value: stats.documents,
      icon: <FileText size={24} />,
      color: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Operations Control Center
        </h1>

        <p className="mt-2 text-slate-500">
          NR Travel Operations Management
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {loading ? "..." : card.value}
                </h2>
              </div>

              <div
                className={`rounded-xl p-3 ${card.bg} ${card.text}`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Overview */}
      <div className="mt-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">
            Service Operations
          </h2>

          <p className="text-sm text-slate-500">
            Current booking and operational workload
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {serviceCards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className={`${card.color} mb-3`}>
                {card.icon}
              </div>

              <p className="text-sm text-slate-500">
                {card.title}
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                {loading ? "..." : card.value}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Operations Status */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Operations Summary
          </h2>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-slate-600">
                Total operational bookings
              </span>

              <strong className="text-slate-900">
                {stats.totalBookings}
              </strong>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-slate-600">
                Pending operations
              </span>

              <strong className="text-orange-600">
                {stats.pendingOperations}
              </strong>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-slate-600">
                Confirmed trips
              </span>

              <strong className="text-green-600">
                {stats.confirmedTrips}
              </strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-600">
                Upcoming departures
              </span>

              <strong className="text-purple-600">
                {stats.upcomingDepartures}
              </strong>
            </div>
          </div>
        </div>

        {/* Quick Operations */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Operations Workflow
          </h2>

          <div className="mt-5 space-y-3">
            <div className="rounded-xl bg-blue-50 p-4">
              <p className="font-semibold text-blue-700">
                1. Booking Received
              </p>

              <p className="mt-1 text-sm text-blue-600">
                New customer booking enters operations.
              </p>
            </div>

            <div className="rounded-xl bg-orange-50 p-4">
              <p className="font-semibold text-orange-700">
                2. Pending Confirmation
              </p>

              <p className="mt-1 text-sm text-orange-600">
                Team coordinates hotels, transport and vendors.
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <p className="font-semibold text-green-700">
                3. Trip Confirmed
              </p>

              <p className="mt-1 text-sm text-green-600">
                Booking is confirmed and ready for travel.
              </p>
            </div>

            <div className="rounded-xl bg-purple-50 p-4">
              <p className="font-semibold text-purple-700">
                4. Departure
              </p>

              <p className="mt-1 text-sm text-purple-600">
                Monitor upcoming departures and trip execution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
