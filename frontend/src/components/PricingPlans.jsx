import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  Crown,
  Loader2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { supabase } from "../services/supabase";

function PricingPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("subscription_plans")
      .select("*")
      .eq("status", "active")
      .order("price", { ascending: true });

    if (error) {
      console.error("Plan Error:", error);
      setLoading(false);
      return;
    }

    setPlans(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <section className="bg-slate-50 px-6 py-20 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            SECTION HEADER
        ===================================================== */}
        <div className="mx-auto max-w-2xl text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            <Sparkles size={16} />
            Simple & Flexible Pricing
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Choose Your{" "}
            <span className="text-blue-600">
              Growth Plan
            </span>
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Start your travel business journey with WorldTrip Connect.
            Choose the plan that fits your business and grow with us.
          </p>
        </div>

        {/* =====================================================
            LOADING
        ===================================================== */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-3 text-slate-500">
              <Loader2
                size={22}
                className="animate-spin"
              />
              Loading plans...
            </div>
          </div>
        )}

        {/* =====================================================
            NO PLANS
        ===================================================== */}
        {!loading && plans.length === 0 && (
          <div className="mx-auto mt-12 max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <Crown
              size={32}
              className="mx-auto text-slate-400"
            />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Plans are currently unavailable
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Please check again shortly.
            </p>
          </div>
        )}

        {/* =====================================================
            PRICING CARDS
        ===================================================== */}
        {!loading && plans.length > 0 && (
          <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {plans.map((plan, index) => {

              const isTrial =
                plan.plan_name?.toLowerCase().includes("trial");

              const isPopular =
                index === 1 && !isTrial;

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col overflow-hidden rounded-3xl border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    isPopular
                      ? "border-blue-500 shadow-lg shadow-blue-100"
                      : "border-slate-200 shadow-sm"
                  }`}
                >

                  {/* Popular Badge */}
                  {isPopular && (
                    <div className="absolute right-5 top-5">
                      <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  {/* =================================================
                      CARD HEADER
                  ================================================= */}
                  <div className="p-7">

                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                      <Crown
                        size={24}
                        className="text-blue-600"
                      />
                    </div>

                    <h3 className="text-xl font-bold text-slate-900">
                      {plan.plan_name}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Perfect for growing travel businesses.
                    </p>

                    {/* Price */}
                    <div className="mt-6 flex items-end gap-1">
                      <span className="text-4xl font-extrabold text-slate-900">
                        ₹{Number(plan.price || 0).toLocaleString("en-IN")}
                      </span>

                      {plan.duration_days && (
                        <span className="mb-1 text-sm text-slate-500">
                          / {plan.duration_days} days
                        </span>
                      )}
                    </div>

                  </div>

                  {/* =================================================
                      FEATURES
                  ================================================= */}
                  <div className="flex-1 border-t border-slate-100 px-7 py-6">

                    <p className="mb-4 text-sm font-semibold text-slate-900">
                      What's included
                    </p>

                    <ul className="space-y-3">

                      {Array.isArray(plan.features) &&
                        plan.features.map((item, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start gap-3 text-sm text-slate-600"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                              <Check
                                size={13}
                                className="text-emerald-600"
                              />
                            </span>

                            <span>
                              {item}
                            </span>
                          </li>
                        ))}

                    </ul>

                  </div>

                  {/* =================================================
                      CTA
                  ================================================= */}
                  <div className="p-7 pt-2">

                    <Link
                      to="/register"
                      className={`flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition ${
                        isPopular
                          ? "bg-blue-600 text-white hover:bg-blue-500"
                          : "bg-slate-900 text-white hover:bg-blue-600"
                      }`}
                    >
                      {isTrial
                        ? "Start Free Trial"
                        : "Subscribe Now"}

                      <ArrowRight size={17} />
                    </Link>

                    <p className="mt-3 text-center text-xs text-slate-400">
                      No complicated setup
                    </p>

                  </div>
                </div>
              );
            })}

          </div>
        )}

        {/* =====================================================
            BOTTOM TRUST MESSAGE
        ===================================================== */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500">
            Start small, upgrade when your travel business grows.
          </p>
        </div>

      </div>
    </section>
  );
}

export default PricingPlans;