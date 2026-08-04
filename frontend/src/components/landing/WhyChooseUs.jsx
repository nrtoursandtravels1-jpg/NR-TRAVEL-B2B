function WhyChooseUs() {
  const features = [
    {
      icon: "🛡",
      title: "Trusted Travel Partner",
      desc: "Professional travel services backed by NR Tours & Travels.",
    },
    {
      icon: "💰",
      title: "Best Price Guarantee",
      desc: "Competitive pricing with no hidden charges.",
    },
    {
      icon: "🌍",
      title: "Worldwide Destinations",
      desc: "Explore domestic and international destinations.",
    },
    {
      icon: "🤝",
      title: "B2B Partner Network",
      desc: "Grow your travel business with our partner ecosystem.",
    },
    {
      icon: "⚡",
      title: "Fast Booking",
      desc: "Quick enquiries, confirmations, and hassle-free bookings.",
    },
    {
      icon: "📞",
      title: "24×7 Support",
      desc: "Our team is always ready to help you.",
    },
  ];

  return (
    <section
      style={{
        padding: "80px 60px",
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
            fontSize: "38px",
            color: "#0f172a",
            marginBottom: "15px",
          }}
        >
          💙 Why Choose WorldTrip Connect?
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "50px",
          }}
        >
          We make travel simple, reliable, and memorable.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "25px",
          }}
        >
          {features.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#f8fafc",
                padding: "30px",
                borderRadius: "15px",
                textAlign: "center",
                boxShadow: "0 8px 20px rgba(0,0,0,.06)",
              }}
            >
              <div style={{ fontSize: "42px" }}>{item.icon}</div>

              <h3
                style={{
                  marginTop: "20px",
                  color: "#0f172a",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: "#64748b",
                  marginTop: "10px",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;