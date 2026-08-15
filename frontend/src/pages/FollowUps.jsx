import { useEffect, useMemo, useState } from "react";
import {
  Phone,
  MessageCircle,
  CalendarDays,
  Clock,
  CheckCircle2,
} from "lucide-react";

import { supabase } from "../services/supabase";
import Layout from "../components/layout/Layout";

export default function FollowUps() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFollowUps();
  }, []);

  const fetchFollowUps = async () => {
    try {
      setLoading(true);

      const {
        data: userData,
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const user = userData?.user;

      if (!user) {
        setActivities([]);
        return;
      }

      const { data, error } = await supabase
        .from("lead_activities")
        .select(`
          *,
          leads (
            id,
            customer_name,
            mobile,
            email,
            destination,
            travel_date,
            status
          )
        `)
        .eq("agent_id", user.id)
        .not("next_follow_up_at", "is", null)
        .order("next_follow_up_at", {
          ascending: true,
        });

      if (error) throw error;

      setActivities(data || []);
    } catch (error) {
      console.error(
        "Follow Ups Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const categorized = useMemo(() => {
    const now = new Date();

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const overdue = [];
    const today = [];
    const upcoming = [];

    activities.forEach((activity) => {
      const followUpDate = new Date(
        activity.next_follow_up_at
      );

      if (followUpDate < startOfToday) {
        overdue.push(activity);
      } else if (
        followUpDate >= startOfToday &&
        followUpDate <= endOfToday
      ) {
        today.push(activity);
      } else if (followUpDate > now) {
        upcoming.push(activity);
      }
    });

    return {
      overdue,
      today,
      upcoming,
    };
  }, [activities]);

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

  const FollowUpCard = ({
    activity,
    type,
  }) => {
    const lead = activity.leads;

    if (!lead) return null;

    const badge =
      type === "overdue"
        ? "bg-red-50 text-red-700 border-red-100"
        : type === "today"
        ? "bg-orange-50 text-orange-700 border-orange-100"
        : "bg-blue-50 text-blue-700 border-blue-100";

    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-slate-900">
                {lead.customer_name ||
                  "Customer"}
              </h3>

              <span
                className={`px-3 py-1 rounded-full border text-xs font-semibold ${badge}`}
              >
                {type === "overdue"
                  ? "Overdue"
                  : type === "today"
                  ? "Today"
                  : "Upcoming"}
              </span>
            </div>

            <p className="text-sm text-slate-500 mt-1">
              {lead.destination ||
                "Travel enquiry"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {lead.mobile && (
              <a
                href={`tel:${lead.mobile}`}
                className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600"
                title="Call"
              >
                <Phone size={16} />
              </a>
            )}

            {lead.mobile && (
              <a
                href={`https://wa.me/91${String(
                  lead.mobile
                ).replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600"
                title="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-blue-600">
              <CalendarDays size={16} />

              <span className="text-xs font-semibold">
                Follow-up
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-800 mt-2">
              {formatDateTime(
                activity.next_follow_up_at
              )}
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-400">
              Activity
            </p>

            <p className="text-sm font-semibold text-slate-800 mt-2">
              {activity.activity_type}
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-400">
              Lead Status
            </p>

            <p className="text-sm font-semibold text-slate-800 mt-2">
              {lead.status || "Contacted"}
            </p>
          </div>
        </div>

        {activity.notes && (
          <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-blue-600">
              Follow-up Notes
            </p>

            <p className="text-sm text-slate-700 mt-1">
              {activity.notes}
            </p>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-16 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Follow-ups
          </p>

          <h1 className="text-2xl font-bold text-slate-900 mt-2">
            Loading follow-ups...
          </h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* HEADER */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
          Agent Workspace
        </p>

        <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
          Follow-ups
        </h1>

        <p className="text-slate-500 mt-2">
          Stay on top of your customer follow-up
          schedule.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <StatCard
          label="Overdue"
          value={categorized.overdue.length}
          icon={<Clock size={20} />}
        />

        <StatCard
          label="Today"
          value={categorized.today.length}
          icon={<CalendarDays size={20} />}
        />

        <StatCard
          label="Upcoming"
          value={categorized.upcoming.length}
          icon={<CheckCircle2 size={20} />}
        />
      </div>

      {/* OVERDUE */}
      <section className="mb-8">
        <SectionHeader
          title="Overdue Follow-ups"
          count={categorized.overdue.length}
        />

        {categorized.overdue.length === 0 ? (
          <EmptyState text="No overdue follow-ups." />
        ) : (
          <div className="space-y-4">
            {categorized.overdue.map(
              (activity) => (
                <FollowUpCard
                  key={activity.id}
                  activity={activity}
                  type="overdue"
                />
              )
            )}
          </div>
        )}
      </section>

      {/* TODAY */}
      <section className="mb-8">
        <SectionHeader
          title="Today's Follow-ups"
          count={categorized.today.length}
        />

        {categorized.today.length === 0 ? (
          <EmptyState text="No follow-ups scheduled for today." />
        ) : (
          <div className="space-y-4">
            {categorized.today.map(
              (activity) => (
                <FollowUpCard
                  key={activity.id}
                  activity={activity}
                  type="today"
                />
              )
            )}
          </div>
        )}
      </section>

      {/* UPCOMING */}
      <section>
        <SectionHeader
          title="Upcoming Follow-ups"
          count={categorized.upcoming.length}
        />

        {categorized.upcoming.length === 0 ? (
          <EmptyState text="No upcoming follow-ups." />
        ) : (
          <div className="space-y-4">
            {categorized.upcoming.map(
              (activity) => (
                <FollowUpCard
                  key={activity.id}
                  activity={activity}
                  type="upcoming"
                />
              )
            )}
          </div>
        )}
      </section>
    </Layout>
  );
}

// ==========================================
// STAT CARD
// ==========================================

function StatCard({
  label,
  value,
  icon,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase">
            {label}
          </p>

          <p className="text-3xl font-extrabold text-slate-900 mt-2">
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
// SECTION HEADER
// ==========================================

function SectionHeader({
  title,
  count,
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-slate-900">
        {title}
      </h2>

      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
        {count}
      </span>
    </div>
  );
}

// ==========================================
// EMPTY
// ==========================================

function EmptyState({ text }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
      <p className="text-sm text-slate-400">
        {text}
      </p>
    </div>
  );
}