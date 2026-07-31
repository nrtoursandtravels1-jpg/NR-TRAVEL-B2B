import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

const initialState = {
  passenger_name: "",
  mobile: "",
  email: "",
  from_station: "",
  to_station: "",
  train_name: "",
  train_number: "",
  journey_date: "",
  coach: "",
  class_type: "Sleeper",
  passengers: 1,
  fare: "",
  payment_status: "Pending",
  booking_status: "Confirmed",
  notes: "",
};

export default function TrainForm({
  selectedTrain,
  onSaved,
}) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedTrain) {
      setForm(selectedTrain);
    } else {
      setForm(initialState);
    }
  }, [selectedTrain]);

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

    if (selectedTrain) {
      ({ error } = await supabase
        .from("train_bookings")
        .update(form)
        .eq("id", selectedTrain.id));
    } else {
      ({ error } = await supabase
        .from("train_bookings")
        .insert([form]));
    }

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      selectedTrain
        ? "Train Booking Updated Successfully"
        : "Train Booking Added Successfully"
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
      <h2>Train Booking Form</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "15px",
        }}
      >
        <input
          name="passenger_name"
          placeholder="Passenger Name"
          value={form.passenger_name}
          onChange={handleChange}
          required
        />

        <input
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="from_station"
          placeholder="From Station"
          value={form.from_station}
          onChange={handleChange}
        />

        <input
          name="to_station"
          placeholder="To Station"
          value={form.to_station}
          onChange={handleChange}
        />

        <input
          type="date"
          name="journey_date"
          value={form.journey_date}
          onChange={handleChange}
        />

        <input
          name="train_name"
          placeholder="Train Name"
          value={form.train_name}
          onChange={handleChange}
        />

        <input
          name="train_number"
          placeholder="Train Number"
          value={form.train_number}
          onChange={handleChange}
        />

        <input
          name="coach"
          placeholder="Coach"
          value={form.coach}
          onChange={handleChange}
        />

        <select
          name="class_type"
          value={form.class_type}
          onChange={handleChange}
        >
          <option>Sleeper</option>
          <option>3AC</option>
          <option>2AC</option>
          <option>1AC</option>
          <option>Chair Car</option>
        </select>

        <input
          type="number"
          name="passengers"
          value={form.passengers}
          onChange={handleChange}
        />

        <input
          type="number"
          name="fare"
          placeholder="Fare"
          value={form.fare}
          onChange={handleChange}
        />

        <select
          name="payment_status"
          value={form.payment_status}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>Paid</option>
        </select>

        <select
          name="booking_status"
          value={form.booking_status}
          onChange={handleChange}
        >
          <option>Confirmed</option>
          <option>Waiting</option>
          <option>Cancelled</option>
        </select>
      </div>

      <textarea
        rows="4"
        name="notes"
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
        {loading
          ? "Saving..."
          : selectedTrain
          ? "Update Booking"
          : "Save Booking"}
      </button>
    </form>
  );
}