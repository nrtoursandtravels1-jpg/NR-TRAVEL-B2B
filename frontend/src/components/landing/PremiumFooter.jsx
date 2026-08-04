import { Link } from "react-router-dom";

function PremiumFooter() {
  return (
    <footer
      style={{
        background: "#0f172a",
        color: "#fff",
        padding: "60px 30px 30px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "40px",
        }}
      >
        {/* Company */}
        <div>
          <h2 style={{ marginBottom: "15px" }}>
            🌍 WorldTrip Connect
          </h2>

          <p style={{ color: "#cbd5e1", lineHeight: "28px" }}>
            Powered by NR Tours & Travels.
            <br />
            Connecting Travelers, Travel Agents and Businesses Worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3>Quick Links</h3>

          <ul style={{ listStyle: "none", padding: 0, lineHeight: "35px" }}>
            <li><Link to="/" style={link}>Home</Link></li>
            <li><Link to="/packages" style={link}>Packages</Link></li>
            <li><Link to="/hotel" style={link}>Hotels</Link></li>
            <li><Link to="/register" style={link}>Register</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3>Our Services</h3>

          <ul style={{ listStyle: "none", padding: 0, lineHeight: "35px" }}>
            <li>✈ Flights</li>
            <li>🏨 Hotels</li>
            <li>🚌 Bus Booking</li>
            <li>🌍 Visa Assistance</li>
            <li>📦 Holiday Packages</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3>Contact</h3>

          <p>📍 Ahmedabad, Gujarat</p>
          <p>📞 +91 XXXXX XXXXX</p>
          <p>📧 info@worldtripconnect.com</p>
        </div>
      </div>

      <hr
        style={{
          margin: "40px 0 20px",
          border: "none",
          borderTop: "1px solid #334155",
        }}
      />

      <p
        style={{
          textAlign: "center",
          color: "#94a3b8",
        }}
      >
        © 2026 WorldTrip Connect | Powered by NR Tours & Travels | All Rights Reserved.
      </p>
    </footer>
  );
}

const link = {
  color: "#cbd5e1",
  textDecoration: "none",
};

export default PremiumFooter;