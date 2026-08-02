import { useState } from "react";

import Layout from "../../components/layout/Layout";
import CustomerCards from "../../components/customer/CustomerCards";
import CustomerForm from "../../components/customer/CustomerForm";
import CustomerSearch from "../../components/customer/CustomerSearch";
import CustomerTable from "../../components/customer/CustomerTable";

function Customer() {
  const [refresh, setRefresh] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");

  function handleCustomerSaved() {
    setRefresh((prev) => !prev);
    setSelectedCustomer(null);
  }

  function handleEditCustomer(customer) {
    setSelectedCustomer(customer);
  }

  return (
    <Layout>
      <div
        style={{
          padding: "30px",
          minHeight: "100%",
          background: "#f8fafc",
        }}
      >
        <div style={{ marginBottom: "25px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
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
            Manage customers, contact details and travel history.
          </p>
        </div>

        <CustomerCards />

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            marginBottom: "30px",
            boxShadow: "0 2px 8px rgba(0,0,0,.08)",
          }}
        >
          <CustomerForm
            selectedCustomer={selectedCustomer}
            onCustomerAdded={handleCustomerSaved}
          />
        </div>

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,.08)",
          }}
        >
          <CustomerSearch
            search={search}
            setSearch={setSearch}
          />

          <div style={{ marginTop: "25px" }}>
            <CustomerTable
              refresh={refresh}
              search={search}
              setSelectedCustomer={handleEditCustomer}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Customer;