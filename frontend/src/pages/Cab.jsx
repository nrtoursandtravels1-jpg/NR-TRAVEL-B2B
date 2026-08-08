import { useState } from "react";
import CabForm from "../components/cab/CabForm";
import CabSearch from "../components/cab/CabSearch";
import CabTable from "../components/cab/CabTable";

export default function Cab() {
  const [search, setSearch] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600">
            TRANSPORT MANAGEMENT
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-1">
            Cab Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage cab bookings, routes, drivers, vehicles and payments.
          </p>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          <div className="bg-white rounded-2xl border p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Bookings
            </p>

            <h2 className="text-3xl font-bold mt-2">
              —
            </h2>
          </div>

          <div className="bg-white rounded-2xl border p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Today's Trips
            </p>

            <h2 className="text-3xl font-bold mt-2 text-blue-600">
              —
            </h2>
          </div>

          <div className="bg-white rounded-2xl border p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Available Vehicles
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-600">
              —
            </h2>
          </div>

          <div className="bg-white rounded-2xl border p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Revenue
            </p>

            <h2 className="text-3xl font-bold mt-2 text-purple-600">
              ₹ —
            </h2>
          </div>

        </div>

        {/* CAB FORM */}
        <div className="mb-8">
          <CabForm
            onSaved={() => {
              setRefreshKey((prev) => prev + 1);
            }}
          />
        </div>

        {/* SEARCH */}
        <div className="mb-6">
          <CabSearch
            search={search}
            setSearch={setSearch}
          />
        </div>

        {/* TABLE */}
        <CabTable
          search={search}
          refreshKey={refreshKey}
        />

      </div>
    </div>
  );
}