import { useState } from "react";
import Layout from "../components/layout/Layout";
import CabForm from "../components/cab/CabForm";
import CabSearch from "../components/cab/CabSearch";
import CabTable from "../components/cab/CabTable";

function Cab() {
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
        {/* Header */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#0f172a",
              }}
            >
              Cab Booking Management
            </h1>

            <p
              style={{
                color: "#64748b",
                marginTop: "8px",
              }}
            >
              Manage Cab Bookings, Drivers, Vehicles and Vendors.
            </p>
          </div>
        </div>

        {/* Dashboard */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div className="bg-white rounded-xl shadow p-5">
            <h3>Total Bookings</h3>
            <h1>0</h1>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3>Today's Trips</h3>
            <h1>0</h1>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3>Available Vehicles</h3>
            <h1>0</h1>
          </div>

          <div className="bg-white rounded-xl shadow p-5">
            <h3>Revenue</h3>
            <h1>₹0</h1>
          </div>
        </div>

        {/* Booking Form */}

        <CabForm />

        {/* Search */}

        <div className="mt-6">
          <CabSearch
            search={search}
            setSearch={setSearch}
          />
        </div>

        {/* Booking Table */}

        <CabTable search={search} />
      </div>
    </Layout>
  );
}

export default Cab;