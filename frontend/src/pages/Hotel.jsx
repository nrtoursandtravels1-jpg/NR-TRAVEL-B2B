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
      <div
        style={{
          padding: "30px",
          minHeight: "100%",
          background: "#f8fafc",
        }}
      >
        <div
          style={{
            marginBottom: "25px",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#0f172a",
            }}
          >
            Hotel Management
          </h1>

          <p
            style={{
              color: "#64748b",
              marginTop: "8px",
            }}
          >
            Manage Hotel Partners, Room Inventory and Accommodation Details.
          </p>

          <div style={{ marginTop: "25px" }}>
         <HotelCards />
       </div>          
        </div>

       {/* Hotel Form */}

       <div 
        style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
        marginBottom: "30px",
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
      }}
      >
      <h2
       style={{
       marginBottom: "20px",
       color: "#0f172a",
      }}
     >
        Hotel Information
      </h2>

       <HotelForm
      selectedHotel={selectedHotel}
      onHotelAdded={handleHotelSaved}
      />
      </div>

      {/* Hotel List */}

     <div
      style={{
      background: "#fff",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,.08)",
    }}
  >
     <h2
      style={{
      marginBottom: "20px",
      color: "#0f172a",
    }}
  >
    Hotel Directory
  </h2>

  <HotelSearch
    search={search}
    setSearch={setSearch}
  />

  <HotelTable
    refresh={refresh}
    search={search}
    setSelectedHotel={handleEditHotel}
     />
      </div>
      </div>
    </Layout>
  );
}

export default Hotel;