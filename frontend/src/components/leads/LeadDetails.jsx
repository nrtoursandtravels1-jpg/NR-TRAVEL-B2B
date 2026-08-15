import { useState } from "react";
import {
  Phone,
  Mail,
  MessageCircle,
  Pencil,
  X,
  CalendarPlus,
} from "lucide-react";
import { supabase } from "../../services/supabase";

export default function LeadDetails({
  lead,
  onClose,
  onEdit,
}) {
  const [showFollowup, setShowFollowup] = useState(false);

  const [followup, setFollowup] = useState({
    followup_type: "Call",
    scheduled_at: "",
    notes: "",
  });

  const [savingFollowup, setSavingFollowup] = useState(false);

  if (!lead) return null;

  const statusColors = {
    New: "#3b82f6",
    Contacted: "#f59e0b",
    "Follow Up": "#8b5cf6",
    Booked: "#16a34a",
    Lost: "#ef4444",
  };

  const handleFollowupChange = (e) => {
    setFollowup({
      ...followup,
      [e.target.name]: e.target.value,
    });
  };

  const saveFollowup = async (e) => {
    e.preventDefault();

    if (!followup.scheduled_at) {
      alert("Please select follow-up date and time.");
      return;
    }

    try {
      setSavingFollowup(true);

      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      const user = userData?.user;

      if (!user) {
        alert("Please login first.");
        return;
      }

      const { error } = await supabase
        .from("lead_followups")
        .insert([
          {
            lead_id: lead.id,
            agent_id: user.id,
            followup_type: followup.followup_type,
            scheduled_at: followup.scheduled_at,
            notes: followup.notes,
            status: "Pending",
          },
        ]);

      if (error) {
        console.error("Follow-up Save Error:", error);
        alert(error.message || "Follow-up save failed.");
        return;
      }

      alert("Follow-up scheduled successfully.");

      setFollowup({
        followup_type: "Call",
        scheduled_at: "",
        notes: "",
      });

      setShowFollowup(false);
    } catch (error) {
      console.error("Follow-up Error:", error);
      alert("Something went wrong.");
    } finally {
      setSavingFollowup(false);
    }
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
      {/* HEADER */}

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

      {/* CUSTOMER */}

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

      {/* QUICK ACTIONS */}

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

      {/* LEAD INFORMATION */}

      <Info title="📞 Mobile" value={lead.mobile} />
      <Info title="📧 Email" value={lead.email} />
      <Info title="🌍 Destination" value={lead.destination} />
      <Info title="📅 Travel Date" value={lead.travel_date} />
      <Info title="👥 Travelers" value={lead.travelers} />
      <Info
        title="💰 Budget"
        value={lead.budget ? `₹ ${lead.budget}` : "-"}
      />
      <Info title="📍 Lead Source" value={lead.lead_source} />
      <Info title="📝 Notes" value={lead.notes} />

      {/* FOLLOW-UP BUTTON */}

      <button
        onClick={() => setShowFollowup(!showFollowup)}
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "14px",
          border: "none",
          borderRadius: "10px",
          background: "#7c3aed",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <CalendarPlus size={18} />

        {showFollowup
          ? "Close Follow-up"
          : "Add Follow-up"}
      </button>

      {/* FOLLOW-UP FORM */}

      {showFollowup && (
        <form
          onSubmit={saveFollowup}
          style={{
            marginTop: "15px",
            padding: "18px",
            background: "#f8fafc",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h3 style={{ marginTop: 0 }}>
            Schedule Follow-up
          </h3>

          <label style={labelStyle}>
            Follow-up Type
          </label>

          <select
            name="followup_type"
            value={followup.followup_type}
            onChange={handleFollowupChange}
            style={inputStyle}
          >
            <option value="Call">Call</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
            <option value="Meeting">Meeting</option>
          </select>

          <label style={labelStyle}>
            Date & Time
          </label>

          <input
            type="datetime-local"
            name="scheduled_at"
            value={followup.scheduled_at}
            onChange={handleFollowupChange}
            style={inputStyle}
          />

          <label style={labelStyle}>
            Notes
          </label>

          <textarea
            name="notes"
            rows="4"
            placeholder="Follow-up notes..."
            value={followup.notes}
            onChange={handleFollowupChange}
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={savingFollowup}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
              border: "none",
              borderRadius: "8px",
              background: savingFollowup
                ? "#94a3b8"
                : "#16a34a",
              color: "#fff",
              fontWeight: "600",
              cursor: savingFollowup
                ? "not-allowed"
                : "pointer",
            }}
          >
            {savingFollowup
              ? "Saving..."
              : "Save Follow-up"}
          </button>
        </form>
      )}

      {/* EDIT */}

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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <Pencil size={18} />

        Edit Lead
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

const labelStyle = {
  display: "block",
  marginTop: "12px",
  marginBottom: "6px",
  fontSize: "13px",
  fontWeight: "600",
  color: "#475569",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  outline: "none",
  boxSizing: "border-box",
};