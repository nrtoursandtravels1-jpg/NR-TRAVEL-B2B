function Hero() {
  return (
    <section
      style={{
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a)",
        color: "white",
        padding: "80px 60px",
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
        {/* Left */}

        <div>
          <h1
            style={{
              fontSize: "48px",
              marginBottom: "20px",
              lineHeight: "60px",
            }}
          >
            Explore India &
            <br />
            The World With
            <br />
            NR Tours & Travels
          </h1>

          <p
            style={{
              fontSize: "20px",
              marginBottom: "30px",
              color: "#dbeafe",
            }}
          >
            Domestic Tours • International Tours • Hotels •
            Cab • Bus • Flight • Visa Services
          </p>

          <button
            style={{
              padding: "15px 30px",
              background: "#f59e0b",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              marginRight: "15px",
            }}
          >
            Get Free Quote
          </button>

          <button
            style={{
              padding: "15px 30px",
              background: "transparent",
              color: "white",
              border: "2px solid white",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Become B2B Partner
          </button>

          <div
            style={{
              display: "flex",
              gap: "30px",
              marginTop: "40px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2>1000+</h2>
              <p>Happy Travellers</p>
            </div>

            <div>
              <h2>150+</h2>
              <p>B2B Partners</p>
            </div>

            <div>
              <h2>500+</h2>
              <p>Tour Packages</p>
            </div>

            <div>
              <h2>24×7</h2>
              <p>Support</p>
            </div>
          </div>
        </div>

        {/* Right */}

        <div
          style={{
            background: "white",
            color: "#1e293b",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,.25)",
          }}
        >
          <h2>Our Services</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            <div>🏨 Hotels</div>
            <div>🚗 Cab</div>
            <div>🚌 Bus</div>
            <div>✈ Flight</div>
            <div>🌍 Visa</div>
            <div>📦 Tour Packages</div>
            <div>🛂 Passport</div>
            <div>🛡 Insurance</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;