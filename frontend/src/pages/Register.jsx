import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  BriefcaseBusiness,
  MapPin,
  CheckCircle2,
  LockKeyhole,
} from "lucide-react";

import { supabase } from "../services/supabase";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ownerName: "",
    businessName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const validateForm = () => {
    if (!formData.ownerName.trim()) {
      return "Please enter the owner or contact person name.";
    }

    if (!formData.businessName.trim()) {
      return "Please enter your business name.";
    }

    if (!formData.email.trim()) {
      return "Please enter your email address.";
    }

    if (!formData.phone.trim()) {
      return "Please enter your mobile number.";
    }

    if (!formData.city.trim()) {
      return "Please enter your city.";
    }

    if (!formData.password) {
      return "Please create a password.";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      setLoading(true);

      // --------------------------------------------------
      // 1. Create Supabase Auth User
      // --------------------------------------------------

      const {
        data: authData,
        error: authError,
      } = await supabase.auth.signUp({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      if (authError) {
        throw authError;
      }

      if (!authData?.user) {
        throw new Error(
          "Account could not be created. Please try again."
        );
      }

      const userId = authData.user.id;

      // --------------------------------------------------
      // 2. Create Profile
      // --------------------------------------------------

      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: userId,
          full_name: formData.ownerName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          role: "agent",
        });

      if (profileError) {
        throw profileError;
      }

      // --------------------------------------------------
      // 3. Create Lead Provider Account
      // --------------------------------------------------

      const { error: providerError } = await supabase
        .from("lead_providers")
        .insert({
          user_id: userId,
          company_name: formData.businessName.trim(),
          business_type: "Travel Agency",
          status: "active",
        });

      if (providerError) {
        throw providerError;
      }

      // --------------------------------------------------
      // 4. Create 2 Day Trial Subscription
      // --------------------------------------------------

      const startDate = new Date();

      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 2);

      const { error: subscriptionError } = await supabase
        .from("subscriptions")
        .insert({
          user_id: userId,
          plan_id: "321798b7-23b0-494a-848c-107662d0cbc5",
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          status: "trial",
          payment_status: "free",
        });

      if (subscriptionError) {
        throw subscriptionError;
      }

      // --------------------------------------------------
      // 5. Success
      // --------------------------------------------------

      setSuccessMessage(
        "Account created successfully! Your 2 Day Free Trial has started."
      );

      // Give the user a moment to see the success message
      setTimeout(() => {
        navigate("/agent-dashboard");
      }, 1200);
    } catch (error) {
      console.error("Registration Error:", error);

      setErrorMessage(
        error?.message ||
          "Something went wrong while creating your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* =====================================================
          LEFT BRANDING SECTION
      ====================================================== */}

      <div className="hidden lg:flex lg:w-1/2 xl:w-[48%] bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-slate-900" />

        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between w-full p-10 xl:p-14">
          {/* Logo */}

          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg">
                <img
                  src="/worldtrip-connect-logo.png"
                  alt="WorldTrip Connect"
                  className="w-10 h-10 object-contain"
                />
              </div>

              <div>
                <div className="text-xl font-bold tracking-tight">
                  WorldTrip Connect
                </div>

                <div className="text-xs text-slate-400">
                  Travel B2B Network
                </div>
              </div>
            </Link>
          </div>

          {/* Main Content */}

          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm mb-6">
              <BriefcaseBusiness size={16} />
              Become a Travel Partner
            </div>

            <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
              Grow your travel business with
              <span className="text-blue-400"> better opportunities.</span>
            </h1>

            <p className="mt-6 text-slate-300 text-lg leading-8">
              Join the WorldTrip Connect B2B network and manage leads,
              customers, packages, bookings and your travel business from
              one powerful platform.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle2
                  size={20}
                  className="text-emerald-400"
                />
                <span className="text-slate-200">
                  Access qualified travel leads
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2
                  size={20}
                  className="text-emerald-400"
                />
                <span className="text-slate-200">
                  Manage your leads and customers
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2
                  size={20}
                  className="text-emerald-400"
                />
                <span className="text-slate-200">
                  Manage packages and bookings
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CheckCircle2
                  size={20}
                  className="text-emerald-400"
                />
                <span className="text-slate-200">
                  Start with a 2-day free trial
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}

          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} WorldTrip Connect. All rights
            reserved.
          </div>
        </div>
      </div>

      {/* =====================================================
          RIGHT REGISTER SECTION
      ====================================================== */}

      <div className="flex-1 flex items-center justify-center px-5 py-8 sm:px-8 lg:px-10">
        <div className="w-full max-w-xl">
          {/* Mobile Logo */}

          <div className="flex lg:hidden justify-center mb-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                <img
                  src="/worldtrip-connect-logo.png"
                  alt="WorldTrip Connect"
                  className="w-10 h-10 object-contain"
                />
              </div>

              <div>
                <div className="text-lg font-bold text-slate-900">
                  WorldTrip Connect
                </div>

                <div className="text-xs text-slate-500">
                  Travel B2B Network
                </div>
              </div>
            </Link>
          </div>

          {/* Heading */}

          <div className="mb-7">
            <div className="inline-flex items-center gap-2 text-blue-600 text-sm font-semibold mb-3">
              <BriefcaseBusiness size={18} />
              Travel Partner Registration
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Create your account
            </h2>

            <p className="mt-2 text-slate-500">
              Register your travel business and start your free trial.
            </p>
          </div>

          {/* Error */}

          {errorMessage && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          {/* Success */}

          {successMessage && (
            <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 flex items-start gap-2">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}

          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >
            {/* Owner Name */}

            <div>
              <label
                htmlFor="ownerName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Owner / Contact Person
              </label>

              <input
                id="ownerName"
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                placeholder="Enter full name"
                autoComplete="name"
                disabled={loading}
                className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-100"
              />
            </div>

            {/* Business Name */}

            <div>
              <label
                htmlFor="businessName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Business Name
              </label>

              <input
                id="businessName"
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Enter travel agency name"
                autoComplete="organization"
                disabled={loading}
                className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-100"
              />
            </div>

            {/* Email */}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loading}
                className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-100"
              />
            </div>

            {/* Phone + City */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Mobile Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  autoComplete="tel"
                  disabled={loading}
                  className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-100"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  City
                </label>

                <div className="relative">
                  <MapPin
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Your city"
                    disabled={loading}
                    className="w-full h-12 rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Password */}

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  disabled={loading}
                  className="w-full h-12 rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-700"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Password must contain at least 6 characters.
              </p>
            </div>

            {/* Trial Info */}

            <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={20}
                  className="text-blue-600 mt-0.5 shrink-0"
                />

                <div>
                  <p className="text-sm font-semibold text-blue-900">
                    2 Day Free Trial
                  </p>

                  <p className="text-xs text-blue-700 mt-1 leading-5">
                    No payment required to start. Your trial
                    subscription will be created automatically.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Start 2 Day Free Trial
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Login */}

          <div className="mt-7 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
          </div>

          {/* Back Home */}

          <div className="mt-5 text-center">
            <Link
              to="/"
              className="text-sm text-slate-500 hover:text-slate-800"
            >
              ← Back to Home
            </Link>
          </div>

          {/* Security */}

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={15} />
            Secure registration powered by Supabase
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;