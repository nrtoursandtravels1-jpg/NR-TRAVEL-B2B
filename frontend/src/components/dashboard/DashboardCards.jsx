import StatsCard from "./StatsCard";

function DashboardCards() {
  const cards = [
    {
      title: "Total Leads",
      value: 120,
      color: "#2563eb",
    },
    {
      title: "Today's Follow-ups",
      value: 18,
      color: "#16a34a",
    },
    {
      title: "Bookings",
      value: 35,
      color: "#f59e0b",
    },
    {
      title: "Revenue",
      value: "₹1,25,000",
      color: "#dc2626",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      {cards.map((card, index) => (
        <StatsCard
          key={index}
          title={card.title}
          value={card.value}
          color={card.color}
        />
      ))}
    </div>
  );
}

export default DashboardCards;