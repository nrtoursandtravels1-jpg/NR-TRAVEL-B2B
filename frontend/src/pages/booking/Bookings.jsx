import { useState } from "react";

import BookingForm from "../components/bookings/BookingForm";
import BookingTable from "../components/bookings/BookingTable";

function Bookings() {
  const [refresh, setRefresh] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleBookingSaved = () => {
    setRefresh((prev) => !prev);
    setSelectedBooking(null);
  };

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
  };

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        background: "#f5f6fa",
      }}
    >
      <h1 style={{ marginBottom: "5px" }}>
        Booking Management
      </h1>

      <p
        style={{
          color: "#666",
          marginBottom: "25px",
        }}
      >
        Create, edit and manage customer bookings.
      </p>

      <BookingForm
        selectedBooking={selectedBooking}
        onBookingAdded={handleBookingSaved}
      />

      <div style={{ marginTop: "30px" }}>
        <BookingTable
          refresh={refresh}
          setSelectedBooking={handleEditBooking}
        />
      </div>
    </div>
  );
}

export default Bookings;