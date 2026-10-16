import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  Crown,
  Sparkles,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

import { supabase } from "../../services/supabase";

function SubscriptionPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("subscription_plans")
        .select("*")
        .eq("status", "active")
        .order("price", { ascending: true });

      if (error) {
        throw error;
      }

      setPlans(data || []);
    } catch (err) {
      console.error("Subscription plans error:", err);
      setError("Unable to load subscription plans.");
    } finally {
      setLoading(false);
    }
  };

  /*
   * Fallback plans.
   * These are also used if the database is empty.
   */
  const defaultPlans = [
    {
      id: "trial",
      plan_name: "Trial",
      price: 0,
      duration_days: 2,
      lead_credits: 0,
      status: "active",
      features: [
        "CRM Dashboard",
        "Customer Management",
        "Package Management",
        "Explore Platform Features",
        "Qualified Lead Access: Not Included",
      ],
    },
    {
      id: "starter",
      plan_name: "Starter",
      price: 499,
      duration_days: 30,
      lead_credits: 10,
      status: "active",
      features: [
        "10 Qualified Leads",
        "Lead Marketplace Access",
        "CRM & Lead Management",
        "My Leads",
        "Follow-up Management",
        "Customer Management",
      ],
    },
    {
      id: "growth",
      plan_name: "Growth",
      price: 999,
      duration_days: 30,
      lead_credits: 30,
      status: "active",
      features: [
        "30 Qualified Leads",
        "Lead Marketplace Access",
        "Complete CRM",
        "My Leads & Follow-ups",
        "Customer Management",
        "Package Management",
        "Business Dashboard",
      ],
    },
    {
      id: "professional",
      plan_name: "Professional",
      price: 1999,
      duration_days: 30,
      lead_credits: 75,
      status: "active",
      features: [
        "75 Qualified Leads",
        "Lead Marketplace Access",
        "Complete CRM",
        "Advanced Lead Management",
        "Customer Management",
        "Package Management",
        "Hotel Management",
        "Business Analytics",
      ],
    },
    {
      id: "business",
      plan_name: "Business",
      price: 3999,
      duration_days: 30,
      lead_credits: 200,
      status: "active",
      features: [
        "200 Qualified Leads",
        "Priority Lead Access",
        "Complete CRM",
        "Advanced Business Tools",
        "Customer Management",
        "Package & Hotel Management",
        "Business Analytics",
        "Priority Partner Support",
      ],
    },
  ];

  const displayPlans =
    plans.length > 0 ? plans : defaultPlans;

  const isTrialPlan = (plan) => {
    const name = String(
      plan.plan_name || plan.name || ""
    ).toLowerCase();

    return (
      name.includes("trial") ||
      (Number(plan.price || 0) === 0 && !name.includes("business"))
    );
  };

  const getPlanName = (plan) => {
    return plan.plan_name || plan.name || "Travel Partner Plan";
  };

  const getPrice = (plan) => {
    const price = Number(plan.price || 0);

    if (price === 0) {
      return "Free";
    }

    return `₹${price.toLocaleString("en-IN")}`;
  };

  const getDuration = (plan) => {
    const days = Number(plan.duration_days || 0);

    if (days === 2) {
      return "2 Days Trial";
    }

    if (days === 30) {
      return "Per Month";
    }

    if (days > 0) {
      return `${days} Days`;
    }

    return "Monthly Plan";
  };

  const getLeadCredits = (plan) => {
    const credits = Number(
      plan.lead_credits ??
        plan.qualified_lead_credits ??
        plan.leads ??
        0
    );

    return credits;
  };

  const getFeatures = (plan) => {
    if (Array.isArray(plan.features)) {
      return plan.features;
    }

    if (typeof plan.features === "string") {
      try {
        const parsed = JSON.parse(plan.features);

        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch {
        return plan.features
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    }

    const credits = getLeadCredits(plan);

    const baseFeatures = [];

    if (credits > 0) {
      baseFeatures.push(
        `${credits} Qualified Leads`
      );
    }

    baseFeatures.push(
      "Lead Marketplace Access",
      "CRM & Lead Management",
      "Customer Management",
      "Follow-up Management"
    );

    return baseFeatures;
  };

  /*
   * Growth is our main attraction plan.
   */
  const isPopularPlan = (plan) => {
    const name = getPlanName(plan).toLowerCase();

    return name === "growth";
  };

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-slate-950 py-20 text-white"
    >
      {/* Background decoration */}
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
            <Crown size={16} />
            Travel Agent Plans
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Grow Your Travel Business
            <span className="block text-blue-400">
              With Qualified Leads
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Choose a plan that gives your travel agency access to
            Qualified Travel Leads and powerful business management tools.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              <Zap size={16} className="text-yellow-400" />
              Qualified Leads
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              <Users size={16} className="text-blue-400" />
              B2B Travel Network
            </div>

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              <ShieldCheck
                size={16}
                className="text-emerald-400"
              />
              Secure CRM
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex items-center gap-3 text-slate-300">
              <Loader2
                size={24}
                className="animate-spin"
              />
              Loading plans...
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mx-auto max-w-lg rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center">
            <p className="font-semibold text-red-300">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchPlans}
              className="mt-4 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Plans */}
        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

            {displayPlans.map((plan, index) => {
              const trial = isTrialPlan(plan);
              const popular = isPopularPlan(plan);
              const credits = getLeadCredits(plan);
              const features = getFeatures(plan);

              return (
                <div
                  key={plan.id || index}
                  className={`relative flex flex-col rounded-3xl border p-6 transition duration-300 hover:-translate-y-2 ${
                    popular
                      ? "border-blue-500 bg-gradient-to-b from-blue-600/20 to-slate-900 shadow-2xl shadow-blue-900/30"
                      : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]"
                  }`}
                >

                  {/* Popular badge */}
                  {popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <div className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-xs font-bold uppercase tracking-wide shadow-lg shadow-blue-900/30">
                        <Sparkles size={14} />
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Trial badge */}
                  {trial && (
                    <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                      <Check size={14} />
                      Free Trial
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${
                      popular
                        ? "bg-blue-500/20 text-blue-400"
                        : trial
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-white/10 text-slate-300"
                    }`}
                  >
                    {trial ? (
                      <Sparkles size={24} />
                    ) : (
                      <Crown size={24} />
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl font-bold">
                    {getPlanName(plan)}
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    {getDuration(plan)}
                  </p>

                  {/* Price */}
                  <div className="mt-6">
                    <span className="text-4xl font-extrabold tracking-tight">
                      {getPrice(plan)}
                    </span>

                    {!trial && (
                      <span className="ml-2 text-sm text-slate-500">
                        / month
                      </span>
                    )}
                  </div>

                  {/* Lead highlight */}
                  <div
                    className={`mt-6 rounded-2xl p-4 ${
                      credits > 0
                        ? popular
                          ? "bg-blue-500/15"
                          : "bg-white/5"
                        : "bg-slate-800/60"
                    }`}
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Qualified Lead Credits
                    </p>

                    <p
                      className={`mt-1 text-2xl font-extrabold ${
                        credits > 0
                          ? "text-white"
                          : "text-slate-500"
                      }`}
                    >
                      {credits > 0
                        ? `${credits} Leads`
                        : "0 Leads"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {credits > 0
                        ? "Claim Qualified Leads"
                        : "Paid plan required"}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="my-6 h-px bg-white/10" />

                  {/* Features */}
                  <div className="flex-1">
                    <p className="mb-4 text-sm font-semibold text-slate-300">
                      What's included
                    </p>

                    <ul className="space-y-3">
                      {features.map(
                        (feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start gap-3 text-sm text-slate-300"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                              <Check
                                size={13}
                                strokeWidth={3}
                              />
                            </span>

                            <span>{feature}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Link
                    to="/register"
                    className={`mt-8 flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition ${
                      popular
                        ? "bg-blue-600 text-white hover:bg-blue-500"
                        : trial
                        ? "bg-white text-slate-900 hover:bg-slate-100"
                        : "bg-white text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {trial
                      ? "Start Free Trial"
                      : "Get Started"}

                    <ArrowRight size={17} />
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom message */}
        <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">

          <div className="flex items-center justify-center gap-2 text-sm font-semibold text-white">
            <Sparkles
              size={18}
              className="text-yellow-400"
            />
            Simple & Transparent
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            1 Qualified Lead Credit is used only when an agent
            successfully claims a Qualified Lead. Browsing leads
            does not consume credits.
          </p>
        </div>

        {/* Trust */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-slate-400">

          <div className="flex items-center gap-2">
            <ShieldCheck
              size={18}
              className="text-emerald-400"
            />
            Secure platform
          </div>

          <div className="flex items-center gap-2">
            <Check
              size={18}
              className="text-emerald-400"
            />
            Qualified travel leads
          </div>

          <div className="flex items-center gap-2">
            <Check
              size={18}
              className="text-emerald-400"
            />
            Built for travel agencies
          </div>
        </div>
      </div>
    </section>
  );
}

export default SubscriptionPlans;