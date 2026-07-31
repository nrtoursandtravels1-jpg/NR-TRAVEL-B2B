import { useState } from "react";

import BookingForm from "../../components/booking/BookingForm";
import BookingTable from "../../components/booking/BookingTable";

function Bookings() {
  const [refresh, setRefresh] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleBookingSaved = () => {
    setRefresh((prev) => !prev);
    setSelectedBooking(null);
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
      <h1>Booking Management</h1>

      <p>Create, edit and manage customer bookings.</p>

      <BookingForm
        selectedBooking={selectedBooking}
        onBookingAdded={handleBookingSaved}
      />

      <div style={{ marginTop: "30px" }}>
        <BookingTable
          refresh={refresh}
          setSelectedBooking={setSelectedBooking}
        />
      </div>
    </div>
  );
}

export default Bookings;