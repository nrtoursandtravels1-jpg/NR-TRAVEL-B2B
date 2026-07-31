import { useState } from "react";

import Layout from "../components/layout/Layout";
import HotelForm from "../components/hotel/HotelForm";
import HotelTable from "../components/hotel/HotelTable";

function Hotel() {
  const [refresh, setRefresh] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleHotelSaved = () => {
    setRefresh((prev) => !prev);
    setSelectedHotel(null);
  };

  const handleEditHotel = (hotel) => {
    setSelectedHotel(hotel);
  };

  return (
    <Layout>
      <div
        style={{
          padding: "30px",
          minHeight: "100%",
        }}
      >
        <h1>Hotel Management</h1>

        <p
          style={{
            color: "#666",
            marginBottom: "25px",
          }}
        >
          Add, edit and manage hotel partners.
        </p>

        <HotelForm
          selectedHotel={selectedHotel}
          onHotelAdded={handleHotelSaved}
        />

        <div style={{ marginTop: "30px" }}>
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