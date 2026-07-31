import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menus = [
    { name: "📊 Dashboard", path: "/admin-dashboard" },

    { name: "👥 Leads CRM", path: "/crm" },

    { name: "🏨 Hotels", path: "/hotel" },

    { name: "📅 Bookings", path: "/bookings" },

    { name: "📦 Packages", path: "/packages" },

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
        color: "#fff",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          textAlign: "center",
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
            color: "#fff",
            textDecoration: "none",
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

export default Sidebar;