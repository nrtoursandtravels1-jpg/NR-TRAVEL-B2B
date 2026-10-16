import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Car,
  Bus,
  Plane,
  Globe2,
  Package,
  FileCheck,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

function Hero() {
  const services = [
    {
      icon: Building2,
      title: "Hotels",
      description: "Comfortable stays",
    },
    {
      icon: Car,
      title: "Cabs",
      description: "Easy transfers",
    },
    {
      icon: Bus,
      title: "Bus",
      description: "Reliable transport",
    },
    {
      icon: Plane,
      title: "Flights",
      description: "Domestic & international",
    },
    {
      icon: Globe2,
      title: "Visa",
      description: "Travel assistance",
    },
    {
      icon: Package,
      title: "Packages",
      description: "Complete holidays",
    },
    {
      icon: FileCheck,
      title: "Passport",
      description: "Documentation help",
    },
    {
      icon: ShieldCheck,
      title: "Insurance",
      description: "Travel protection",
    },
  ];

  const stats = [
    {
      value: "10,000+",
      label: "Happy Travellers",
    },
    {
      value: "350+",
      label: "B2B Partners",
    },
    {
      value: "750+",
      label: "Tour Packages",
    },
    {
      value: "24×7",
      label: "Support",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(2,6,23,0.94) 0%, rgba(15,23,42,0.82) 45%, rgba(30,58,138,0.65) 100%), url('/travel.jpg')",
        }}
      />

      {/* Background Effects */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ================= LEFT ================= */}
          <div>
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 backdrop-blur">
              <Sparkles size={16} className="text-amber-400" />
              Your Complete Travel Business Platform
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Explore India
              <br />
              <span className="text-blue-400">&amp; The World</span>
              <br />
              With{" "}
              <span className="text-amber-400">
                WorldTrip Connect
              </span>
            </h1>

            {/* Powered By */}
            <p className="mt-5 text-base font-semibold text-amber-300 sm:text-lg">
              Powered by NR Tours &amp; Travels
            </p>

            {/* Description */}
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
              Connecting Travelers, Agents &amp; Businesses Worldwide.
              <br className="hidden sm:block" />
              Domestic Tours • International Tours • Hotels • Flights • Visa
              • Transport • Holiday Packages
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/customer/packages"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 font-bold text-slate-950 shadow-xl shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-400"
              >
                Explore Packages
                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Become B2B Partner
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Trust Points */}
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={17}
                  className="text-emerald-400"
                />
                Trusted Platform
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={17}
                  className="text-emerald-400"
                />
                B2B Friendly
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={17}
                  className="text-emerald-400"
                />
                24×7 Support
              </div>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center backdrop-blur-md"
                >
                  <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                    {stat.value}
                  </h2>

                  <p className="mt-1 text-[11px] font-medium text-slate-400 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="relative">
            {/* Main Services Card */}
            <div className="rounded-3xl border border-white/20 bg-white/95 p-5 text-slate-900 shadow-2xl backdrop-blur-xl sm:p-7">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                    <Headphones size={14} />
                    Travel Services
                  </div>

                  <h2 className="text-2xl font-extrabold sm:text-3xl">
                    Everything You Need
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Manage and book your complete travel requirements from
                    one platform.
                  </p>
                </div>

                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg sm:flex">
                  <Globe2 size={23} />
                </div>
              </div>

              {/* Services */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {services.map((service) => {
                  const Icon = service.icon;

                  return (
                    <div
                      key={service.title}
                      className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm transition group-hover:bg-blue-600 group-hover:text-white">
                          <Icon size={19} />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-slate-900">
                            {service.title}
                          </h3>

                          <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom CTA */}
              <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-white">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                      Ready to travel?
                    </p>

                    <h3 className="mt-1 text-lg font-bold">
                      Start planning your next journey
                    </h3>
                  </div>

                  <Link
                    to="/customer/packages"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-400"
                  >
                    View Packages
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating B2B Card */}
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-white/20 bg-slate-950/95 p-4 text-white shadow-2xl backdrop-blur-xl sm:block lg:-left-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                  <CheckCircle2 size={22} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    B2B Partnership
                  </p>

                  <p className="text-sm font-bold">
                    Grow Your Travel Business
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Support Card */}
            <div className="absolute -right-3 -top-5 hidden rounded-2xl border border-white/20 bg-white/95 p-4 text-slate-900 shadow-2xl backdrop-blur-xl sm:block lg:-right-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Headphones size={20} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Customer Support
                  </p>

                  <p className="text-sm font-bold">
                    Available 24×7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  );
}

export default Hero;