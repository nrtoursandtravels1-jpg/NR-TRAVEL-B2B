function StatsCard({ title, value, color = "#2563eb" }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: "20px",
        borderLeft: `5px solid ${color}`,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h4
        style={{
          margin: "0",
          color: "#6b7280",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        {title}
      </h4>

      <h2
        style={{
          marginTop: "12px",
          marginBottom: "0",
          fontSize: "28px",
          fontWeight: "700",
          color: "#111827",
        }}
      >
        {value}
      </h2>
    </div>
  );
}

export default StatsCard;