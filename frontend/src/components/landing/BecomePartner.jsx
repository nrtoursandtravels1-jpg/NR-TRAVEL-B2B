import { Link } from "react-router-dom";

function BecomePartner() {
  return (
    <section
      style={{
        padding: "80px 60px",
        background: "linear-gradient(135deg,#0f172a,#1d4ed8)",
        color: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "50px",
          alignItems: "center",
        }}
      >
        {/* Left Side */}

        <div>
          <h2
            style={{
              fontSize: "42px",
              marginBottom: "20px",
            }}
          >
            Become a B2B Travel Partner
          </h2>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "30px",
              color: "#e2e8f0",
              marginBottom: "30px",
            }}
          >
            Grow your travel business with WorldTrip Connect.
            Manage leads, customers, bookings, hotels, packages,
            quotations and reports from one powerful platform.
          </p>

          <Link
            to="/register"
            style={{
              display: "inline-block",
              textDecoration: "none",
              background: "#f59e0b",
              color: "#fff",
              padding: "15px 30px",
              borderRadius: "10px",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            Join as B2B Partner →
          </Link>
        </div>

        {/* Right Side */}

        <div
          style={{
            background: "rgba(255,255,255,.08)",
            padding: "35px",
            borderRadius: "18px",
            backdropFilter: "blur(12px)",
          }}
        >
          <h3
            style={{
              marginBottom: "25px",
            }}
          >
            Why Join Us?
          </h3>

          <ul
            style={{
              lineHeight: "38px",
              fontSize: "17px",
              listStyle: "none",
              padding: 0,
            }}
          >
            <li>✅ Unlimited Lead Management</li>
            <li>✅ Hotel & Package Management</li>
            <li>✅ Customer CRM</li>
            <li>✅ Booking & Payment Tracking</li>
            <li>✅ Business Reports & Analytics</li>
            <li>✅ Dedicated Partner Support</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default BecomePartner;