import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function PackageCards() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    upcoming: 0,
    soldOut: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const { data } = await supabase
      .from("packages")
      .select("*");

    if (!data) return;

    setStats({
      total: data.length,
      active: data.filter(
        (p) => p.status === "Active"
      ).length,
      upcoming: data.filter(
        (p) => p.status === "Upcoming"
      ).length,
      soldOut: data.filter(
        (p) => p.status === "Sold Out"
      ).length,
    });
  }

  const cardStyle = {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
    textAlign: "center",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <div style={cardStyle}>
        <h3>Total Packages</h3>
        <h1>{stats.total}</h1>
      </div>

      <div style={cardStyle}>
        <h3>Active</h3>
        <h1 style={{ color: "green" }}>
          {stats.active}
        </h1>
      </div>

      <div style={cardStyle}>
        <h3>Upcoming</h3>
        <h1 style={{ color: "#2563eb" }}>
          {stats.upcoming}
        </h1>
      </div>

      <div style={cardStyle}>
        <h3>Sold Out</h3>
        <h1 style={{ color: "red" }}>
          {stats.soldOut}
        </h1>
      </div>
    </div>
  );
}