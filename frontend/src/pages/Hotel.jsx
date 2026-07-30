import { useState } from "react";

import HotelForm from "../components/hotel/HotelForm";
import HotelTable from "../components/hotel/HotelTable";

function Hotel() {
  const [refresh, setRefresh] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const hotelSaved = () => {
    setRefresh((prev) => !prev);
    setSelectedHotel(null);
  };

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        background: "#f5f6fa",
        color: "#111",
      }}
    >
      <h1>Hotel Management</h1>

      <p>Manage hotel partners.</p>

      <HotelForm
        selectedHotel={selectedHotel}
        onHotelAdded={hotelSaved}
      />

      <div style={{ marginTop: "30px" }}>
        <HotelTable
          refresh={refresh}
          setSelectedHotel={setSelectedHotel}
        />
      </div>
    </div>
  );
}

export default Hotel;