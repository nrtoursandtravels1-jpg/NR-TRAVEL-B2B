import { useEffect, useState } from "react";
import {
  Phone,
  MessageCircle,
  Mail,
  Users,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";

export default function LeadFollowUps() {
  const [followups, setFollowups] = useState([]);
  const [leads, setLeads] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    lead_id: "",
    followup_type: "Call",
    scheduled_at: "",
    notes: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  // ==========================================
  // LOAD DATA
  // ==========================================

  async function loadData() {
    try {
      setLoading(true);

      const {
        data: userData,
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const user = userData?.user;

      if (!user) {
        setFollowups([]);
        setLeads([]);
        return;
      }

      // ==========================================
      // MY LEADS
      // ==========================================

      const {
        data: leadData,
        error: leadError,
      } = await supabase
        .from("leads")
        .select("*")
        .eq("agent_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (leadError) throw leadError;

      setLeads(leadData || []);

      // ==========================================
      // MY FOLLOW-UPS
      // ==========================================

      const {
        data: followupData,
        error: followupError,
      } = await supabase
        .from("lead_followups")
        .select("*")
        .eq("agent_id", user.id)
        .order("scheduled_at", {
          ascending: true,
        });

      if (followupError) throw followupError;

      setFollowups(followupData || []);
    } catch (error) {
      console.error("Follow-up Load Error:", error);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // FORM CHANGE
  // ==========================================

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // ==========================================
  // CREATE FOLLOW-UP
  // ==========================================

  async function createFollowup(event) {
    event.preventDefault();

    if (!form.lead_id) {
      alert("Please select a lead.");
      return;
    }

    if (!form.scheduled_at) {
      alert("Please select a date and time.");
      return;
    }

    try {
      setSaving(true);

      const {
        data: userData,
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const user = userData?.user;

      if (!user) {
        alert("Please login again.");
        return;
      }

      const { error } = await supabase
        .from("lead_followups")
        .insert([
          {
            lead_id: form.lead_id,
            agent_id: user.id,
            followup_type: form.followup_type,
            scheduled_at: new Date(
              form.scheduled_at
            ).toISOString(),
            notes: form.notes.trim() || null,
            status: "Pending",
          },
        ]);

      if (error) throw error;

      alert("Follow-up created successfully.");

      setForm({
        lead_id: "",
        followup_type: "Call",
        scheduled_at: "",
        notes: "",
      });

      setShowForm(false);

      await loadData();
    } catch (error) {
      console.error(
        "Create Follow-up Error:",
        error
      );

      alert(
        error.message ||
          "Follow-up creation failed."
      );
    } finally {
      setSaving(false);
    }
  }

  // ==========================================
  // UPDATE STATUS
  // ==========================================

  async function updateStatus(id, status) {
    try {
      const { error } = await supabase
        .from("lead_followups")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      setFollowups((previous) =>
        previous.map((item) =>
          item.id === id
            ? {
                ...item,
                status,
              }
            : item
        )
      );
    } catch (error) {
      console.error(
        "Follow-up Status Error:",
        error
      );

      alert(
        error.message ||
          "Unable to update follow-up."
      );
    }
  }

  // ==========================================
  // GET LEAD
  // ==========================================

  function getLead(leadId) {
    return leads.find(
      (lead) => String(lead.id) === String(leadId)
    );
  }

  // ==========================================
  // FORMAT DATE
  // ==========================================

  function formatDate(date) {
    if (!date) return "Not scheduled";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }

  // ==========================================
  // WHATSAPP
  // ==========================================

  function getWhatsAppUrl(mobile) {
    if (!mobile) return "#";

    const number = String(mobile).replace(
      /\D/g,
      ""
    );

    const normalizedNumber =
      number.length === 10
        ? `91${number}`
        : number;

    return `https://wa.me/${normalizedNumber}`;
  }

  // ==========================================
  // TYPE ICON
  // ==========================================

  function getTypeIcon(type) {
    switch (type) {
      case "Call":
        return <Phone size={17} />;

      case "WhatsApp":
        return <MessageCircle size={17} />;

      case "Email":
        return <Mail size={17} />;

      case "Meeting":
        return <Users size={17} />;

      default:
        return <Clock size={17} />;
    }
  }

  // ==========================================
  // COUNTS
  // ==========================================

  const pendingCount = followups.filter(
    (item) => item.status === "Pending"
  ).length;

  const completedCount = followups.filter(
    (item) => item.status === "Completed"
  ).length;

  const cancelledCount = followups.filter(
    (item) => item.status === "Cancelled"
  ).length;

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <Layout>
        <div className="py-16 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Follow-up Engine
          </p>

          <h1 className="text-2xl font-bold text-slate-900 mt-2">
            Loading follow-ups...
          </h1>
        </div>
      </Layout>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <Layout>
      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Agent Workspace
          </p>

          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
            Follow-ups
          </h1>

          <p className="text-slate-500 mt-2">
            Manage customer follow-ups and keep
            every opportunity moving.
          </p>
        </div>

        <button
          onClick={() =>
            setShowForm((previous) => !previous)
          }
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >
          <Plus size={18} />

          New Follow-up
        </button>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <StatCard
          title="Pending"
          value={pendingCount}
          icon={<Clock size={20} />}
        />

        <StatCard
          title="Completed"
          value={completedCount}
          icon={<CheckCircle2 size={20} />}
        />

        <StatCard
          title="Cancelled"
          value={cancelledCount}
          icon={<XCircle size={20} />}
        />
      </div>

      {/* CREATE FORM */}

      {showForm && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-5">
            Create Follow-up
          </h2>

          <form
            onSubmit={createFollowup}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* LEAD */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Select Lead
              </label>

              <select
                name="lead_id"
                value={form.lead_id}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="">
                  Select customer lead
                </option>

                {leads.map((lead) => (
                  <option
                    key={lead.id}
                    value={lead.id}
                  >
                    {lead.customer_name ||
                      "Customer"}{" "}
                    —{" "}
                    {lead.destination ||
                      "Destination"}
                  </option>
                ))}
              </select>
            </div>

            {/* TYPE */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Follow-up Type
              </label>

              <select
                name="followup_type"
                value={form.followup_type}
                onChange={handleChange}
                className={inputStyle}
              >
                <option value="Call">
                  Call
                </option>

                <option value="WhatsApp">
                  WhatsApp
                </option>

                <option value="Email">
                  Email
                </option>

                <option value="Meeting">
                  Meeting
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            {/* DATE */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Schedule Date & Time
              </label>

              <input
                type="datetime-local"
                name="scheduled_at"
                value={form.scheduled_at}
                onChange={handleChange}
                className={inputStyle}
              />
            </div>

            {/* NOTES */}

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Notes
              </label>

              <input
                type="text"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Customer requirement / next action"
                className={inputStyle}
              />
            </div>

            {/* BUTTONS */}

            <div className="md:col-span-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setShowForm(false)
                }
                className="
                  px-5
                  py-3
                  rounded-xl
                  border
                  border-slate-200
                  text-slate-600
                  font-semibold
                  hover:bg-slate-50
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="
                  px-6
                  py-3
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  font-semibold
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {saving
                  ? "Saving..."
                  : "Create Follow-up"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FOLLOW-UP LIST */}

      {followups.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl py-16 text-center">
          <Clock
            size={40}
            className="mx-auto text-slate-300"
          />

          <h2 className="text-lg font-bold text-slate-700 mt-4">
            No follow-ups yet
          </h2>

          <p className="text-sm text-slate-400 mt-2">
            Create your first follow-up for a
            customer lead.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {followups.map((followup) => {
            const lead = getLead(
              followup.lead_id
            );

            return (
              <div
                key={followup.id}
                className="
                  bg-white
                  border
                  border-slate-200
                  rounded-2xl
                  p-6
                  shadow-sm
                  hover:shadow-md
                  transition
                "
              >
                {/* TOP */}

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        {getTypeIcon(
                          followup.followup_type
                        )}
                      </div>

                      <div>
                        <h2 className="font-bold text-lg text-slate-900">
                          {lead?.customer_name ||
                            "Customer"}
                        </h2>

                        <p className="text-sm text-slate-500">
                          {lead?.destination ||
                            "Destination not specified"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <StatusBadge
                    status={
                      followup.status ||
                      "Pending"
                    }
                  />
                </div>

                {/* DETAILS */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Detail
                    label="Type"
                    value={
                      followup.followup_type
                    }
                  />

                  <Detail
                    label="Scheduled"
                    value={formatDate(
                      followup.scheduled_at
                    )}
                  />

                  <Detail
                    label="Mobile"
                    value={
                      lead?.mobile || "-"
                    }
                  />
                </div>

                {/* NOTES */}

                {followup.notes && (
                  <div className="mt-5 bg-slate-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase">
                      Notes
                    </p>

                    <p className="text-sm text-slate-700 mt-1">
                      {followup.notes}
                    </p>
                  </div>
                )}

                {/* ACTIONS */}

                <div className="mt-5 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  {lead?.mobile && (
                    <a
                      href={`tel:${lead.mobile}`}
                      className={smallAction}
                    >
                      <Phone size={15} />
                      Call
                    </a>
                  )}

                  {lead?.mobile && (
                    <a
                      href={getWhatsAppUrl(
                        lead.mobile
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className={smallAction}
                    >
                      <MessageCircle
                        size={15}
                      />
                      WhatsApp
                    </a>
                  )}

                  {lead?.email && (
                    <a
                      href={`mailto:${lead.email}`}
                      className={smallAction}
                    >
                      <Mail size={15} />
                      Email
                    </a>
                  )}

                  <div className="flex-1" />

                  {followup.status ===
                    "Pending" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(
                            followup.id,
                            "Completed"
                          )
                        }
                        className="
                          px-4
                          py-2
                          rounded-lg
                          bg-emerald-50
                          text-emerald-700
                          text-sm
                          font-semibold
                          hover:bg-emerald-100
                        "
                      >
                        Mark Completed
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            followup.id,
                            "Cancelled"
                          )
                        }
                        className="
                          px-4
                          py-2
                          rounded-lg
                          bg-red-50
                          text-red-600
                          text-sm
                          font-semibold
                          hover:bg-red-100
                        "
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}

// ==========================================
// STAT CARD
// ==========================================

function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="text-3xl font-extrabold text-slate-900 mt-1">
            {value}
          </p>
        </div>

        <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// DETAIL
// ==========================================

function Detail({
  label,
  value,
}) {
  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="text-sm font-semibold text-slate-800 mt-1">
        {value}
      </p>
    </div>
  );
}

// ==========================================
// STATUS BADGE
// ==========================================

function StatusBadge({ status }) {
  const styles = {
    Pending:
      "bg-orange-50 text-orange-700 border-orange-100",

    Completed:
      "bg-emerald-50 text-emerald-700 border-emerald-100",

    Cancelled:
      "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        border
        text-xs
        font-semibold
        ${
          styles[status] ||
          "bg-slate-50 text-slate-600 border-slate-100"
        }
      `}
    >
      {status}
    </span>
  );
}

// ==========================================
// INPUT STYLE
// ==========================================

const inputStyle = `
  w-full
  border
  border-slate-200
  bg-slate-50
  rounded-xl
  px-4
  py-3
  text-sm
  outline-none
  focus:bg-white
  focus:border-blue-500
  focus:ring-2
  focus:ring-blue-100
`;

// ==========================================
// SMALL ACTION
// ==========================================

const smallAction = `
  inline-flex
  items-center
  gap-2
  px-4
  py-2
  rounded-lg
  bg-slate-100
  text-slate-600
  text-sm
  font-semibold
  hover:bg-blue-50
  hover:text-blue-600
  transition
`;
