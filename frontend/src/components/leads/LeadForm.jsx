import { useState } from "react";

export default function LeadForm() {
  const [lead, setLead] = useState({
    customerName: "",
    mobile: "",
    destination: "",
  });

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Lead Saved Successfully!");

    console.log(lead);
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
          type="text"
          name="destination"
          placeholder="Destination"
          value={lead.destination}
          onChange={handleChange}
          style={inputStyle}
        />

        <button style={buttonStyle}>
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
};

const buttonStyle = {
  padding: "10px 20px",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};