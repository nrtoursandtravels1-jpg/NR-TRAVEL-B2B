import { useEffect, useState } from "react";
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
  Wallet,
  Package,
  Bell,
  ClipboardCheck,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function Sidebar() {
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  // =====================================================
  // LOAD CURRENT USER + ROLE
  // =====================================================

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!mounted) return;

        setUser(user || null);

        if (!user) {
          setRole(null);
          return;
        }

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          console.error("Sidebar Profile Error:", error);
          setRole(null);
          return;
        }

        if (mounted) {
          setRole(profile?.role || null);
        }
      } catch (error) {
        console.error("Sidebar User Error:", error);
      }
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;

        setUser(session?.user || null);

        if (!session?.user) {
          setRole(null);
          return;
        }

        // Reload profile after authentication changes.
        loadUser();
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // =====================================================
  // ROLE HELPERS
  // =====================================================

  const normalizedRole = String(role || "").toLowerCase();

  const isAdmin =
    normalizedRole === "admin" ||
    normalizedRole === "administrator" ||
    normalizedRole === "super_admin";

  const isAgent =
    normalizedRole === "agent" ||
    normalizedRole === "travel_agent" ||
    normalizedRole === "b2b_agent";

  const isCustomer =
    normalizedRole === "customer";

  // =====================================================
  // NAVIGATION
  // =====================================================

  const adminSections = [
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
          path: "/leads",
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
          path: "/follow-ups",
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
  // AGENT NAVIGATION
  // =====================================================

  const agentSections = [
    {
      title: "MAIN",
      menus: [
        {
          name: "Dashboard",
          path: "/agent-dashboard",
          icon: LayoutDashboard,
        },
      ],
    },

    {
      title: "LEAD BUSINESS",
      menus: [
        {
          name: "Leads CRM",
          path: "/leads",
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
          path: "/customers",
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
          icon: Package,
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
      title: "MY ACCOUNT",
      menus: [
        {
          name: "Agent Profile",
          path: "/agent-profile",
          icon: UserRound,
        },
        {
          name: "Upgrade Plan",
          path: "/upgrade-plan",
          icon: CreditCard,
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
  // CUSTOMER NAVIGATION
  // =====================================================

  const customerSections = [
    {
      title: "MAIN",
      menus: [
        {
          name: "Dashboard",
          path: "/customer-dashboard",
          icon: LayoutDashboard,
        },
      ],
    },

    {
      title: "TRAVEL",
      menus: [
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
          name: "My Enquiries",
          path: "/my-enquiries",
          icon: ClipboardCheck,
        },
        {
          name: "Notifications",
          path: "/customer/notifications",
          icon: Bell,
        },
      ],
    },

    {
      title: "ACCOUNT",
      menus: [
        {
          name: "My Wallet",
          path: "/customer/wallet",
          icon: Wallet,
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
  // SELECT MENU BASED ON ROLE
  // =====================================================

  let sections = [];

  if (isAdmin) {
    sections = adminSections;
  } else if (isAgent) {
    sections = agentSections;
  } else if (isCustomer) {
    sections = customerSections;
  } else {
    // Safe fallback while profile is loading.
    sections = [];
  }

  // =====================================================
  // ACTIVE MENU
  // =====================================================

  const isMenuActive = (path) => {
    if (
      path === "/admin-dashboard" ||
      path === "/agent-dashboard" ||
      path === "/customer-dashboard" ||
      path === "/"
    ) {
      return location.pathname === path;
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  // =====================================================
  // USER DISPLAY
  // =====================================================

  const userName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    (isCustomer
      ? "Customer"
      : isAgent
      ? "Travel Agent"
      : "Administrator");

  const userInitials =
    userName
      .split(" ")
      .filter(Boolean)
      .map((name) => name.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const roleLabel = isAdmin
    ? "Super Admin"
    : isAgent
    ? "Travel Agent"
    : isCustomer
    ? "Customer"
    : "User";

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
          to={
            isAdmin
              ? "/admin-dashboard"
              : isAgent
              ? "/agent-dashboard"
              : isCustomer
              ? "/customer-dashboard"
              : "/"
          }
          className="flex items-center gap-3 w-full"
        >
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
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }
                    `}
                  >
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
          USER FOOTER
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
            {userInitials}
          </div>

          <div className="min-w-0">
            <p
              className="
                text-sm
                font-bold
                text-slate-800
                truncate
              "
            >
              {userName}
            </p>

            <p
              className="
                text-xs
                text-slate-400
                truncate
                mt-0.5
              "
            >
              {roleLabel}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}