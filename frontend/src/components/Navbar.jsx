import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-slate-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* =====================================================
            LOGO
        ===================================================== */}

        <Link to="/" className="flex items-center">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              WORLD<span className="text-blue-500">TRIP</span>
            </h1>

            <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400 uppercase">
              Connect
            </p>
          </div>
        </Link>


        {/* =====================================================
            MENU
        ===================================================== */}

        <div className="flex items-center gap-6 text-white font-medium">

          <Link
            to="/"
            className={
              location.pathname === "/"
                ? "text-blue-400"
                : "hover:text-blue-400 transition"
            }
          >
            Home
          </Link>


          <Link
            to="/packages"
            className={
              location.pathname.startsWith("/packages")
                ? "text-blue-400"
                : "hover:text-blue-400 transition"
            }
          >
            Packages
          </Link>


          <Link
            to="/hotel"
            className={
              location.pathname === "/hotel"
                ? "text-blue-400"
                : "hover:text-blue-400 transition"
            }
          >
            Hotels
          </Link>


          {/* LEAD MARKETPLACE */}

          <Link
            to="/lead-marketplace"
            className={
              location.pathname === "/lead-marketplace"
                ? "text-blue-400"
                : "hover:text-blue-400 transition"
            }
          >
            Lead Marketplace
          </Link>


          <Link
            to="/dashboard"
            className={
              location.pathname === "/dashboard"
                ? "text-blue-400"
                : "hover:text-blue-400 transition"
            }
          >
            Dashboard
          </Link>


          <Link
            to="/login"
            className={
              location.pathname === "/login"
                ? "text-blue-400"
                : "hover:text-blue-400 transition"
            }
          >
            Login
          </Link>


          {/* REGISTER */}

          <Link
            to="/register"
            className="
              bg-blue-600
              px-4
              py-2
              rounded-lg
              hover:bg-blue-700
              transition
              shadow-sm
            "
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;