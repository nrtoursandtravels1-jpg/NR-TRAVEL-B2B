import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function LeadTable() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Fetch Leads Error:", error);
      return;
    }

    setLeads(data);
  };

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
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "15px",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Customer</th>
            <th style={thStyle}>Mobile</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Destination</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id}>
              <td style={tdStyle}>
                {lead.customer_name}
              </td>

              <td style={tdStyle}>
                {lead.mobile}
              </td>

              <td style={tdStyle}>
                {lead.email}
              </td>

              <td style={tdStyle}>
                {lead.destination}
              </td>

              <td style={tdStyle}>
                {lead.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {leads.length === 0 && (
        <p style={{ marginTop: "20px" }}>
          No leads found
        </p>
      )}
    </div>
  );
}

const thStyle = {
  padding: "12px",
  background: "#2563eb",
  color: "#fff",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};