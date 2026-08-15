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
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.customer_name.trim()) {
      alert("Please enter customer name.");
      return;
    }

    if (!form.source.trim()) {
      alert("Please enter source.");
      return;
    }

    if (!form.destination.trim()) {
      alert("Please enter destination.");
      return;
    }

    setLoading(true);

    try {
      const bookingData = {
        customer_name: form.customer_name.trim(),
        mobile: form.mobile.trim(),
        operator: form.operator.trim(),
        source: form.source.trim(),
        destination: form.destination.trim(),
        journey_date: form.journey_date || null,
        bus_type: form.bus_type.trim(),

        seats:
          form.seats === ""
            ? null
            : Number(form.seats),

        fare:
          form.fare === ""
            ? null
            : Number(form.fare),

        payment_status: form.payment_status,
        booking_status: form.booking_status,
      };

      const { error } = await supabase
        .from("bus_bookings")
        .insert([bookingData]);

      if (error) {
        console.error("BUS BOOKING ERROR:", error);

        alert(
          error.message || "Bus Booking Failed"
        );

        return;
      }

      alert("Bus Booking Saved Successfully!");

      setForm({
        ...initialForm,
      });
    } catch (error) {
      console.error("BUS FORM ERROR:", error);

      alert(
        error.message ||
          "Unable to save bus booking."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "25px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
        border: "1px solid #e2e8f0",
      }}
    >
      {/* HEADER */}

      <div style={{ marginBottom: "22px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: "6px",
          }}
        >
          New Bus Booking
        </h2>

        <p
          style={{
            color: "#64748b",
            margin: 0,
            fontSize: "14px",
          }}
        >
          Add passenger and bus journey details.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* PASSENGER DETAILS */}

        <h3
          style={{
            fontSize: "17px",
            fontWeight: "600",
            marginBottom: "15px",
            color: "#334155",
          }}
        >
          Passenger Details
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          <input
            className="border rounded-lg p-3"
            name="customer_name"
            placeholder="Customer Name *"
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
        </div>

        {/* JOURNEY DETAILS */}

        <h3
          style={{
            fontSize: "17px",
            fontWeight: "600",
            marginBottom: "15px",
            color: "#334155",
          }}
        >
          Journey Details
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          <input
            className="border rounded-lg p-3"
            name="source"
            placeholder="From / Source *"
            value={form.source}
            onChange={handleChange}
            required
          />

          <input
            className="border rounded-lg p-3"
            name="destination"
            placeholder="To / Destination *"
            value={form.destination}
            onChange={handleChange}
            required
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
            name="bus_type"
            placeholder="Bus Type"
            value={form.bus_type}
            onChange={handleChange}
          />
        </div>

        {/* OPERATOR */}

        <h3
          style={{
            fontSize: "17px",
            fontWeight: "600",
            marginBottom: "15px",
            color: "#334155",
          }}
        >
          Bus & Operator
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          <input
            className="border rounded-lg p-3"
            name="operator"
            placeholder="Bus Operator"
            value={form.operator}
            onChange={handleChange}
          />

          <input
            type="number"
            min="1"
            className="border rounded-lg p-3"
            name="seats"
            placeholder="Number of Seats"
            value={form.seats}
            onChange={handleChange}
          />

          <input
            type="number"
            min="0"
            className="border rounded-lg p-3"
            name="fare"
            placeholder="Fare ₹"
            value={form.fare}
            onChange={handleChange}
          />
        </div>

        {/* PAYMENT & BOOKING STATUS */}

        <h3
          style={{
            fontSize: "17px",
            fontWeight: "600",
            marginBottom: "15px",
            color: "#334155",
          }}
        >
          Booking Status
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "15px",
            marginBottom: "25px",
          }}
        >
          <select
            className="border rounded-lg p-3"
            name="payment_status"
            value={form.payment_status}
            onChange={handleChange}
          >
            <option value="Pending">
              Payment Pending
            </option>

            <option value="Paid">
              Paid
            </option>

            <option value="Partial">
              Partially Paid
            </option>
          </select>

          <select
            className="border rounded-lg p-3"
            name="booking_status"
            value={form.booking_status}
            onChange={handleChange}
          >
            <option value="Pending">
              Booking Pending
            </option>

            <option value="Confirmed">
              Confirmed
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="Cancelled">
              Cancelled
            </option>
          </select>
        </div>

        {/* BUTTONS */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            paddingTop: "10px",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <button
            type="button"
            onClick={() => setForm(initialForm)}
            disabled={loading}
            style={{
              padding: "11px 20px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              color: "#475569",
              cursor: "pointer",
            }}
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "11px 24px",
              borderRadius: "8px",
              border: "none",
              background: "#2563eb",
              color: "#ffffff",
              fontWeight: "600",
              cursor: loading
                ? "not-allowed"
                : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading
              ? "Saving..."
              : "Save Bus Booking"}
          </button>
        </div>
      </form>
    </div>
  );
}