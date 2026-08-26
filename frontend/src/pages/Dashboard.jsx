import Layout from "../components/layout/Layout";
import DashboardCards from "../components/dashboard/DashboardCards";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import RevenueChart from "../components/dashboard/RevenueChart";
import RecentActivities from "../components/dashboard/RecentActivities";
import QuickActions from "../components/dashboard/QuickActions";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";

export default function Dashboard() {
  return (
    <Layout>

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <PageHeader
        title="WorldTrip Connect"
        subtitle="Manage your travel business, customers, leads and bookings from one powerful workspace."
        action={
          <Button>
            + Add Lead
          </Button>
        }
      />


      {/* ==========================================
          WELCOME
      ========================================== */}

      <WelcomeBanner />


      {/* ==========================================
          BUSINESS OVERVIEW
      ========================================== */}

      <section className="mt-8">

        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Business Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your travel business performance at a glance.
          </p>
        </div>

        <DashboardCards />

      </section>


      {/* ==========================================
          REVENUE
      ========================================== */}

      <section className="mt-8">

        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Revenue Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Monitor your business revenue and performance.
          </p>
        </div>

        <RevenueChart />

      </section>


      {/* ==========================================
          RECENT ACTIVITIES
      ========================================== */}

      <section className="mt-8">

        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Recent Activities
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest activity across your travel business.
          </p>
        </div>

        <RecentActivities />

      </section>


      {/* ==========================================
          QUICK ACTIONS
      ========================================== */}

      <section className="mt-8">

        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Quickly access your most-used business tools.
          </p>
        </div>

        <QuickActions />

      </section>


      {/* ==========================================
          UPCOMING MODULES
      ========================================== */}

      <section className="mt-8">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Coming Next
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              Upcoming Modules
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              More tools are being added to the WorldTrip Connect platform.
            </p>
          </div>


          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <UpcomingModule
              icon="✈️"
              title="Flight Management"
            />

            <UpcomingModule
              icon="🚆"
              title="Train Booking"
            />

            <UpcomingModule
              icon="🛂"
              title="Visa Processing"
            />

            <UpcomingModule
              icon="📄"
              title="Quotation Generator"
            />

            <UpcomingModule
              icon="🧾"
              title="Invoice Generator"
            />

            <UpcomingModule
              icon="📊"
              title="Business Reports"
            />

            <UpcomingModule
              icon="🤖"
              title="AI Travel Assistant"
            />

            <UpcomingModule
              icon="📱"
              title="WhatsApp Integration"
            />

          </div>

        </div>

      </section>

    </Layout>
  );
}


/* ==========================================
   UPCOMING MODULE
========================================== */

function UpcomingModule({ icon, title }) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        rounded-xl
        border
        border-slate-200
        bg-slate-50
        px-4
        py-3
        transition
        hover:border-blue-200
        hover:bg-blue-50
      "
    >
      <span className="text-xl">
        {icon}
      </span>

      <span className="text-sm font-semibold text-slate-700">
        {title}
      </span>
    </div>
  );
}