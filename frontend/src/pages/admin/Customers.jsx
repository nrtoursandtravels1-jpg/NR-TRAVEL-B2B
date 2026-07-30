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
        minHeight: "100vh",
        background: "#f5f6fa",
        color: "#111",
      }}
    >
      <h1>Customer Management</h1>

      <p>Manage company customers</p>

      <CustomerForm
        selectedCustomer={selectedCustomer}
        onCustomerAdded={customerSaved}
      />

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