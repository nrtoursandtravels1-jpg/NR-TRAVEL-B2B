import Layout from "../components/layout/Layout";
import DashboardCards from "../components/dashboard/DashboardCards";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import RevenueChart from "../components/dashboard/RevenueChart";
import RecentActivities from "../components/dashboard/RecentActivities";
import QuickActions from "../components/dashboard/QuickActions";

export default function Dashboard() {
  return (
    <Layout>
      <PageHeader
        title="🌍 WorldTrip Connect"
        subtitle="Good Morning, Nisha 👋 | Let's grow your travel business today."
        action={<Button>+ Add Lead</Button>}
      />

      {/* Dashboard Cards */}
      <DashboardCards />

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Recent Activities */}
      <RecentActivities />

      {/* Quick Actions */}
      <div style={{ marginTop: "35px" }}>
        <QuickActions />
      </div>

      {/* Coming Soon */}
      <div
        style={{
          marginTop: "40px",
          background: "#fff",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0,0,0,.08)",
        }}
      >
        <h2>Upcoming Modules</h2>

        <ul
          style={{
            lineHeight: "2",
            color: "#475569",
          }}
        >
          <li>✈️ Flight Management</li>
          <li>🚆 Train Booking</li>
          <li>🛂 Visa Processing</li>
          <li>📄 Quotation Generator</li>
          <li>🧾 Invoice Generator</li>
          <li>📊 Business Reports</li>
          <li>🤖 AI Travel Assistant</li>
          <li>📱 WhatsApp Integration</li>
        </ul>
      </div>
    </Layout>
  );
}