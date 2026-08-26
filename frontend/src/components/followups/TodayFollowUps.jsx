import { useEffect, useState } from "react";
import {
  Phone,
  MessageCircle,
  Mail,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { supabase } from "../../services/supabase";

export default function TodayFollowUps() {
  const [followups, setFollowups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayFollowUps();
  }, []);

  async function fetchTodayFollowUps() {
    try {
      setLoading(true);

      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) throw userError;

      const user = userData?.user;

      if (!user) {
        setFollowups([]);
        return;
      }

      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      // ==========================================
      // GET TODAY'S ACTIVITIES
      // ==========================================

      const { data: activityData, error: activityError } =
        await supabase
          .from("lead_activities")
          .select("*")
          .eq("agent_id", user.id)
          .gte("next_follow_up_at", start.toISOString())
          .lte("next_follow_up_at", end.toISOString())
          .order("next_follow_up_at", {
            ascending: true,
          });

      if (activityError) throw activityError;

      if (!activityData?.length) {
        setFollowups([]);
        return;
      }

      // ==========================================
      // GET LEAD IDS
      // ==========================================

      const leadIds = activityData
        .map((activity) => activity.lead_id)
        .filter(Boolean);

      if (!leadIds.length) {
        setFollowups([]);
        return;
      }

      // ==========================================
      // GET LEADS
      // ==========================================

      const { data: leadData, error: leadError } =
        await supabase
          .from("leads")
          .select(
            "id, customer_name, mobile, email, destination"
          )
          .in("id", leadIds);

      if (leadError) throw leadError;

      // ==========================================
      // MERGE ACTIVITY + LEAD
      // ==========================================

      const mergedData = activityData.map((activity) => {
        const lead = leadData?.find(
          (item) => item.id === activity.lead_id
        );

        return {
          ...activity,

          customer_name:
            lead?.customer_name || "Customer",

          mobile: lead?.mobile || "",

          email: lead?.email || "",

          destination: lead?.destination || "",
        };
      });

      setFollowups(mergedData);
    } catch (error) {
      console.error(
        "Today's Follow-ups Error:",
        error
      );

      setFollowups([]);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // COMPLETE ACTIVITY
  // ==========================================

  async function markCompleted(id) {
    try {
      const { error } = await supabase
        .from("lead_activities")
        .update({
          activity_type: "Completed",
        })
        .eq("id", id);

      if (error) throw error;

      setFollowups((items) =>
        items.map((item) =>
          item.id === id
            ? {
                ...item,
                activity_type: "Completed",
              }
            : item
        )
      );
    } catch (error) {
      console.error(
        "Complete Follow-up Error:",
        error
      );

      alert("Unable to complete follow-up.");
    }
  }

  function formatTime(date) {
    if (!date) return "--";

    return new Date(date).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <p className="text-slate-500">
          Loading today's follow-ups...
        </p>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

      {/* HEADER */}

      <div className="flex items-center justify-between p-6 border-b border-slate-100">

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            Sales Activity
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Today's Follow-ups
          </h2>
        </div>

        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Clock size={20} />
        </div>

      </div>

      {/* EMPTY */}

      {followups.length === 0 && (
        <div className="p-10 text-center">

          <CheckCircle2
            size={38}
            className="mx-auto text-emerald-500"
          />

          <h3 className="font-semibold text-slate-700 mt-3">
            No follow-ups scheduled today
          </h3>

          <p className="text-sm text-slate-400 mt-1">
            Your sales activity is clear for today.
          </p>

        </div>
      )}

      {/* LIST */}

      <div className="divide-y divide-slate-100">

        {followups.map((item) => (
          <FollowUpItem
            key={item.id}
            item={item}
            formatTime={formatTime}
            markCompleted={markCompleted}
          />
        ))}

      </div>

    </div>
  );
}

// ==========================================
// FOLLOW-UP ITEM
// ==========================================

function FollowUpItem({
  item,
  formatTime,
  markCompleted,
}) {
  const isCompleted =
    item.activity_type === "Completed";

  return (
    <div
      className={`
        p-5
        transition
        ${
          isCompleted
            ? "bg-slate-50 opacity-70"
            : "hover:bg-slate-50"
        }
      `}
    >

      <div className="flex flex-col lg:flex-row lg:items-center gap-5">

        {/* TIME */}

        <div className="lg:w-24">

          <p className="text-lg font-bold text-slate-900">
            {formatTime(item.next_follow_up_at)}
          </p>

          <p className="text-xs text-slate-400">
            {item.activity_type}
          </p>

        </div>

        {/* CUSTOMER */}

        <div className="flex-1">

          <h3 className="font-bold text-slate-900">
            {item.customer_name}
          </h3>

          <p className="text-sm text-slate-500">
            {item.destination ||
              "Destination not specified"}
          </p>

          {item.notes && (
            <p className="text-sm text-slate-400 mt-1">
              {item.notes}
            </p>
          )}

        </div>

        {/* ACTIONS */}

        <div className="flex flex-wrap items-center gap-2">

          {/* CALL */}

          {item.mobile && (
            <a
              href={`tel:${item.mobile}`}
              className={actionButton}
              title="Call customer"
            >
              <Phone size={16} />
            </a>
          )}

          {/* WHATSAPP */}

          {item.mobile && (
            <a
              href={`https://wa.me/91${String(
                item.mobile
              ).replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className={actionButton}
              title="WhatsApp customer"
            >
              <MessageCircle size={16} />
            </a>
          )}

          {/* EMAIL */}

          {item.email && (
            <a
              href={`mailto:${item.email}`}
              className={actionButton}
              title="Email customer"
            >
              <Mail size={16} />
            </a>
          )}

          {/* COMPLETE */}

          {!isCompleted && (
            <button
              onClick={() =>
                markCompleted(item.id)
              }
              className="
                inline-flex
                items-center
                gap-2
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
              <CheckCircle2 size={16} />
              Complete
            </button>
          )}

          {isCompleted && (
            <span
              className="
                px-3
                py-2
                rounded-lg
                bg-emerald-50
                text-emerald-700
                text-sm
                font-semibold
              "
            >
              Completed
            </span>
          )}

        </div>

      </div>

    </div>
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
  hover:bg-blue-50
  hover:text-blue-600
  transition
`;