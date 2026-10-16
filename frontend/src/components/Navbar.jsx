import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Packages",
      path: "/packages",
    },
    {
      label: "Hotels",
      path: "/hotel",
    },
    {
      label: "Lead Marketplace",
      path: "/lead-marketplace",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/95 shadow-lg backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

        {/* =====================================================
            LOGO
        ===================================================== */}
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="group flex items-center"
        >
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              WORLD<span className="text-blue-500">TRIP</span>
            </h1>

            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
              Connect
            </p>
          </div>
        </Link>

        {/* =====================================================
            DESKTOP MENU
        ===================================================== */}
        <div className="hidden items-center gap-7 lg:flex">

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative py-2 text-sm font-medium transition ${
                isActive(item.path)
                  ? "text-blue-400"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {item.label}

              {isActive(item.path) && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-blue-500" />
              )}
            </Link>
          ))}

          {/* =====================================================
              DASHBOARD
          ===================================================== */}
          <Link
            to="/dashboard"
            className={`flex items-center gap-1 text-sm font-medium transition ${
              isActive("/dashboard")
                ? "text-blue-400"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Dashboard
            <ChevronDown size={14} />
          </Link>

          {/* =====================================================
              LOGIN
          ===================================================== */}
          <Link
            to="/login"
            className={`text-sm font-medium transition ${
              isActive("/login")
                ? "text-blue-400"
                : "text-slate-300 hover:text-white"
            }`}
          >
            Login
          </Link>

          {/* =====================================================
              REGISTER
          ===================================================== */}
          <Link
            to="/register"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
          >
            Get Started
          </Link>
        </div>

        {/* =====================================================
            MOBILE BUTTON
        ===================================================== */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-slate-200 transition hover:bg-slate-800 lg:hidden"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}
      {mobileOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-6 py-5 lg:hidden">

          <div className="flex flex-col gap-2">

            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive(item.path)
                    ? "bg-blue-600/10 text-blue-400"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <Link
              to="/lead-marketplace"
              onClick={() => setMobileOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive("/lead-marketplace")
                  ? "bg-blue-600/10 text-blue-400"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              Lead Marketplace
            </Link>

            <Link
              to="/dashboard"
              onClick={() => setMobileOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive("/dashboard")
                  ? "bg-blue-600/10 text-blue-400"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive("/login")
                  ? "bg-blue-600/10 text-blue-400"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Get Started
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;