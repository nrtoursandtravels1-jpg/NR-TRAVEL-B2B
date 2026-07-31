import { useState } from "react";

import Layout from "../components/layout/Layout";
import QuotationForm from "../components/quotation/QuotationForm";
import QuotationTable from "../components/quotation/QuotationTable";
import QuotationPreview from "../components/quotation/QuotationPreview";

export default function Quotation() {
  const [refresh, setRefresh] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  function handleSaved() {
    setRefresh(!refresh);
    setSelectedQuotation(null);
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
          📄 Quotation Generator
        </h1>

        <p
          style={{
            color: "#64748b",
            marginTop: "8px",
          }}
        >
          Create professional quotations for your customers.
        </p>
      </div>

      <QuotationForm
        selectedQuotation={selectedQuotation}
        onSaved={handleSaved}
      />

      <QuotationPreview />

      <QuotationTable
        refresh={refresh}
        setSelectedQuotation={setSelectedQuotation}
      />
    </Layout>
  );
}