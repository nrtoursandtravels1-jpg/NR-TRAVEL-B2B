import {
  Phone,
  Mail,
  MessageCircle,
  Pencil,
  X,
} from "lucide-react";

export default function LeadDetails({
  lead,
  onClose,
  onEdit,
}) {
  if (!lead) return null;

  const statusColors = {
    New: "#3b82f6",
    Contacted: "#f59e0b",
    "Follow Up": "#8b5cf6",
    Booked: "#16a34a",
    Lost: "#ef4444",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "430px",
        height: "100%",
        background: "#ffffff",
        boxShadow: "-10px 0 30px rgba(0,0,0,.15)",
        padding: "25px",
        overflowY: "auto",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h2 style={{ margin: 0 }}>
          👤 Lead Details
        </h2>

        <button
          onClick={onClose}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <X size={22} />
        </button>
      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            margin: "auto",
            borderRadius: "50%",
            background: "#2563eb",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          {lead.customer_name?.charAt(0)}
        </div>

        <h2>{lead.customer_name}</h2>

        <span
          style={{
            background: statusColors[lead.status] || "#64748b",
            color: "#fff",
            padding: "6px 15px",
            borderRadius: "30px",
            fontSize: "13px",
          }}
        >
          {lead.status}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <a
          href={`tel:${lead.mobile}`}
          style={actionButton}
        >
          <Phone size={18} />
        </a>

        <a
          href={`mailto:${lead.email}`}
          style={actionButton}
        >
          <Mail size={18} />
        </a>

        <a
          href={`https://wa.me/91${lead.mobile}`}
          target="_blank"
          rel="noreferrer"
          style={actionButton}
        >
          <MessageCircle size={18} />
        </a>
      </div>

      <Info title="📞 Mobile" value={lead.mobile} />
      <Info title="📧 Email" value={lead.email} />
      <Info title="🌍 Destination" value={lead.destination} />
      <Info title="📅 Travel Date" value={lead.travel_date} />
      <Info title="👥 Travelers" value={lead.travelers} />
      <Info title="💰 Budget" value={`₹ ${lead.budget}`} />
      <Info title="📍 Lead Source" value={lead.lead_source} />
      <Info title="📝 Notes" value={lead.notes} />

      <button
        onClick={() => onEdit(lead)}
        style={{
          width: "100%",
          marginTop: "30px",
          padding: "14px",
          border: "none",
          borderRadius: "10px",
          background: "#2563eb",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        <Pencil size={18} /> Edit Lead
      </button>
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div
      style={{
        marginBottom: "18px",
        paddingBottom: "12px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <p
        style={{
          margin: 0,
          color: "#64748b",
          fontSize: "14px",
        }}
      >
        {title}
      </p>

      <h4
        style={{
          marginTop: "6px",
        }}
      >
        {value || "-"}
      </h4>
    </div>
  );
}

const actionButton = {
  width: "55px",
  height: "55px",
  borderRadius: "12px",
  background: "#f1f5f9",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#2563eb",
  textDecoration: "none",
};