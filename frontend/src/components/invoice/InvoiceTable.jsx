import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function InvoiceTable({
  refresh,
  setSelectedInvoice,
}) {
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, [refresh]);

  async function fetchInvoices() {
    setLoading(true);

    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      alert(error.message);
    } else {
      setInvoices(data || []);
    }

    setLoading(false);
  }

  async function deleteInvoice(id) {
    if (!window.confirm("Delete this invoice?")) return;

    const { error } = await supabase
      .from("invoices")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Invoice deleted successfully.");

    fetchInvoices();
  }

  const filtered = invoices.filter((item) =>
    (
      (item.invoice_number || "") +
      " " +
      (item.customer_name || "") +
      " " +
      (item.destination || "")
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <h3>Loading Invoices...</h3>;
  }

  return (
    <div
      style={{
        background: "#fff",
        marginTop: "30px",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      <h2>Invoice List</h2>

      <input
        type="text"
        placeholder="Search Invoice..."
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
            <th>Invoice No</th>
            <th>Customer</th>
            <th>Destination</th>
            <th>Total</th>
            <th>Payment</th>
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
                <td>{item.invoice_number}</td>

                <td>{item.customer_name}</td>

                <td>{item.destination}</td>

                <td>₹ {item.total_amount}</td>

                <td>{item.payment_status}</td>

                <td>
                  <button
                    onClick={() =>
                      setSelectedInvoice(item)
                    }
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteInvoice(item.id)
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
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No Invoices Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}