import { useState } from "react";

import CustomerForm from "../../components/customer/CustomerForm";
import CustomerTable from "../../components/customer/CustomerTable";

function Customers() {
  const [refresh, setRefresh] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customerSaved = () => {
    setRefresh((prev) => !prev);
    setSelectedCustomer(null);
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#0f172a",
          }}
        >
          Customer Management
        </h1>

        <p
          style={{
            color: "#64748b",
            marginTop: "8px",
          }}
        >
          Add, edit and manage all customers.
        </p>
      </div>

      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <CustomerForm
          selectedCustomer={selectedCustomer}
          onCustomerAdded={customerSaved}
        />
      </div>

      <div style={{ marginTop: "30px" }}>
        <CustomerTable
          refresh={refresh}
          setSelectedCustomer={setSelectedCustomer}
        />
      </div>
    </div>
  );
}

export default Customers;