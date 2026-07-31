import { useState } from "react";

import Layout from "../components/layout/Layout";
import FlightDashboard from "../components/flight/FlightDashboard";
import FlightForm from "../components/flight/FlightForm";
import FlightTable from "../components/flight/FlightTable";

export default function Flight() {
  const [refresh, setRefresh] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  function handleSaved() {
    setRefresh(!refresh);
    setSelectedFlight(null);
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
          ✈️ Flight Booking Management
        </h1>

        <p
          style={{
            color: "#64748b",
            marginTop: "8px",
          }}
        >
          Manage all airline bookings from one place.
        </p>
      </div>

      <FlightDashboard refresh={refresh} />

      <div
        style={{
          marginTop: "30px",
        }}
      >
        <FlightForm
          selectedFlight={selectedFlight}
          onSaved={handleSaved}
        />
      </div>

      <div
        style={{
          marginTop: "30px",
        }}
      >
        <FlightTable
          refresh={refresh}
          setSelectedFlight={setSelectedFlight}
        />
      </div>

    </Layout>
  );
}