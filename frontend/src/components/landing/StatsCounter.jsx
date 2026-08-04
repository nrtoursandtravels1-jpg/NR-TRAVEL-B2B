function StatsCounter() {
  const stats = [
    { number: "10,000+", label: "Happy Travelers" },
    { number: "350+", label: "B2B Partners" },
    { number: "750+", label: "Tour Packages" },
    { number: "60+", label: "Countries Covered" },
  ];

  return (
    <section
      style={{
        padding: "70px 20px",
        background: "#2563eb",
        color: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "35px",
          textAlign: "center",
        }}
      >
        {stats.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "15px",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(36px,5vw,52px)",
                marginBottom: "10px",
                fontWeight: "700",
              }}
            >
              {item.number}
            </h2>

            <p
              style={{
                fontSize: "18px",
                color: "#dbeafe",
              }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsCounter;