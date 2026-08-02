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
    <header className="fixed top-0 left-[260px] right-0 h-[75px] bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-8 z-50">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          🌍 WorldTrip Connect
        </h1>

        <p className="text-sm text-slate-500">
          Smart Travel ERP & CRM Platform
        </p>
      </div>

      {/* Center */}
      <div className="hidden md:flex bg-slate-100 px-5 py-2 rounded-xl text-slate-700 font-medium">
        📅 {today}
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow">
          A
        </div>

        <div className="hidden sm:block">
          <h3 className="font-semibold text-slate-800">
            Administrator
          </h3>

          <p className="text-sm text-slate-500">
            Super Admin
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition text-white px-5 py-2 rounded-xl font-semibold shadow"
        >
          Logout
        </button>

      </div>

    </header>
  );
}