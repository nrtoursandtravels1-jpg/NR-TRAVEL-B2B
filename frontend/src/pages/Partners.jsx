import { useState } from "react";

function Partners() {
  const [partners, setPartners] = useState([
    {
      id: 1,
      name: "ABC Travels",
      contact: "Rajesh",
      mobile: "9876543210",
      location: "Vadodara",
      vehicle: "Tempo Traveller",
      capacity: 17,
      status: "Pending",
    },
    {
      id: 2,
      name: "XYZ Transport",
      contact: "Amit",
      mobile: "9876543211",
      location: "Ahmedabad",
      vehicle: "Bus",
      capacity: 35,
      status: "Verified",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    mobile: "",
    location: "",
    vehicle: "",
    capacity: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPartner = {
      id: Date.now(),
      ...formData,
    };

    setPartners([...partners, newPartner]);

    setFormData({
      name: "",
      contact: "",
      mobile: "",
      location: "",
      vehicle: "",
      capacity: "",
      status: "Pending",
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1>Transport Partner Management</h1>
          <p>Manage your Cab, Traveller and Bus Partners</p>
        </div>

        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "+ Add Partner"}
        </button>
      </div>

      {showForm && (
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          <h2>Add Transport Partner</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Company / Partner Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              name="contact"
              placeholder="Contact Person"
              value={formData.contact}
              onChange={handleChange}
              required
            />

            <input
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />

            <input
              name="location"
              placeholder="City / Location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <select
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              required
            >
              <option value="">Select Vehicle</option>
              <option value="Cab">Cab</option>
              <option value="Tempo Traveller">
                Tempo Traveller
              </option>
              <option value="Mini Bus">Mini Bus</option>
              <option value="Luxury Bus">Luxury Bus</option>
            </select>

            <input
              type="number"
              name="capacity"
              placeholder="Seating Capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending Verification</option>
              <option value="Verified">Verified</option>
              <option value="Rejected">Rejected</option>
              <option value="Inactive">Inactive</option>
            </select>

            <br /><br />

            <button type="submit">
              Save Partner
            </button>
          </form>
        </div>
      )}

      <h2>Transport Partners</h2>

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
            <th>Partner</th>
            <th>Contact</th>
            <th>Mobile</th>
            <th>Location</th>
            <th>Vehicle</th>
            <th>Capacity</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {partners.map((partner) => (
            <tr key={partner.id}>
              <td>{partner.name}</td>
              <td>{partner.contact}</td>
              <td>{partner.mobile}</td>
              <td>{partner.location}</td>
              <td>{partner.vehicle}</td>
              <td>{partner.capacity}</td>
              <td>{partner.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Partners;