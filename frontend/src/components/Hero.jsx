import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  CalendarDays,
  ArrowRight,
  ShieldCheck,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* LEFT CONTENT */}
          <div>
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur">
              <ShieldCheck size={16} className="text-amber-400" />
              Trusted Travel Business Platform
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Grow Your Travel Business with{" "}
              <span className="text-amber-400">
                WorldTrip Connect
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Manage leads, customers, packages, bookings and your complete
              travel business from one powerful platform.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-amber-400"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/packages"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Packages
              </Link>
            </div>

            {/* Trust points */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" />
                Secure Platform
              </div>

              <div className="flex items-center gap-2">
                <Users size={16} className="text-blue-400" />
                Built for Travel Agents
              </div>

              <div className="flex items-center gap-2">
                <BriefcaseBusiness size={16} className="text-amber-400" />
                All-in-One CRM
              </div>
            </div>
          </div>

          {/* RIGHT SEARCH / DASHBOARD CARD */}
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl sm:p-6">

              {/* Search box */}
              <div className="rounded-2xl bg-white p-5 text-slate-900 shadow-xl">
                <div className="mb-5">
                  <p className="text-sm font-medium text-slate-500">
                    Find your next opportunity
                  </p>

                  <h2 className="mt-1 text-2xl font-bold">
                    Explore Travel
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Destination */}
                  <div className="relative">
                    <MapPin
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      placeholder="Where do you want to go?"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Date */}
                  <div className="relative">
                    <CalendarDays
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="date"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  {/* Search */}
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Search size={18} />
                    Search Packages
                  </button>
                </div>
              </div>

              {/* Dashboard stats */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-gray-400">
                    Available Leads
                  </p>
                  <p className="mt-1 text-2xl font-bold">
                    128
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-gray-400">
                    My Customers
                  </p>
                  <p className="mt-1 text-2xl font-bold">
                    64
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-gray-400">
                    Bookings
                  </p>
                  <p className="mt-1 text-2xl font-bold">
                    32
                  </p>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-5 hidden rounded-2xl border border-white/10 bg-white p-4 text-slate-900 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                  <ShieldCheck
                    size={20}
                    className="text-emerald-600"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Business Growth
                  </p>
                  <p className="text-xs text-slate-500">
                    Manage everything in one place
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;