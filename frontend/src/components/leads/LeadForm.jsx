import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function LeadForm({
  selectedLead,
  clearSelectedLead,
  refreshLeads,
}) {
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

  const [lead, setLead] = useState(initialState);

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
        status: selectedLead.status || "New",
        notes: selectedLead.notes || "",
      });
    } else {
      setLead(initialState);
    }
  }, [selectedLead]);

  function handleChange(e) {
    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!lead.customerName || !lead.mobile || !lead.destination) {
      alert("Please fill required fields.");
      return;
    }

    const leadData = {
      customer_name: lead.customerName,
      mobile: lead.mobile,
      email: lead.email,
      destination: lead.destination,
      travel_date: lead.travelDate,
      travelers: lead.travelers,
      budget: lead.budget,
      lead_source: lead.leadSource,
      status: lead.status,
      notes: lead.notes,
    };

    let error;

    if (selectedLead) {
      const res = await supabase
        .from("leads")
        .update(leadData)
        .eq("id", selectedLead.id);

      error = res.error;
    } else {
      const res = await supabase
        .from("leads")
        .insert([leadData]);

      error = res.error;
    }

    if (error) {
      console.log(error);
      alert("Lead save failed.");
      return;
    }

    alert(selectedLead ? "Lead Updated Successfully" : "Lead Saved Successfully");

    setLead(initialState);

    if (clearSelectedLead) clearSelectedLead();
    if (refreshLeads) refreshLeads();
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">

      <h2 className="text-2xl font-bold mb-6">
        {selectedLead ? "✏️ Edit Lead" : "➕ Add New Lead"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >

        {[
          ["customerName", "Customer Name"],
          ["mobile", "Mobile Number"],
          ["email", "Email"],
          ["destination", "Destination"],
          ["travelDate", "Travel Date"],
          ["travelers", "Travelers"],
          ["budget", "Budget"],
          ["leadSource", "Lead Source"],
        ].map(([name, placeholder]) => (
          <input
            key={name}
            type={name === "travelDate" ? "date" : "text"}
            name={name}
            placeholder={placeholder}
            value={lead[name]}
            onChange={handleChange}
            className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        ))}

        <select
          name="status"
          value={lead.status}
          onChange={handleChange}
          className="border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Follow Up</option>
          <option>Booked</option>
          <option>Lost</option>
        </select>

        <textarea
          name="notes"
          rows="5"
          placeholder="Notes"
          value={lead.notes}
          onChange={handleChange}
          className="border border-slate-300 rounded-xl px-4 py-3 md:col-span-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <div className="md:col-span-2 flex justify-end">

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            {selectedLead ? "Update Lead" : "Save Lead"}
          </button>

        </div>

      </form>

    </div>
  );
}