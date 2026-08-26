import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  UserRound,
  CalendarCheck,
  Hotel,
  Plane,
  Bus,
  TrainFront,
  FileCheck,
  Car,
  FileText,
  Receipt,
  ClipboardList,
  Settings,
  BarChart3,
  UserCog,
  CreditCard,
  Globe,
  BriefcaseBusiness,
  FolderOpen,
  WalletIcon,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  // =====================================================
  // SIDEBAR MENU
  // =====================================================

  const sections = [
    {
      title: "MAIN",
      menus: [
        {
          name: "Dashboard",
          path: "/admin-dashboard",
          icon: LayoutDashboard,
        },
      ],
    },

    {
      title: "LEAD BUSINESS",
      menus: [
        {
          name: "Leads CRM",
          path: "/crm",
          icon: Users,
        },
        {
          name: "Lead Marketplace",
          path: "/lead-marketplace",
          icon: ShoppingBag,
        },
        {
          name: "My Leads",
          path: "/my-leads",
          icon: BriefcaseBusiness,
        },
        {
          name: "Follow-ups",
          path: "/lead-followups",
          icon: CalendarCheck,
        },
        {
          name: "Customers",
          path: "/admin/customers",
          icon: UserRound,
        },
      ],
    },

    {
      title: "TRAVEL SERVICES",
      menus: [
        {
          name: "Tour Packages",
          path: "/packages",
          icon: Globe,
        },
        {
         name: "Packages",
         path: "/customer/packages",
         icon: Package,
        },
        {
         name: "My Bookings",
         path: "/customer/bookings",
         icon: CalendarCheck,
        },
        {
        name: "My Wallet",
          path: "/customer/wallet",
          icon: WalletIcon,
        },
        {
          name: "Hotels",
          path: "/hotel",
          icon: Hotel,
        },
        {
          name: "Flights",
          path: "/flight",
          icon: Plane,
        },
        {
          name: "Bus",
          path: "/bus",
          icon: Bus,
        },
        {
          name: "Train",
          path: "/train",
          icon: TrainFront,
        },
        {
          name: "Visa",
          path: "/visa",
          icon: FileCheck,
        },
        {
          name: "Cab",
          path: "/cab",
          icon: Car,
        },
      ],
    },

    {
      title: "SALES",
      menus: [
        {
          name: "Quotations",
          path: "/quotation",
          icon: FileText,
        },
        {
          name: "Invoices",
          path: "/invoice",
          icon: Receipt,
        },
        {
          name: "Bookings",
          path: "/bookings",
          icon: ClipboardList,
        },
      ],
    },

    {
      title: "OPERATIONS",
      menus: [
        {
          name: "Operations",
          path: "/operations",
          icon: BriefcaseBusiness,
        },
        {
          name: "Itinerary",
          path: "/operations/itinerary",
          icon: CalendarCheck,
        },
        {
          name: "Vendors",
          path: "/operations/vendors",
          icon: UserCog,
        },
        {
          name: "Documents",
          path: "/operations/documents",
          icon: FolderOpen,
        },
      ],
    },

    {
      title: "MANAGEMENT",
      menus: [
        {
          name: "Agent Profile",
          path: "/agent-profile",
          icon: UserRound,
        },
        {
          name: "Users",
          path: "/admin/users",
          icon: Users,
        },
        {
          name: "Subscriptions",
          path: "/admin/subscriptions",
          icon: CreditCard,
        },
        {
          name: "Reports",
          path: "/reports",
          icon: BarChart3,
        },
        {
          name: "Settings",
          path: "/settings",
          icon: Settings,
        },
      ],
    },

    {
      title: "WEBSITE",
      menus: [
        {
          name: "Website",
          path: "/",
          icon: Globe,
        },
      ],
    },
  ];

  // =====================================================
  // ACTIVE MENU
  // =====================================================

  const isMenuActive = (path) => {
    if (path === "/admin-dashboard") {
      return location.pathname === path;
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  // =====================================================
  // SIDEBAR
  // =====================================================

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        z-50

        w-[280px]
        h-screen

        bg-white
        border-r
        border-slate-200

        flex
        flex-col

        shadow-sm
      "
    >
      {/* =================================================
          BRAND
      ================================================= */}

      <div
        className="
          h-[76px]
          shrink-0

          px-5

          flex
          items-center

          border-b
          border-slate-200
        "
      >
        <Link
          to="/admin-dashboard"
          className="
            flex
            items-center
            gap-3
            w-full
          "
        >
          {/* LOGO MARK */}

          <div
            className="
              w-11
              h-11
              shrink-0

              rounded-xl

              bg-blue-600

              flex
              items-center
              justify-center

              shadow-sm
            "
          >
            <Globe
              size={24}
              strokeWidth={2.2}
              className="text-white"
            />
          </div>

          {/* BRAND TEXT */}

          <div className="min-w-0">
            <h1
              className="
                text-lg
                font-extrabold
                tracking-tight
                text-slate-900
              "
            >
              WORLD
              <span className="text-blue-600">
                TRIP
              </span>
            </h1>

            <p
              className="
                text-[9px]
                font-bold
                tracking-[0.25em]
                uppercase
                text-slate-400
              "
            >
              Connect
            </p>
          </div>
        </Link>
      </div>

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <nav
        className="
          flex-1
          overflow-y-auto

          px-3
          py-5

          scrollbar-thin
          scrollbar-thumb-slate-200
        "
      >
        {sections.map((section) => (
          <div
            key={section.title}
            className="mb-6"
          >
            {/* SECTION TITLE */}

            <p
              className="
                px-3
                mb-2

                text-[10px]
                font-extrabold

                tracking-[0.18em]

                text-slate-400
              "
            >
              {section.title}
            </p>

            {/* MENU */}

            <div className="space-y-1">
              {section.menus.map((menu) => {
                const Icon = menu.icon;
                const active = isMenuActive(
                  menu.path
                );

                return (
                  <Link
                    key={menu.path}
                    to={menu.path}
                    className={`
                      group
                      relative

                      flex
                      items-center
                      gap-3

                      px-3
                      py-2.5

                      rounded-xl

                      text-sm
                      font-semibold

                      transition-all
                      duration-200

                      ${
                        active
                          ? `
                            bg-blue-50
                            text-blue-700
                          `
                          : `
                            text-slate-600
                            hover:bg-slate-50
                            hover:text-slate-900
                          `
                      }
                    `}
                  >
                    {/* ACTIVE INDICATOR */}

                    {active && (
                      <span
                        className="
                          absolute
                          left-0
                          top-1/2
                          -translate-y-1/2

                          w-1
                          h-7

                          rounded-r-full

                          bg-blue-600
                        "
                      />
                    )}

                    {/* ICON */}

                    <span
                      className={`
                        w-6
                        h-6

                        shrink-0

                        flex
                        items-center
                        justify-center

                        ${
                          active
                            ? "text-blue-600"
                            : "text-slate-400 group-hover:text-slate-600"
                        }
                      `}
                    >
                      <Icon
                        size={18}
                        strokeWidth={
                          active ? 2.4 : 2
                        }
                      />
                    </span>

                    {/* NAME */}

                    <span className="truncate">
                      {menu.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* =================================================
          ADMIN FOOTER
      ================================================= */}

      <div
        className="
          shrink-0

          border-t
          border-slate-200

          p-3

          bg-white
        "
      >
        <div
          className="
            flex
            items-center
            gap-3

            p-3

            rounded-xl

            bg-slate-50
          "
        >
          {/* AVATAR */}

          <div
            className="
              w-10
              h-10
              shrink-0

              rounded-xl

              bg-blue-600

              text-white

              flex
              items-center
              justify-center

              text-sm
              font-bold
            "
          >
            A
          </div>

          {/* USER */}

          <div className="min-w-0">
            <p
              className="
                text-sm
                font-bold
                text-slate-800

                truncate
              "
            >
              Administrator
            </p>

            <p
              className="
                text-xs
                text-slate-400

                truncate

                mt-0.5
              "
            >
              WorldTrip Connect
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}