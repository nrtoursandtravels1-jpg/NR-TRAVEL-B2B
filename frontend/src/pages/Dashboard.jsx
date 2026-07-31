import Layout from "../components/layout/Layout";
import DashboardCards from "../components/dashboard/DashboardCards";

export default function Dashboard() {
  return (
    <Layout>

      {/* Welcome Banner */}

      <div
        style={{
          background:
            "linear-gradient(135deg,#2563eb,#1d4ed8)",
          color: "#fff",
          padding: "30px",
          borderRadius: "18px",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "34px",
          }}
        >
          Welcome to NR Tours & Travels ERP
        </h1>

        <p
          style={{
            marginTop: "10px",
            fontSize: "16px",
            opacity: ".95",
          }}
        >
          Manage Leads, Hotels, Packages, Cab, Bus,
          Flight, Train, Visa and Operations from one
          powerful dashboard.
        </p>
      </div>

      {/* Dashboard Cards */}

      <DashboardCards />

      {/* Quick Actions */}

      <div
        style={{
          marginTop: "35px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#0f172a",
          }}
        >
          Quick Actions
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
          }}
        >
          <ActionCard
            title="👥 Add Lead"
            description="Create a new customer lead."
          />

          <ActionCard
            title="🏨 Add Hotel"
            description="Register hotel partner."
          />

          <ActionCard
            title="📦 Create Package"
            description="Launch a new tour package."
          />

          <ActionCard
            title="🚌 New Bus Booking"
            description="Book bus tickets."
          />

          <ActionCard
            title="🚗 New Cab Booking"
            description="Book cab services."
          />

          <ActionCard
            title="✈️ Flight Booking"
            description="Manage flight reservations."
          />
        </div>
      </div>

      {/* Coming Soon */}

      <div
        style={{
          marginTop: "40px",
          background: "#fff",
          padding: "25px",
          borderRadius: "16px",
          boxShadow:
            "0 6px 20px rgba(0,0,0,.08)",
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

function ActionCard({
  title,
  description,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "14px",
        padding: "22px",
        boxShadow:
          "0 6px 20px rgba(0,0,0,.08)",
        cursor: "pointer",
        transition: ".3s",
      }}
    >
      <h3
        style={{
          marginBottom: "10px",
          color: "#0f172a",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          color: "#64748b",
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  );
}