import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function NavbarCRM() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header
      className="
        fixed
        top-0
        left-[260px]
        right-0
        h-[80px]
        bg-white
        border-b
        border-slate-200
        flex
        items-center
        justify-between
        px-6 lg:px-8
        z-50
      "
    >

      {/* LEFT — BRAND */}
      <div className="min-w-0 flex items-center gap-4">

        <img
          src="/worldtrip-connect-logo.png"
          alt="WorldTrip Connect"
          className="
            h-12
            w-auto
            max-w-[210px]
            object-contain
          "
        />

        <div className="hidden lg:block h-8 w-px bg-slate-200" />

        <div className="hidden lg:block">

          <p className="text-sm font-semibold text-slate-700">
            Travel Business Management
          </p>

          <p className="text-xs text-slate-400 mt-0.5">
            B2B Travel Management Platform
          </p>

        </div>

      </div>


      {/* CENTER — SEARCH */}
      <div className="hidden xl:flex items-center">

        <div className="relative">

          <input
            type="text"
            placeholder="Search leads, customers, bookings..."
            className="
              w-[360px]
              rounded-xl
              border border-slate-200
              bg-slate-50
              px-4
              py-2.5
              text-sm
              text-slate-700
              placeholder:text-slate-400
              outline-none
              transition
              focus:bg-white
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />

        </div>

      </div>


      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* DATE */}
        <div className="hidden lg:block text-right">

          <p className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
            Today
          </p>

          <p className="text-sm font-medium text-slate-600">
            {today}
          </p>

        </div>


        {/* DIVIDER */}
        <div className="hidden lg:block h-8 w-px bg-slate-200" />


        {/* ADMIN PROFILE */}
        <div className="flex items-center gap-3">

          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              font-bold
              shadow-sm
            "
          >
            A
          </div>

          <div className="hidden md:block">

            <h3 className="text-sm font-semibold text-slate-800">
              Administrator
            </h3>

            <p className="text-xs text-slate-500">
              Super Admin
            </p>

          </div>

        </div>


        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            bg-slate-900
            hover:bg-blue-700
            text-white
            px-4
            py-2.5
            rounded-xl
            text-sm
            font-semibold
            transition-all
            duration-200
          "
        >
          Logout
        </button>

      </div>

    </header>
  );
}