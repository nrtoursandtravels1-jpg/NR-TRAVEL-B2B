import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function BookingTable({
  refresh,
  setSelectedBooking,
}) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [refresh]);

  async function fetchBookings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log("Booking Fetch Error:", error);
      setLoading(false);
      return;
    }

    setBookings(data || []);
    setLoading(false);
  }

  async function deleteBooking(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      alert("Unable to delete booking.");
      return;
    }

    alert("Booking deleted successfully.");
    fetchBookings();
  }

  if (loading) {
    return <h3>Loading Bookings...</h3>;
  }

  return (
    <div
      style={{
        background: "#fff",
        color: "#000",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
        overflowX: "auto",
      }}
    >
      <h2>Booking List</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#f1f5f9",
            }}
          >
            <th>Booking No</th>
            <th>Destination</th>
            <th>Travel Date</th>
            <th>Passengers</th>
            <th>Total Amount</th>
            <th>Booking Status</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr
                key={booking.id}
                style={{
                  borderBottom: "1px solid #ddd",
                }}
              >
                <td>{booking.booking_no}</td>
                <td>{booking.destination}</td>
                <td>{booking.travel_date}</td>
                <td>{booking.passengers}</td>
                <td>₹ {booking.total_amount}</td>
                <td>{booking.booking_status}</td>
                <td>{booking.payment_status}</td>

                <td>
                  <button
                    onClick={() =>
                      setSelectedBooking &&
                      setSelectedBooking(booking)
                    }
                  >
                    Edit
                  </button>

                  <button
                    style={{
                      marginLeft: "10px",
                    }}
                    onClick={() =>
                      deleteBooking(booking.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="8"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}