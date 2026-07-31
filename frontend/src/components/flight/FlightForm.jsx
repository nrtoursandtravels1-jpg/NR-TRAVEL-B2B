import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

const initialState = {
  passenger_name: "",
  mobile: "",
  email: "",
  from_city: "",
  to_city: "",
  departure_date: "",
  airline: "",
  flight_no: "",
  class_type: "Economy",
  passengers: 1,
  fare: "",
  payment_status: "Pending",
  booking_status: "Confirmed",
  notes: "",
};

export default function FlightForm({
  selectedFlight,
  onSaved,
}) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedFlight) {
      setForm(selectedFlight);
    } else {
      setForm(initialState);
    }
  }, [selectedFlight]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    let error;

    if (selectedFlight) {
      ({ error } = await supabase
        .from("flight_bookings")
        .update(form)
        .eq("id", selectedFlight.id));
    } else {
      ({ error } = await supabase
        .from("flight_bookings")
        .insert([form]));
    }

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      selectedFlight
        ? "Flight Updated Successfully"
        : "Flight Booking Added Successfully"
    );

    setForm(initialState);

    if (onSaved) onSaved();
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      <h2>Flight Booking Form</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "15px",
        }}
      >
        <input name="passenger_name" placeholder="Passenger Name" value={form.passenger_name} onChange={handleChange} required />

        <input name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} />

        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />

        <input name="from_city" placeholder="From City" value={form.from_city} onChange={handleChange} />

        <input name="to_city" placeholder="To City" value={form.to_city} onChange={handleChange} />

        <input type="date" name="departure_date" value={form.departure_date} onChange={handleChange} />

        <input name="airline" placeholder="Airline" value={form.airline} onChange={handleChange} />

        <input name="flight_no" placeholder="Flight Number" value={form.flight_no} onChange={handleChange} />

        <select name="class_type" value={form.class_type} onChange={handleChange}>
          <option>Economy</option>
          <option>Premium Economy</option>
          <option>Business</option>
          <option>First Class</option>
        </select>

        <input type="number" name="passengers" value={form.passengers} onChange={handleChange} />

        <input type="number" name="fare" placeholder="Fare" value={form.fare} onChange={handleChange} />

        <select name="payment_status" value={form.payment_status} onChange={handleChange}>
          <option>Pending</option>
          <option>Paid</option>
        </select>

        <select name="booking_status" value={form.booking_status} onChange={handleChange}>
          <option>Confirmed</option>
          <option>Cancelled</option>
          <option>Waiting</option>
        </select>
      </div>

      <textarea
        name="notes"
        rows="4"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
        style={{
          width: "100%",
          marginTop: "15px",
        }}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: "20px",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "12px 25px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {loading ? "Saving..." : selectedFlight ? "Update Flight" : "Save Flight"}
      </button>
    </form>
  );
}