function ContactCTA() {
  return (
    <section
      style={{
        padding: "80px 60px",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "42px",
            color: "#0f172a",
            marginBottom: "15px",
          }}
        >
          Let's Plan Your Next Journey
        </h2>

        <p
          style={{
            color: "#64748b",
            fontSize: "18px",
            marginBottom: "50px",
          }}
        >
          Contact our travel experts for domestic tours, international
          holidays, visa assistance, hotels, flights and customized packages.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 8px 25px rgba(0,0,0,.08)",
            }}
          >
            <h3>📞 Call Us</h3>
            <p>+91 XXXXX XXXXX</p>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 8px 25px rgba(0,0,0,.08)",
            }}
          >
            <h3>📧 Email</h3>
            <p>info@worldtripconnect.com</p>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 8px 25px rgba(0,0,0,.08)",
            }}
          >
            <h3>📍 Office</h3>
            <p>Ahmedabad, Gujarat, India</p>
          </div>
        </div>

        <button
          style={{
            marginTop: "45px",
            padding: "16px 35px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "17px",
            fontWeight: "600",
          }}
        >
          Contact Our Team
        </button>
      </div>
    </section>
  );
}

export default ContactCTA;
