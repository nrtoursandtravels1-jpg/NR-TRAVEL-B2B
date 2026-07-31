import { useState } from "react";

import Layout from "../components/layout/Layout";
import TrainDashboard from "../components/train/TrainDashboard";
import TrainForm from "../components/train/TrainForm";
import TrainTable from "../components/train/TrainTable";

export default function Train() {
  const [refresh, setRefresh] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState(null);

  function handleSaved() {
    setRefresh(!refresh);
    setSelectedTrain(null);
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
          🚆 Train Booking Management
        </h1>

        <p
          style={{
            color: "#64748b",
            marginTop: "8px",
          }}
        >
          Manage train reservations from one place.
        </p>
      </div>

      <TrainDashboard refresh={refresh} />

      <div
        style={{
          marginTop: "30px",
        }}
      >
        <TrainForm
          selectedTrain={selectedTrain}
          onSaved={handleSaved}
        />
      </div>

      <div
        style={{
          marginTop: "30px",
        }}
      >
        <TrainTable
          refresh={refresh}
          setSelectedTrain={setSelectedTrain}
        />
      </div>
    </Layout>
  );
}