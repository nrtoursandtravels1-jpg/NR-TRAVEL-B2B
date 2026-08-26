import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserRound,
  Target,
  CalendarCheck,
  Hotel,
  Plane,
  Bus,
  Train,
  FileCheck,
  Car,
  Globe2,
  Receipt,
  FileText,
  BriefcaseBusiness,
  Map,
  Store,
  FolderOpen,
  Settings,
  Menu,
  X,
  Search,
  LogOut,
  ChevronRight,
  Bell,
  UserCog,
  CreditCard,
} from "lucide-react";

import { supabase } from "../../services/supabase";


// ======================================================
// NAVIGATION
// ======================================================

const navigation = [
  {
    title: "MAIN",
    items: [
      {
        label: "Dashboard",
        path: "/admin-dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "LEAD BUSINESS",
    items: [
      {
        label: "Leads CRM",
        path: "/leads",
        icon: Target,
      },
      {
        label: "Lead Marketplace",
        path: "/lead-marketplace",
        icon: Store,
      },
      {
        label: "My Leads",
        path: "/my-leads",
        icon: BriefcaseBusiness,
      },
      {
        label: "Follow-ups",
        path: "/follow-ups",
        icon: CalendarCheck,
      },
      {
        label: "Customers",
        path: "/customers",
        icon: Users,
      },
    ],
  },

  {
    title: "TRAVEL SERVICES",
    items: [
      {
        label: "Tour Packages",
        path: "/packages",
        icon: Globe2,
      },
      {
        label: "Hotels",
        path: "/hotel",
        icon: Hotel,
      },
      {
        label: "Flights",
        path: "/flights",
        icon: Plane,
      },
      {
        label: "Bus",
        path: "/bus",
        icon: Bus,
      },
      {
        label: "Train",
        path: "/train",
        icon: Train,
      },
      {
        label: "Visa",
        path: "/visa",
        icon: FileCheck,
      },
      {
        label: "Cab",
        path: "/cab",
        icon: Car,
      },
    ],
  },

  {
    title: "SALES",
    items: [
      {
        label: "Quotations",
        path: "/quotations",
        icon: FileText,
      },
      {
        label: "Invoices",
        path: "/invoices",
        icon: Receipt,
      },
      {
        label: "Bookings",
        path: "/bookings",
        icon: CalendarCheck,
      },
    ],
  },

  {
    title: "OPERATIONS",
    items: [
      {
        label: "Operations",
        path: "/operations",
        icon: BriefcaseBusiness,
      },
      {
        label: "Itinerary",
        path: "/itinerary",
        icon: Map,
      },
      {
        label: "Vendors",
        path: "/vendors",
        icon: Store,
      },
      {
        label: "Documents",
        path: "/documents",
        icon: FolderOpen,
      },
    ],
  },
];


// ======================================================
// LAYOUT
// ======================================================

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);

  // ====================================================
  // LOAD USER
  // ====================================================

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (mounted) {
        setUser(user || null);
      }
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) {
          setUser(session?.user || null);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // ====================================================
  // CLOSE MOBILE SIDEBAR ON ROUTE CHANGE
  // ====================================================

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // ====================================================
  // LOGOUT
  // ====================================================

  async function handleLogout() {
    try {
      setLoggingOut(true);

      const { error } =
        await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);

      alert(
        error.message ||
          "Unable to logout."
      );
    } finally {
      setLoggingOut(false);
    }
  }

  // ====================================================
  // USER NAME
  // ====================================================

  const userName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Administrator";

  const userEmail =
    user?.email || "admin@worldtripconnect.com";

  const initials =
    userName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "A";

  // ====================================================
  // ACTIVE ROUTE
  // ====================================================

  function isActive(path) {
    if (path === "/admin-dashboard") {
      return (
        location.pathname ===
        "/admin-dashboard"
      );
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(
        `${path}/`
      )
    );
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ==================================================
          MOBILE OVERLAY
      ================================================== */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() =>
            setMobileOpen(false)
          }
          className="
            fixed
            inset-0
            z-40
            bg-slate-950/40
            backdrop-blur-[2px]
            lg:hidden
          "
        />
      )}

      {/* ==================================================
          SIDEBAR
      ================================================== */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          w-[280px]
          bg-white
          border-r
          border-slate-200
          shadow-sm
          flex
          flex-col
          transform
          transition-transform
          duration-300
          ease-in-out

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* ==================================================
            LOGO
        ================================================== */}

        <div className="h-[76px] shrink-0 border-b border-slate-200 px-5 flex items-center">

          <Link
            to="/admin-dashboard"
            className="flex items-center gap-3 min-w-0"
          >

            {/* Logo mark */}
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
              <Globe2
                size={24}
                className="text-white"
              />
            </div>

            {/* Logo text */}
            <div className="min-w-0">

              <h1 className="text-lg font-extrabold tracking-tight text-slate-900 truncate">
                WORLD
                <span className="text-blue-600">
                  TRIP
                </span>
              </h1>

              <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-slate-400">
                Connect
              </p>

            </div>

          </Link>

          {/* Mobile close */}
          <button
            type="button"
            onClick={() =>
              setMobileOpen(false)
            }
            className="
              ml-auto
              lg:hidden
              w-9
              h-9
              rounded-lg
              flex
              items-center
              justify-center
              text-slate-500
              hover:bg-slate-100
            "
          >
            <X size={20} />
          </button>

        </div>


        {/* ==================================================
            NAVIGATION
        ================================================== */}

        <div className="flex-1 overflow-y-auto px-3 py-5">

          {navigation.map(
            (section) => (
              <div
                key={section.title}
                className="mb-6"
              >

                <p className="px-3 mb-2 text-[10px] font-extrabold tracking-[0.18em] text-slate-400">
                  {section.title}
                </p>

                <div className="space-y-1">

                  {section.items.map(
                    (item) => {
                      const Icon =
                        item.icon;

                      const active =
                        isActive(
                          item.path
                        );

                      return (
                        <Link
                          key={item.path}
                          to={item.path}
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

                          {/* Active indicator */}
                          {active && (
                            <span
                              className="
                                absolute
                                left-0
                                top-1/2
                                -translate-y-1/2
                                w-1
                                h-6
                                rounded-r-full
                                bg-blue-600
                              "
                            />
                          )}

                          <Icon
                            size={19}
                            strokeWidth={
                              active
                                ? 2.5
                                : 2
                            }
                            className={
                              active
                                ? "text-blue-600"
                                : "text-slate-400 group-hover:text-slate-600"
                            }
                          />

                          <span className="truncate">
                            {item.label}
                          </span>

                        </Link>
                      );
                    }
                  )}

                </div>

              </div>
            )
          )}

        </div>


        {/* ==================================================
            SIDEBAR FOOTER
        ================================================== */}

        <div className="shrink-0 border-t border-slate-200 p-3">

          <Link
            to="/settings"
            className={`
              flex
              items-center
              gap-3
              px-3
              py-2.5
              rounded-xl
              text-sm
              font-semibold
              transition
              ${
                isActive("/settings")
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50"
              }
            `}
          >
            <Settings size={19} />

            <span>
              Settings
            </span>
          </Link>

          <div className="mt-2 px-3 py-3 rounded-xl bg-slate-50">

            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                {initials}
              </div>

              <div className="min-w-0">

                <p className="text-sm font-bold text-slate-800 truncate">
                  {userName}
                </p>

                <p className="text-[11px] text-slate-400 truncate">
                  Administrator
                </p>

              </div>

            </div>

          </div>

        </div>

      </aside>


      {/* ==================================================
          MAIN AREA
      ================================================== */}

      <div className="lg:pl-[280px] min-h-screen">

        {/* ==================================================
            TOP HEADER
        ================================================== */}

        <header
          className="
            sticky
            top-0
            z-30
            h-[76px]
            bg-white/95
            backdrop-blur
            border-b
            border-slate-200
          "
        >

          <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center gap-4">

            {/* Mobile menu */}
            <button
              type="button"
              onClick={() =>
                setMobileOpen(true)
              }
              className="
                lg:hidden
                w-10
                h-10
                shrink-0
                rounded-xl
                bg-slate-100
                text-slate-700
                flex
                items-center
                justify-center
              "
            >
              <Menu size={21} />
            </button>


            {/* ==================================================
                SEARCH
            ================================================== */}

            <div className="hidden md:flex flex-1 max-w-2xl">

              <div className="relative w-full">

                <Search
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  placeholder="Search leads, customers, bookings..."
                  className="
                    w-full
                    h-11
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    pl-11
                    pr-4
                    text-sm
                    text-slate-700
                    placeholder:text-slate-400
                    outline-none
                    transition
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                  "
                />

              </div>

            </div>


            <div className="ml-auto flex items-center gap-2 sm:gap-4">

              {/* ==================================================
                  TODAY
              ================================================== */}

              <div className="hidden xl:block text-right">

                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Today
                </p>

                <p className="text-sm font-bold text-slate-700">
                  {new Date().toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </p>

              </div>


              {/* Divider */}
              <div className="hidden xl:block h-9 w-px bg-slate-200" />


              {/* ==================================================
                  NOTIFICATION
              ================================================== */}

              <button
                type="button"
                className="
                  relative
                  w-10
                  h-10
                  rounded-xl
                  text-slate-500
                  hover:bg-slate-100
                  flex
                  items-center
                  justify-center
                "
              >
                <Bell size={19} />

                <span
                  className="
                    absolute
                    top-2
                    right-2
                    w-2
                    h-2
                    rounded-full
                    bg-blue-600
                    border-2
                    border-white
                  "
                />
              </button>


              {/* ==================================================
                  USER
              ================================================== */}

              <div className="hidden sm:flex items-center gap-3">

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
                    text-sm
                    font-bold
                  "
                >
                  {initials}
                </div>

                <div className="hidden lg:block min-w-0">

                  <p className="text-sm font-bold text-slate-800 truncate max-w-[150px]">
                    {userName}
                  </p>

                  <p className="text-xs text-slate-400 truncate max-w-[170px]">
                    {userEmail}
                  </p>

                </div>

              </div>


              {/* ==================================================
                  LOGOUT
              ================================================== */}

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                title="Logout"
                className="
                  w-10
                  h-10
                  rounded-xl
                  border
                  border-slate-200
                  text-slate-500
                  hover:bg-red-50
                  hover:text-red-600
                  hover:border-red-100
                  transition
                  flex
                  items-center
                  justify-center
                  disabled:opacity-50
                "
              >
                <LogOut size={18} />
              </button>

            </div>

          </div>

        </header>


        {/* ==================================================
            PAGE CONTENT
        ================================================== */}

        <main className="min-h-[calc(100vh-76px)] px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

          <div className="max-w-[1600px] mx-auto">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}