import { useState } from "react";
import { supabase } from "../../services/supabase";

export default function BookingForm({ onBookingAdded }) {
  const [booking, setBooking] = useState({
    booking_no: "",
    customer_id: "",
    lead_id: "",
    destination: "",
    travel_date: "",
    return_date: "",
    passengers: "",
    total_amount: "",
    advance_amount: "",
    balance_amount: "",
    booking_status: "Pending",
    payment_status: "Pending",
  });

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("bookings")
      .insert([booking]);

    if (error) {
      console.log(error);
      alert("Booking creation failed");
      return;
    }

    alert("Booking created successfully");

    setBooking({
      booking_no: "",
      customer_id: "",
      lead_id: "",
      destination: "",
      travel_date: "",
      return_date: "",
      passengers: "",
      total_amount: "",
      advance_amount: "",
      balance_amount: "",
      booking_status: "Pending",
      payment_status: "Pending",
    });

    if (onBookingAdded) {
      onBookingAdded();
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        color: "#000",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h2>Create Booking</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="booking_no"
          placeholder="Booking No"
          value={booking.booking_no}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          name="destination"
          placeholder="Destination"
          value={booking.destination}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="date"
          name="travel_date"
          value={booking.travel_date}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="date"
          name="return_date"
          value={booking.return_date}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="passengers"
          placeholder="Passengers"
          value={booking.passengers}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="total_amount"
          placeholder="Total Amount"
          value={booking.total_amount}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="advance_amount"
          placeholder="Advance Amount"
          value={booking.advance_amount}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="balance_amount"
          placeholder="Balance Amount"
          value={booking.balance_amount}
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="booking_status"
          value={booking.booking_status}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

        <br /><br />

        <select
          name="payment_status"
          value={booking.payment_status}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>Partial</option>
          <option>Paid</option>
          <option>Refunded</option>
        </select>

        <br /><br />

        <button type="submit">
          Save Booking
        </button>
      </form>
    </div>
  );
}