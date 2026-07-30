import { useState } from "react";

import BookingForm from "../../components/booking/BookingForm";
import BookingTable from "../../components/booking/BookingTable";

function Bookings() {
  const [refresh, setRefresh] = useState(false);

  const bookingAdded = () => {
    setRefresh((prev) => !prev);
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

      <p>
        Manage customer and agent bookings
      </p>

      <div
        style={{
          marginTop: "25px",
        }}
      >
        <BookingForm
          onBookingAdded={bookingAdded}
        />
      </div>

      <div
        style={{
          marginTop: "30px",
        }}
      >
        <BookingTable
          refresh={refresh}
        />
      </div>
    </div>
  );
}

export default Bookings;