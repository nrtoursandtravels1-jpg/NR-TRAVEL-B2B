import { useState } from "react";

import BookingForm from "../../components/booking/BookingForm";
import BookingTable from "../../components/booking/BookingTable";

function Bookings() {
  const [refresh, setRefresh] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const bookingSaved = () => {
    setRefresh((prev) => !prev);
    setSelectedBooking(null);
  };

  return (
    <div
      style={{
        padding: "30px",
      }}
    >
      <h1>Booking Management</h1>

      <p>Create and manage tour bookings.</p>

      <BookingForm
        selectedBooking={selectedBooking}
        onBookingAdded={bookingSaved}
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