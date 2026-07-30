import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function CustomerTable({
  refresh,
  setSelectedCustomer,
}) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, [refresh]);

  const fetchCustomers = async () => {
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
    setLoading(false);
  };

  const deleteCustomer = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this customer?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("customers")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      alert("Delete failed");
      return;
    }

    alert("Customer deleted");

    fetchCustomers();
  };

  if (loading) {
    return <h3>Loading Customers...</h3>;
  }

  return (
    <div
      style={{
        background: "#fff",
        color: "#000",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>Customer List</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.customer_name}</td>
              <td>{customer.mobile}</td>
              <td>{customer.email}</td>
              <td>{customer.city}</td>
              <td>{customer.state}</td>
              <td>{customer.country}</td>

              <td>
                <button
                  onClick={() =>
                    setSelectedCustomer(customer)
                  }
                >
                  Edit
                </button>

                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() =>
                    deleteCustomer(customer.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {customers.length === 0 && (
        <p>No customers found.</p>
      )}
    </div>
  );
}