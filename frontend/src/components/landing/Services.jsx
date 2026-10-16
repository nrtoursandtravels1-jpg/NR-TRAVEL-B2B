import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bus,
  CheckCircle2,
  FileText,
  Hotel,
  Plane,
  ShieldCheck,
  Sparkles,
  Ticket,
  TrainFront,
} from "lucide-react";

function Services() {
  const services = [
    {
      icon: Plane,
      title: "Flight Booking",
      desc: "Domestic & international flight booking with competitive fares and convenient options.",
    },
    {
      icon: Hotel,
      title: "Hotel Booking",
      desc: "Choose from luxury, budget and business hotels for comfortable stays worldwide.",
    },
    {
      icon: Bus,
      title: "Bus Booking",
      desc: "Book bus travel across India with convenient routes and competitive pricing.",
    },
    {
      icon: TrainFront,
      title: "Train Booking",
      desc: "Get assistance with railway reservations and plan your journey with ease.",
    },
    {
      icon: Ticket,
      title: "Visa Assistance",
      desc: "Support for tourist, business and other travel visa requirements.",
    },
    {
      icon: Sparkles,
      title: "Holiday Packages",
      desc: "Explore customized domestic and international holiday packages.",
    },
    {
      icon: FileText,
      title: "Passport Services",
      desc: "Assistance with new passport applications and renewal requirements.",
    },
    {
      icon: ShieldCheck,
      title: "Travel Insurance",
      desc: "Protect your journey with suitable travel insurance options.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-cyan-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
            <Sparkles size={16} />
            Complete Travel Solutions
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Premium Travel Services
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Everything you need for a smooth, comfortable and memorable
            journey—all in one place.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl"
              >
                {/* Hover background */}
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-50 opacity-0 transition duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-600/20">
                  <Icon size={27} strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="relative text-lg font-black text-slate-900">
                  {service.title}
                </h3>

                <p className="relative mt-3 text-sm leading-6 text-slate-500">
                  {service.desc}
                </p>

                {/* Bottom indicator */}
                <div className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-600">
                  <CheckCircle2 size={15} />
                  Travel assistance available
                </div>

                {/* Hover line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 overflow-hidden rounded-3xl bg-slate-950 p-7 text-white shadow-xl sm:p-10">
          <div className="flex flex-col items-center justify-between gap-7 md:flex-row">
            <div className="text-center md:text-left">
              <div className="mb-3 flex items-center justify-center gap-2 text-sm font-bold text-blue-400 md:justify-start">
                <Sparkles size={16} />
                One Platform. Everything Travel.
              </div>

              <h3 className="text-2xl font-black sm:text-3xl">
                Planning your next journey?
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Explore packages or tell us what you need and let our travel
                team help you plan it.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/customer/packages"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-500"
              >
                Explore Packages
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/customer-dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3.5 text-sm font-bold text-white transition hover:border-slate-600 hover:bg-slate-800"
              >
                Plan My Trip
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;