import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function DashboardCards() {

  const [totalLeads, setTotalLeads] = useState(0);

  useEffect(() => {
    getLeadCount();
  }, []);

  const getLeadCount = async () => {
    const { count, error } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.log("Lead Count Error:", error);
      return;
    }

    setTotalLeads(count);
  };


  const cards = [
    {
      title: "Total Leads",
      value: totalLeads,
    },
    {
      title: "Today's Follow-ups",
      value: 0,
    },
    {
      title: "Bookings",
      value: 0,
    },
    {
      title: "Revenue",
      value: "₹0",
    },
  ];


  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
      }}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h2>{card.value}</h2>
          <p>{card.title}</p>
        </div>
      ))}
    </div>
  );
}