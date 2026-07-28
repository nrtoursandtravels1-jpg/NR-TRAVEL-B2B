export default function LeadTable() {
  const leads = [
    {
      id: 1,
      customerName: "Rahul Sharma",
      mobile: "9876543210",
      destination: "Goa",
    },
    {
      id: 2,
      customerName: "Priya Patel",
      mobile: "9876501234",
      destination: "Manali",
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h2>Lead List</h2>

      <table
        border="1"
        width="100%"
        cellPadding="10"
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Destination</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.customerName}</td>
              <td>{lead.mobile}</td>
              <td>{lead.destination}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}