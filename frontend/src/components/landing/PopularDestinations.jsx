function PopularDestinations() {
  const destinations = [
    {
      name: "Kashmir",
      image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800",
      price: "₹18,999",
      tours: "25+ Tours",
    },
    {
      name: "Goa",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
      price: "₹9,999",
      tours: "30+ Tours",
    },
    {
      name: "Dubai",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      price: "₹39,999",
      tours: "18+ Tours",
    },
    {
      name: "Bali",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800",
      price: "₹44,999",
      tours: "15+ Tours",
    },
    {
      name: "Thailand",
      image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800",
      price: "₹29,999",
      tours: "22+ Tours",
    },
    {
      name: "Europe",
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800",
      price: "₹1,19,999",
      tours: "12+ Tours",
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
          🌍 Popular Destinations
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "50px",
            fontSize: "18px",
          }}
        >
          Discover the most loved destinations across India and the world.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "30px",
          }}
        >
          {destinations.map((item, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(0,0,0,.08)",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "20px" }}>
                <h3
                  style={{
                    marginBottom: "10px",
                    color: "#0f172a",
                  }}
                >
                  {item.name}
                </h3>

                <p
                  style={{
                    color: "#2563eb",
                    fontWeight: "700",
                    fontSize: "20px",
                    marginBottom: "8px",
                  }}
                >
                  From {item.price}
                </p>

                <p
                  style={{
                    color: "#64748b",
                    marginBottom: "20px",
                  }}
                >
                  {item.tours}
                </p>

                <button
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Explore →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularDestinations;