import {
  FileCheck2,
  Globe2,
  ShieldCheck,
  Headphones,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

function VisaSection() {
  const visaServices = [
    "Tourist Visa",
    "Business Visa",
    "Student Visa",
    "Family & Visit Visa",
  ];

  return (
    <section
      style={{
        padding: "90px 20px",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "55px",
            alignItems: "center",
          }}
        >
          {/* Left Content */}
          <div>
            <span
              style={{
                display: "inline-block",
                color: "#f59e0b",
                fontSize: "14px",
                fontWeight: "700",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              Visa Assistance
            </span>

            <h2
              style={{
                margin: "0 0 20px",
                color: "#0f172a",
                fontSize: "clamp(32px, 5vw, 46px)",
                fontWeight: "800",
                lineHeight: "1.2",
              }}
            >
              Travel Worldwide With
              <span style={{ color: "#ea580c" }}> Confidence</span>
            </h2>

            <p
              style={{
                margin: "0 0 28px",
                color: "#64748b",
                fontSize: "16px",
                lineHeight: "1.8",
                maxWidth: "600px",
              }}
            >
              Planning an international trip? Our visa assistance service
              helps you understand documentation, application requirements
              and the overall visa process.
            </p>

            {/* Visa Types */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "13px",
                marginBottom: "30px",
              }}
            >
              {visaServices.map((service, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    color: "#334155",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  <CheckCircle2
                    size={18}
                    color="#f59e0b"
                    strokeWidth={2.5}
                  />
                  {service}
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              type="button"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "9px",
                padding: "14px 22px",
                border: "none",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(234, 88, 12, 0.20)",
              }}
              onClick={() => {
                window.location.href = "/contact";
              }}
            >
              Get Visa Assistance
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Right Feature Card */}
          <div
            style={{
              position: "relative",
              background: "#ffffff",
              borderRadius: "28px",
              padding: "38px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
            }}
          >
            {/* Decorative Circle */}
            <div
              style={{
                position: "absolute",
                top: "-25px",
                right: "-20px",
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                background: "#fef3c7",
                opacity: 0.8,
              }}
            />

            {/* Main Icon */}
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "25px",
                boxShadow: "0 10px 25px rgba(245, 158, 11, 0.25)",
              }}
            >
              <FileCheck2 size={34} color="#ffffff" />
            </div>

            <h3
              style={{
                margin: "0 0 12px",
                color: "#0f172a",
                fontSize: "25px",
                fontWeight: "800",
              }}
            >
              Simple Visa Process
            </h3>

            <p
              style={{
                margin: "0 0 28px",
                color: "#64748b",
                fontSize: "15px",
                lineHeight: "1.7",
              }}
            >
              Get guidance at every stage of your international travel
              documentation process.
            </p>

            {/* Features */}
            <div
              style={{
                display: "grid",
                gap: "18px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <Globe2
                  size={23}
                  color="#ea580c"
                  style={{ flexShrink: 0 }}
                />

                <div>
                  <h4
                    style={{
                      margin: "0 0 4px",
                      color: "#0f172a",
                      fontSize: "15px",
                      fontWeight: "700",
                    }}
                  >
                    International Destinations
                  </h4>

                  <p
                    style={{
                      margin: 0,
                      color: "#64748b",
                      fontSize: "13px",
                      lineHeight: "1.5",
                    }}
                  >
                    Assistance for popular international destinations.
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <ShieldCheck
                  size={23}
                  color="#ea580c"
                  style={{ flexShrink: 0 }}
                />

                <div>
                  <h4
                    style={{
                      margin: "0 0 4px",
                      color: "#0f172a",
                      fontSize: "15px",
                      fontWeight: "700",
                    }}
                  >
                    Documentation Guidance
                  </h4>

                  <p
                    style={{
                      margin: 0,
                      color: "#64748b",
                      fontSize: "13px",
                      lineHeight: "1.5",
                    }}
                  >
                    Understand important documents and requirements.
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <Headphones
                  size={23}
                  color="#ea580c"
                  style={{ flexShrink: 0 }}
                />

                <div>
                  <h4
                    style={{
                      margin: "0 0 4px",
                      color: "#0f172a",
                      fontSize: "15px",
                      fontWeight: "700",
                    }}
                  >
                    Personal Support
                  </h4>

                  <p
                    style={{
                      margin: 0,
                      color: "#64748b",
                      fontSize: "13px",
                      lineHeight: "1.5",
                    }}
                  >
                    Get support when you need help with your application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisaSection;