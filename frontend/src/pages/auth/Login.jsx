import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  UserRound,
  BriefcaseBusiness,
  Eye,
  EyeOff,
  CheckCircle2,
  LockKeyhole,
} from "lucide-react";

import { supabase } from "../../services/supabase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      // ==========================================
      // SUPABASE LOGIN
      // ==========================================

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (error) {
        throw error;
      }

      const user = data?.user;

      if (!user) {
        throw new Error("Unable to find logged-in user.");
      }

      // ==========================================
      // GET PROFILE
      // ==========================================

      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      if (!profile) {
        throw new Error("Your profile could not be found.");
      }

      // ==========================================
      // ADMIN
      // ==========================================

      if (profile.role === "admin") {
        navigate("/admin-dashboard");
        return;
      }

      // ==========================================
      // CUSTOMER
      // ==========================================

      if (profile.role === "customer") {
        navigate("/customer-dashboard");
        return;
      }

      // ==========================================
      // B2B TRAVEL AGENT
      // ==========================================

      if (
        profile.role === "b2b_agent" ||
        profile.role === "travel_agent"
      ) {
        const {
          data: subscription,
          error: subError,
        } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          })
          .limit(1)
          .maybeSingle();

        // No subscription
        if (subError || !subscription) {
          navigate("/upgrade-plan");
          return;
        }

        // Check subscription expiry
        if (subscription.end_date) {
          const today = new Date();
          const expiry = new Date(subscription.end_date);

          if (today > expiry) {
            navigate("/upgrade-plan");
            return;
          }
        }

        navigate("/agent-dashboard");
        return;
      }

      throw new Error("Invalid user role.");
    } catch (error) {
      console.error("Login Error:", error);

      setErrorMessage(
        error?.message ||
          "Unable to login. Please check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-6 sm:py-10">

      <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

        <div className="grid min-h-[680px] grid-cols-1 lg:grid-cols-2">

          {/* =====================================================
              LEFT BRAND PANEL
          ====================================================== */}

          <div className="relative hidden overflow-hidden bg-slate-950 text-white lg:flex">

            {/* Decorative background */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">

              {/* BRAND */}

              <div>

                <img
                  src="/worldtrip-connect-logo.png"
                  alt="WorldTrip Connect"
                  className="h-auto w-[220px] object-contain object-left"
                />

                <div className="mt-16 max-w-lg">

                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                    <span className="h-2 w-2 rounded-full bg-blue-400" />
                    Travel Business Platform
                  </div>

                  <h1 className="text-4xl font-black leading-tight xl:text-5xl">
                    Grow your travel business
                    <span className="block text-blue-400">
                      smarter & faster.
                    </span>
                  </h1>

                  <p className="mt-6 max-w-md text-sm leading-7 text-slate-400 xl:text-base">
                    Manage leads, customers, packages, bookings and
                    your complete travel business from one powerful
                    platform.
                  </p>

                </div>

              </div>

              {/* FEATURES */}

              <div className="mt-10 space-y-4">

                <LoginFeature
                  icon={<ShieldCheck size={19} />}
                  title="Secure & Reliable"
                  text="Secure authentication and protected business data."
                />

                <LoginFeature
                  icon={<Users size={19} />}
                  title="Powerful CRM"
                  text="Manage customers, leads and follow-ups easily."
                />

                <LoginFeature
                  icon={<BriefcaseBusiness size={19} />}
                  title="Built for Travel Businesses"
                  text="Everything you need to manage your travel operations."
                />

              </div>

            </div>

          </div>

          {/* =====================================================
              RIGHT LOGIN PANEL
          ====================================================== */}

          <div className="flex items-center bg-white px-5 py-8 sm:px-8 lg:px-12">

            <div className="mx-auto w-full max-w-md">

              {/* MOBILE LOGO */}

              <div className="mb-8 flex justify-center lg:hidden">

                <img
                  src="/worldtrip-connect-logo.png"
                  alt="WorldTrip Connect"
                  className="h-auto w-[210px] object-contain"
                />

              </div>

              {/* HEADER */}

              <div>

                <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  <LockKeyhole size={14} />
                  Secure Login
                </div>

                <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Sign in to continue to your WorldTrip Connect
                  workspace.
                </p>

              </div>

              {/* =================================================
                  LOGIN TYPE
              ================================================== */}

              <div className="mt-8">

                <label className="mb-3 block text-sm font-bold text-slate-700">
                  Login as
                </label>

                <div className="grid grid-cols-3 gap-2">

                  <LoginTypeButton
                    active={loginType === "admin"}
                    icon={<ShieldCheck size={18} />}
                    label="Admin"
                    onClick={() => setLoginType("admin")}
                  />

                  <LoginTypeButton
                    active={loginType === "b2b_agent"}
                    icon={<BriefcaseBusiness size={18} />}
                    label="Agent"
                    onClick={() => setLoginType("b2b_agent")}
                  />

                  <LoginTypeButton
                    active={loginType === "customer"}
                    icon={<UserRound size={18} />}
                    label="Customer"
                    onClick={() => setLoginType("customer")}
                  />

                </div>

              </div>

              {/* =================================================
                  ERROR MESSAGE
              ================================================== */}

              {errorMessage && (
                <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">

                  <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />

                  <p className="leading-5">
                    {errorMessage}
                  </p>

                </div>
              )}

              {/* =================================================
                  FORM
              ================================================== */}

              <form
                onSubmit={handleLogin}
                className="mt-6 space-y-5"
              >

                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="login-email"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMessage("");
                    }}
                    autoComplete="email"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      px-4
                      py-3.5
                      text-sm
                      text-slate-800
                      outline-none
                      transition
                      placeholder:text-slate-400
                      hover:border-slate-300
                      focus:border-blue-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-blue-50
                    "
                  />

                </div>

                {/* PASSWORD */}

                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="login-password"
                      className="block text-sm font-bold text-slate-700"
                    >
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-xs font-bold text-blue-600 transition hover:text-blue-700"
                    >
                      Forgot password?
                    </Link>

                  </div>

                  <div className="relative">

                    <input
                      id="login-password"
                      type={
                        showPassword ? "text" : "password"
                      }
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrorMessage("");
                      }}
                      autoComplete="current-password"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-slate-50
                        px-4
                        py-3.5
                        pr-12
                        text-sm
                        text-slate-800
                        outline-none
                        transition
                        placeholder:text-slate-400
                        hover:border-slate-300
                        focus:border-blue-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-blue-50
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((value) => !value)
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        rounded-lg
                        p-2
                        text-slate-400
                        transition
                        hover:bg-slate-100
                        hover:text-slate-600
                      "
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>

                {/* REMEMBER */}

                <div className="flex items-center gap-2">

                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  <label
                    htmlFor="remember"
                    className="text-xs font-medium text-slate-500"
                  >
                    Keep me signed in
                  </label>

                </div>

                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-3.5
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    shadow-blue-600/20
                    transition
                    hover:bg-blue-700
                    hover:shadow-blue-600/30
                    disabled:cursor-not-allowed
                    disabled:bg-blue-300
                    disabled:shadow-none
                  "
                >

                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In

                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}

                </button>

              </form>

              {/* =================================================
                  SECURITY NOTE
              ================================================== */}

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">

                <ShieldCheck size={14} />

                Secure login powered by Supabase

              </div>

              {/* =================================================
                  REGISTER
              ================================================== */}

              <div className="mt-7 border-t border-slate-100 pt-6 text-center">

                <p className="text-sm text-slate-500">

                  Don't have an account?{" "}

                  <Link
                    to="/register"
                    className="font-bold text-blue-600 transition hover:text-blue-700"
                  >
                    Create an account
                  </Link>

                </p>

              </div>

              {/* =================================================
                  BACK HOME
              ================================================== */}

              <button
                type="button"
                onClick={() => navigate("/")}
                className="
                  mt-4
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-slate-600
                  transition
                  hover:border-slate-300
                  hover:bg-slate-50
                "
              >
                ← Back to Website
              </button>

              {/* FOOTER */}

              <p className="mt-7 text-center text-xs text-slate-400">
                © {new Date().getFullYear()} WorldTrip Connect. All
                rights reserved.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


// ============================================================
// LOGIN TYPE BUTTON
// ============================================================

function LoginTypeButton({
  active,
  icon,
  label,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        min-h-[78px]
        flex-col
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        px-2
        py-3
        text-xs
        font-bold
        transition
        ${
          active
            ? "border-blue-300 bg-blue-50 text-blue-700 shadow-sm"
            : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50"
        }
      `}
    >
      <span
        className={`
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          ${
            active
              ? "bg-blue-600 text-white"
              : "bg-slate-100 text-slate-500"
          }
        `}
      >
        {icon}
      </span>

      {label}

    </button>
  );
}


// ============================================================
// FEATURE
// ============================================================

function LoginFeature({
  icon,
  title,
  text,
}) {
  return (
    <div className="flex items-center gap-4">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-400">
        {icon}
      </div>

      <div>

        <p className="text-sm font-bold text-white">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {text}
        </p>

      </div>

    </div>
  );
}


export default Login;
