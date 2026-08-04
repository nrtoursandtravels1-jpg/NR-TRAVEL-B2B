import { useEffect, useState } from "react";

function Hero() {
  const [mobile, setMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const resize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <section
      style={{
        background:
          "linear-gradient(rgba(15,23,42,.8),rgba(30,58,138,.8)), url('/travel.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: mobile ? "50px 20px" : "80px 60px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
          gap: "50px",
          alignItems: "center",
        }}
      >
        {/* Left */}

        <div>
          <h1
            style={{
              fontSize: mobile ? "34px" : "48px",
              marginBottom: "20px",
              lineHeight: mobile ? "45px" : "60px",
            }}
          >
            🌍 Explore India & The World
            <br />
            With
            <br />
            WorldTrip Connect
          </h1>

          <p
            style={{
              fontSize: "18px",
              marginBottom: "15px",
              color: "#facc15",
              fontWeight: "600",
            }}
          >
            Powered by NR Tours & Travels
          </p>

          <p
            style={{
              fontSize: mobile ? "16px" : "18px",
              color: "#dbeafe",
              lineHeight: "30px",
              marginBottom: "30px",
            }}
          >
            Connecting Travelers, Agents & Businesses Worldwide.
            <br />
            Domestic Tours • International Tours • Hotels • Flights • Visa •
            Transport • Holiday Packages
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: mobile ? "column" : "row",
              gap: "15px",
            }}
          >
            <button
              style={{
                padding: "15px 30px",
                background: "#f59e0b",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Explore Packages
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
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: mobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
              gap: "20px",
              marginTop: "40px",
              textAlign: "center",
            }}
          >
            <div>
              <h2>10,000+</h2>
              <p>Happy Travellers</p>
            </div>

            <div>
              <h2>350+</h2>
              <p>B2B Partners</p>
            </div>

            <div>
              <h2>750+</h2>
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
          <h2 style={{ textAlign: "center" }}>Our Services</h2>

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
            <div>🛡 Travel Insurance</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;