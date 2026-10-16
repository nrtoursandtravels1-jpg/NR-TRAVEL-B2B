import {
  ShieldCheck,
  BadgeIndianRupee,
  Globe2,
  Handshake,
  Zap,
  Headphones,
} from "lucide-react";

function WhyChooseUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Trusted Travel Partner",
      desc: "Professional travel services designed to make every journey reliable and stress-free.",
    },
    {
      icon: BadgeIndianRupee,
      title: "Best Price Guarantee",
      desc: "Competitive pricing with transparent deals and no unnecessary hidden charges.",
    },
    {
      icon: Globe2,
      title: "Worldwide Destinations",
      desc: "Discover amazing domestic and international destinations with flexible travel options.",
    },
    {
      icon: Handshake,
      title: "B2B Partner Network",
      desc: "Grow your travel business with our growing network of travel agents and partners.",
    },
    {
      icon: Zap,
      title: "Fast Booking",
      desc: "Quick enquiries, faster responses and hassle-free booking assistance.",
    },
    {
      icon: Headphones,
      title: "24×7 Support",
      desc: "Get dependable travel assistance whenever you need help during your journey.",
    },
  ];

  return (
    <section
      style={{
        padding: "90px 20px",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Heading */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "55px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              color: "#f59e0b",
              fontSize: "14px",
              fontWeight: "700",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Why WorldTrip Connect
          </span>

          <h2
            style={{
              margin: "0 0 15px",
              color: "#0f172a",
              fontSize: "clamp(30px, 5vw, 42px)",
              fontWeight: "800",
              lineHeight: "1.2",
            }}
          >
            Why Choose WorldTrip Connect?
          </h2>

          <p
            style={{
              maxWidth: "650px",
              margin: "0 auto",
              color: "#64748b",
              fontSize: "16px",
              lineHeight: "1.8",
            }}
          >
            We combine reliable service, competitive pricing and dedicated
            support to make travel simple, comfortable and memorable.
          </p>
        </div>

        {/* Features */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
          }}
        >
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                style={{
                  position: "relative",
                  background: "#f8fafc",
                  padding: "32px 28px",
                  borderRadius: "20px",
                  textAlign: "center",
                  border: "1px solid #e2e8f0",
                  transition:
                    "transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-7px)";
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.boxShadow =
                    "0 18px 40px rgba(15, 23, 42, 0.10)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = "#f8fafc";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    margin: "0 auto 22px",
                    borderRadius: "18px",
                    background:
                      "linear-gradient(135deg, #f59e0b, #ea580c)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow:
                      "0 10px 25px rgba(245, 158, 11, 0.22)",
                  }}
                >
                  <Icon
                    size={30}
                    color="#ffffff"
                    strokeWidth={2}
                  />
                </div>

                {/* Title */}
                <h3
                  style={{
                    margin: "0 0 12px",
                    color: "#0f172a",
                    fontSize: "19px",
                    fontWeight: "750",
                  }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    fontSize: "14px",
                    lineHeight: "1.7",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Banner */}
        <div
          style={{
            marginTop: "55px",
            padding: "28px 30px",
            borderRadius: "20px",
            background:
              "linear-gradient(135deg, #fff7ed, #fffbeb)",
            border: "1px solid #fed7aa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            textAlign: "center",
          }}
        >
          <ShieldCheck
            size={24}
            color="#ea580c"
            style={{ flexShrink: 0 }}
          />

          <p
            style={{
              margin: 0,
              color: "#334155",
              fontSize: "15px",
              lineHeight: "1.6",
            }}
          >
            <strong style={{ color: "#0f172a" }}>
              Your journey, our responsibility.
            </strong>{" "}
            Travel with confidence with WorldTrip Connect.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;