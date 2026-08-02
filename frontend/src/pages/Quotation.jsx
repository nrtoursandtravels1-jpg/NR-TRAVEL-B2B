import { useState } from "react";

import Layout from "../components/layout/Layout";
import QuotationCards from "../components/quotation/QuotationCards";
import QuotationForm from "../components/quotation/QuotationForm";
import QuotationPreview from "../components/quotation/QuotationPreview";
import QuotationTable from "../components/quotation/QuotationTable";

export default function Quotation() {
  const [refresh, setRefresh] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  function handleSaved() {
    setRefresh((prev) => !prev);
    setSelectedQuotation(null);
  }

  return (
    <Layout>
      <div
        style={{
          padding: "30px",
          background: "#f8fafc",
          minHeight: "100%",
        }}
      >
        {/* Heading */}
        <div style={{ marginBottom: "30px" }}>
          <h1
            style={{
              margin: 0,
              color: "#0f172a",
            }}
          >
            Quotation Generator
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

        {/* Dashboard Cards */}
        <QuotationCards />

        {/* Quotation Form */}
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            marginBottom: "25px",
            boxShadow: "0 5px 15px rgba(0,0,0,.08)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "#0f172a",
            }}
          >
            Quotation Information
          </h2>

          <QuotationForm
            selectedQuotation={selectedQuotation}
            onSaved={handleSaved}
          />
        </div>

        {/* Preview */}
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            marginBottom: "25px",
            boxShadow: "0 5px 15px rgba(0,0,0,.08)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "#0f172a",
            }}
          >
            Quotation Preview
          </h2>

          <QuotationPreview />
        </div>

        {/* Table */}
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(0,0,0,.08)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "#0f172a",
            }}
          >
            Quotation Directory
          </h2>

          <QuotationTable
            refresh={refresh}
            setSelectedQuotation={setSelectedQuotation}
          />
        </div>
      </div>
    </Layout>
  );
}