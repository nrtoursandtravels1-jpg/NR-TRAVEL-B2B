const leads = [
  {
    id: 1,
    customerName: "Rahul Sharma",
    mobile: "9876543210",
    destination: "Dubai",
    travelDate: "2026-08-15",
    status: "New",
  },
  {
    id: 2,
    customerName: "Priya Patel",
    mobile: "9123456789",
    destination: "Bali",
    travelDate: "2026-09-10",
    status: "Follow Up",
  },
];

export default function LeadTable() {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
        overflowX: "auto",
      }}
    >
      <h2>Lead List</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "15px",
        }}
      >
        <thead>
          <tr style={{ background: "#2563eb", color: "#fff" }}>
            <th style={thStyle}>Customer</th>
            <th style={thStyle}>Mobile</th>
            <th style={thStyle}>Destination</th>
            <th style={thStyle}>Travel Date</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td style={tdStyle}>{lead.customerName}</td>
              <td style={tdStyle}>{lead.mobile}</td>
              <td style={tdStyle}>{lead.destination}</td>
              <td style={tdStyle}>{lead.travelDate}</td>
              <td style={tdStyle}>{lead.status}</td>
              <td style={tdStyle}>
                <button style={editBtn}>Edit</button>

                <button style={deleteBtn}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

const editBtn = {
  background: "#16a34a",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px",
};

const deleteBtn = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};