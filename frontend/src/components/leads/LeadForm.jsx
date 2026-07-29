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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lead.customerName || !lead.mobile || !lead.destination) {
      alert("Please fill all required fields.");
      return;
    }

    const { error } = await supabase
      .from("leads")
      .insert([
        {
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
        },
      ]);

    if (error) {
      console.log("Supabase Error:", error);
      alert("Lead Save Failed");
      return;
    }

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
          placeholder="Email"
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
          placeholder="Travelers"
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
          placeholder="Lead Source"
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
          style={inputStyle}
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
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};