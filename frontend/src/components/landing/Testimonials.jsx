function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      city: "Delhi",
      review:
        "Excellent service! Our Kashmir trip was perfectly planned. Everything was smooth from booking to the end of the journey. Highly recommended.",
    },
    {
      name: "Priya Patel",
      city: "Ahmedabad",
      review:
        "Booked our honeymoon through WorldTrip Connect. The planning, hotel selection and support were excellent. Completely hassle-free experience.",
    },
    {
      name: "Amit Verma",
      city: "Mumbai",
      review:
        "Professional team with great support before and during our international trip. They handled everything perfectly.",
    },
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
          textAlign: "center",
        }}
      >
        {/* Heading */}
        <div style={{ marginBottom: "55px" }}>
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
            Traveler Reviews
          </span>

          <h2
            style={{
              fontSize: "clamp(30px, 5vw, 42px)",
              fontWeight: "800",
              margin: "0 0 15px",
              color: "#0f172a",
            }}
          >
            What Our Travelers Say
          </h2>

          <p
            style={{
              maxWidth: "650px",
              margin: "0 auto",
              color: "#64748b",
              fontSize: "16px",
              lineHeight: "1.7",
            }}
          >
            Trusted by happy travelers for memorable holidays, honeymoons,
            family vacations and international journeys.
          </p>
        </div>

        {/* Reviews */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "28px",
          }}
        >
          {reviews.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#ffffff",
                padding: "32px",
                borderRadius: "20px",
                boxShadow: "0 10px 35px rgba(15, 23, 42, 0.07)",
                textAlign: "left",
                border: "1px solid #e2e8f0",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 18px 40px rgba(15, 23, 42, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 35px rgba(15, 23, 42, 0.07)";
              }}
            >
              {/* Stars */}
              <div
                style={{
                  color: "#f59e0b",
                  fontSize: "20px",
                  letterSpacing: "3px",
                  marginBottom: "20px",
                }}
              >
                ★★★★★
              </div>

              {/* Review */}
              <p
                style={{
                  color: "#475569",
                  fontSize: "15px",
                  lineHeight: "1.8",
                  margin: 0,
                  minHeight: "105px",
                }}
              >
                "{item.review}"
              </p>

              {/* Divider */}
              <hr
                style={{
                  margin: "25px 0 20px",
                  border: "none",
                  borderTop: "1px solid #e2e8f0",
                }}
              />

              {/* Customer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #f59e0b, #ea580c)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    fontWeight: "700",
                    flexShrink: 0,
                  }}
                >
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h4
                    style={{
                      margin: 0,
                      color: "#0f172a",
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    {item.name}
                  </h4>

                  <p
                    style={{
                      margin: "4px 0 0",
                      color: "#64748b",
                      fontSize: "14px",
                    }}
                  >
                    {item.city}, India
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust line */}
        <div
          style={{
            marginTop: "45px",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          ⭐ <strong style={{ color: "#0f172a" }}>5.0/5</strong> traveler
          satisfaction
        </div>
      </div>
    </section>
  );
}

export default Testimonials;