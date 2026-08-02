import { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import { supabase } from "../../services/supabase";

export default function CustomerTable({
  refresh,
  setSelectedCustomer,
}) {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, [refresh]);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFilteredCustomers(
      customers.filter((customer) =>
        (
          `${customer.customer_name || ""} ${
            customer.mobile || ""
          } ${customer.email || ""} ${
            customer.city || ""
          }`
        )
          .toLowerCase()
          .includes(keyword)
      )
    );
  }, [search, customers]);

  async function fetchCustomers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setCustomers(data || []);
    setFilteredCustomers(data || []);
    setLoading(false);
  }

  async function deleteCustomer(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("customers")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Delete failed");
      return;
    }

    alert("Customer deleted successfully.");
    fetchCustomers();
  }

  if (loading) {
    return <h3>Loading Customers...</h3>;
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <h2>Customer List ({filteredCustomers.length})</h2>

        <input
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "280px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#f1f5f9" }}>
            <th style={{ padding: "12px" }}>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                style={{
                  borderBottom: "1px solid #eee",
                }}
              >
                <td style={{ padding: "12px" }}>
                  {customer.customer_name}
                </td>

                <td>{customer.mobile}</td>

                <td>{customer.email}</td>

                <td>{customer.city}</td>

                <td>{customer.state}</td>

                <td>{customer.country}</td>

                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    <button
                      onClick={() =>
                        setSelectedCustomer(customer)
                      }
                      style={iconButton}
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>

                    <a
                      href={`tel:${customer.mobile}`}
                      style={iconButton}
                      title="Call"
                    >
                      <Phone size={16} />
                    </a>

                    <a
                      href={`mailto:${customer.email}`}
                      style={iconButton}
                      title="Email"
                    >
                      <Mail size={16} />
                    </a>

                    <a
                      href={`https://wa.me/91${customer.mobile}`}
                      target="_blank"
                      rel="noreferrer"
                      style={iconButton}
                      title="WhatsApp"
                    >
                      <MessageCircle size={16} />
                    </a>

                    <button
                      onClick={() =>
                        deleteCustomer(customer.id)
                      }
                      style={deleteButton}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No Customers Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const iconButton = {
  padding: "8px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#f1f5f9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const deleteButton = {
  padding: "8px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#ef4444",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};