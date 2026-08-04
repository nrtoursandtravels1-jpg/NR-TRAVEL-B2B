function Services() {
  const services = [
    {
      icon: "✈️",
      title: "Flight Booking",
      desc: "Domestic & International flight booking with best fares.",
    },
    {
      icon: "🏨",
      title: "Hotel Booking",
      desc: "Luxury, budget and business hotels worldwide.",
    },
    {
      icon: "🚌",
      title: "Bus Booking",
      desc: "Book buses across India at competitive prices.",
    },
    {
      icon: "🚆",
      title: "Train Booking",
      desc: "Fast and secure railway reservation assistance.",
    },
    {
      icon: "🌍",
      title: "Visa Assistance",
      desc: "Tourist, Business and Student visa support.",
    },
    {
      icon: "📦",
      title: "Holiday Packages",
      desc: "Domestic & International customized tour packages.",
    },
    {
      icon: "🛂",
      title: "Passport Services",
      desc: "New passport and renewal assistance.",
    },
    {
      icon: "🛡️",
      title: "Travel Insurance",
      desc: "Secure your journey with comprehensive insurance.",
    },
  ];

  return (
    <section
      style={{
        padding: "80px 20px",
        background: "#ffffff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(30px,5vw,42px)",
            color: "#0f172a",
            marginBottom: "15px",
          }}
        >
          Our Premium Travel Services
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "50px",
            fontSize: "17px",
          }}
        >
          Everything you need for a perfect journey.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "30px",
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              style={{
                background: "#f8fafc",
                padding: "30px",
                borderRadius: "18px",
                textAlign: "center",
                boxShadow: "0 10px 25px rgba(0,0,0,.08)",
                transition: "0.3s",
              }}
            >
              <div
                style={{
                  fontSize: "48px",
                  marginBottom: "20px",
                }}
              >
                {service.icon}
              </div>

              <h3
                style={{
                  color: "#0f172a",
                  marginBottom: "12px",
                }}
              >
                {service.title}
              </h3>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "28px",
                }}
              >
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;