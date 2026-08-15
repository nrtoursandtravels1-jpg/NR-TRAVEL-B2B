import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

const initialForm = {
customer_name: "",
document_type: "Passport",
document_number: "",
issue_date: "",
expiry_date: "",
status: "Pending",
notes: "",
};

export default function Documents() {
const [documents, setDocuments] = useState([]);
const [form, setForm] = useState(initialForm);
const [search, setSearch] = useState("");
const [editingId, setEditingId] = useState(null);
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);

useEffect(() => {
fetchDocuments();
}, []);

async function fetchDocuments() {
setLoading(true);

```
const { data, error } = await supabase
  .from("documents")
  .select("*")
  .order("created_at", {
    ascending: false,
  });

if (error) {
  console.log("Documents Error:", error);
  alert(error.message);
} else {
  setDocuments(data || []);
}

setLoading(false);
```

}

function handleChange(e) {
const { name, value } = e.target;

```
setForm((prev) => ({
  ...prev,
  [name]: value,
}));
```

}

async function handleSubmit(e) {
e.preventDefault();

```
setSaving(true);

let error;

if (editingId) {
  ({ error } = await supabase
    .from("documents")
    .update(form)
    .eq("id", editingId));
} else {
  ({ error } = await supabase
    .from("documents")
    .insert([form]));
}

setSaving(false);

if (error) {
  console.log(error);
  alert(error.message);
  return;
}

alert(
  editingId
    ? "Document updated successfully."
    : "Document added successfully."
);

setForm(initialForm);
setEditingId(null);

fetchDocuments();
```

}

function editDocument(document) {
setForm({
customer_name: document.customer_name || "",
document_type: document.document_type || "Passport",
document_number: document.document_number || "",
issue_date: document.issue_date || "",
expiry_date: document.expiry_date || "",
status: document.status || "Pending",
notes: document.notes || "",
});

```
setEditingId(document.id);

window.scrollTo({
  top: 0,
  behavior: "smooth",
});
```

}

async function deleteDocument(id) {
if (!window.confirm("Delete this document?")) {
return;
}

```
const { error } = await supabase
  .from("documents")
  .delete()
  .eq("id", id);

if (error) {
  alert(error.message);
  return;
}

alert("Document deleted successfully.");

fetchDocuments();
```

}

function resetForm() {
setForm(initialForm);
setEditingId(null);
}

const today = new Date();

const total = documents.length;

const pending = documents.filter(
(item) => item.status === "Pending"
).length;

const approved = documents.filter(
(item) => item.status === "Approved"
).length;

const expired = documents.filter((item) => {
if (!item.expiry_date) return false;

```
return new Date(item.expiry_date) < today;
```

}).length;

const filteredDocuments = documents.filter((item) => {
const text = `       ${item.customer_name || ""}
      ${item.document_type || ""}
      ${item.document_number || ""}
    `.toLowerCase();

```
return text.includes(search.toLowerCase());
```

});

