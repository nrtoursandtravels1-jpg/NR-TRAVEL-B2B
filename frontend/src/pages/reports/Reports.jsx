import { useEffect, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  IndianRupee,
  RefreshCw,
  TrendingUp,
  Users,
  CheckCircle,
  Clock3,
} from "lucide-react";

import { supabase } from "../../services/supabase";

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [stats, setStats] = useState({
    totalBookings: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalLeads: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports(isRefresh = false) {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const [
        bookingsResult,
        customersResult,
        leadsResult,
      ] = await Promise.all([
        supabase
          .from("bookings")
          .select("*"),

        supabase
          .from("customers")
          .select("*"),

        supabase
          .from("leads")
          .select("*"),
      ]);

      if (bookingsResult.error) {
        console.error(
          "Bookings Report Error:",
          bookingsResult.error
        );
      }

      if (customersResult.error) {
        console.error(
          "Customers Report Error:",
          customersResult.error
        );
      }

      if (leadsResult.error) {
        console.error(
          "Leads Report Error:",
          leadsResult.error
        );
      }

      const bookings = bookingsResult.data || [];
      const customers = customersResult.data || [];
      const leads = leadsResult.data || [];

      const confirmedBookings = bookings.filter((booking) => {
        const status = String(
          booking.status ||
            booking.booking_status ||
            ""
        ).toLowerCase();

        return [
          "confirmed",
          "accepted",
          "completed",
        ].includes(status);
      });

      const pendingBookings = bookings.filter((booking) => {
        const status = String(
          booking.status ||
            booking.booking_status ||
            ""
        ).toLowerCase();

        return [
          "pending",
          "waiting",
          "processing",
        ].includes(status);
      });

      const cancelledBookings = bookings.filter((booking) => {
        const status = String(
          booking.status ||
            booking.booking_status ||
            ""
        ).toLowerCase();

        return [
          "cancelled",
          "canceled",
          "rejected",
        ].includes(status);
      });

      const totalRevenue = bookings.reduce(
        (total, booking) => {
          const status = String(
            booking.status ||
              booking.booking_status ||
              ""
          ).toLowerCase();

          if (
            ![
              "confirmed",
              "accepted",
              "completed",
            ].includes(status)
          ) {
            return total;
          }

          const amount =
            booking.total_amount ??
            booking.amount ??
            booking.final_amount ??
            booking.price ??
            0;

          return total + Number(amount || 0);
        },
        0
      );

      const conversionRate =
        leads.length > 0
          ? (confirmedBookings.length / leads.length) * 100
          : 0;

      setStats({
        totalBookings: bookings.length,
        confirmedBookings: confirmedBookings.length,
        pendingBookings: pendingBookings.length,
        cancelledBookings: cancelledBookings.length,
        totalRevenue,
        totalCustomers: customers.length,
        totalLeads: leads.length,
        conversionRate,
      });
    } catch (error) {
      console.error(
        "Reports Dashboard Error:",
        error
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function formatCurrency(value) {
    return Number(value || 0).toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 0,
      }
    );
  }

  const reportCards = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: CalendarDays,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Confirmed Bookings",
      value: stats.confirmedBookings,
      icon: CheckCircle,
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "Pending Bookings",
      value: stats.pendingBookings,
      icon: Clock3,
      bg: "bg-orange-50",
      text: "text-orange-600",
    },
    {
      title: "Cancelled",
      value: stats.cancelledBookings,
      icon: BarChart3,
      bg: "bg-red-50",
      text: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      {/* HEADER */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Business Intelligence
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Reports & Analytics
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Monitor bookings, revenue, customers and business performance.
          </p>
        </div>

        <button
          type="button"
          onClick={() => loadReports(true)}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={
              refreshing ? "animate-spin" : ""
            }
          />

          Refresh
        </button>

      </div>


      {/* MAIN REPORT CARDS */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {reportCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                    {loading ? "..." : card.value}
                  </h2>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.bg} ${card.text}`}
                >
                  <Icon size={24} />
                </div>

              </div>
            </div>
          );
        })}

      </div>


      {/* BUSINESS OVERVIEW */}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* REVENUE */}

        <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-300">
                Total Revenue
              </p>

              <h2 className="mt-2 text-3xl font-extrabold">
                ₹
                {loading
                  ? "..."
                  : formatCurrency(
                      stats.totalRevenue
                    )}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <IndianRupee size={24} />
            </div>

          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-green-300">
            <TrendingUp size={16} />
            Revenue from confirmed bookings
          </div>

        </div>


        {/* CUSTOMERS */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Total Customers
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                {loading
                  ? "..."
                  : stats.totalCustomers}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Users size={24} />
            </div>

          </div>

          <p className="mt-5 text-sm text-slate-400">
            Customers registered in the CRM
          </p>

        </div>


        {/* CONVERSION */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Lead Conversion
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                {loading
                  ? "..."
                  : `${stats.conversionRate.toFixed(
                      1
                    )}%`}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <TrendingUp size={24} />
            </div>

          </div>

          <p className="mt-5 text-sm text-slate-400">
            Confirmed bookings compared with leads
          </p>

        </div>

      </div>


      {/* PERFORMANCE SUMMARY */}

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <BarChart3 size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Business Performance
            </h2>

            <p className="text-sm text-slate-500">
              Current CRM performance overview
            </p>
          </div>

        </div>


        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

          <PerformanceRow
            label="Confirmed"
            value={stats.confirmedBookings}
            total={stats.totalBookings}
            className="bg-green-500"
          />

          <PerformanceRow
            label="Pending"
            value={stats.pendingBookings}
            total={stats.totalBookings}
            className="bg-orange-500"
          />

          <PerformanceRow
            label="Cancelled"
            value={stats.cancelledBookings}
            total={stats.totalBookings}
            className="bg-red-500"
          />

        </div>

      </div>

    </div>
  );
}


/* ==========================================
   PERFORMANCE ROW
========================================== */

function PerformanceRow({
  label,
  value,
  total,
  className,
}) {
  const percentage =
    total > 0
      ? Math.min((value / total) * 100, 100)
      : 0;

  return (
    <div className="rounded-xl bg-slate-50 p-4">

      <div className="flex items-center justify-between">

        <span className="text-sm font-semibold text-slate-700">
          {label}
        </span>

        <span className="text-sm font-bold text-slate-900">
          {value}
        </span>

      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">

        <div
          className={`h-full rounded-full ${className}`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <p className="mt-2 text-xs text-slate-400">
        {percentage.toFixed(1)}% of total bookings
      </p>

    </div>
  );
}