import { useState } from "react";
import { supabase } from "../../services/supabase";

export default function CabForm() {
  const initialForm = {
    customer_name: "",
    mobile: "",
    pickup_location: "",
    drop_location: "",
    journey_date: "",
    journey_time: "",
    vehicle_type: "",
    passengers: "",
    driver_name: "",
    vehicle_number: "",
    fare: "",
    payment_status: "Pending",
    booking_status: "Pending",
    remarks: "",
  };

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("cab_bookings")
      .insert([
        {
          customer_name: form.customer_name,
          mobile: form.mobile,
          pickup_location: form.pickup_location,
          drop_location: form.drop_location,
          journey_date: form.journey_date,
          journey_time: form.journey_time,
          vehicle_type: form.vehicle_type,
          passengers: form.passengers
            ? Number(form.passengers)
            : null,
          driver_name: form.driver_name,
          vehicle_number: form.vehicle_number,
          fare: form.fare
            ? Number(form.fare)
            : null,
          payment_status: form.payment_status,
          booking_status: form.booking_status,
          remarks: form.remarks,
        },
      ]);

    setLoading(false);

    if (error) {
      console.log(error);
      alert("Cab booking failed.");
      return;
    }

    alert("Cab booking saved successfully.");

    setForm(initialForm);
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        New Cab Booking
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4"
      >
        <input
          className="border rounded-lg p-3"
          name="customer_name"
          placeholder="Customer Name"
          value={form.customer_name}
          onChange={handleChange}
          required
        />

        <input
          className="border rounded-lg p-3"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
        />

        <input
          className="border rounded-lg p-3"
          name="pickup_location"
          placeholder="Pickup Location"
          value={form.pickup_location}
          onChange={handleChange}
        />

        <input
          className="border rounded-lg p-3"
          name="drop_location"
          placeholder="Drop Location"
          value={form.drop_location}
          onChange={handleChange}
        />

        <input
          type="date"
          className="border rounded-lg p-3"
          name="journey_date"
          value={form.journey_date}
          onChange={handleChange}
        />

        <input
          type="time"
          className="border rounded-lg p-3"
          name="journey_time"
          value={form.journey_time}
          onChange={handleChange}
        />

        <select
          className="border rounded-lg p-3"
          name="vehicle_type"
          value={form.vehicle_type}
          onChange={handleChange}
        >
          <option value="">Vehicle Type</option>
          <option>Sedan</option>
          <option>SUV</option>
          <option>Innova</option>
          <option>Tempo Traveller</option>
          <option>Mini Bus</option>
          <option>Luxury Bus</option>
        </select>

        <input
          className="border rounded-lg p-3"
          name="passengers"
          placeholder="Passengers"
          value={form.passengers}
          onChange={handleChange}
        />

        <input
          className="border rounded-lg p-3"
          name="driver_name"
          placeholder="Driver Name"
          value={form.driver_name}
          onChange={handleChange}
        />

        <input
          className="border rounded-lg p-3"
          name="vehicle_number"
          placeholder="Vehicle Number"
          value={form.vehicle_number}
          onChange={handleChange}
        />

        <input
          className="border rounded-lg p-3"
          name="fare"
          placeholder="Fare"
          value={form.fare}
          onChange={handleChange}
        />

        <select
          className="border rounded-lg p-3"
          name="payment_status"
          value={form.payment_status}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>Paid</option>
          <option>Partial</option>
        </select>

        <select
          className="border rounded-lg p-3"
          name="booking_status"
          value={form.booking_status}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

        <textarea
          rows="4"
          className="border rounded-lg p-3 col-span-2"
          name="remarks"
          placeholder="Remarks"
          value={form.remarks}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 col-span-2"
        >
          {loading ? "Saving..." : "Save Cab Booking"}
        </button>
      </form>
    </div>
  );
}