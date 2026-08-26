import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  CalendarDays,
  Users,
  IndianRupee,
  FileText,
  Send,
  ArrowLeft,
} from "lucide-react";
import { supabase } from "../../services/supabase";
import Layout from "../../components/layout/Layout";

export default function CustomerRequirement() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    destination: "",
    travelDate: "",
    travelers: 1,
    budget: "",
    service: "Tour Package",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!form.destination.trim()) {
      setError("Please enter your destination.");
      return;
    }

    if (!form.travelDate) {
      setError("Please select your travel date.");
      return;
    }

    if (!form.travelers || Number(form.travelers) < 1) {
      setError("Please enter a valid number of travelers.");
      return;
    }

    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        navigate("/login");
        return;
      }

      /*
       * Create customer requirement as a lead.
       *
       * IMPORTANT:
       * Your existing leads table uses these fields.
       */

      const { error: insertError } = await supabase
        .from("leads")
        .insert([
          {
            customer_id: user.id,
            customer_name:
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              "Customer",
            email: user.email,
            destination: form.destination.trim(),
            travel_date: form.travelDate,
            travelers: Number(form.travelers),
            passengers: Number(form.travelers),
            budget: form.budget
              ? Number(form.budget)
              : null,
            service: form.service,
            lead_source: "Customer Requirement",
            source: "Customer Marketplace",
            status: "Qualified",
            notes: form.notes.trim(),
          },
        ]);

      if (insertError) {
        console.error("Requirement Error:", insertError);
        setError(insertError.message);
        return;
      }

      setMessage(
        "Your travel requirement has been submitted successfully."
      );

      setForm({
        destination: "",
        travelDate: "",
        travelers: 1,
        budget: "",
        service: "Tour Package",
        notes: "",
      });

      setTimeout(() => {
        navigate("/my-enquiries");
      }, 1200);
    } catch (err) {
      console.error("Customer Requirement Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 px-6 py-8 lg:px-10">

        {/* HEADER */}

        <div className="mx-auto max-w-5xl">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              Customer Requirement
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Tell Us About Your Trip
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
              Share your travel requirements and our travel partners can
              prepare suitable options for you.
            </p>
          </div>

          {/* SUCCESS */}

          {message && (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-700">
              {message}
            </div>
          )}

          {/* ERROR */}

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
          >

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {/* DESTINATION */}

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Destination *
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="destination"
                    value={form.destination}
                    onChange={handleChange}
                    placeholder="e.g. Goa, Dubai, Kashmir"
                    className="h-12 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* TRAVEL DATE */}

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Travel Date *
                </label>

                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="date"
                    name="travelDate"
                    value={form.travelDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="h-12 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* TRAVELERS */}

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Number of Travelers *
                </label>

                <div className="relative">
                  <Users
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    name="travelers"
                    min="1"
                    value={form.travelers}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* BUDGET */}

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Approximate Budget
                </label>

                <div className="relative">
                  <IndianRupee
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    name="budget"
                    min="0"
                    value={form.budget}
                    onChange={handleChange}
                    placeholder="e.g. 50000"
                    className="h-12 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* SERVICE */}

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Service Required
                </label>

                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Tour Package">
                    Tour Package
                  </option>

                  <option value="Hotel">
                    Hotel
                  </option>

                  <option value="Flight">
                    Flight
                  </option>

                  <option value="Bus">
                    Bus
                  </option>

                  <option value="Cab">
                    Cab
                  </option>

                  <option value="Visa">
                    Visa
                  </option>

                  <option value="Complete Trip">
                    Complete Trip
                  </option>
                </select>
              </div>

              {/* NOTES */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Additional Requirements
                </label>

                <div className="relative">
                  <FileText
                    size={18}
                    className="absolute left-3 top-4 text-slate-400"
                  />

                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell us about hotel preferences, activities, room requirements, special occasions, etc."
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

            </div>

            {/* INFO */}

            <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm leading-6 text-blue-700">
              Your requirement will be shared with relevant travel agents
              who can respond with suitable travel options.
            </div>

            {/* SUBMIT */}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={17} />
                    Submit Requirement
                  </>
                )}
              </button>

            </div>

          </form>

        </div>
      </div>
    </Layout>
  );
}