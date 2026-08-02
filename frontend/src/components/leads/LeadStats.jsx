import {
  Users,
  PhoneCall,
  CalendarClock,
  CheckCircle,
} from "lucide-react";

export default function LeadStats({ leads = [] }) {
  const totalLeads = leads.length;

  const contacted = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const followUp = leads.filter(
    (lead) => lead.status === "Follow Up"
  ).length;

  const booked = leads.filter(
    (lead) => lead.status === "Booked"
  ).length;

  const cards = [
    {
      title: "Total Leads",
      value: totalLeads,
      color: "#2563eb",
      icon: <Users size={28} />,
    },
    {
      title: "Contacted",
      value: contacted,
      color: "#f59e0b",
      icon: <PhoneCall size={28} />,
    },
    {
      title: "Follow Up",
      value: followUp,
      color: "#8b5cf6",
      icon: <CalendarClock size={28} />,
    },
    {
      title: "Booked",
      value: booked,
      color: "#16a34a",
      icon: <CheckCircle size={28} />,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
        gap: "20px",
        marginBottom: "25px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 8px 20px rgba(0,0,0,.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  color: "#64748b",
                  marginBottom: "8px",
                }}
              >
                {card.title}
              </p>

              <h2
                style={{
                  margin: 0,
                  fontSize: "34px",
                  color: "#0f172a",
                }}
              >
                {card.value}
              </h2>
            </div>

            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "14px",
                background: card.color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
              }}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}