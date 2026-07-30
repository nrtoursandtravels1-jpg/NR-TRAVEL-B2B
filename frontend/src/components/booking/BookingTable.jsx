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

  const fetchBookings = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setBookings(data || []);
    setLoading(false);
  };

  const deleteBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this booking?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      alert("Delete failed");
      return;
    }

    alert("Booking deleted");

    fetchBookings();
  };

  if (loading) {
    return <h3>Loading Bookings...</h3>;
  }

  return (
    <div
      style={{
        background: "#fff",
        color: "#000",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "10px",
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
          <tr>
            <th>Booking No</th>
            <th>Destination</th>
            <th>Travel Date</th>
            <th>Passengers</th>
            <th>Total</th>
            <th>Booking Status</th>
            <th>Payment</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
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
                    setSelectedBooking(booking)
                  }
                >
                  Edit
                </button>

                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() =>
                    deleteBooking(booking.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {bookings.length === 0 && (
        <p>No bookings found.</p>
      )}
    </div>
  );
}