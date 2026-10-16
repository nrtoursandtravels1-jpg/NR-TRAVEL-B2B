import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bus,
  Facebook,
  Globe2,
  Hotel,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Plane,
  ShieldCheck,
  Ticket,
  Twitter,
} from "lucide-react";

function PremiumFooter() {
  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "Packages", to: "/packages" },
    { label: "Hotels", to: "/hotel" },
    { label: "Register", to: "/register" },
  ];

  const services = [
    { label: "Flights", icon: Plane },
    { label: "Hotels", icon: Hotel },
    { label: "Bus Booking", icon: Bus },
    { label: "Visa Assistance", icon: Globe2 },
    { label: "Holiday Packages", icon: Ticket },
  ];

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-4">
          {/* Company */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20">
                <Globe2 size={24} />
              </div>

              <div>
                <h2 className="text-xl font-black tracking-tight">
                  WorldTrip Connect
                </h2>
                <p className="text-xs font-medium text-slate-400">
                  Travel. Connect. Grow.
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              Connecting travelers, travel
              agents and businesses through one powerful travel platform.
            </p>

            {/* Secure Badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">
              <ShieldCheck size={18} className="text-emerald-400" />
              Trusted Travel Platform
            </div>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                <Facebook size={18} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-pink-500 hover:bg-pink-600 hover:text-white"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-sky-500 hover:bg-sky-600 hover:text-white"
              >
                <Twitter size={18} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold">Quick Links</h3>

            <div className="mt-6 space-y-3">
              {quickLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="group flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                >
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold">Our Services</h3>

            <div className="mt-6 space-y-4">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <div
                    key={service.label}
                    className="flex items-center gap-3 text-sm text-slate-400"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-blue-400">
                      <Icon size={16} />
                    </div>

                    {service.label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold">Contact Us</h3>

            <div className="mt-6 space-y-5">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-blue-400">
                  <MapPin size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Location
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Ahmedabad, Gujarat
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-blue-400">
                  <Phone size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Phone
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    +91 XXXXX XXXXX
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-blue-400">
                  <Mail size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Email
                  </p>
                  <p className="mt-1 break-all text-sm text-slate-400">
                    info@worldtripconnect.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mb-10 overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600/20 via-slate-900 to-cyan-500/10 p-6 sm:p-8">
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="text-xl font-bold sm:text-2xl">
                Ready to grow your travel business?
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Join WorldTrip Connect and connect with more travel
                opportunities.
              </p>
            </div>

            <Link
              to="/register"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              Become a Partner
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-sm text-slate-500">
              Â© {new Date().getFullYear()} WorldTrip Connect. All Rights
              Reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-5 text-sm text-slate-500">
              <Link
                to="/"
                className="transition hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/packages"
                className="transition hover:text-white"
              >
                Packages
              </Link>

              <Link
                to="/register"
                className="transition hover:text-white"
              >
                Become a Partner
              </Link>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-slate-600">
            WorldTrip Connect
          </p>
        </div>
      </div>
    </footer>
  );
}

export default PremiumFooter;
