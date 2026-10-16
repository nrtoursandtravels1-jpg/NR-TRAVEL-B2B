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
    Qualified: "#7c3aed",
    Proposal: "#0ea5e9",
    Booked: "#16a34a",
    Won: "#16a34a",
    Lost: "#ef4444",
  };

  const handleFollowupChange = (e) => {
    setFollowup((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveFollowup = async (e) => {
    e.preventDefault();

    if (!followup.scheduled_at) {
      alert("Please select follow-up date and time.");
      return;
    }

    try {
      setSavingFollowup(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        alert("Please login first.");
        return;
      }

      /*
       * IMPORTANT
       *
       * FollowUps.jsx reads from lead_activities.
       * Therefore follow-ups must also be saved here.
       */
      const { error } = await supabase
        .from("lead_activities")
        .insert([
          {
            lead_id: lead.id,
            agent_id: user.id,
            activity_type: followup.followup_type,
            notes: followup.notes.trim(),
            next_follow_up_at: followup.scheduled_at,
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
      alert(error.message || "Something went wrong.");
    } finally {
      setSavingFollowup(false);
    }
  };

  return (
    <div
      className="
        fixed
        top-0
        right-0
        z-[9999]
        h-full
        w-full
        overflow-y-auto
        bg-white
        p-5
        shadow-2xl
        sm:w-[430px]
        sm:p-6
      "
    >
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          👤 Lead Details
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            text-slate-500
            transition
            hover:bg-slate-100
            hover:text-slate-900
          "
        >
          <X size={22} />
        </button>
      </div>

      {/* CUSTOMER */}
      <div className="mb-7 text-center">
        <div
          className="
            mx-auto
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-blue-600
            text-2xl
            font-bold
            text-white
            shadow-lg
          "
        >
          {lead.customer_name?.charAt(0)?.toUpperCase() || "C"}
        </div>

        <h2 className="mt-4 text-xl font-bold text-slate-900">
          {lead.customer_name || "Customer"}
        </h2>

        <span
          className="mt-2 inline-block rounded-full px-4 py-1.5 text-xs font-semibold text-white"
          style={{
            background:
              statusColors[lead.status] || "#64748b",
          }}
        >
          {lead.status || "New"}
        </span>
      </div>

      {/* QUICK ACTIONS */}
      <div className="mb-7 flex justify-between gap-3">
        {lead.mobile ? (
          <a
            href={`tel:${lead.mobile}`}
            className="flex h-12 flex-1 items-center justify-center rounded-xl bg-slate-100 text-blue-600 transition hover:bg-blue-50"
            title="Call"
          >
            <Phone size={19} />
          </a>
        ) : (
          <div className="flex h-12 flex-1 items-center justify-center rounded-xl bg-slate-50 text-slate-300">
            <Phone size={19} />
          </div>
        )}

        {lead.email ? (
          <a
            href={`mailto:${lead.email}`}
            className="flex h-12 flex-1 items-center justify-center rounded-xl bg-slate-100 text-blue-600 transition hover:bg-blue-50"
            title="Email"
          >
            <Mail size={19} />
          </a>
        ) : (
          <div className="flex h-12 flex-1 items-center justify-center rounded-xl bg-slate-50 text-slate-300">
            <Mail size={19} />
          </div>
        )}

        {lead.mobile ? (
          <a
            href={`https://wa.me/91${String(
              lead.mobile
            ).replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="flex h-12 flex-1 items-center justify-center rounded-xl bg-slate-100 text-blue-600 transition hover:bg-blue-50"
            title="WhatsApp"
          >
            <MessageCircle size={19} />
          </a>
        ) : (
          <div className="flex h-12 flex-1 items-center justify-center rounded-xl bg-slate-50 text-slate-300">
            <MessageCircle size={19} />
          </div>
        )}
      </div>

      {/* LEAD INFORMATION */}
      <div>
        <Info title="📞 Mobile" value={lead.mobile} />
        <Info title="📧 Email" value={lead.email} />
        <Info title="🌍 Destination" value={lead.destination} />
        <Info title="📅 Travel Date" value={lead.travel_date} />
        <Info title="👥 Travelers" value={lead.travelers} />
        <Info
          title="💰 Budget"
          value={
            lead.budget
              ? `₹ ${Number(lead.budget).toLocaleString("en-IN")}`
              : "-"
          }
        />
        <Info
          title="📍 Lead Source"
          value={lead.lead_source}
        />
        <Info title="📝 Notes" value={lead.notes} />
      </div>

      {/* FOLLOW-UP BUTTON */}
      <button
        type="button"
        onClick={() => setShowFollowup((prev) => !prev)}
        className="
          mt-5
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-violet-600
          px-4
          py-3.5
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-violet-700
        "
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
          className="
            mt-4
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            p-4
          "
        >
          <h3 className="mb-4 text-base font-bold text-slate-900">
            Schedule Follow-up
          </h3>

          {/* TYPE */}
          <label className={labelClass}>
            Follow-up Type
          </label>

          <select
            name="followup_type"
            value={followup.followup_type}
            onChange={handleFollowupChange}
            className={inputClass}
          >
            <option value="Call">Call</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Email">Email</option>
            <option value="Meeting">Meeting</option>
          </select>

          {/* DATE */}
          <label className={labelClass}>
            Date & Time
          </label>

          <input
            type="datetime-local"
            name="scheduled_at"
            value={followup.scheduled_at}
            onChange={handleFollowupChange}
            className={inputClass}
            required
          />

          {/* NOTES */}
          <label className={labelClass}>
            Notes
          </label>

          <textarea
            name="notes"
            rows={4}
            placeholder="Follow-up notes..."
            value={followup.notes}
            onChange={handleFollowupChange}
            className={inputClass}
          />

          {/* SAVE */}
          <button
            type="submit"
            disabled={savingFollowup}
            className="
              mt-2
              flex
              w-full
              items-center
              justify-center
              rounded-xl
              bg-green-600
              px-4
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-green-700
              disabled:cursor-not-allowed
              disabled:bg-slate-400
            "
          >
            {savingFollowup
              ? "Saving..."
              : "Save Follow-up"}
          </button>
        </form>
      )}

      {/* EDIT */}
      <button
        type="button"
        onClick={() => onEdit(lead)}
        className="
          mt-6
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-blue-600
          px-4
          py-3.5
          text-sm
          font-semibold
          text-white
          transition
          hover:bg-blue-700
        "
      >
        <Pencil size={18} />
        Edit Lead
      </button>
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div className="mb-4 border-b border-slate-100 pb-3">
      <p className="text-xs font-medium text-slate-400">
        {title}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
        {value || "-"}
      </p>
    </div>
  );
}

const labelClass =
  "mb-1.5 mt-3 block text-xs font-semibold text-slate-600";

const inputClass =
  "box-border w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";