import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menus = [
    { name: "📊 Dashboard", path: "/admin-dashboard" },
    { name: "👥 Leads CRM", path: "/crm" },
    { name: "🏨 Hotels", path: "/hotel" },
    { name: "🧳 Tour Packages", path: "/packages" },
    { name: "🚗 Cab", path: "/cab" },
    { name: "🚌 Bus", path: "/bus" },
    { name: "✈️ Flight", path: "/flight" },
    { name: "🚆 Train", path: "/train" },
    { name: "🛂 Visa", path: "/visa" },
    { name: "📄 Quotations", path: "/quotation" },
    { name: "🧾 Invoices", path: "/invoice" },
    { name: "📅 Bookings", path: "/bookings" },
    { name: "⚙️ Operations", path: "/operations" },
    { name: "🗺️ Itinerary", path: "/operations/itinerary" },
    { name: "🤝 Vendors", path: "/operations/vendors" },
    { name: "📄 Documents", path: "/operations/documents" },
    { name: "👤 Agent Profile", path: "/agent-profile" },
    { name: "👨‍💼 Users", path: "/admin/users" },
    { name: "👥 Customers", path: "/admin/customers" },
    { name: "💳 Subscriptions", path: "/admin/subscriptions" },
    { name: "📈 Reports", path: "/reports" },
    { name: "⚙️ Settings", path: "/settings" },
    { name: "🌐 Website", path: "/" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-slate-900 text-white shadow-xl overflow-y-auto">

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-2xl font-bold text-center">
          🌍 WorldTrip
        </h1>

        <p className="text-center text-slate-400 text-sm mt-1">
          Connect
        </p>

      </div>

      <nav className="p-4">

        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className={`block rounded-xl px-4 py-3 mb-2 transition-all duration-300 ${
              location.pathname === menu.path
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {menu.name}
          </Link>
        ))}

      </nav>

      <div className="border-t border-slate-700 p-5">

        <p className="text-sm text-slate-400">
          Logged in as
        </p>

        <h3 className="font-semibold mt-1">
          Administrator
        </h3>

      </div>

    </aside>
  );
}