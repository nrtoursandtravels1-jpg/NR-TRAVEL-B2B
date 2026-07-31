import { useState } from "react";
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
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        background: "#f5f6fa",
      }}
    >
      <h1 style={{ marginBottom: "5px" }}>Hotel Management</h1>

      <p style={{ color: "#666", marginBottom: "25px" }}>
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
  );
}

export default Hotel;