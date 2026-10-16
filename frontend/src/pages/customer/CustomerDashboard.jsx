import { useEffect, useState } from "react";
import {
  Search,
  CalendarCheck,
  Heart,
  Wallet,
  ClipboardList,
  ArrowUpRight,
  MapPin,
  Clock3,
  RefreshCw,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { supabase } from "../../services/supabase";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/ui/Loader";

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("Customer");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    bookings: 0,
    wishlist: 0,
    wallet: 0,
    inquiries: 0,
  });

  const [upcomingTour, setUpcomingTour] = useState(null);

  useEffect(() => {
    loadCustomerDashboard();
  }, []);

  async function loadCustomerDashboard() {
    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Customer Auth Error:", userError);
      }

      if (!user) {
        navigate("/login");
        return;
      }

      // ------------------------------------------
      // CUSTOMER PROFILE
      // ------------------------------------------

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error("Customer Profile Error:", profileError);
      }

      if (profile?.full_name) {
        setCustomerName(profile.full_name);
      }

      // ------------------------------------------
      // BOOKINGS
      // ------------------------------------------

      const { count: bookingCount, error: bookingError } = await supabase
        .from("bookings")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("customer_id", user.id);

      if (bookingError) {
        console.error("Booking Count Error:", bookingError);
      }

      // ------------------------------------------
      // WISHLIST
      // ------------------------------------------

      let wishlistCount = 0;

      const wishlistResponse = await supabase
        .from("wishlist")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("customer_id", user.id);

      if (wishlistResponse.error) {
        // Wishlist table may not exist yet.
        console.warn(
          "Wishlist is not available yet:",
          wishlistResponse.error.message
        );
      } else {
        wishlistCount = wishlistResponse.count || 0;
      }

      // ------------------------------------------
      // CUSTOMER WALLET
      // ------------------------------------------

      let walletBalance = 0;

      const walletResponse = await supabase
        .from("customer_wallets")
        .select("available_balance")
        .eq("customer_id", user.id)
        .maybeSingle();

      if (walletResponse.error) {
        console.warn(
          "Customer Wallet Error:",
          walletResponse.error.message
        );
      } else {
        walletBalance = Number(
          walletResponse.data?.available_balance || 0
        );
      }

      // ------------------------------------------
      // CUSTOMER INQUIRIES
      // ------------------------------------------

      let inquiryCount = 0;

      const inquiryResponse = await supabase
        .from("customer_inquiries")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq("customer_id", user.id);

      if (inquiryResponse.error) {
        console.warn(
          "Customer Inquiry Error:",
          inquiryResponse.error.message
        );
      } else {
        inquiryCount = inquiryResponse.count || 0;
      }

      // ------------------------------------------
      // UPCOMING TOUR
      // ------------------------------------------

      const today = new Date().toISOString();

      const { data: upcoming, error: upcomingError } = await supabase
        .from("bookings")
        .select("*")
        .eq("customer_id", user.id)
        .gte("travel_date", today)
        .order("travel_date", {
          ascending: true,
        })
        .limit(1)
        .maybeSingle();

      if (upcomingError) {
        console.error(
          "Upcoming Booking Error:",
          upcomingError
        );
      }

      setUpcomingTour(upcoming || null);

      setStats({
        bookings: bookingCount || 0,
        wishlist: wishlistCount,
        wallet: walletBalance,
        inquiries: inquiryCount,
      });
    } catch (error) {
      console.error(
        "Customer Dashboard Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  // ------------------------------------------
  // PACKAGE SEARCH
  // ------------------------------------------

  function handleSearch(event) {
    event.preventDefault();

    const value = searchTerm.trim();

    if (!value) {
      navigate("/customer/packages");
      return;
    }

    navigate(
      `/customer/packages?search=${encodeURIComponent(value)}`
    );
  }

  if (loading) {
    return (
      <DashboardLayout>
        <Loader text="Loading your dashboard..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* ==========================================
            WELCOME
        ========================================== */}

        <section className="overflow-hidden rounded-3xl bg-slate-900 p-7 text-white shadow-sm lg:p-9">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
              Customer Dashboard
            </p>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight lg:text-4xl">
              Welcome, {customerName} 👋
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Discover packages, plan your next journey,
              manage bookings and earn cashback with
              WorldTrip Connect.
            </p>

            {/* SEARCH */}

            <form
              onSubmit={handleSearch}
              className="mt-7 flex w-full max-w-2xl"
            >
              <div className="relative flex-1">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  placeholder="Search destination, package..."
                  className="h-12 w-full rounded-l-xl border border-white/10 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <button
                type="submit"
                className="rounded-r-xl bg-blue-600 px-6 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        {/* ==========================================
            STATS
        ========================================== */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="My Bookings"
            value={stats.bookings}
            icon={CalendarCheck}
            onClick={() =>
              navigate("/customer/bookings")
            }
          />

          <StatCard
            title="Wishlist"
            value={stats.wishlist}
            icon={Heart}
            onClick={() =>
              navigate("/customer/packages")
            }
          />

          <StatCard
            title="Wallet Cashback"
            value={`₹${Number(
              stats.wallet
            ).toLocaleString("en-IN")}`}
            icon={Wallet}
            onClick={() =>
              navigate("/customer/wallet")
            }
          />

          <StatCard
            title="My Enquiries"
            value={stats.inquiries}
            icon={ClipboardList}
            onClick={() =>
              navigate("/my-enquiries")
            }
          />

        </div>

        {/* ==========================================
            MAIN GRID
        ========================================== */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* ==========================================
              UPCOMING TOUR
          ========================================== */}

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">

            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Upcoming Tour
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your next confirmed journey.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/customer/bookings")
                }
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View all
                <ArrowUpRight size={16} />
              </button>
            </div>

            {upcomingTour ? (
              <div className="p-6">
                <div className="flex flex-col gap-5 rounded-2xl bg-slate-50 p-5 md:flex-row md:items-center md:justify-between">

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                      Upcoming Journey
                    </p>

                    <h3 className="mt-2 text-xl font-extrabold text-slate-900">
                      {upcomingTour.package_name ||
                        upcomingTour.destination ||
                        "Your Upcoming Tour"}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">

                      {upcomingTour.destination && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={15} />
                          {upcomingTour.destination}
                        </span>
                      )}

                      {upcomingTour.travel_date && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 size={15} />

                          {new Date(
                            upcomingTour.travel_date
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      )}

                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/customer/bookings/${upcomingTour.id}`
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    View Trip
                    <ArrowUpRight size={17} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-6 py-14 text-center">

                <CalendarCheck
                  size={40}
                  className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 font-bold text-slate-800">
                  No upcoming tours
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Find a package and start planning
                  your next journey.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/customer/packages")
                  }
                  className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
                >
                  Explore Packages
                </button>

              </div>
            )}
          </div>

          {/* ==========================================
              QUICK ACTIONS
          ========================================== */}

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your travel activities.
              </p>
            </div>

            <div className="space-y-2 p-4">

              <QuickAction
                icon={Search}
                title="Explore Packages"
                onClick={() =>
                  navigate("/customer/packages")
                }
              />

              <QuickAction
                icon={CalendarCheck}
                title="My Bookings"
                onClick={() =>
                  navigate("/customer/bookings")
                }
              />

              <QuickAction
                icon={Heart}
                title="Wishlist"
                onClick={() =>
                  navigate("/customer/packages")
                }
              />

              <QuickAction
                icon={Wallet}
                title="My Wallet"
                onClick={() =>
                  navigate("/customer/wallet")
                }
              />

              <QuickAction
                icon={ClipboardList}
                title="My Enquiries"
                onClick={() =>
                  navigate("/my-enquiries")
                }
              />

            </div>
          </div>
        </div>

        {/* ==========================================
            CUSTOMER BENEFITS
        ========================================== */}

        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                WorldTrip Connect Benefits
              </p>

              <h2 className="mt-2 text-xl font-extrabold text-slate-900">
                Book your trip and earn cashback
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Complete your eligible tour and cashback
                will be added to your WorldTrip Connect
                wallet for future bookings.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/customer/packages")
              }
              className="shrink-0 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              Find a Tour
            </button>

          </div>
        </section>

        {/* ==========================================
            REFRESH
        ========================================== */}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={loadCustomerDashboard}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
          >
            <RefreshCw size={16} />
            Refresh Dashboard
          </button>
        </div>

      </div>
    </DashboardLayout>
  );
}


/* ==========================================
   STAT CARD
========================================== */

function StatCard({
  title,
  value,
  icon: Icon,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={20} />
        </div>

        <ArrowUpRight
          size={17}
          className="text-slate-300 transition group-hover:text-blue-600"
        />
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-extrabold text-slate-900">
        {value}
      </p>
    </button>
  );
}


/* ==========================================
   QUICK ACTION
========================================== */

function QuickAction({
  icon: Icon,
  title,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition group-hover:bg-blue-50 group-hover:text-blue-600">
        <Icon size={18} />
      </div>

      <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">
        {title}
      </span>

      <ArrowUpRight
        size={16}
        className="ml-auto text-slate-300 group-hover:text-blue-600"
      />
    </button>
  );
}
