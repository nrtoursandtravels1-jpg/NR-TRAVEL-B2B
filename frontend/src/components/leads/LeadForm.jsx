import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

const initialState = {
  customerName: "",
  mobile: "",
  email: "",
  destination: "",
  travelDate: "",
  travelers: "",
  budget: "",
  leadSource: "",
  status: "New",
  notes: "",
};

export default function LeadForm({
  selectedLead,
  clearSelectedLead,
  refreshLeads,
  source = "admin",
  defaultStatus = "New",
}) {
  const [lead, setLead] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedLead) {
      setLead({
        customerName: selectedLead.customer_name || "",
        mobile: selectedLead.mobile || "",
        email: selectedLead.email || "",
        destination: selectedLead.destination || "",
        travelDate: selectedLead.travel_date || "",
        travelers: selectedLead.travelers || "",
        budget: selectedLead.budget || "",
        leadSource: selectedLead.lead_source || "",
        status: selectedLead.status || defaultStatus,
        notes: selectedLead.notes || "",
      });
    } else {
      setLead({
        ...initialState,
        leadSource: source,
        status: defaultStatus,
      });
    }
  }, [selectedLead, source, defaultStatus]);

  function handleChange(e) {
    const { name, value } = e.target;

    setLead((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!lead.customerName || !lead.mobile || !lead.destination) {
      alert("Please fill Customer Name, Mobile Number and Destination.");
      return;
    }

    try {
      setLoading(true);

      const leadData = {
        customer_name: lead.customerName,
        mobile: lead.mobile,
        email: lead.email,
        destination: lead.destination,
        travel_date: lead.travelDate || null,
        travelers: lead.travelers
          ? Number(lead.travelers)
          : null,
        budget: lead.budget
          ? Number(lead.budget)
          : null,
        lead_source: lead.leadSource || source,
        status: lead.status,
        notes: lead.notes,
      };

      let error;

      if (selectedLead) {
        const response = await supabase
          .from("leads")
          .update(leadData)
          .eq("id", selectedLead.id);

        error = response.error;
      } else {
        const response = await supabase
          .from("leads")
          .insert([leadData]);

        error = response.error;
      }

      if (error) {
        console.error("Lead Save Error:", error);
        alert(error.message || "Lead save failed.");
        return;
      }

      alert(
        selectedLead
          ? "Lead Updated Successfully"
          : "Lead Created Successfully"
      );

      setLead({
        ...initialState,
        leadSource: source,
        status: defaultStatus,
      });

      if (clearSelectedLead) {
        clearSelectedLead();
      }

      if (refreshLeads) {
        refreshLeads();
      }
    } catch (error) {
      console.error("Lead Error:", error);
      alert("Something went wrong while saving the lead.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8">

      {/* HEADER */}
      <div className="mb-7">

        <p className="text-xs font-bold tracking-[0.18em] uppercase text-blue-600 mb-2">
          Lead Business
        </p>

        <h2 className="text-2xl font-extrabold text-slate-900">
          {selectedLead ? "Edit Lead" : "Create New Lead"}
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Capture and manage travel enquiries from one place.
        </p>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >

        {/* CUSTOMER NAME */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Customer Name
          </label>

          <input
            name="customerName"
            placeholder="Enter customer name"
            value={lead.customerName}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* MOBILE */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Mobile Number
          </label>

          <input
            type="tel"
            name="mobile"
            placeholder="Enter mobile number"
            value={lead.mobile}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="customer@email.com"
            value={lead.email}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* DESTINATION */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Destination
          </label>

          <input
            name="destination"
            placeholder="Goa, Dubai, Kashmir..."
            value={lead.destination}
            onChange={handleChange}
            required
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* TRAVEL DATE */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Travel Date
          </label>

          <input
            type="date"
            name="travelDate"
            value={lead.travelDate}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* TRAVELERS */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Travelers
          </label>

          <input
            type="number"
            min="1"
            name="travelers"
            placeholder="Number of travelers"
            value={lead.travelers}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* BUDGET */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Budget
          </label>

          <input
            type="number"
            min="0"
            name="budget"
            placeholder="Expected budget"
            value={lead.budget}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* SOURCE */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Lead Source
          </label>

          <select
            name="leadSource"
            value={lead.leadSource}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select Source</option>
            <option value="admin">Admin</option>
            <option value="website">Website</option>
            <option value="customer_app">Customer App</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="excel">Excel Import</option>
            <option value="referral">Referral</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* STATUS */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Lead Status
          </label>

          <select
            name="status"
            value={lead.status}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="New">New</option>
            <option value="Qualified">Qualified</option>
            <option value="Contacted">Contacted</option>
            <option value="Follow Up">Follow Up</option>
            <option value="Booked">Booked</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        {/* NOTES */}
        <div className="md:col-span-2">

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Notes
          </label>

          <textarea
            name="notes"
            rows="4"
            placeholder="Travel requirements, preferences, special requests..."
            value={lead.notes}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none transition resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

        </div>

        {/* ACTIONS */}
        <div className="md:col-span-2 flex justify-end gap-3 pt-2">

          {selectedLead && (
            <button
              type="button"
              onClick={() => {
                setLead({
                  ...initialState,
                  leadSource: source,
                  status: defaultStatus,
                });

                if (clearSelectedLead) {
                  clearSelectedLead();
                }
              }}
              className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              bg-blue-600
              hover:bg-blue-700
              disabled:bg-slate-400
              text-white
              px-8
              py-3
              rounded-xl
              font-semibold
              transition
            "
          >
            {loading
              ? "Saving..."
              : selectedLead
              ? "Update Lead"
              : "Create Lead"}
          </button>

        </div>

      </form>

    </div>
  );
}