import { useState } from "react";

function CRM() {
  const [leads, setLeads] = useState([
    {
      id: 1,
      agent: "ABC Travels",
      contact: "Rajesh",
      mobile: "9876543210",
      destination: "Goa",
      travelDate: "2026-08-15",
      passengers: 20,
      service: "Tempo Traveller",
      status: "New",
    },
    {
      id: 2,
      agent: "Sunrise Tours",
      contact: "Amit",
      mobile: "9876543211",
      destination: "Rajasthan",
      travelDate: "2026-09-10",
      passengers: 30,
      service: "Bus",
      status: "Follow-up",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    agent: "",
    contact: "",
    mobile: "",
    destination: "",
    travelDate: "",
    passengers: "",
    service: "",
    status: "New",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLead = {
      id: Date.now(),
      ...formData,
    };

    setLeads([...leads, newLead]);

    setFormData({
      agent: "",
      contact: "",
      mobile: "",
      destination: "",
      travelDate: "",
      passengers: "",
      service: "",
      status: "New",
    });

    setShowForm(false);
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        backgroundColor: "#f5f6fa",
        minHeight: "100vh",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1>NR Travel B2B CRM</h1>

          <p>
            Manage Travel Agents, Leads, Partners and Bookings
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "12px 20px",
            backgroundColor: "#111827",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {showForm ? "Close Form" : "+ Add New Lead"}
        </button>
      </div>

      <hr />

      {/* Add Lead Form */}

      {showForm && (
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            marginTop: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>Add New Lead</h2>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "15px",
              }}
            >
              <input
                type="text"
                name="agent"
                placeholder="Travel Agent / Company Name"
                value={formData.agent}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="contact"
                placeholder="Contact Person"
                value={formData.contact}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="destination"
                placeholder="Destination"
                value={formData.destination}
                onChange={handleChange}
                required
              />

              <input
                type="date"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="passengers"
                placeholder="Number of Passengers"
                value={formData.passengers}
                onChange={handleChange}
                required
              />

              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
              >
                <option value="">Select Service</option>
                <option value="Cab">Cab</option>
                <option value="Tempo Traveller">
                  Tempo Traveller
                </option>
                <option value="Bus">Bus</option>
                <option value="Hotel">Hotel</option>
                <option value="Tour Package">
                  Tour Package
                </option>
              </select>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Qualified">Qualified</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            <br />

            <button
              type="submit"
              style={{
                padding: "12px 25px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Save Lead
            </button>
          </form>
        </div>
      )}

      {/* CRM Statistics */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "25px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2>{leads.length}</h2>
          <p>Total Leads</p>
        </div>

        <div>
          <h2>
            {leads.filter((lead) => lead.status === "New").length}
          </h2>
          <p>New Leads</p>
        </div>

        <div>
          <h2>
            {
              leads.filter(
                (lead) => lead.status === "Follow-up"
              ).length
            }
          </h2>
          <p>Follow-up</p>
        </div>

        <div>
          <h2>
            {
              leads.filter(
                (lead) => lead.status === "Converted"
              ).length
            }
          </h2>
          <p>Converted</p>
        </div>
      </div>

      {/* Lead Table */}

      <h2 style={{ marginTop: "30px" }}>
        Lead Management
      </h2>

      <div style={{ overflowX: "auto" }}>
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            backgroundColor: "white",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Agent</th>
              <th>Contact</th>
              <th>Mobile</th>
              <th>Destination</th>
              <th>Travel Date</th>
              <th>Passengers</th>
              <th>Service</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.agent}</td>
                <td>{lead.contact}</td>
                <td>{lead.mobile}</td>
                <td>{lead.destination}</td>
                <td>{lead.travelDate}</td>
                <td>{lead.passengers}</td>
                <td>{lead.service}</td>
                <td>{lead.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CRM;
