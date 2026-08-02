import { useState } from "react";
import * as XLSX from "xlsx";
import { supabase } from "../../services/supabase";

export default function BulkLeadUpload({ leads = [] }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  // ==========================
  // IMPORT EXCEL
  // ==========================
  const uploadLeads = async () => {
    if (!file) {
      alert("Please select an Excel file.");
      return;
    }

    setLoading(true);

    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const data = new Uint8Array(event.target.result);

        const workbook = XLSX.read(data, {
          type: "array",
        });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const rows = XLSX.utils.sheet_to_json(worksheet);

        const { data: userData } = await supabase.auth.getUser();
        const user = userData.user;

        if (!user) {
          alert("User not logged in");
          setLoading(false);
          return;
        }

        const bulkLeads = rows.map((row) => ({
          agent_id: user.id,
          customer_name: row["Customer Name"] || "",
          mobile: String(row["Mobile"] || ""),
          email: row["Email"] || "",
          destination: row["Destination"] || "",
          travel_date: row["Travel Date"] || null,
          travelers: row["Travelers"] || 1,
          budget: row["Budget"] || 0,
          lead_source: row["Lead Source"] || "Excel",
          status: row["Status"] || "New",
          notes: row["Notes"] || "",
        }));

        const { error } = await supabase
          .from("leads")
          .insert(bulkLeads);

        if (error) {
          console.log(error);
          alert("Upload Failed");
        } else {
          setCount(bulkLeads.length);
          alert(`${bulkLeads.length} Leads Imported Successfully`);
        }
      } catch (err) {
        console.log(err);
        alert("Invalid Excel File");
      }

      setLoading(false);
    };

    reader.readAsArrayBuffer(file);
  };

  // ==========================
  // EXPORT EXCEL
  // ==========================
  const exportLeads = () => {
    if (leads.length === 0) {
      alert("No Leads Available");
      return;
    }

    const exportData = leads.map((lead) => ({
      "Customer Name": lead.customer_name,
      Mobile: lead.mobile,
      Email: lead.email,
      Destination: lead.destination,
      "Travel Date": lead.travel_date,
      Travelers: lead.travelers,
      Budget: lead.budget,
      "Lead Source": lead.lead_source,
      Status: lead.status,
      Notes: lead.notes,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Leads"
    );

    const today = new Date().toISOString().split("T")[0];

    XLSX.writeFile(
      workbook,
      `Lead_Report_${today}.xlsx`
    );
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px",
        boxShadow: "0 6px 16px rgba(0,0,0,.08)",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        📥 Import / 📤 Export Leads
      </h2>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFile}
      />

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={uploadLeads}
          disabled={loading}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {loading ? "Uploading..." : "📥 Import Excel Leads"}
        </button>

        <button
          onClick={exportLeads}
          style={{
            background: "#16a34a",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          📤 Export Excel
        </button>
      </div>

      {count > 0 && (
        <p
          style={{
            marginTop: "20px",
            color: "#16a34a",
            fontWeight: "600",
          }}
        >
          ✅ Imported Leads: {count}
        </p>
      )}
    </div>
  );
}