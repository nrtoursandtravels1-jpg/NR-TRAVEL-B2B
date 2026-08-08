import { useState } from "react";

import Layout from "../components/layout/Layout";
import HotelCards from "../components/hotel/HotelCards";
import HotelForm from "../components/hotel/HotelForm";
import HotelSearch from "../components/hotel/HotelSearch";
import HotelTable from "../components/hotel/HotelTable";

function Hotel() {
  const [refresh, setRefresh] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [search, setSearch] = useState("");
  
  function handleHotelSaved() {
    setRefresh((prev) => !prev);
    setSelectedHotel(null);
  }

  function handleEditHotel(hotel) {
    setSelectedHotel(hotel);
  }

  return (
    <Layout>

      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            🏨 Hotel Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage Hotel Partners, Room Inventory and Accommodation Details.
          </p>

          <div className="mt-8">
            <HotelCards />
          </div>

        </div>

        {/* Hotel Form */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            🏨 Hotel Information
          </h2>

          <HotelForm
            selectedHotel={selectedHotel}
            onHotelAdded={handleHotelSaved}
          />

        </div>

        {/* Hotel Directory */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            📋 Hotel Directory
          </h2>

          
          <HotelTable
            refresh={refresh}
            setSelectedHotel={handleEditHotel}
          />

        </div>

      </div>

    </Layout>
  );
}

export default Hotel;