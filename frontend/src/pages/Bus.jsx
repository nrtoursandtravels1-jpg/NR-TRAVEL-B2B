import Layout from "../components/layout/Layout";
import BusDashboard from "../components/bus/BusDashboard";
import BusForm from "../components/bus/BusForm";
import BusSearch from "../components/bus/BusSearch";
import BusTable from "../components/bus/BusTable";
import { useState } from "react";

function Bus() {
  const [search, setSearch] = useState("");

  return (
    <Layout>
      <div
        style={{
          padding: "30px",
          background: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Bus Booking Management
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          Manage bus bookings, operators and passenger details.
        </p>

        <BusDashboard />

        <BusForm />

        <div className="mt-6">
          <BusSearch
            search={search}
            setSearch={setSearch}
          />
        </div>

        <BusTable search={search} />
      </div>
    </Layout>
  );
}

export default Bus;