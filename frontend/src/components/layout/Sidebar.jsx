import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const sections = [
    {
      title: "MAIN",
      menus: [
        { name: "Dashboard", path: "/admin-dashboard" },
      ],
    },

    {
      title: "LEAD BUSINESS",
      menus: [
        { name: "Leads CRM", path: "/crm" },
        { name: "Lead Marketplace", path: "/lead-marketplace" },
        { name: "My Leads", path: "/my-leads" },
        { name: "Follow-ups", path: "/lead-followups" },
        { name: "Customers", path: "/admin/customers" },
      ],
    },

    {
      title: "TRAVEL SERVICES",
      menus: [
        { name: "Tour Packages", path: "/packages" },
        { name: "Hotels", path: "/hotel" },
        { name: "Flights", path: "/flight" },
        { name: "Bus", path: "/bus" },
        { name: "Train", path: "/train" },
        { name: "Visa", path: "/visa" },
        { name: "Cab", path: "/cab" },
      ],
    },

    {
      title: "SALES",
      menus: [
        { name: "Quotations", path: "/quotation" },
        { name: "Invoices", path: "/invoice" },
        { name: "Bookings", path: "/bookings" },
      ],
    },

    {
      title: "OPERATIONS",
      menus: [
        { name: "Operations", path: "/operations" },
        { name: "Itinerary", path: "/operations/itinerary" },
        { name: "Vendors", path: "/operations/vendors" },
        { name: "Documents", path: "/operations/documents" },
      ],
    },

    {
      title: "MANAGEMENT",
      menus: [
        { name: "Agent Profile", path: "/agent-profile" },
        { name: "Users", path: "/admin/users" },
        { name: "Subscriptions", path: "/admin/subscriptions" },
        { name: "Reports", path: "/reports" },
        { name: "Settings", path: "/settings" },
      ],
    },

    {
      title: "WEBSITE",
      menus: [
        { name: "Website", path: "/" },
      ],
    },
  ];

  return (
    <aside className="fixed left-0 top-0 w-[260px] h-screen bg-white border-r border-slate-200 flex flex-col z-50">

      {/* ==========================================
          BRAND
      ========================================== */}

      <div className="h-[85px] px-5 flex items-center border-b border-slate-200 bg-white">

        <Link
          to="/admin-dashboard"
          className="w-full flex items-center justify-center"
        >
          <img
            src="/worldtrip-connect-logo.png"
            alt="WorldTrip Connect"
            className="w-full max-w-[215px] h-[65px] object-contain"
          />
        </Link>

      </div>


      {/* ==========================================
          NAVIGATION
      ========================================== */}

      <div className="flex-1 overflow-y-auto px-4 py-5">

        {sections.map((section) => (
          <div
            key={section.title}
            className="mb-6"
          >

            {/* Section Title */}
            <p className="px-3 mb-2 text-[10px] font-bold tracking-[0.18em] text-slate-400">
              {section.title}
            </p>


            {/* Menu Items */}
            {section.menus.map((menu) => {

              const isActive =
                location.pathname === menu.path ||
                (
                  menu.path !== "/admin-dashboard" &&
                  location.pathname.startsWith(
                    menu.path + "/"
                  )
                );

              return (
                <Link
                  key={menu.path}
                  to={menu.path}
                  className={`
                    relative
                    flex
                    items-center
                    px-3
                    py-2.5
                    mb-1
                    rounded-lg
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >

                  {/* Active Indicator */}
                  {isActive && (
                    <span
                      className="
                        absolute
                        left-0
                        top-1/2
                        -translate-y-1/2
                        w-[3px]
                        h-6
                        rounded-r-full
                        bg-blue-600
                      "
                    />
                  )}

                  <span className="pl-2">
                    {menu.name}
                  </span>

                </Link>
              );
            })}

          </div>
        ))}

      </div>


      {/* ==========================================
          ADMIN FOOTER
      ========================================== */}

      <div className="border-t border-slate-200 px-5 py-4 bg-slate-50">

        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
          Logged in as
        </p>

        <p className="text-sm font-semibold text-slate-800 mt-1">
          Administrator
        </p>

        <p className="text-xs text-slate-500 mt-1">
          WorldTrip Connect
        </p>

      </div>

    </aside>
  );
}