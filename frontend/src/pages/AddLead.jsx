import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  Users,
  IndianRupee,
  FileText,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { supabase } from "../services/supabase";

export default function AddLead() {
  const navigate = useNavigate();

  const [lead, setLead] = useState({
    customerName: "",
    mobile: "",
    email: "",
    destination: "",
    travelDate: "",
    travelers: "",
    budget: "",
    leadSource: "Website",
    notes: "",
    status: "New",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLead((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (
      !lead.customerName.trim() ||
      !lead.mobile.trim() ||
      !lead.destination.trim() ||
      !lead.travelDate ||
      !lead.travelers ||
      !lead.budget ||
      !lead.leadSource ||
      !lead.notes.trim()
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        throw new Error("You are not logged in.");
      }

      const { error: insertError } = await supabase
        .from("leads")
        .insert({
          customer_name: lead.customerName.trim(),
          mobile: lead.mobile.trim(),
          email: lead.email.trim(),
          destination: lead.destination.trim(),
          travel_date: lead.travelDate,
          travelers: Number(lead.travelers),
          budget: Number(lead.budget),
          lead_source: lead.leadSource,
          status: lead.status,
          notes: lead.notes.trim(),
          agent_id: user.id,
        });

      if (insertError) {
        throw insertError;
      }

      setSuccess("Lead added successfully.");

      setLead({
        customerName: "",
        mobile: "",
        email: "",
        destination: "",
        travelDate: "",
        travelers: "",
        budget: "",
        leadSource: "Website",
        notes: "",
        status: "New",
      });
    } catch (err) {
      console.error("Lead Error:", err);
      setError(err.message || "Unable to save lead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Lead Management
            </p>

            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Add New Lead
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Capture a customer enquiry and add it to your CRM.
            </p>
          </div>
        </div>

        {/* Alerts */}
        {success && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            <CheckCircle2 size={20} />
            {success}
          </div>
        )}

        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          {/* Customer Information */}
          <div className="mb-7">
            <h2 className="text-lg font-bold text-slate-900">
              Customer Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the customer's basic contact details.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <InputField
                icon={<User size={18} />}
                label="Customer Name"
                name="customerName"
                value={lead.customerName}
                onChange={handleChange}
                placeholder="Enter customer name"
                required
              />

              <InputField
                icon={<Phone size={18} />}
                label="Mobile Number"
                name="mobile"
                value={lead.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                type="tel"
                required
              />

              <InputField
                icon={<Mail size={18} />}
                label="Email Address"
                name="email"
                value={lead.email}
                onChange={handleChange}
                placeholder="Enter email address"
                type="email"
              />
            </div>
          </div>

          {/* Travel Information */}
          <div className="border-t border-slate-200 pt-7">
            <h2 className="text-lg font-bold text-slate-900">
              Travel Requirement
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the customer's travel requirement.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <InputField
                icon={<MapPin size={18} />}
                label="Destination"
                name="destination"
                value={lead.destination}
                onChange={handleChange}
                placeholder="e.g. Goa, Dubai, Kashmir"
                required
              />

              <InputField
                icon={<CalendarDays size={18} />}
                label="Travel Date"
                name="travelDate"
                value={lead.travelDate}
                onChange={handleChange}
                type="date"
                required
              />

              <InputField
                icon={<Users size={18} />}
                label="Number of Travellers"
                name="travelers"
                value={lead.travelers}
                onChange={handleChange}
                type="number"
                min="1"
                placeholder="e.g. 4"
                required
              />

              <InputField
                icon={<IndianRupee size={18} />}
                label="Budget"
                name="budget"
                value={lead.budget}
                onChange={handleChange}
                type="number"
                min="0"
                placeholder="e.g. 50000"
                required
              />

              {/* Lead Source */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Lead Source
                </label>

                <select
                  name="leadSource"
                  value={lead.leadSource}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Website">Website</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Phone">Phone</option>
                  <option value="Walk-in">Walk-in</option>
                  <option value="Referral">Referral</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Lead Status
                </label>

                <select
                  name="status"
                  value={lead.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mt-7 border-t border-slate-200 pt-7">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <FileText size={18} />
              Customer Requirement / Notes
            </label>

            <textarea
              name="notes"
              value={lead.notes}
              onChange={handleChange}
              rows={5}
              placeholder="Describe customer's travel requirement, hotel preference, transport requirement, etc."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Lead"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  min,
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
        {icon}
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}