import { useState } from "react";
import {
  UserRound,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Heart,
  LockKeyhole,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../../services/auth";

export default function CustomerLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage(
        "Please enter your customer email and password."
      );
      return;
    }

    try {
      setLoading(true);

      await loginUser(email.trim(), password);

      navigate("/customer-dashboard");
    } catch (error) {
      console.error("Customer Login Error:", error);

      setErrorMessage(
        error?.message ||
          "Unable to login. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

        <div className="grid min-h-[620px] grid-cols-1 lg:grid-cols-2">

          {/* =====================================================
              LEFT CUSTOMER BRAND PANEL
          ====================================================== */}

          <div className="relative hidden overflow-hidden bg-slate-950 text-white lg:flex">

            {/* Decorative background */}

            <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 flex w-full flex-col justify-between p-12">

              {/* BRAND */}

              <div>

                <img
                  src="/worldtrip-connect-logo.png"
                  alt="WorldTrip Connect"
                  className="w-[220px] object-contain object-left"
                />

                <div className="mt-16">

                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-300">

                    <MapPin size={14} />

                    Travel With Us

                  </div>

                  <h1 className="text-4xl font-black leading-tight xl:text-5xl">

                    Your next journey
                    <span className="block text-blue-400">
                      starts here.
                    </span>

                  </h1>

                  <p className="mt-6 max-w-md text-sm leading-7 text-slate-400 xl:text-base">

                    Discover amazing destinations, explore travel
                    packages, manage your enquiries and keep all
                    your trips in one place.

                  </p>

                </div>

              </div>

              {/* FEATURES */}

              <div className="space-y-4">

                <CustomerFeature
                  icon={<MapPin size={19} />}
                  title="Explore Destinations"
                  text="Discover destinations and travel experiences."
                />

                <CustomerFeature
                  icon={<Heart size={19} />}
                  title="Save Your Favorites"
                  text="Keep your favorite packages and trips together."
                />

                <CustomerFeature
                  icon={<ShieldCheck size={19} />}
                  title="Secure Account"
                  text="Your personal travel information stays protected."
                />

              </div>

            </div>

          </div>

          {/* =====================================================
              RIGHT LOGIN PANEL
          ====================================================== */}

          <div className="flex items-center bg-white px-5 py-10 sm:px-10 lg:px-12">

            <div className="mx-auto w-full max-w-md">

              {/* MOBILE LOGO */}

              <div className="mb-8 flex justify-center lg:hidden">

                <img
                  src="/worldtrip-connect-logo.png"
                  alt="WorldTrip Connect"
                  className="w-[210px] object-contain"
                />

              </div>

              {/* HEADER */}

              <div>

                <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">

                  <LockKeyhole size={14} />

                  Customer Login

                </div>

                <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">

                  Welcome back

                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">

                  Sign in to manage your trips and travel
                  enquiries.

                </p>

              </div>

              {/* ERROR */}

              {errorMessage && (

                <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">

                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />

                  <p className="leading-5">
                    {errorMessage}
                  </p>

                </div>

              )}

              {/* FORM */}

              <form
                onSubmit={handleLogin}
                className="mt-7 space-y-5"
              >

                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="customer-email"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Customer Email
                  </label>

                  <input
                    id="customer-email"
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
                      htmlFor="customer-password"
                      className="block text-sm font-bold text-slate-700"
                    >
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-xs font-bold text-blue-600 hover:text-blue-700"
                    >
                      Forgot password?
                    </Link>

                  </div>

                  <div className="relative">

                    <input
                      id="customer-password"
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
                    id="customer-remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />

                  <label
                    htmlFor="customer-remember"
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
                      Login as Customer

                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}

                </button>

              </form>

              {/* SECURITY */}

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">

                <ShieldCheck size={14} />

                Secure customer authentication

              </div>

              {/* REGISTER */}

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

              {/* BACK */}

              <button
                type="button"
                onClick={() => navigate("/login")}
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
                ← Back to Login
              </button>

              {/* FOOTER */}

              <p className="mt-7 text-center text-xs text-slate-400">

                © {new Date().getFullYear()} WorldTrip Connect.
                All rights reserved.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


// ============================================================
// CUSTOMER FEATURE
// ============================================================

function CustomerFeature({
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
