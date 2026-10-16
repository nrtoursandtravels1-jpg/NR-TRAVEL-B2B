import { useEffect, useState } from "react";
import {
  Users,
  UserRound,
  UserCheck,
  Target,
  CreditCard,
  CalendarCheck,
  ArrowUpRight,
  UserCog,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../../services/supabase";
import RevenueChart from "../../components/dashboard/RevenueChart";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/ui/Loader";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    staff: 0,
    agents: 0,
    customers: 0,
    leads: 0,
    subscriptions: 0,
    bookings: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);

      const [
        staffResult,
        agentsResult,
        customersResult,
        leadsResult,
        subscriptionsResult,
      ] = await Promise.all([
        supabase
          .from("profiles")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("role", "staff"),

        supabase
          .from("profiles")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("role", "travel_agent"),

        supabase
          .from("customers")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("leads")
          .select("*", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("subscriptions")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("status", "active"),
      ]);

      if (staffResult.error) {
        console.error("Staff Stats Error:", staffResult.error);
      }

      if (agentsResult.error) {
        console.error("Agent Stats Error:", agentsResult.error);
      }

      if (customersResult.error) {
        console.error("Customer Stats Error:", customersResult.error);
      }

      if (leadsResult.error) {
        console.error("Lead Stats Error:", leadsResult.error);
      }

      if (subscriptionsResult.error) {
        console.error(
          "Subscription Stats Error:",
          subscriptionsResult.error
        );
      }

      setStats({
        staff: staffResult.count || 0,
        agents: agentsResult.count || 0,
        customers: customersResult.count || 0,
        leads: leadsResult.count || 0,
        subscriptions: subscriptionsResult.count || 0,
        bookings: 0,
      });
    } catch (error) {
      console.error("Admin Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Loader
          fullScreen={false}
          text="Loading WorldTrip Connect dashboard..."
          size="md"
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-1 sm:p-2 lg:p-4">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Administration
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
              WorldTrip Connect Dashboard
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage your travel business, leads, agents, customers,
              subscriptions and operations from one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">

            <button
              type="button"
              onClick={() => navigate("/admin/users")}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-2.5
                text-sm
                font-semibold
                text-slate-700
                shadow-sm
                transition
                hover:border-blue-200
                hover:bg-blue-50
                hover:text-blue-700
              "
            >
              <UserCog size={17} />
              Manage Users
            </button>

            <button
              type="button"
              onClick={() => navigate("/settings")}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-slate-900
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-blue-700
              "
            >
              <Settings size={17} />
              Settings
            </button>

          </div>
        </div>


        {/* ==================================================
            COMPANY OVERVIEW
        ================================================== */}

        <section className="mt-10">

          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Company Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current business activity and CRM overview.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <DashboardCard
              title="Total Staff"
              value={stats.staff}
              icon={UserCog}
              description="Internal team members"
            />

            <DashboardCard
              title="Travel Agents"
              value={stats.agents}
              icon={UserCheck}
              description="Registered agents"
            />

            <DashboardCard
              title="Customers"
              value={stats.customers}
              icon={UserRound}
              description="Customer database"
            />

            <DashboardCard
              title="Total Leads"
              value={stats.leads}
              icon={Target}
              description="CRM opportunities"
              action={() => navigate("/leads")}
            />

          </div>
        </section>


        {/* ==================================================
            BUSINESS & SAAS
        ================================================== */}

        <section className="mt-10">

          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Business & SaaS
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Subscription and booking performance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            <DashboardCard
              title="Active Subscriptions"
              value={stats.subscriptions}
              icon={CreditCard}
              description="Currently active plans"
              action={() => navigate("/admin/subscriptions")}
            />

            <DashboardCard
              title="Bookings"
              value={stats.bookings}
              icon={CalendarCheck}
              description="Total confirmed bookings"
              action={() => navigate("/bookings")}
            />

            <DashboardCard
              title="Subscription Plans"
              value="Manage"
              icon={CreditCard}
              description="Manage SaaS pricing plans"
              action={() => navigate("/admin/subscriptions")}
            />

          </div>
        </section>


        {/* ==================================================
            REVENUE
        ================================================== */}

        <section className="mt-10">

          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Revenue Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Monitor your business revenue performance.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <RevenueChart />
          </div>

        </section>


        {/* ==================================================
            QUICK MANAGEMENT
        ================================================== */}

        <section className="mt-10">

          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Quick Management
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Frequently used administration areas.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            <QuickAction
              title="Manage Users"
              description="Manage staff and travel agents"
              icon={Users}
              onClick={() => navigate("/admin/users")}
            />

            <QuickAction
              title="Manage Customers"
              description="View and manage customers"
              icon={UserRound}
              onClick={() => navigate("/admin/customers")}
            />

            <QuickAction
              title="Manage Subscriptions"
              description="Manage plans and subscriptions"
              icon={CreditCard}
              onClick={() => navigate("/admin/subscriptions")}
            />

          </div>

        </section>

      </div>
    </DashboardLayout>
  );
}


/* ============================================================
   DASHBOARD CARD
============================================================ */

function DashboardCard({
  title,
  value,
  icon: Icon,
  description,
  action,
}) {
  return (
    <button
      type="button"
      onClick={action}
      disabled={!action}
      className={`
        group
        w-full
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        text-left
        shadow-sm
        transition
        duration-200
        ${
          action
            ? "cursor-pointer hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            : "cursor-default hover:shadow-md"
        }
      `}
    >

      <div className="flex items-start justify-between">

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-blue-50
            text-blue-600
          "
        >
          <Icon size={20} />
        </div>

        {action && (
          <ArrowUpRight
            size={18}
            className="
              text-slate-300
              transition
              group-hover:text-blue-600
            "
          />
        )}

      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">
        {title}
      </p>

      <h3 className="mt-1 text-3xl font-extrabold text-slate-900">
        {value}
      </h3>

      <p className="mt-2 text-xs text-slate-400">
        {description}
      </p>

    </button>
  );
}


/* ============================================================
   QUICK ACTION
============================================================ */

function QuickAction({
  title,
  description,
  icon: Icon,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-center
        justify-between
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        text-left
        shadow-sm
        transition
        duration-200
        hover:-translate-y-0.5
        hover:border-blue-200
        hover:shadow-md
      "
    >

      <div className="flex items-center gap-4">

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-slate-50
            text-slate-600
            transition
            group-hover:bg-blue-50
            group-hover:text-blue-600
          "
        >
          <Icon size={20} />
        </div>

        <div>
          <p className="text-sm font-bold text-slate-800">
            {title}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>
        </div>

      </div>

      <ArrowUpRight
        size={18}
        className="
          text-slate-300
          transition
          group-hover:text-blue-600
        "
      />

    </button>
  );
}


export default AdminDashboard;
