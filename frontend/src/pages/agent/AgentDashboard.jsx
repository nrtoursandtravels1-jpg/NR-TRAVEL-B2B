import { useEffect, useState } from "react";
import {
  CreditCard,
  Users,
  CheckCircle2,
  Clock,
  Wallet,
  ArrowRight,
  ShoppingBag,
  UserPlus,
} from "lucide-react";

import { supabase } from "../../services/supabase";
import TodayFollowUps from "../../components/followups/TodayFollowUps";
import Layout from "../../components/layout/Layout";

function AgentDashboard() {
  const [agent, setAgent] = useState(null);
  const [subscription, setSubscription] = useState(null);

  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    followup: 0,
    converted: 0,
    remaining: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      // ==========================================
      // CURRENT USER
      // ==========================================

      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      const user = userData?.user;

      if (!user) {
        return;
      }

      // ==========================================
      // PROFILE
      // ==========================================

      const { data: profile, error: profileError } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

      if (profileError) {
        console.error(
          "Profile Error:",
          profileError
        );
      }

      setAgent(profile || null);

      // ==========================================
      // SUBSCRIPTION
      // ==========================================

      const {
        data: sub,
        error: subscriptionError,
      } = await supabase
        .from("subscriptions")
        .select(`
          *,
          subscription_plans(
            plan_name,
            lead_limit
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        })
        .limit(1)
        .maybeSingle();

      if (subscriptionError) {
        console.error(
          "Subscription Error:",
          subscriptionError
        );
      }

      setSubscription(sub || null);

      // ==========================================
      // MY CLAIMED LEADS
      // ==========================================

      const {
        data: leads,
        error: leadsError,
      } = await supabase
        .from("leads")
        .select("id, status")
        .eq("agent_id", user.id);

      if (leadsError) {
        throw leadsError;
      }

      const total = leads?.length || 0;

      const newLeads =
        leads?.filter(
          (lead) => lead.status === "New"
        ).length || 0;

      const followup =
        leads?.filter(
          (lead) => lead.status === "Follow Up"
        ).length || 0;

      const converted =
        leads?.filter(
          (lead) => lead.status === "Booked"
        ).length || 0;

      // ==========================================
      // LEAD WALLET
      // ==========================================

      const {
        data: wallet,
        error: walletError,
      } = await supabase
        .from("lead_wallets")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (walletError) {
        console.error(
          "Wallet Error:",
          walletError
        );
      }

      setStats({
        total,
        new: newLeads,
        followup,
        converted,
        remaining:
          wallet?.remaining_leads || 0,
      });
    } catch (error) {
      console.error(
        "Dashboard Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Agent Dashboard
          </p>

          <h1 className="text-2xl font-bold text-slate-900 mt-2">
            Loading dashboard...
          </h1>
        </div>
      </Layout>
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================

  return (
    <Layout>

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="mb-8">

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
          Agent Workspace
        </p>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mt-2">

          <div>

            <h1 className="text-3xl font-extrabold text-slate-900">
              Welcome
              {agent?.full_name
                ? `, ${agent.full_name}`
                : ""}
            </h1>

            <p className="text-slate-500 mt-2">
              Manage your leads, follow-ups and
              travel business opportunities.
            </p>

          </div>

          <button
            onClick={() =>
              (window.location.href =
                "/lead-marketplace")
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
              text-sm
              font-semibold
              transition
            "
          >
            <ShoppingBag size={17} />
            Browse Lead Marketplace
            <ArrowRight size={16} />
          </button>

        </div>

      </div>


      {/* ==========================================
          KPI CARDS
      ========================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <DashboardCard
          title="Available Credits"
          value={stats.remaining}
          subtitle="Lead credits remaining"
          icon={<Wallet size={21} />}
          highlight
        />

        <DashboardCard
          title="My Leads"
          value={stats.total}
          subtitle="Claimed opportunities"
          icon={<Users size={21} />}
        />

        <DashboardCard
          title="Follow-ups"
          value={stats.followup}
          subtitle="Leads requiring follow-up"
          icon={<Clock size={21} />}
        />

        <DashboardCard
          title="Booked Leads"
          value={stats.converted}
          subtitle="Converted opportunities"
          icon={<CheckCircle2 size={21} />}
        />

      </div>


      {/* ==========================================
          SUBSCRIPTION + PIPELINE
      ========================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-8">

        {/* SUBSCRIPTION */}

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Current Plan
              </p>

              <h2 className="text-xl font-bold text-slate-900 mt-1">
                {subscription
                  ?.subscription_plans
                  ?.plan_name ||
                  "No Active Plan"}
              </h2>

            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CreditCard size={21} />
            </div>

          </div>

          <div className="mt-6">

            <p className="text-xs text-slate-400">
              Lead Limit
            </p>

            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {subscription
                ?.subscription_plans
                ?.lead_limit || 0}
            </p>

          </div>

          <button
            onClick={() =>
              (window.location.href =
                "/upgrade-plan")
            }
            className="
              mt-5
              w-full
              border
              border-slate-200
              hover:border-blue-300
              hover:bg-blue-50
              text-slate-700
              hover:text-blue-700
              px-4
              py-2.5
              rounded-xl
              text-sm
              font-semibold
              transition
            "
          >
            Upgrade Plan
          </button>

        </div>


        {/* PIPELINE */}

        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Lead Pipeline
              </p>

              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Current Performance
              </h2>

            </div>

            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={21} />
            </div>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

            <PipelineItem
              label="New"
              value={stats.new}
            />

            <PipelineItem
              label="Follow Up"
              value={stats.followup}
            />

            <PipelineItem
              label="Booked"
              value={stats.converted}
            />

          </div>

        </div>

      </div>


      {/* ==========================================
          TODAY FOLLOW UPS
      ========================================== */}

      <div className="mb-8">

        <TodayFollowUps />

      </div>


      {/* ==========================================
          QUICK ACTIONS
      ========================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

        <div className="mb-5">

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Quick Actions
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Manage Your Business
          </h2>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <QuickAction
            icon={<ShoppingBag size={19} />}
            title="Lead Marketplace"
            description="Find qualified leads"
            onClick={() =>
              (window.location.href =
                "/lead-marketplace")
            }
          />

          <QuickAction
            icon={<Users size={19} />}
            title="My Leads"
            description="Manage claimed leads"
            onClick={() =>
              (window.location.href =
                "/my-leads")
            }
          />

          <QuickAction
            icon={<Clock size={19} />}
            title="Follow-ups"
            description="Manage follow-ups"
            onClick={() =>
              (window.location.href =
                "/lead-followups")
            }
          />

          <QuickAction
            icon={<UserPlus size={19} />}
            title="Add Lead"
            description="Create a new enquiry"
            onClick={() =>
              (window.location.href =
                "/add-lead")
            }
          />

        </div>

      </div>

    </Layout>
  );
}


// ==========================================
// DASHBOARD CARD
// ==========================================

function DashboardCard({
  title,
  value,
  subtitle,
  icon,
  highlight = false,
}) {
  return (
    <div
      className={`
        bg-white
        border
        rounded-2xl
        p-5
        shadow-sm
        ${
          highlight
            ? "border-blue-200"
            : "border-slate-200"
        }
      `}
    >

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {title}
          </p>

          <p
            className={`
              text-3xl
              font-extrabold
              mt-2
              ${
                highlight
                  ? "text-blue-700"
                  : "text-slate-900"
              }
            `}
          >
            {value}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            {subtitle}
          </p>

        </div>

        <div
          className={`
            w-11
            h-11
            rounded-xl
            flex
            items-center
            justify-center
            ${
              highlight
                ? "bg-blue-50 text-blue-600"
                : "bg-slate-50 text-slate-600"
            }
          `}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}


// ==========================================
// PIPELINE ITEM
// ==========================================

function PipelineItem({
  label,
  value,
}) {
  return (
    <div className="bg-slate-50 rounded-xl p-4">

      <p className="text-xs text-slate-400">
        {label}
      </p>

      <p className="text-2xl font-extrabold text-slate-900 mt-1">
        {value}
      </p>

    </div>
  );
}


// ==========================================
// QUICK ACTION
// ==========================================

function QuickAction({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="
        text-left
        bg-slate-50
        hover:bg-blue-50
        border
        border-slate-200
        hover:border-blue-200
        rounded-xl
        p-4
        transition
      "
    >

      <div className="flex items-center gap-3">

        <div className="w-9 h-9 rounded-lg bg-white text-blue-600 flex items-center justify-center shadow-sm">
          {icon}
        </div>

        <div>

          <p className="text-sm font-semibold text-slate-800">
            {title}
          </p>

          <p className="text-xs text-slate-400 mt-0.5">
            {description}
          </p>

        </div>

      </div>

    </button>
  );
}

export default AgentDashboard;