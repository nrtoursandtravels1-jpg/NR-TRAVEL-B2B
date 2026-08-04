function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      city: "Delhi",
      review:
        "Excellent service! Our Kashmir trip was perfectly planned. Highly recommended.",
    },
    {
      name: "Priya Patel",
      city: "Ahmedabad",
      review:
        "Booked our honeymoon through WorldTrip Connect. Everything was smooth and hassle-free.",
    },
    {
      name: "Amit Verma",
      city: "Mumbai",
      review:
        "Professional team with great support before and during our international trip.",
    },
  ];

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
            fontSize: "40px",
            marginBottom: "15px",
            color: "#0f172a",
          }}
        >
          What Our Travelers Say
        </h2>

        <p
          style={{
            color: "#64748b",
            marginBottom: "50px",
          }}
        >
          Trusted by thousands of happy travelers across India.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "30px",
          }}
        >
          {reviews.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                padding: "30px",
                borderRadius: "15px",
                boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                textAlign: "left",
              }}
            >
              <h3 style={{ color: "#f59e0b" }}>★★★★★</h3>

              <p
                style={{
                  color: "#475569",
                  lineHeight: "28px",
                  marginTop: "20px",
                }}
              >
                "{item.review}"
              </p>

              <hr
                style={{
                  margin: "25px 0",
                  border: "none",
                  borderTop: "1px solid #e2e8f0",
                }}
              />

              <h4>{item.name}</h4>

              <p
                style={{
                  color: "#64748b",
                }}
              >
                {item.city}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;