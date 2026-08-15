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
      setForm({
        ...initialState,
        ...selectedFlight,
        passengers: selectedFlight.passengers || 1,
        fare: selectedFlight.fare ?? "",
      });
    } else {
      setForm(initialState);
    }
  }, [selectedFlight]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm(initialState);

    if (onSaved) {
      onSaved();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.passenger_name.trim()) {
      alert("Please enter passenger name.");
      return;
    }

    if (!form.from_city.trim()) {
      alert("Please enter departure city.");
      return;
    }

    if (!form.to_city.trim()) {
      alert("Please enter destination city.");
      return;
    }

    setLoading(true);

    const flightData = {
      passenger_name: form.passenger_name.trim(),
      mobile: form.mobile.trim(),
      email: form.email.trim(),
      from_city: form.from_city.trim(),
      to_city: form.to_city.trim(),
      departure_date:
        form.departure_date || null,
      airline: form.airline.trim(),
      flight_no: form.flight_no.trim(),
      class_type: form.class_type,
      passengers:
        form.passengers === ""
          ? 1
          : Number(form.passengers),
      fare:
        form.fare === ""
          ? null
          : Number(form.fare),
      payment_status: form.payment_status,
      booking_status: form.booking_status,
      notes: form.notes.trim(),
    };

    let error = null;

    try {
      if (selectedFlight) {
        const result = await supabase
          .from("flight_bookings")
          .update(flightData)
          .eq("id", selectedFlight.id);

        error = result.error;
      } else {
        const result = await supabase
          .from("flight_bookings")
          .insert([flightData]);

        error = result.error;
      }

      if (error) {
        throw error;
      }

      alert(
        selectedFlight
          ? "Flight Updated Successfully"
          : "Flight Booking Added Successfully"
      );

      setForm(initialState);

      if (onSaved) {
        onSaved();
      }
    } catch (error) {
      console.error(
        "FLIGHT SAVE ERROR:",
        error
      );

      alert(
        error.message ||
          "Unable to save flight booking."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "11px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
    background: "#ffffff",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#334155",
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "25px",
        borderRadius: "15px",
        border: "1px solid #e2e8f0",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "22px",
          gap: "15px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "24px",
              fontWeight: "700",
              color: "#0f172a",
            }}
          >
            ✈️{" "}
            {selectedFlight
              ? "Edit Flight Booking"
              : "New Flight Booking"}
          </h2>

          <p
            style={{
              margin: "5px 0 0",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Add and manage airline passenger
            reservations.
          </p>
        </div>

        {selectedFlight && (
          <span
            style={{
              background: "#eff6ff",
              color: "#2563eb",
              padding: "7px 12px",
              borderRadius: "7px",
              fontSize: "12px",
              fontWeight: "700",
            }}
          >
            EDIT MODE
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {/* PASSENGER */}

        <h3
          style={{
            fontSize: "17px",
            marginBottom: "15px",
            color: "#0f172a",
          }}
        >
          Passenger Information
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(240px,1fr))",
            gap: "15px",
          }}
        >
          <div>
            <label style={labelStyle}>
              Passenger Name *
            </label>

            <input
              style={inputStyle}
              name="passenger_name"
              placeholder="Passenger Name"
              value={form.passenger_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>
              Mobile Number
            </label>

            <input
              style={inputStyle}
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Email
            </label>

            <input
              type="email"
              style={inputStyle}
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Passengers
            </label>

            <input
              type="number"
              min="1"
              style={inputStyle}
              name="passengers"
              value={form.passengers}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* JOURNEY */}

        <h3
          style={{
            fontSize: "17px",
            marginTop: "28px",
            marginBottom: "15px",
            color: "#0f172a",
          }}
        >
          Flight Details
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(240px,1fr))",
            gap: "15px",
          }}
        >
          <div>
            <label style={labelStyle}>
              From City *
            </label>

            <input
              style={inputStyle}
              name="from_city"
              placeholder="Departure City"
              value={form.from_city}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>
              To City *
            </label>

            <input
              style={inputStyle}
              name="to_city"
              placeholder="Destination City"
              value={form.to_city}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>
              Departure Date
            </label>

            <input
              type="date"
              style={inputStyle}
              name="departure_date"
              value={form.departure_date}
              onChange={handleChange}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Airline
            </label>

            <input
              style={inputStyle}
              name="airline"
              placeholder="Airline"
              value={form.airline}
              onChange={handleChange}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Flight Number
            </label>

            <input
              style={inputStyle}
              name="flight_no"
              placeholder="Flight Number"
              value={form.flight_no}
              onChange={handleChange}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Class
            </label>

            <select
              style={inputStyle}
              name="class_type"
              value={form.class_type}
              onChange={handleChange}
            >
              <option>Economy</option>
              <option>
                Premium Economy
              </option>
              <option>Business</option>
              <option>First Class</option>
            </select>
          </div>
        </div>

        {/* PAYMENT */}

        <h3
          style={{
            fontSize: "17px",
            marginTop: "28px",
            marginBottom: "15px",
            color: "#0f172a",
          }}
        >
          Fare & Booking Status
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "15px",
          }}
        >
          <div>
            <label style={labelStyle}>
              Fare
            </label>

            <input
              type="number"
              min="0"
              style={inputStyle}
              name="fare"
              placeholder="₹ Fare"
              value={form.fare}
              onChange={handleChange}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Payment Status
            </label>

            <select
              style={inputStyle}
              name="payment_status"
              value={form.payment_status}
              onChange={handleChange}
            >
              <option>Pending</option>
              <option>Paid</option>
              <option>Partial</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>
              Booking Status
            </label>

            <select
              style={inputStyle}
              name="booking_status"
              value={form.booking_status}
              onChange={handleChange}
            >
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Waiting</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        {/* NOTES */}

        <div style={{ marginTop: "20px" }}>
          <label style={labelStyle}>
            Notes
          </label>

          <textarea
            name="notes"
            rows="4"
            placeholder="Additional notes..."
            value={form.notes}
            onChange={handleChange}
            style={{
              ...inputStyle,
              resize: "vertical",
            }}
          />
        </div>

        {/* BUTTONS */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "22px",
          }}
        >
          {selectedFlight && (
            <button
              type="button"
              onClick={resetForm}
              style={{
                background: "#f1f5f9",
                color: "#334155",
                border: "1px solid #cbd5e1",
                padding: "11px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Cancel Edit
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading
                ? "#94a3b8"
                : "#2563eb",
              color: "#ffffff",
              border: "none",
              padding: "11px 24px",
              borderRadius: "8px",
              cursor: loading
                ? "not-allowed"
                : "pointer",
              fontWeight: "600",
            }}
          >
            {loading
              ? "Saving..."
              : selectedFlight
              ? "Update Flight"
              : "Save Flight"}
          </button>
        </div>
      </form>
    </div>
  );
}