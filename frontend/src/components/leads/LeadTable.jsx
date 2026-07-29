export default function LeadTable({ leads }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
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
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td style={tdStyle}>{lead.name}</td>
              <td style={tdStyle}>{lead.phone}</td>
              <td style={tdStyle}>{lead.email}</td>
              <td style={tdStyle}>{lead.status}</td>

              <td style={tdStyle}>
                <button style={editButton}>
                  Edit
                </button>

                <button style={deleteButton}>
                  Delete
                </button>
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
  background: "#2563eb",
  color: "white",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

const editButton = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "8px 12px",
  marginRight: "10px",
  borderRadius: "5px",
  cursor: "pointer",
};

const deleteButton = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};