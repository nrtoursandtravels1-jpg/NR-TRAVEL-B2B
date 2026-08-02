import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { supabase } from "../../services/supabase";

export default function QuotationTable({
  refresh,
  setSelectedQuotation,
}) {
  const [quotations, setQuotations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotations();
  }, [refresh]);

  async function fetchQuotations() {
    setLoading(true);

    const { data, error } = await supabase
      .from("quotations")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      alert(error.message);
    } else {
      setQuotations(data || []);
    }

    setLoading(false);
  }

  async function deleteQuotation(id) {
    if (!window.confirm("Delete this quotation?")) return;

    const { error } = await supabase
      .from("quotations")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Quotation deleted successfully.");

    fetchQuotations();
  }

  const filtered = quotations.filter((item) =>
    (
      (item.customer_name || "") +
      " " +
      (item.mobile || "") +
      " " +
      (item.destination || "")
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <h3>Loading Quotations...</h3>;
  }

  return (
    <div
      style={{
        marginTop: "30px",
        background: "#fff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      <h2>Quotation List</h2>

      <input
        type="text"
        placeholder= "🔍Search Customer /Mobile/ Destination"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "380px",
          padding: "12px 15 px",
          border: "1px solid #cbd5e1",
          borderRadius: "10px",
          outline: "none",
          fontSize: "14px",
          marginBottom: "20px",
        }}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
        <tr
        style={{
        background: "#2563eb",
        color: "#fff",
      }}
    >
         <th
         style={{
          padding: "14px",
       }}
      >
           Customer
           </th>
            <th>Destination</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <tr
                key={item.id}
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <td>{item.customer_name}</td>

                <td>{item.destination}</td>

                <td>
                {item.created_at
                ? new Date(item.created_at).toLocaleDateString("en-IN")
              : "-"}
              </td>

            <td>
             ₹ {Number(item.total_amount || 0).toLocaleString("en-IN")}
            </td>

              <td>
             <span
             style={{
             background:
             item.status === "Accepted"
             ? "#16a34a"
             : item.status === "Rejected"
             ? "#dc2626"
             : item.status === "Sent"
             ? "#2563eb"
             : "#64748b",

              color: "#fff",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
             {item.status}
            </span>
          </td>
                <td>
                  <button
                  onClick={() => setSelectedQuotation(item)}
                  style={{
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                 <Pencil size={16} />
                  </button>

                 <button
                  onClick={() => deleteQuotation(item.id)}
                  style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
               <Trash2 size={16} />
            </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No Quotations Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}