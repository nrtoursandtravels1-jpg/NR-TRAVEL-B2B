import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menus = [
    { icon: "📊", name: "Dashboard", path: "/admin-dashboard" },
    { icon: "👥", name: "Leads CRM", path: "/crm" },
    { icon: "🏨", name: "Hotels", path: "/hotel" },
    { icon: "🧳", name: "Tour Packages", path: "/packages" },
    { icon: "🚗", name: "Cab", path: "/cab" },
    { icon: "🚌", name: "Bus", path: "/bus" },
    { icon: "✈️", name: "Flight", path: "/flight" },
    { icon: "🚆", name: "Train", path: "/train" },
    { icon: "🛂", name: "Visa", path: "/visa" },
    { icon: "📄", name: "Quotations", path: "/quotation" },
    { icon: "🧾", name: "Invoices", path: "/invoice" },
    { icon: "📅", name: "Bookings", path: "/bookings" },
    { icon: "⚙️", name: "Operations", path: "/operations" },
    { icon: "🗺️", name: "Itinerary", path: "/operations/itinerary" },
    { icon: "🤝", name: "Vendors", path: "/operations/vendors" },
    { icon: "📂", name: "Documents", path: "/operations/documents" },
    { icon: "👤", name: "Agent Profile", path: "/agent-profile" },
    { icon: "👨‍💼", name: "Users", path: "/admin/users" },
    { icon: "👥", name: "Customers", path: "/admin/customers" },
    { icon: "💳", name: "Subscriptions", path: "/admin/subscriptions" },
    { icon: "📈", name: "Reports", path: "/reports" },
    { icon: "⚙️", name: "Settings", path: "/settings" },
    { icon: "🌐", name: "Website", path: "/" },
  ];

  return (
    <aside className="fixed left-0 top-0 w-[240px] h-screen bg-slate-900 text-white shadow-2xl flex flex-col">

      {/* Logo */}

      <div className="h-[80px] flex flex-col justify-center items-center border-b border-slate-700">

        <h1 className="text-2xl font-bold text-blue-400">
              NR Travel
        </h1>

        <p className="text-sm text-slate-400">
          🌍 WorldTrip Connect
        </p>

      </div>

      {/* Menu */}

      <div className="flex-1 overflow-y-auto px-4 py-5">

        {menus.map((menu) => (

          <Link
            key={menu.path}
            to={menu.path}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 mb-2 transition-all duration-300 ${
              location.pathname === menu.path
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-xl"
                    : "text-slate-300 hover:bg-slate-800 hover:translate-x-1"
            }`}
          >
            <span className="text-xl">{menu.icon}</span>

            <span className="font-medium">
             {menu.name}
            </span>

          </Link>

        ))}

      </div>

      {/* Footer */}

      <div className="border-t border-slate-700 p-5">

        <p className="text-xs text-slate-400">
          Logged in as
        </p>

        <h3 className="font-semibold mt-1">
          Administrator
        </h3>

      </div>

    </aside>
  );
}