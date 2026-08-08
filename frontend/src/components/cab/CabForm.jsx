import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

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

export default function CabForm({ onSaved }) {
  const [form, setForm] = useState(initialForm);
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOperators();
  }, []);

  async function loadOperators() {
    const { data, error } = await supabase
      .from("cab_operators")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setOperators(data || []);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const { error } = await supabase
        .from("cab_bookings")
        .insert([
          {
            customer_name: form.customer_name,
            mobile: form.mobile,
            pickup_location: form.pickup_location,
            drop_location: form.drop_location,
            journey_date: form.journey_date || null,
            journey_time: form.journey_time || null,
            vehicle_type: form.vehicle_type,
            passengers:
              form.passengers === ""
                ? null
                : Number(form.passengers),
            driver_name: form.driver_name,
            vehicle_number: form.vehicle_number,
            fare:
              form.fare === ""
                ? null
                : Number(form.fare),
            payment_status: form.payment_status,
            booking_status: form.booking_status,
            remarks: form.remarks,
          },
        ]);

      if (error) {
        throw error;
      }

      alert("Cab booking saved successfully.");

      setForm(initialForm);

      if (onSaved) {
        onSaved();
      }
    } catch (error) {
      console.error("CAB SAVE ERROR:", error);
      alert("Cab booking failed: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          New Cab Booking
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Create a new cab transfer or local cab booking.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <div>
          <label className="block text-sm font-medium mb-2">
            Customer Name
          </label>

          <input
            name="customer_name"
            value={form.customer_name}
            onChange={handleChange}
            placeholder="Customer name"
            required
            className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Mobile Number
          </label>

          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile number"
            className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Passengers
          </label>

          <input
            type="number"
            name="passengers"
            value={form.passengers}
            onChange={handleChange}
            placeholder="Number of passengers"
            min="1"
            className="w-full border border-slate-300 rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Pickup Location
          </label>

          <input
            name="pickup_location"
            value={form.pickup_location}
            onChange={handleChange}
            placeholder="Pickup location"
            className="w-full border border-slate-300 rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Drop Location
          </label>

          <input
            name="drop_location"
            value={form.drop_location}
            onChange={handleChange}
            placeholder="Drop location"
            className="w-full border border-slate-300 rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Vehicle Type
          </label>

          <select
            name="vehicle_type"
            value={form.vehicle_type}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl p-3 bg-white"
          >
            <option value="">Select vehicle</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Innova">Innova</option>
            <option value="Tempo Traveller">
              Tempo Traveller
            </option>
            <option value="Mini Bus">Mini Bus</option>
            <option value="Luxury Bus">Luxury Bus</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Journey Date
          </label>

          <input
            type="date"
            name="journey_date"
            value={form.journey_date}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Journey Time
          </label>

          <input
            type="time"
            name="journey_time"
            value={form.journey_time}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Driver / Operator
          </label>

          {operators.length > 0 ? (
            <select
              name="driver_name"
              value={form.driver_name}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl p-3 bg-white"
            >
              <option value="">Select driver/operator</option>

              {operators.map((operator) => (
                <option
                  key={operator.id}
                  value={
                    operator.name ||
                    operator.driver_name ||
                    ""
                  }
                >
                  {operator.name ||
                    operator.driver_name ||
                    "Operator"}
                </option>
              ))}
            </select>
          ) : (
            <input
              name="driver_name"
              value={form.driver_name}
              onChange={handleChange}
              placeholder="Driver name"
              className="w-full border border-slate-300 rounded-xl p-3"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Vehicle Number
          </label>

          <input
            name="vehicle_number"
            value={form.vehicle_number}
            onChange={handleChange}
            placeholder="GJ01AB1234"
            className="w-full border border-slate-300 rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Fare
          </label>

          <input
            type="number"
            name="fare"
            value={form.fare}
            onChange={handleChange}
            placeholder="₹ Fare"
            min="0"
            className="w-full border border-slate-300 rounded-xl p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Payment Status
          </label>

          <select
            name="payment_status"
            value={form.payment_status}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl p-3 bg-white"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Booking Status
          </label>

          <select
            name="booking_status"
            value={form.booking_status}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl p-3 bg-white"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <label className="block text-sm font-medium mb-2">
            Remarks
          </label>

          <textarea
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            rows="3"
            placeholder="Special instructions / remarks"
            className="w-full border border-slate-300 rounded-xl p-3"
          />
        </div>

        <div className="md:col-span-2 lg:col-span-3 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-8 py-3 rounded-xl"
          >
            {loading ? "Saving..." : "Save Cab Booking"}
          </button>
        </div>
      </form>
    </div>
  );
}