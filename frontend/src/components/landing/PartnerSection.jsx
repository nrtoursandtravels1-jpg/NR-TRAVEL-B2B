import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CreditCard,
  Globe2,
  Hotel,
  Package,
  Sparkles,
  Users,
} from "lucide-react";

function PartnerSection() {
  const benefits = [
    {
      icon: Users,
      title: "More Travel Leads",
      description:
        "Discover relevant travel enquiries and grow your customer base.",
    },
    {
      icon: Package,
      title: "Package Management",
      description:
        "Create and showcase your domestic and international packages.",
    },
    {
      icon: Hotel,
      title: "Hotel Inventory",
      description:
        "Manage hotel options and travel services from one platform.",
    },
    {
      icon: BarChart3,
      title: "Business Analytics",
      description:
        "Track leads, bookings, revenue and overall business performance.",
    },
    {
      icon: CreditCard,
      title: "Simple Credit System",
      description:
        "Use lead credits to access opportunities that match your business.",
    },
    {
      icon: Globe2,
      title: "Grow Beyond Borders",
      description:
        "Connect with customers and travel opportunities across destinations.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10">
      {/* Background Effects */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* ================= TOP ================= */}
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* LEFT */}
          <div>
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-bold text-blue-300">
              <Sparkles size={16} className="text-amber-400" />
              Partner With WorldTrip Connect
            </div>

            {/* Heading */}
            <h2 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Grow Your Travel Business{" "}
              <span className="text-blue-400">
                With Us
              </span>
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Join a growing travel network and get access to powerful tools
              for managing leads, customers, packages, hotels, bookings and
              business operations.
            </p>

            {/* Trust Points */}
            <div className="mt-7 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2
                  size={18}
                  className="shrink-0 text-emerald-400"
                />
                Built specifically for travel businesses
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2
                  size={18}
                  className="shrink-0 text-emerald-400"
                />
                Powerful CRM and lead management
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2
                  size={18}
                  className="shrink-0 text-emerald-400"
                />
                Flexible tools to help your business grow
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-400"
              >
                Become a Partner
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-bold text-white transition hover:bg-white/10"
              >
                Partner Login
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
            <div className="mb-6">
              <p className="text-sm font-semibold text-blue-300">
                Partner Benefits
              </p>

              <h3 className="mt-1 text-2xl font-extrabold">
                Everything You Need to Grow
              </h3>
            </div>

            {/* Benefits Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:bg-white/10"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/15 text-blue-400 transition group-hover:bg-blue-600 group-hover:text-white">
                        <Icon size={20} />
                      </div>

                      <div>
                        <h4 className="font-bold text-white">
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

            {/* Partner Status Card */}
            <div className="mt-6 rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <p className="font-bold text-white">
                    Ready to grow with us?
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Create your partner account and start managing your travel
                    business from one powerful platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM STATS ================= */}
        <div className="mt-14 grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-3">
          <div className="rounded-2xl bg-white/5 p-5 text-center">
            <p className="text-2xl font-extrabold text-white">
              350+
            </p>
            <p className="mt-1 text-sm text-slate-400">
              B2B Partners
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-5 text-center">
            <p className="text-2xl font-extrabold text-white">
              750+
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Travel Packages
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 p-5 text-center">
            <p className="text-2xl font-extrabold text-white">
              24×7
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Partner Support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PartnerSection;