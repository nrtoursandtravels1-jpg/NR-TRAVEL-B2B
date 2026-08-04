import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

function FeaturedPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    setLoading(true);

    const { data, error } = await supabase
      .from("tour_packages")
      .select("*")
      .eq("status", "Active")
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) {
      console.log(error.message);
    } else {
      setPackages(data || []);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h2>Loading Packages...</h2>
      </section>
    );
  }

  return (
    <section
      style={{
        padding: "80px 20px",
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
            fontSize: "clamp(30px,5vw,42px)",
            color: "#0f172a",
            marginBottom: "12px",
          }}
        >
          Featured Tour Packages
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "50px",
            fontSize: "17px",
          }}
        >
          Discover our most loved travel experiences.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: "30px",
          }}
        >
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              style={{
                background: "#fff",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                transition: "0.3s",
              }}
            >
              <img
                src={
                  pkg.image_url ||
                  "https://placehold.co/600x350?text=WorldTrip+Connect"
                }
                alt={pkg.package_name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "22px" }}>
                <h3
                  style={{
                    marginBottom: "12px",
                    color: "#0f172a",
                  }}
                >
                  {pkg.package_name}
                </h3>

                <p>📍 {pkg.destination}</p>

                <p>🗓 {pkg.duration}</p>

                <p>🏨 {pkg.hotel_category}</p>

                <h2
                  style={{
                    color: "#2563eb",
                    marginTop: "15px",
                  }}
                >
                  ₹ {pkg.price ? Number(pkg.price).toLocaleString() : "0"}
                </h2>

                <button
                  style={{
                    width: "100%",
                    marginTop: "18px",
                    padding: "13px",
                    border: "none",
                    borderRadius: "10px",
                    background: "#2563eb",
                    color: "#fff",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  View Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedPackages;