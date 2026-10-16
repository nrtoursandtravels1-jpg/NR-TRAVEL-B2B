import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Globe2,
  ArrowRight,
} from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setPackagesOpen(false);
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const navLink = (path) =>
    `relative flex items-center gap-1 py-2 text-sm font-semibold transition ${
      isActive(path)
        ? "text-blue-400"
        : "text-slate-200 hover:text-white"
    }`;

  return (
    <header className="fixed left-0 right-0 top-0 z-[1000] border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* ================= LOGO ================= */}
        <Link
          to="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition group-hover:bg-blue-500">
            <Globe2 size={22} />
          </div>

          <div className="leading-none">
            <div className="text-base font-extrabold tracking-tight text-white sm:text-lg">
              WorldTrip
            </div>

            <div className="text-xs font-semibold tracking-wide text-blue-400">
              CONNECT
            </div>
          </div>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <div className="hidden items-center gap-8 lg:flex">
          <nav className="flex items-center gap-7">
            <Link to="/" className={navLink("/")}>
              Home
            </Link>

            {/* Packages Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setPackagesOpen(!packagesOpen)}
                className={navLink("/packages")}
              >
                Packages
                <ChevronDown
                  size={15}
                  className={`transition-transform ${
                    packagesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {packagesOpen && (
                <div className="absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                  <Link
                    to="/packages"
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    All Packages
                  </Link>

                  <Link
                    to="/customer/packages"
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    Explore Packages
                  </Link>

                  <a
                    href="/#domestic-tours"
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    Domestic Tours
                  </a>

                  <a
                    href="/#international-tours"
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                  >
                    International Tours
                  </a>
                </div>
              )}
            </div>

            <Link to="/hotel" className={navLink("/hotel")}>
              Hotels
            </Link>

            <Link to="/about" className={navLink("/about")}>
              About
            </Link>

            <Link to="/contact" className={navLink("/contact")}>
              Contact
            </Link>
          </nav>

          {/* ================= DESKTOP ACTIONS ================= */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              Get Started
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-slate-950 px-5 pb-6 pt-4 shadow-2xl lg:hidden">
          <nav className="flex flex-col gap-1">
            <Link
              to="/"
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive("/")
                  ? "bg-blue-600/15 text-blue-400"
                  : "text-slate-200 hover:bg-white/5"
              }`}
            >
              Home
            </Link>

            {/* Mobile Packages */}
            <button
              type="button"
              onClick={() => setPackagesOpen(!packagesOpen)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-200 transition hover:bg-white/5"
            >
              <span>Packages</span>

              <ChevronDown
                size={17}
                className={`transition-transform ${
                  packagesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {packagesOpen && (
              <div className="ml-3 border-l border-white/10 pl-3">
                <Link
                  to="/packages"
                  className="block rounded-lg px-4 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  All Packages
                </Link>

                <Link
                  to="/customer/packages"
                  className="block rounded-lg px-4 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  Explore Packages
                </Link>

                <a
                  href="/#domestic-tours"
                  className="block rounded-lg px-4 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  Domestic Tours
                </a>

                <a
                  href="/#international-tours"
                  className="block rounded-lg px-4 py-2.5 text-sm text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  International Tours
                </a>
              </div>
            )}

            <Link
              to="/hotel"
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive("/hotel")
                  ? "bg-blue-600/15 text-blue-400"
                  : "text-slate-200 hover:bg-white/5"
              }`}
            >
              Hotels
            </Link>

            <Link
              to="/about"
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive("/about")
                  ? "bg-blue-600/15 text-blue-400"
                  : "text-slate-200 hover:bg-white/5"
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive("/contact")
                  ? "bg-blue-600/15 text-blue-400"
                  : "text-slate-200 hover:bg-white/5"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Actions */}
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
            <Link
              to="/login"
              className="flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;