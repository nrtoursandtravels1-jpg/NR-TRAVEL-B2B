import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function VisaDashboard({ refresh }) {
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalRevenue: 0,
    approved: 0,
    processing: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, [refresh]);

  async function loadDashboard() {
    const { data, error } = await supabase
      .from("visa_applications")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    const totalApplications = data.length;

    const totalRevenue = data.reduce(
      (sum, item) => sum + Number(item.visa_fee || 0),
      0
    );

    const approved = data.filter(
      (item) => item.visa_status === "Approved"
    ).length;

    const processing = data.filter(
      (item) => item.visa_status === "Processing"
    ).length;

    setStats({
      totalApplications,
      totalRevenue,
      approved,
      processing,
    });
  }

  const cardStyle = {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,.08)",
    textAlign: "center",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <div style={cardStyle}>
        <h3>🛂 Applications</h3>
        <h1>{stats.totalApplications}</h1>
      </div>

      <div style={cardStyle}>
        <h3>💰 Revenue</h3>
        <h1>₹ {stats.totalRevenue}</h1>
      </div>

      <div style={cardStyle}>
        <h3>✅ Approved</h3>
        <h1>{stats.approved}</h1>
      </div>

      <div style={cardStyle}>
        <h3>⏳ Processing</h3>
        <h1>{stats.processing}</h1>
      </div>
    </div>
  );
}