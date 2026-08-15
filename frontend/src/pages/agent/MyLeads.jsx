import { useEffect, useMemo, useState } from "react";
import {
  Phone,
  Mail,
  MessageCircle,
  CalendarDays,
  MapPin,
  Users,
  Plus,
  X,
  Clock,
} from "lucide-react";

import { supabase } from "../../services/supabase";
import Layout from "../../components/layout/Layout";

export default function MyLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [activityLead, setActivityLead] = useState(null);
  const [activities, setActivities] = useState([]);
  const [activityLoading, setActivityLoading] = useState(false);

  const [activityForm, setActivityForm] = useState({
    activity_type: "Follow Up",
    notes: "",
    next_follow_up_at: "",
  });

  useEffect(() => {
    fetchMyLeads();
  }, []);

  // ==========================================
  // FETCH MY LEADS
  // ==========================================

  const fetchMyLeads = async () => {
    try {
      setLoading(true);

      const {
        data: userData,
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const user = userData?.user;

      if (!user) {
        setLeads([]);
        return;
      }

      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("agent_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) throw error;

      setLeads(data || []);
    } catch (error) {
      console.error("My Leads Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FILTER
  // ==========================================

  const filteredLeads = useMemo(() => {
    const keyword = searchTerm.toLowerCase().trim();

    return leads.filter((lead) => {
      const matchesSearch =
        !keyword ||
        lead.customer_name
          ?.toLowerCase()
          .includes(keyword) ||
        lead.mobile
          ?.toLowerCase()
          .includes(keyword) ||
        lead.destination
          ?.toLowerCase()
          .includes(keyword);

      const matchesStatus =
        !statusFilter ||
        lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [
    leads,
    searchTerm,
    statusFilter,
  ]);

  // ==========================================
  // UPDATE STATUS
  // ==========================================

  const updateStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      setLeads((previous) =>
        previous.map((lead) =>
          lead.id === id
            ? { ...lead, status }
            : lead
        )
      );
    } catch (error) {
      console.error(
        "Status Update Error:",
        error
      );

      alert("Unable to update lead status.");
    }
  };

  // ==========================================
  // OPEN ACTIVITY MODAL
  // ==========================================

  const openActivityModal = async (lead) => {
    setActivityLead(lead);

    setActivityForm({
      activity_type: "Follow Up",
      notes: "",
      next_follow_up_at: "",
    });

    await fetchActivities(lead.id);
  };

  // ==========================================
  // FETCH ACTIVITIES
  // ==========================================

  const fetchActivities = async (leadId) => {
    try {
      setActivityLoading(true);

      const { data, error } = await supabase
        .from("lead_activities")
        .select("*")
        .eq("lead_id", leadId)
        .order("created_at", {
          ascending: false,
        });

      if (error) throw error;

      setActivities(data || []);
    } catch (error) {
      console.error(
        "Activity Fetch Error:",
        error
      );

      setActivities([]);
    } finally {
      setActivityLoading(false);
    }
  };

  // ==========================================
  // ADD ACTIVITY
  // ==========================================

  const addActivity = async () => {
    try {
      if (!activityLead) return;

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

      if (!activityForm.notes.trim()) {
        alert("Please enter activity notes.");
        return;
      }

      const { error } = await supabase
        .from("lead_activities")
        .insert({
          lead_id: activityLead.id,
          agent_id: user.id,
          activity_type:
            activityForm.activity_type,
          notes: activityForm.notes.trim(),
          next_follow_up_at:
            activityForm.next_follow_up_at
              ? new Date(
                  activityForm.next_follow_up_at
                ).toISOString()
              : null,
        });

      if (error) throw error;

      alert("Activity added successfully.");

      setActivityForm({
        activity_type: "Follow Up",
        notes: "",
        next_follow_up_at: "",
      });

      await fetchActivities(
        activityLead.id
      );
    } catch (error) {
      console.error(
        "Add Activity Error:",
        error
      );

      alert(
        error.message ||
          "Unable to add activity."
      );
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // FORMAT DATE TIME
  // ==========================================

  const formatDateTime = (date) => {
    if (!date) return "-";

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
  };

  // ==========================================
  // BUDGET
  // ==========================================

  const formatBudget = (budget) => {
    if (!budget) return "Not specified";

    const numericBudget = Number(budget);

    if (Number.isNaN(numericBudget)) {
      return budget;
    }

    return `₹ ${numericBudget.toLocaleString(
      "en-IN"
    )}`;
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <Layout>
        <div className="py-16 text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
            My Leads
          </p>

          <h1 className="text-2xl font-bold text-slate-900 mt-2">
            Loading your leads...
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
      <div className="mb-8">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
          Agent Workspace
        </p>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mt-2">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              My Leads
            </h1>

            <p className="text-slate-500 mt-2">
              Manage your claimed customer opportunities
              and follow up with every enquiry.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-3">
            <p className="text-xs text-blue-500 font-semibold">
              TOTAL MY LEADS
            </p>

            <p className="text-2xl font-extrabold text-blue-700">
              {filteredLeads.length}
            </p>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search customer, mobile or destination..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">
              All Statuses
            </option>

            <option value="Contacted">
              Contacted
            </option>

            <option value="Follow Up">
              Follow Up
            </option>

            <option value="Booked">
              Booked
            </option>

            <option value="Lost">
              Lost
            </option>
          </select>
        </div>
      </div>

      {/* LEADS */}
      {filteredLeads.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl py-16 text-center">
          <p className="text-lg font-semibold text-slate-700">
            No leads in your workspace
          </p>

          <p className="text-sm text-slate-400 mt-2">
            Claim qualified leads from the marketplace
            to start building your pipeline.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              {/* TOP */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-slate-900">
                      {lead.customer_name ||
                        "Customer"}
                    </h2>

                    <StatusBadge
                      status={
                        lead.status ||
                        "Contacted"
                      }
                    />
                  </div>

                  <p className="text-sm text-slate-500 mt-2">
                    Lead #{lead.id}
                  </p>
                </div>

                {/* QUICK ACTIONS */}
                <div className="flex items-center gap-2">
                  {lead.mobile && (
                    <a
                      href={`tel:${lead.mobile}`}
                      className={actionButton}
                      title="Call"
                    >
                      <Phone size={16} />
                    </a>
                  )}

                  {lead.email && (
                    <a
                      href={`mailto:${lead.email}`}
                      className={actionButton}
                      title="Email"
                    >
                      <Mail size={16} />
                    </a>
                  )}

                  {lead.mobile && (
                    <a
                      href={`https://wa.me/91${String(
                        lead.mobile
                      ).replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className={actionButton}
                      title="WhatsApp"
                    >
                      <MessageCircle size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <Detail
                  icon={<MapPin size={16} />}
                  label="Destination"
                  value={
                    lead.destination || "-"
                  }
                />

                <Detail
                  icon={
                    <CalendarDays size={16} />
                  }
                  label="Travel Date"
                  value={formatDate(
                    lead.travel_date
                  )}
                />

                <Detail
                  icon={<Users size={16} />}
                  label="Travelers"
                  value={
                    lead.travelers || "-"
                  }
                />

                <Detail
                  label="Budget"
                  value={formatBudget(
                    lead.budget
                  )}
                />
              </div>

              {/* CONTACT */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-400">
                    Mobile
                  </p>

                  <p className="text-sm font-semibold text-slate-800 mt-1">
                    {lead.mobile || "-"}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs text-slate-400">
                    Email
                  </p>

                  <p className="text-sm font-semibold text-slate-800 mt-1 break-all">
                    {lead.email || "-"}
                  </p>
                </div>
              </div>

              {/* NOTES */}
              {lead.notes && (
                <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <p className="text-xs font-semibold text-blue-600">
                    Customer Requirement
                  </p>

                  <p className="text-sm text-slate-700 mt-1">
                    {lead.notes}
                  </p>
                </div>
              )}

              {/* FOOTER */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-400">
                    Lead source
                  </p>

                  <p className="text-sm font-semibold text-slate-700 mt-1 capitalize">
                    {(
                      lead.lead_source ||
                      lead.source ||
                      "Unknown"
                    ).replaceAll("_", " ")}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={
                      lead.status ||
                      "Contacted"
                    }
                    onChange={(e) =>
                      updateStatus(
                        lead.id,
                        e.target.value
                      )
                    }
                    className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:border-blue-500"
                  >
                    <option value="Contacted">
                      Contacted
                    </option>

                    <option value="Follow Up">
                      Follow Up
                    </option>

                    <option value="Booked">
                      Booked
                    </option>

                    <option value="Lost">
                      Lost
                    </option>
                  </select>

                  <button
                    onClick={() =>
                      openActivityModal(lead)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Follow Up
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ACTIVITY MODAL */}
      {activityLead && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                  Lead Activity
                </p>

                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  {activityLead.customer_name}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {activityLead.destination ||
                    "Travel enquiry"}
                </p>
              </div>

              <button
                onClick={() =>
                  setActivityLead(null)
                }
                className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* ADD ACTIVITY */}
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 mb-4">
                Add Activity
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={
                    activityForm.activity_type
                  }
                  onChange={(e) =>
                    setActivityForm(
                      (previous) => ({
                        ...previous,
                        activity_type:
                          e.target.value,
                      })
                    )
                  }
                  className="border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option value="Follow Up">
                    Follow Up
                  </option>

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

                  <option value="Note">
                    Note
                  </option>
                </select>

                <input
                  type="datetime-local"
                  value={
                    activityForm.next_follow_up_at
                  }
                  onChange={(e) =>
                    setActivityForm(
                      (previous) => ({
                        ...previous,
                        next_follow_up_at:
                          e.target.value,
                      })
                    )
                  }
                  className="border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <textarea
                value={activityForm.notes}
                onChange={(e) =>
                  setActivityForm(
                    (previous) => ({
                      ...previous,
                      notes: e.target.value,
                    })
                  )
                }
                placeholder="Enter follow-up notes..."
                rows={4}
                className="w-full mt-4 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none resize-none focus:border-blue-500"
              />

              <button
                onClick={addActivity}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-semibold"
              >
                Save Activity
              </button>
            </div>

            {/* ACTIVITY HISTORY */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock
                  size={18}
                  className="text-blue-600"
                />

                <h3 className="font-bold text-slate-900">
                  Activity History
                </h3>
              </div>

              {activityLoading ? (
                <p className="text-sm text-slate-400">
                  Loading activities...
                </p>
              ) : activities.length === 0 ? (
                <div className="bg-slate-50 rounded-xl p-6 text-center">
                  <p className="text-sm text-slate-500">
                    No activities recorded yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {activities.map(
                    (activity) => (
                      <div
                        key={activity.id}
                        className="border border-slate-200 rounded-xl p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold">
                            {activity.activity_type}
                          </span>

                          <span className="text-xs text-slate-400">
                            {formatDateTime(
                              activity.created_at
                            )}
                          </span>
                        </div>

                        <p className="text-sm text-slate-700 mt-3">
                          {activity.notes}
                        </p>

                        {activity.next_follow_up_at && (
                          <p className="text-xs text-orange-600 font-semibold mt-3">
                            Next follow-up:{" "}
                            {formatDateTime(
                              activity.next_follow_up_at
                            )}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

// ==========================================
// DETAIL
// ==========================================

function Detail({
  icon,
  label,
  value,
}) {
  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <div className="flex items-center gap-2 text-blue-600">
        {icon}

        <p className="text-xs font-semibold">
          {label}
        </p>
      </div>

      <p className="text-sm font-semibold text-slate-800 mt-2">
        {value}
      </p>
    </div>
  );
}

// ==========================================
// STATUS BADGE
// ==========================================

function StatusBadge({ status }) {
  const colors = {
    Contacted:
      "bg-blue-50 text-blue-700 border-blue-100",

    "Follow Up":
      "bg-orange-50 text-orange-700 border-orange-100",

    Booked:
      "bg-emerald-50 text-emerald-700 border-emerald-100",

    Lost:
      "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full border text-xs font-semibold ${
        colors[status] ||
        "bg-slate-50 text-slate-600 border-slate-100"
      }`}
    >
      {status}
    </span>
  );
}

// ==========================================
// ACTION BUTTON
// ==========================================

const actionButton = `
  w-9
  h-9
  rounded-lg
  bg-slate-100
  text-slate-600
  flex
  items-center
  justify-center
  transition
  hover:bg-blue-50
  hover:text-blue-600
`;