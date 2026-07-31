import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menus = [
    { name: "📊 Dashboard", path: "/admin-dashboard" },

    { name: "👥 Leads CRM", path: "/crm" },

    { name: "🏨 Hotels", path: "/hotel" },

    { name: "📦 Packages", path: "/packages" },

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
    <aside
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "#0f172a",
        color: "#ffffff",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        NR Tours CRM
      </h2>

      <hr
        style={{
          borderColor: "#334155",
          marginBottom: "20px",
        }}
      />

      {menus.map((menu) => (
        <Link
          key={menu.path}
          to={menu.path}
          style={{
            display: "block",
            padding: "12px 15px",
            marginBottom: "8px",
            borderRadius: "8px",
            textDecoration: "none",
            color: "#ffffff",
            background:
              location.pathname === menu.path
                ? "#2563eb"
                : "transparent",
            transition: "0.3s",
          }}
        >
          {menu.name}
        </Link>
      ))}
    </aside>
  );
}