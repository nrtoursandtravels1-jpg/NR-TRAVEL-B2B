import { useState } from "react";
import { supabase } from "../../services/supabase";

export default function BusForm() {
  const initialForm = {
    customer_name: "",
    mobile: "",
    operator: "",
    source: "",
    destination: "",
    journey_date: "",
    bus_type: "",
    seats: "",
    fare: "",
    payment_status: "Pending",
    booking_status: "Pending",
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
      .from("bus_bookings")
      .insert([
        {
          customer_name: form.customer_name,
          mobile: form.mobile,
          operator: form.operator,
          source: form.source,
          destination: form.destination,
          journey_date: form.journey_date,
          bus_type: form.bus_type,
          seats: form.seats
            ? Number(form.seats)
            : null,
          fare: form.fare
            ? Number(form.fare)
            : null,
          payment_status: form.payment_status,
          booking_status: form.booking_status,
        },
      ]);

    setLoading(false);

    if (error) {
      console.log(error);
      alert("Bus Booking Failed");
      return;
    }

    alert("Bus Booking Saved Successfully");

    setForm(initialForm);
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <h2 className="text-2xl font-bold mb-6">
        New Bus Booking
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
          name="operator"
          placeholder="Bus Operator"
          value={form.operator}
          onChange={handleChange}
        />

        <input
          className="border rounded-lg p-3"
          name="bus_type"
          placeholder="Bus Type"
          value={form.bus_type}
          onChange={handleChange}
        />

        <input
          className="border rounded-lg p-3"
          name="source"
          placeholder="Source"
          value={form.source}
          onChange={handleChange}
        />

        <input
          className="border rounded-lg p-3"
          name="destination"
          placeholder="Destination"
          value={form.destination}
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
          className="border rounded-lg p-3"
          name="seats"
          placeholder="Seats"
          value={form.seats}
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
          <option>Cancelled</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 col-span-2"
        >
          {loading ? "Saving..." : "Save Booking"}
        </button>

      </form>

    </div>
  );
}