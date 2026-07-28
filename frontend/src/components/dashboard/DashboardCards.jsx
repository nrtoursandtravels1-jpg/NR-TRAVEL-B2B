function DashboardCards() {
  const cards = [
    { title: "Total Leads", value: 0 },
    { title: "Today's Follow-ups", value: 0 },
    { title: "Bookings", value: 0 },
    { title: "Revenue", value: "₹0" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          style={{
            background: "#ffffff",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h4>{card.title}</h4>
          <h2>{card.value}</h2>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;