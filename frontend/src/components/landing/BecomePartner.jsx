import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Hotel,
  Package,
  BarChart3,
  CreditCard,
  Headphones,
  Sparkles,
} from "lucide-react";

function BecomePartner() {
  const benefits = [
    {
      icon: Users,
      title: "Lead Management",
      description: "Manage and convert travel leads efficiently.",
    },
    {
      icon: Hotel,
      title: "Hotel Management",
      description: "Manage your hotel inventory from one place.",
    },
    {
      icon: Package,
      title: "Package Management",
      description: "Create and manage attractive travel packages.",
    },
    {
      icon: CreditCard,
      title: "Booking Tracking",
      description: "Track bookings and payment activity easily.",
    },
    {
      icon: BarChart3,
      title: "Business Analytics",
      description: "Monitor your business performance with reports.",
    },
    {
      icon: Headphones,
      title: "Partner Support",
      description: "Get dedicated support whenever you need it.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 px-6 py-20 text-white sm:py-24 lg:px-8">

      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* LEFT */}
          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              <Sparkles size={16} />
              Grow With WorldTrip Connect
            </div>

            <h2 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
              Become a{" "}
              <span className="text-blue-400">
                B2B Travel Partner
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Grow your travel business with WorldTrip Connect.
              Manage leads, customers, bookings, hotels, packages,
              quotations and reports from one powerful platform.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">

              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 font-semibold text-slate-950 shadow-lg transition hover:bg-amber-400"
              >
                Join as B2B Partner
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Partner Login
              </Link>

            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={16}
                  className="text-emerald-400"
                />
                Easy Setup
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={16}
                  className="text-emerald-400"
                />
                Powerful CRM
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={16}
                  className="text-emerald-400"
                />
                Built for Travel Agents
              </div>

            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8">

            <div className="mb-7">
              <p className="text-sm font-medium text-blue-300">
                Everything you need
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                Why Join WorldTrip Connect?
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                  >
                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
                        <Icon size={19} />
                      </div>

                      <div>
                        <h4 className="font-semibold text-white">
                          {benefit.title}
                        </h4>

                        <p className="mt-1 text-xs leading-5 text-slate-400">
                          {benefit.description}
                        </p>
                      </div>

                    </div>
                  </div>
                );
              })}

            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-4">

              <CheckCircle2
                size={20}
                className="shrink-0 text-emerald-400"
              />

              <p className="text-sm text-slate-300">
                One platform to manage and grow your complete travel business.
              </p>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default BecomePartner;