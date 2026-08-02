import { useEffect, useState } from "react";
import {
  FileText,
  CircleCheckBig,
  Clock3,
  CircleX,
  IndianRupee,
} from "lucide-react";
import { supabase } from "../../services/supabase";

export default function QuotationCards() {
  const [stats, setStats] = useState({
    total: 0,
    accepted: 0,
    pending: 0,
    rejected: 0,
    value: 0,
  });

  useEffect(() => {
    fetchQuotationStats();
  }, []);

  async function fetchQuotationStats() {
    const { data, error } = await supabase
      .from("quotations")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    const total = data.length;

    const accepted = data.filter(
      (q) => q.status === "Accepted"
    ).length;

    const pending = data.filter(
      (q) => q.status === "Pending"
    ).length;

    const rejected = data.filter(
      (q) => q.status === "Rejected"
    ).length;

    const value = data.reduce(
      (sum, q) => sum + Number(q.total_amount || 0),
      0
    );

    setStats({
      total,
      accepted,
      pending,
      rejected,
      value,
    });
  }

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
      <Card
        title="Total Quotations"
        value={stats.total}
        color="#2563eb"
        icon={<FileText size={34} color="#2563eb" />}
      />

      <Card
        title="Accepted"
        value={stats.accepted}
        color="#16a34a"
        icon={<CircleCheckBig size={34} color="#16a34a" />}
      />

      <Card
        title="Pending"
        value={stats.pending}
        color="#f59e0b"
        icon={<Clock3 size={34} color="#f59e0b" />}
      />

      <Card
        title="Rejected"
        value={stats.rejected}
        color="#ef4444"
        icon={<CircleX size={34} color="#ef4444" />}
      />

      <Card
        title="Quotation Value"
        value={`₹ ${stats.value.toLocaleString()}`}
        color="#7c3aed"
        icon={<IndianRupee size={34} color="#7c3aed" />}
      />
    </div>
  );
}

function Card({
  title,
  value,
  color,
  icon,
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h4
          style={{
            color: "#64748b",
            marginBottom: "10px",
          }}
        >
          {title}
        </h4>

        <h2
          style={{
            color,
            fontSize: "30px",
            fontWeight: "700",
          }}
        >
          {value}
        </h2>
      </div>

      {icon}
    </div>
  );
}