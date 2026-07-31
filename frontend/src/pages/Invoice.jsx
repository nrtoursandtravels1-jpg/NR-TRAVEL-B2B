import { useState } from "react";

import Layout from "../components/layout/Layout";
import InvoiceForm from "../components/invoice/InvoiceForm";
import InvoiceTable from "../components/invoice/InvoiceTable";
import InvoicePreview from "../components/invoice/InvoicePreview";

export default function Invoice() {
  const [refresh, setRefresh] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  function handleSaved() {
    setRefresh(!refresh);
    setSelectedInvoice(null);
  }

  return (
    <Layout>
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
          🧾 Invoice Generator
        </h1>

        <p
          style={{
            color: "#64748b",
            marginTop: "8px",
          }}
        >
          Generate professional invoices for your customers.
        </p>
      </div>

      <InvoiceForm
        selectedInvoice={selectedInvoice}
        onSaved={handleSaved}
      />

      <InvoicePreview />

      <InvoiceTable
        refresh={refresh}
        setSelectedInvoice={setSelectedInvoice}
      />
    </Layout>
  );
}