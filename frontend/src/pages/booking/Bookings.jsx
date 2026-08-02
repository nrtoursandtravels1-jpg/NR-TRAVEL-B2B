import { useState } from "react";

import Layout from "../../components/layout/Layout";
import BookingCards from "../../components/booking/BookingCards";
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
    <Layout>
      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 6px 18px rgba(0,0,0,.08)",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          📅 Booking Management
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "25px",
          }}
        >
          Create, edit and manage customer bookings.
        </p>

        <div
         style={{
         marginBottom: "30px",
         marginTop: "20px",
        }}
       >
        <BookingCards />
     </div>    

       <h2
        style={{
         marginBottom: "20px",
        color: "#0f172a",
       }}
      >
        Booking Information
       </h2>

        <BookingForm
          selectedBooking={selectedBooking}
          onBookingAdded={handleBookingSaved}
        />

        <div
          style={{
            marginTop: "35px",
          }}
        >
          <h2
          style={{
           marginBottom: "20px",
           color: "#0f172a",
          }}
        >
         Booking Directory
        </h2>

          <BookingTable
            refresh={refresh}
            setSelectedBooking={setSelectedBooking}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Bookings;