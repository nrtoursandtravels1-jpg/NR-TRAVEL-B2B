import Sidebar from "../components/layout/Sidebar";
import NavbarCRM from "../components/layout/NavbarCRM";
import DashboardCards from "../components/dashboard/DashboardCards";

export default function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          background: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <NavbarCRM />

        <div style={{ padding: "30px" }}>
          <h1>Travel & B2B CRM Dashboard</h1>

          <DashboardCards />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <div style={cardStyle}>
              <h2>120</h2>
              <p>Total Leads</p>
            </div>

            <div style={cardStyle}>
              <h2>45</h2>
              <p>Partners</p>
            </div>

            <div style={cardStyle}>
              <h2>18</h2>
              <p>Bookings</p>
            </div>

            <div style={cardStyle}>
              <h2>₹1,25,000</h2>
              <p>Revenue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  textAlign: "center",
};