return (
<div
style={{
padding: "30px",
minHeight: "100vh",
background: "#f8fafc",
}}
>
<div style={{ marginBottom: "30px" }}>
<h1
style={{
margin: 0,
color: "#0f172a",
}}
>
📄 Document Management </h1>

```
    <p
      style={{
        color: "#64748b",
        marginTop: "8px",
      }}
    >
      Manage customer travel documents and booking files.
    </p>
  </div>

  {/* Dashboard Cards */}

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(200px,1fr))",
      gap: "20px",
      marginBottom: "30px",
    }}
  >
    <StatCard
      title="Total Documents"
      value={total}
      color="#2563eb"
    />

    <StatCard
      title="Pending Verification"
      value={pending}
      color="#f59e0b"
    />

    <StatCard
      title="Approved Documents"
      value={approved}
      color="#16a34a"
    />

    <StatCard
      title="Expired Documents"
      value={expired}
      color="#dc2626"
    />
  </div>

  {/* Document Form */}

  <div
    style={{
      background: "#fff",
      padding: "25px",
      borderRadius: "15px",
      boxShadow: "0 4px 12px rgba(0,0,0,.08)",
      marginBottom: "30px",
    }}
  >
    <h2
      style={{
        marginBottom: "20px",
        color: "#0f172a",
      }}
    >
      {editingId
        ? "Edit Document"
        : "Add Customer Document"}
    </h2>

    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2,minmax(0,1fr))",
          gap: "15px",
        }}
      >
        <input
          name="customer_name"
          placeholder="Customer Name"
          value={form.customer_name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="document_type"
          value={form.document_type}
          onChange={handleChange}
          style={inputStyle}
        >
          <option>Passport</option>
          <option>Visa</option>
          <option>Flight Ticket</option>
          <option>Train Ticket</option>
          <option>Bus Ticket</option>
          <option>Hotel Voucher</option>
          <option>Cab Voucher</option>
          <option>Invoice</option>
          <option>Other</option>
        </select>

        <input
          name="document_number"
          placeholder="Document Number"
          value={form.document_number}
          onChange={handleChange}
          style={inputStyle}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          style={inputStyle}
        >
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>

        <div>
          <label>Issue Date</label>
          <input
            type="date"
            name="issue_date"
            value={form.issue_date}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label>Expiry Date</label>
          <input
            type="date"
            name="expiry_date"
            value={form.expiry_date}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      <textarea
        name="notes"
        rows="4"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
        style={{
          ...inputStyle,
          width: "100%",
          marginTop: "15px",
        }}
      />

      <button
        type="submit"
        disabled={saving}
        style={{
          marginTop: "20px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "12px 25px",
          borderRadius: "8px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        {saving
          ? "Saving..."
          : editingId
          ? "Update Document"
          : "Add Document"}
      </button>

      {editingId && (
        <button
          type="button"
          onClick={resetForm}
          style={{
            marginTop: "20px",
            background: "#64748b",
            color: "#fff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Cancel Edit
        </button>
      )}
    </form>
  </div>

  {/* Search */}

  <div
    style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0 4px 12px rgba(0,0,0,.08)",
      marginBottom: "20px",
    }}
  >
    <input
      type="text"
      placeholder="🔍 Search Customer / Document Type / Number"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        width: "100%",
        padding: "12px 15px",
        border: "1px solid #cbd5e1",
        borderRadius: "10px",
        outline: "none",
      }}
    />
  </div>

  {/* Documents Table */}

  <div
    style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0 4px 12px rgba(0,0,0,.08)",
      overflowX: "auto",
    }}
  >
    <h2 style={{ marginBottom: "20px" }}>
      Documents Directory
    </h2>

    {loading ? (
      <p>Loading documents...</p>
    ) : (
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "900px",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#2563eb",
              color: "#fff",
            }}
          >
            <th style={thStyle}>Customer</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Number</th>
            <th style={thStyle}>Issue Date</th>
            <th style={thStyle}>Expiry Date</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((item) => (
              <tr key={item.id}>
                <td style={tdStyle}>
                  {item.customer_name}
                </td>

                <td style={tdStyle}>
                  {item.document_type}
                </td>

                <td style={tdStyle}>
                  {item.document_number || "-"}
                </td>

                <td style={tdStyle}>
                  {item.issue_date || "-"}
                </td>

                <td style={tdStyle}>
                  {item.expiry_date || "-"}
                </td>

                <td style={tdStyle}>
                  <span
                    style={{
                      background:
                        item.status === "Approved"
                          ? "#16a34a"
                          : item.status === "Rejected"
                          ? "#dc2626"
                          : "#f59e0b",
                      color: "#fff",
                      padding: "6px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {item.status}
                  </span>
                </td>

                <td style={tdStyle}>
                  <button
                    onClick={() =>
                      editDocument(item)
                    }
                    style={{
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      padding: "7px 12px",
                      borderRadius: "6px",
                      marginRight: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteDocument(item.id)
                    }
                    style={{
                      background: "#dc2626",
                      color: "#fff",
                      border: "none",
                      padding: "7px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: "center",
                  padding: "30px",
                  color: "#64748b",
                }}
              >
                No Documents Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )}
  </div>
</div>

);
}

function StatCard({ title, value, color }) {
return (
<div
style={{
background: "#fff",
padding: "20px",
borderRadius: "12px",
boxShadow: "0 4px 12px rgba(0,0,0,.08)",
}}
>
<h4
style={{
margin: 0,
color: "#64748b",
}}
>
{title} </h4>

```
  <h2
    style={{
      marginTop: "10px",
      color,
      fontSize: "30px",
    }}
  >
    {value}
  </h2>
</div>
);
}

const inputStyle = {
padding: "12px",
border: "1px solid #cbd5e1",
borderRadius: "8px",
width: "100%",
boxSizing: "border-box",
};

const thStyle = {
padding: "12px",
textAlign: "left",
};

const tdStyle = {
padding: "12px",
borderBottom: "1px solid #e2e8f0",
};
