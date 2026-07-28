import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#1e293b",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h2>NR Tours CRM</h2>

      <hr />

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>Dashboard</Link></li>

        <li><Link to="/crm" style={{ color: "#fff", textDecoration: "none" }}>Leads</Link></li>

        <li><Link to="/hotel" style={{ color: "#fff", textDecoration: "none" }}>Hotels</Link></li>

        <li><Link to="/partners" style={{ color: "#fff", textDecoration: "none" }}>Partners</Link></li>

        <li><Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Website</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;