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
  TrendingUp,
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

      if (userError) throw userError;

      const user = userData?.user;

      if (!user) return;

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
        console.error("Profile Error:", profileError);
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

      if (leadsError) throw leadsError;

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
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">

            <div
              className="
                mx-auto
                h-10
                w-10
                animate-spin
                rounded-full
                border-4
                border-slate-200
                border-t-blue-600
              "
            />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading WorldTrip Connect...
            </p>

          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="p-6 lg:p-8">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Agent Workspace
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
              Welcome
              {agent?.full_name
                ? `, ${agent.full_name}`
                : ""}
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Manage your leads, customers, follow-ups
              and travel business opportunities.
            </p>

          </div>


          <button
            onClick={() => {
              window.location.href =
                "/lead-marketplace";
            }}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-blue-700
              hover:shadow-md
            "
          >
            <ShoppingBag size={17} />

            Browse Lead Marketplace

            <ArrowRight size={16} />

          </button>

        </div>


        {/* ==========================================
            KPI CARDS
        ========================================== */}

        <div className="mt-10">

          <div className="mb-4">

            <h2 className="text-lg font-bold text-slate-900">
              Business Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your current lead and sales performance.
            </p>

          </div>


          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <DashboardCard
              title="Available Credits"
              value={stats.remaining}
              description="Lead credits remaining"
              icon={Wallet}
              highlight
            />

            <DashboardCard
              title="My Leads"
              value={stats.total}
              description="Claimed opportunities"
              icon={Users}
            />

            <DashboardCard
              title="Follow-ups"
              value={stats.followup}
              description="Leads requiring action"
              icon={Clock}
            />

            <DashboardCard
              title="Booked Leads"
              value={stats.converted}
              description="Converted opportunities"
              icon={CheckCircle2}
              success
            />

          </div>

        </div>


        {/* ==========================================
            PLAN + PIPELINE
        ========================================== */}

        <div className="mt-10 grid grid-cols-1 gap-5 xl:grid-cols-3">

          {/* PLAN */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                  Subscription
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  {subscription
                    ?.subscription_plans
                    ?.plan_name ||
                    "No Active Plan"}
                </h2>

              </div>


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <CreditCard size={21} />
              </div>

            </div>


            <div className="mt-7 rounded-xl bg-slate-50 p-4">

              <p className="text-xs font-medium text-slate-400">
                Lead Limit
              </p>

              <div className="mt-1 flex items-end gap-2">

                <p className="text-2xl font-extrabold text-slate-900">
                  {subscription
                    ?.subscription_plans
                    ?.lead_limit || 0}
                </p>

                <p className="mb-1 text-xs text-slate-400">
                  leads
                </p>

              </div>

            </div>


            <button
              onClick={() => {
                window.location.href =
                  "/upgrade-plan";
              }}
              className="
                mt-5
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                py-2.5
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:border-blue-200
                hover:bg-blue-50
                hover:text-blue-700
              "
            >
              Upgrade Plan
              <ArrowRight size={16} />
            </button>

          </div>


          {/* PIPELINE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                  Lead Pipeline
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  Current Performance
                </h2>

              </div>


              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <TrendingUp size={21} />
              </div>

            </div>


            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">

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
                success
              />

            </div>

          </div>

        </div>


        {/* ==========================================
            TODAY FOLLOW UPS
        ========================================== */}

        <div className="mt-10">

          <TodayFollowUps />

        </div>


        {/* ==========================================
            QUICK ACTIONS
        ========================================== */}

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-5">

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Quick Actions
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              Manage Your Business
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Quickly access the tools you use most.
            </p>

          </div>


          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <QuickAction
              icon={ShoppingBag}
              title="Lead Marketplace"
              description="Find qualified leads"
              onClick={() => {
                window.location.href =
                  "/lead-marketplace";
              }}
            />

            <QuickAction
              icon={Users}
              title="My Leads"
              description="Manage claimed leads"
              onClick={() => {
                window.location.href =
                  "/my-leads";
              }}
            />

            <QuickAction
              icon={Clock}
              title="Follow-ups"
              description="Manage customer follow-ups"
              onClick={() => {
                window.location.href =
                  "/lead-followups";
              }}
            />

            <QuickAction
              icon={UserPlus}
              title="Add Lead"
              description="Create a new enquiry"
              onClick={() => {
                window.location.href =
                  "/add-lead";
              }}
            />

          </div>

        </div>

      </div>

    </Layout>
  );
}


/* ==========================================
   DASHBOARD CARD
========================================== */

function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  highlight = false,
  success = false,
}) {
  return (
    <div
      className={`
        rounded-2xl
        border
        bg-white
        p-5
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:shadow-md
        ${
          highlight
            ? "border-blue-200"
            : success
            ? "border-emerald-200"
            : "border-slate-200"
        }
      `}
    >

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
            {title}
          </p>

          <p
            className={`
              mt-2
              text-3xl
              font-extrabold
              ${
                highlight
                  ? "text-blue-700"
                  : success
                  ? "text-emerald-600"
                  : "text-slate-900"
              }
            `}
          >
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>

        </div>


        <div
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            ${
              highlight
                ? "bg-blue-50 text-blue-600"
                : success
                ? "bg-emerald-50 text-emerald-600"
                : "bg-slate-50 text-slate-600"
            }
          `}
        >
          <Icon size={21} />
        </div>

      </div>

    </div>
  );
}


/* ==========================================
   PIPELINE ITEM
========================================== */

function PipelineItem({
  label,
  value,
  success = false,
}) {
  return (
    <div
      className={`
        rounded-xl
        p-5
        ${
          success
            ? "bg-emerald-50"
            : "bg-slate-50"
        }
      `}
    >

      <p className="text-xs font-semibold text-slate-400">
        {label}
      </p>

      <p
        className={`
          mt-1
          text-2xl
          font-extrabold
          ${
            success
              ? "text-emerald-700"
              : "text-slate-900"
          }
        `}
      >
        {value}
      </p>

    </div>
  );
}


/* ==========================================
   QUICK ACTION
========================================== */

function QuickAction({
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-center
        justify-between
        rounded-xl
        border
        border-slate-200
        bg-slate-50
        p-4
        text-left
        transition
        hover:border-blue-200
        hover:bg-blue-50
      "
    >

      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-white
            text-blue-600
            shadow-sm
          "
        >
          <Icon size={19} />
        </div>


        <div>

          <p className="text-sm font-semibold text-slate-800">
            {title}
          </p>

          <p className="mt-0.5 text-xs text-slate-400">
            {description}
          </p>

        </div>

      </div>


      <ArrowRight
        size={17}
        className="
          text-slate-300
          transition
          group-hover:translate-x-1
          group-hover:text-blue-600
        "
      />

    </button>
  );
}


export default AgentDashboard;