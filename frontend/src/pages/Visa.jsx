import { useState } from "react";

import Layout from "../components/layout/Layout";
import VisaDashboard from "../components/visa/VisaDashboard";
import VisaForm from "../components/visa/VisaForm";
import VisaTable from "../components/visa/VisaTable";

export default function Visa() {
  const [refresh, setRefresh] = useState(false);
  const [selectedVisa, setSelectedVisa] = useState(null);

  function handleSaved() {
    setRefresh(!refresh);
    setSelectedVisa(null);
  }

  return (
    <Layout>
      <div style={{ marginBottom: "30px" }}>
        <h1
          style={{
            margin: 0,
            color: "#0f172a",
          }}
        >
          🛂 Visa Management
        </h1>

        <p
          style={{
            color: "#64748b",
            marginTop: "8px",
          }}
        >
          Manage all visa applications from one place.
        </p>
      </div>

      <VisaDashboard refresh={refresh} />

      <div style={{ marginTop: "30px" }}>
        <VisaForm
          selectedVisa={selectedVisa}
          onSaved={handleSaved}
        />
      </div>

      <div style={{ marginTop: "30px" }}>
        <VisaTable
          refresh={refresh}
          setSelectedVisa={setSelectedVisa}
        />
      </div>
    </Layout>
  );
}