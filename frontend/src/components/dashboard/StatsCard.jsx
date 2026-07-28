function StatsCard({ title, value, color = "#2563eb" }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderLeft: `5px solid ${color}`,
      }}
    >
      <h4
        style={{
          margin: 0,
          color: "#666",
          fontSize: "14px",
        }}
      >
        {title}
      </h4>

      <h2
        style={{
          marginTop: "10px",
          fontSize: "28px",
          color: "#111",
        }}
      >
        {value}
      </h2>
    </div>
  );
}

export default StatsCard;