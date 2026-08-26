import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  UserRound,
  BriefcaseBusiness,
} from "lucide-react";

import { supabase } from "../../services/supabase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("customer");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      // ==========================================
      // SUPABASE LOGIN
      // ==========================================

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
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
          const expiry = new Date(
            subscription.end_date
          );

          if (today > expiry) {
            navigate("/upgrade-plan");
            return;
          }
        }

        navigate("/agent-dashboard");
        return;
      }

      alert("Invalid user role.");
    } catch (error) {
      console.error("Login Error:", error);

      alert(
        error?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

        {/* ==========================================
            LEFT BRAND PANEL
        ========================================== */}

        <div className="hidden lg:flex bg-slate-900 text-white p-12 flex-col justify-between">

          <div>

            <img
              src="/worldtrip-connect-logo.png"
              alt="WorldTrip Connect"
              className="w-[230px] h-auto object-contain object-left"
            />

            <div className="mt-16">

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
                Travel Business Platform
              </p>

              <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight mt-4">
                Manage your travel business
                <span className="text-blue-400">
                  {" "}smarter.
                </span>
              </h1>

              <p className="text-slate-400 mt-6 max-w-md leading-7">
                Connect with customers, manage leads,
                handle bookings and grow your travel
                business from one powerful platform.
              </p>

            </div>

          </div>


          {/* FEATURES */}

          <div className="space-y-4">

            <LoginFeature
              icon={<ShieldCheck size={18} />}
              title="Secure Platform"
              text="Powered by secure authentication."
            />

            <LoginFeature
              icon={<Users size={18} />}
              title="Lead Management"
              text="Manage your travel opportunities."
            />

            <LoginFeature
              icon={<BriefcaseBusiness size={18} />}
              title="Business Management"
              text="Everything your travel business needs."
            />

          </div>

        </div>


        {/* ==========================================
            LOGIN PANEL
        ========================================== */}

        <div className="p-7 sm:p-10 lg:p-12">

          {/* MOBILE LOGO */}

          <div className="lg:hidden flex justify-center mb-8">

            <img
              src="/worldtrip-connect-logo.png"
              alt="WorldTrip Connect"
              className="w-[210px] h-auto object-contain"
            />

          </div>


          {/* HEADER */}

          <div className="max-w-md mx-auto">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Welcome Back
            </p>

            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
              Sign in to your account
            </h2>

            <p className="text-slate-500 mt-2">
              Access your WorldTrip Connect workspace.
            </p>


            {/* ======================================
                LOGIN TYPE
            ====================================== */}

            <div className="mt-8">

              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Login As
              </label>

              <div className="grid grid-cols-3 gap-2">

                <LoginTypeButton
                  active={loginType === "admin"}
                  icon={<ShieldCheck size={17} />}
                  label="Admin"
                  onClick={() =>
                    setLoginType("admin")
                  }
                />

                <LoginTypeButton
                  active={loginType === "b2b_agent"}
                  icon={<BriefcaseBusiness size={17} />}
                  label="Agent"
                  onClick={() =>
                    setLoginType("b2b_agent")
                  }
                />

                <LoginTypeButton
                  active={loginType === "customer"}
                  icon={<UserRound size={17} />}
                  label="Customer"
                  onClick={() =>
                    setLoginType("customer")
                  }
                />

              </div>

            </div>


            {/* ======================================
                FORM
            ====================================== */}

            <form
              onSubmit={handleLogin}
              className="mt-7 space-y-5"
            >

              {/* EMAIL */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="email"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    text-slate-800
                    placeholder:text-slate-400
                    outline-none
                    transition
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-50
                  "
                />

              </div>


              {/* PASSWORD */}

              <div>

                <div className="flex items-center justify-between mb-2">

                  <label className="block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </Link>

                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="current-password"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    text-slate-800
                    placeholder:text-slate-400
                    outline-none
                    transition
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-50
                  "
                />

              </div>


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-blue-600
                  hover:bg-blue-700
                  disabled:bg-blue-300
                  text-white
                  px-5
                  py-3.5
                  rounded-xl
                  text-sm
                  font-bold
                  transition
                  shadow-sm
                "
              >

                {loading
                  ? "Signing in..."
                  : "Sign In"}

                {!loading && (
                  <ArrowRight size={17} />
                )}

              </button>

            </form>


            {/* ======================================
                REGISTER
            ====================================== */}

            <div className="text-center mt-7">

              <p className="text-sm text-slate-500">

                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Create an account
                </Link>

              </p>

            </div>


            {/* ======================================
                BACK HOME
            ====================================== */}

            <button
              onClick={() => navigate("/")}
              className="
                w-full
                mt-5
                py-3
                rounded-xl
                border
                border-slate-200
                text-slate-600
                hover:bg-slate-50
                text-sm
                font-semibold
                transition
              "
            >
              ← Back to Website
            </button>


            {/* FOOTER */}

            <p className="text-center text-xs text-slate-400 mt-8">
              © {new Date().getFullYear()} WorldTrip Connect
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


// ==========================================
// LOGIN TYPE BUTTON
// ==========================================

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
        flex-col
        items-center
        justify-center
        gap-1.5
        py-3
        rounded-xl
        border
        text-xs
        font-semibold
        transition
        ${
          active
            ? "border-blue-300 bg-blue-50 text-blue-700"
            : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}


// ==========================================
// FEATURE
// ==========================================

function LoginFeature({
  icon,
  title,
  text,
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="w-10 h-10 rounded-xl bg-white/10 text-blue-400 flex items-center justify-center">
        {icon}
      </div>

      <div>

        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="text-xs text-slate-500 mt-0.5">
          {text}
        </p>

      </div>

    </div>
  );
}


export default Login;