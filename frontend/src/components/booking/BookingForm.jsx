import { useState } from "react";
import { supabase } from "../../services/supabase";

export default function BookingForm({ onBookingAdded }) {
 const [booking, setBooking] = useState({
  booking_no: "",
  customer_name: "",
  mobile: "",
  email: "",

  package_name: "",
  destination: "",
  hotel_name: "",

  travel_date: "",
  return_date: "",

  passengers: 1,

  total_amount: "",
  advance_amount: "",
  balance_amount: "",

  booking_status: "Pending",
  payment_status: "Pending",

  notes: "",
});
  const handleChange = (e) => {
  const { name, value } = e.target;

  let updatedBooking = {
    ...booking,
    [name]: value,
  };

  if (
    name === "total_amount" ||
    name === "advance_amount"
  ) {
    const total =
      Number(
        name === "total_amount"
          ? value
          : updatedBooking.total_amount
      ) || 0;

    const advance =
      Number(
        name === "advance_amount"
          ? value
          : updatedBooking.advance_amount
      ) || 0;

    updatedBooking.balance_amount = total - advance;
  }

  setBooking(updatedBooking);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const bookingData = {
      booking_no:
        booking.booking_no ||
        `BK-${Date.now()}`,

      customer_name: booking.customer_name,
      mobile: booking.mobile,
      email: booking.email,

      package_name: booking.package_name,
      destination: booking.destination,
      hotel_name: booking.hotel_name,

      travel_date: booking.travel_date,
      return_date: booking.return_date,

      passengers: Number(booking.passengers),

      total_amount: Number(booking.total_amount),

      advance_amount: Number(
        booking.advance_amount
      ),

      balance_amount: Number(
        booking.balance_amount
      ),

      booking_status:
        booking.booking_status,

      payment_status:
        booking.payment_status,

      notes: booking.notes,
    };

    const { error } = await supabase
      .from("bookings")
      .insert([bookingData]);

    if (error) throw error;

    alert("✅ Booking Saved Successfully");

    setBooking({
      booking_no: "",
      customer_name: "",
      mobile: "",
      email: "",

      package_name: "",
      destination: "",
      hotel_name: "",

      travel_date: "",
      return_date: "",

      passengers: 1,

      total_amount: "",
      advance_amount: "",
      balance_amount: "",

      booking_status: "Pending",
      payment_status: "Pending",

      notes: "",
    });

    if (onBookingAdded) {
      onBookingAdded();
    }

  } catch (err) {
    console.log(err);
    alert("Booking Save Failed");
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
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"15px"}}>

  <input
    name="booking_no"
    placeholder="Booking Number"
    value={booking.booking_no}
    onChange={handleChange}
  />

  <input
    name="customer_name"
    placeholder="Customer Name"
    value={booking.customer_name}
    onChange={handleChange}
    required
  />

  <input
    name="mobile"
    placeholder="Mobile Number"
    value={booking.mobile}
    onChange={handleChange}
    required
  />

  <input
    name="email"
    placeholder="Email"
    value={booking.email}
    onChange={handleChange}
  />

  <input
    name="package_name"
    placeholder="Package Name"
    value={booking.package_name}
    onChange={handleChange}
  />

  <input
    name="hotel_name"
    placeholder="Hotel Name"
    value={booking.hotel_name}
    onChange={handleChange}
  />

  <input
    name="destination"
    placeholder="Destination"
    value={booking.destination}
    onChange={handleChange}
    required
  />

  <input
    type="number"
    name="passengers"
    placeholder="Passengers"
    value={booking.passengers}
    onChange={handleChange}
  />

  <input
    type="date"
    name="travel_date"
    value={booking.travel_date}
    onChange={handleChange}
    required
  />

  <input
    type="date"
    name="return_date"
    value={booking.return_date}
    onChange={handleChange}
  />

  <input
    type="number"
    name="total_amount"
    placeholder="Total Amount"
    value={booking.total_amount}
    onChange={handleChange}
  />

  <input
    type="number"
    name="advance_amount"
    placeholder="Advance Amount"
    value={booking.advance_amount}
    onChange={handleChange}
  />

  <input
    type="number"
    name="balance_amount"
    placeholder="Balance Amount"
    value={booking.balance_amount}
    readOnly
  />

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

</div>

<textarea
  name="notes"
  placeholder="Booking Notes"
  value={booking.notes}
  onChange={handleChange}
  rows={4}
  style={{
    width:"100%",
    marginTop:"20px",
    padding:"12px",
    borderRadius:"8px"
  }}
/>

<button
  type="submit"
  style={{
    marginTop:"20px",
    width:"100%",
    padding:"14px",
    border:"none",
    background:"#2563eb",
    color:"#fff",
    borderRadius:"10px",
    cursor:"pointer",
    fontWeight:"bold",
    fontSize:"16px"
  }}
>
  💾 Save Booking
   </button> 

   </form>
   
    </div>
  );
}