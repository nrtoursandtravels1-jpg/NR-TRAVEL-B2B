import { useEffect, useState } from "react";
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
        placeholder="Search Customer / Destination"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "350px",
          padding: "10px",
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
          <tr style={{ background: "#f1f5f9" }}>
            <th>Customer</th>
            <th>Destination</th>
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

                <td>₹ {item.total_amount}</td>

                <td>{item.status}</td>

                <td>
                  <button
                    onClick={() =>
                      setSelectedQuotation(item)
                    }
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteQuotation(item.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
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