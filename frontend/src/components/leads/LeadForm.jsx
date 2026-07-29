import { useState } from "react";
import { supabase } from "../../services/supabase";

export default function LeadForm() {
  const [lead, setLead] = useState({
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
  });

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!lead.customerName || !lead.mobile || !lead.destination) {
      alert("Please fill all required fields.");
      return;
    }

    console.log("Lead Data:", lead);

    alert("Lead Saved Successfully!");

    setLead({
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
    });
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Add New Lead</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={lead.customerName}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={lead.mobile}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={lead.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={lead.destination}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="date"
          name="travelDate"
          value={lead.travelDate}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="travelers"
          placeholder="Number of Travelers"
          value={lead.travelers}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={lead.budget}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="text"
          name="leadSource"
          placeholder="Lead Source (Website, WhatsApp, Referral)"
          value={lead.leadSource}
          onChange={handleChange}
          style={inputStyle}
        />

        <select
          name="status"
          value={lead.status}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Follow Up">Follow Up</option>
          <option value="Booked">Booked</option>
          <option value="Lost">Lost</option>
        </select>

        <textarea
          name="notes"
          placeholder="Notes"
          value={lead.notes}
          onChange={handleChange}
          style={{
            ...inputStyle,
            minHeight: "100px",
            resize: "vertical",
          }}
        />

        <button type="submit" style={buttonStyle}>
          Save Lead
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #d1d5db",
  borderRadius: "5px",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "10px 20px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};