import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Globe2,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Plane,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  Phone,
} from "lucide-react";
import { supabase } from "../../services/supabase";

const initialForm = {
  destination: "",
  travel_type: "Domestic",
  departure_date: "",
  return_date: "",
  adults: 1,
  children: 0,
  infants: 0,
  budget: "",
  service: "Tour Package",
  customer_name: "",
  mobile: "",
  email: "",
  message: "",
};

function RequirementForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccess("");
    setErrorMessage("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setErrorMessage("");

    const { error } = await supabase
      .from("travel_requirements")
      .insert([
        {
          ...form,
          adults: Number(form.adults),
          children: Number(form.children),
          infants: Number(form.infants),
          budget: form.budget ? Number(form.budget) : null,
        },
      ]);

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setSuccess(
      "Your travel requirement has been submitted successfully. Our team will contact you with the best quotation."
    );

    setForm(initialForm);
  }

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-cyan-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
            <Sparkles size={16} />
            Personalized Travel Planning
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Plan Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Next Trip
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Tell us what you need and our travel team will help you find the
            right package, hotel, transport or travel service.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.5fr]">
          {/* Left Information Panel */}
          <div className="overflow-hidden rounded-3xl bg-slate-950 p-7 text-white shadow-xl sm:p-9">
            <div className="mb-8">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20">
                <Plane size={27} />
              </div>

              <h3 className="text-2xl font-black sm:text-3xl">
                Let&apos;s plan it together.
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                Share your travel requirements and our team will work on the
                best available options for your trip.
              </p>
            </div>

            <div className="space-y-5">
              <InfoItem
                icon={Globe2}
                title="Domestic & International"
                description="Travel anywhere with flexible options."
              />

              <InfoItem
                icon={Wallet}
                title="Options for Every Budget"
                description="Get packages matching your budget."
              />

              <InfoItem
                icon={Users}
                title="Personalized Quotations"
                description="Our team reviews your requirement."
              />

              <InfoItem
                icon={ShieldCheck}
                title="Trusted Travel Support"
                description="Get assistance throughout your planning."
              />
            </div>

            {/* Mini CTA */}
            <div className="mt-9 rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-sm font-bold text-white">
                Need help before submitting?
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Our travel experts can help you choose the right service.
              </p>

              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-400 transition hover:text-blue-300"
              >
                Contact our team
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-8">
            <div className="mb-7">
              <h3 className="text-xl font-black text-slate-900 sm:text-2xl">
                Tell us about your trip
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Fill in the details below. Fields marked with * are required.
              </p>
            </div>

            {/* Success */}
            {success && (
              <div className="mb-6 flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />

                <div>
                  <p className="font-bold">Requirement Submitted</p>
                  <p className="mt-1 leading-6">{success}</p>
                </div>
              </div>
            )}

            {/* Error */}
            {errorMessage && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
                <p className="font-bold">Unable to submit requirement</p>
                <p className="mt-1">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Destination */}
              <div>
                <SectionTitle
                  number="01"
                  title="Trip Details"
                  icon={MapPin}
                />

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Destination"
                    required
                    icon={MapPin}
                    className="sm:col-span-1"
                  >
                    <input
                      name="destination"
                      placeholder="e.g. Goa, Dubai, Bali"
                      value={form.destination}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Travel Type" icon={Globe2}>
                    <select
                      name="travel_type"
                      value={form.travel_type}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="Domestic">Domestic</option>
                      <option value="International">International</option>
                    </select>
                  </Field>

                  <Field label="Departure Date" icon={CalendarDays}>
                    <input
                      type="date"
                      name="departure_date"
                      value={form.departure_date}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Return Date" icon={CalendarDays}>
                    <input
                      type="date"
                      name="return_date"
                      value={form.return_date}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </Field>
                </div>
              </div>

              {/* Travelers */}
              <div>
                <SectionTitle
                  number="02"
                  title="Travelers & Budget"
                  icon={Users}
                />

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <NumberField
                    label="Adults"
                    name="adults"
                    value={form.adults}
                    onChange={handleChange}
                    min="1"
                  />

                  <NumberField
                    label="Children"
                    name="children"
                    value={form.children}
                    onChange={handleChange}
                    min="0"
                  />

                  <NumberField
                    label="Infants"
                    name="infants"
                    value={form.infants}
                    onChange={handleChange}
                    min="0"
                  />

                  <Field label="Budget (₹)" icon={Wallet}>
                    <input
                      type="number"
                      name="budget"
                      min="0"
                      placeholder="e.g. 50000"
                      value={form.budget}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </Field>
                </div>
              </div>

              {/* Service */}
              <div>
                <SectionTitle
                  number="03"
                  title="Required Service"
                  icon={Plane}
                />

                <div className="mt-4">
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="Tour Package">Tour Package</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Cab">Cab</option>
                    <option value="Bus">Bus</option>
                    <option value="Flight">Flight</option>
                    <option value="Visa">Visa</option>
                    <option value="Passport">Passport</option>
                    <option value="Insurance">Insurance</option>
                  </select>
                </div>
              </div>

              {/* Customer */}
              <div>
                <SectionTitle
                  number="04"
                  title="Your Contact Details"
                  icon={Users}
                />

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name" required icon={Users}>
                    <input
                      name="customer_name"
                      placeholder="Enter your full name"
                      value={form.customer_name}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Mobile Number" required icon={Phone}>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Enter mobile number"
                      value={form.mobile}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Email Address" icon={Mail}>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Additional Requirement" icon={MessageSquare}>
                    <textarea
                      name="message"
                      rows="3"
                      placeholder="Tell us anything else we should know..."
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </Field>
                </div>
              </div>

              {/* Submit */}
              <div className="border-t border-slate-100 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 text-base font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Submitting Requirement...
                    </>
                  ) : (
                    <>
                      Submit Travel Requirement
                      <ArrowRight size={19} />
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                  By submitting this form, you agree to be contacted regarding
                  your travel requirement.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------
   Reusable Components
---------------------------------- */

function InfoItem({ icon: Icon, title, description }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-blue-400 ring-1 ring-slate-800">
        <Icon size={19} />
      </div>

      <div>
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function SectionTitle({ number, title, icon: Icon }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <Icon size={17} />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs font-black text-blue-600">{number}</span>
        <h4 className="text-sm font-black text-slate-900 sm:text-base">
          {title}
        </h4>
      </div>
    </div>
  );
}

function Field({
  label,
  required = false,
  icon: Icon,
  children,
  className = "",
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-700">
        {Icon && <Icon size={14} className="text-slate-400" />}
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>

      {children}
    </label>
  );
}

function NumberField({ label, name, value, onChange, min }) {
  return (
    <Field label={label} icon={Users}>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        className={inputClass}
      />
    </Field>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

export default RequirementForm;