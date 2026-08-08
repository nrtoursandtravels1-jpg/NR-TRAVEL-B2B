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
      left-[240px]
      right-0
      h-[80px]
      bg-white
      border-b
      border-slate-200
      shadow-sm
      flex
      items-center
      justify-between
      px-8
      z-50
    "
    >
      {/* LEFT */}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          🌍 WorldTrip Connect
        </h1>

        <p className="text-sm text-slate-500">
          Smart Travel ERP & CRM Platform
        </p>
      </div>

      {/* CENTER */}

      <div className="hidden lg:flex">

        <input
          type="text"
          placeholder="Search..."
          className="
            w-80
            rounded-xl
            border
            border-slate-300
            px-4
            py-2
            outline-none
            focus:border-blue-500
          "
        />

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-5">

        <div className="hidden md:block text-right">
          <p className="text-sm text-slate-500">
            {today}
          </p>
        </div>

        <button
          className="
            text-2xl
            hover:scale-110
            transition
          "
        >
          🔔
        </button>

        <div
          className="
            w-11
            h-11
            rounded-full
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            font-bold
            shadow
          "
        >
          A
        </div>

        <div className="hidden sm:block">
          <h3 className="font-semibold">
            Administrator
          </h3>

          <p className="text-sm text-slate-500">
            Super Admin
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="
            bg-red-600
            hover:bg-red-700
            text-white
            px-5
            py-2
            rounded-xl
            transition
          "
        >
          Logout
        </button>

      </div>
    </header>
  );
}