import { useState } from "react";
import { supabase } from "../../services/supabase";

function RequirementForm() {
  const [form, setForm] = useState({
    destination: "",
    travel_type: "Domestic",
    departure_date: "",
    return_date: "",
    adults: 1,
    children: 0,
    infants: 0,
    budget: "",
    service: "Tour Package",
    customer_name: "",
    mobile: "",
    email: "",
    message: "",
  });

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
      .from("travel_requirements")
      .insert([form]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Requirement submitted successfully.");

    setForm({
      destination: "",
      travel_type: "Domestic",
      departure_date: "",
      return_date: "",
      adults: 1,
      children: 0,
      infants: 0,
      budget: "",
      service: "Tour Package",
      customer_name: "",
      mobile: "",
      email: "",
      message: "",
    });
  }

  return (
    <section
      style={{
        padding: "70px 40px",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "36px",
          }}
        >
          Plan Your Next Trip
        </h2>

        <p
          style={{
            textAlign: "center",
            marginBottom: "40px",
            color: "#555",
          }}
        >
          Submit your travel requirement and our team will contact you with the
          best quotation.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "20px",
          }}
        >
          <input
            name="destination"
            placeholder="Destination"
            value={form.destination}
            onChange={handleChange}
            required
          />

          <select
            name="travel_type"
            value={form.travel_type}
            onChange={handleChange}
          >
            <option>Domestic</option>
            <option>International</option>
          </select>

          <input
            type="date"
            name="departure_date"
            value={form.departure_date}
            onChange={handleChange}
          />

          <input
            type="date"
            name="return_date"
            value={form.return_date}
            onChange={handleChange}
          />

          <input
            type="number"
            name="adults"
            value={form.adults}
            onChange={handleChange}
            placeholder="Adults"
          />

          <input
            type="number"
            name="children"
            value={form.children}
            onChange={handleChange}
            placeholder="Children"
          />

          <input
            type="number"
            name="infants"
            value={form.infants}
            onChange={handleChange}
            placeholder="Infants"
          />

          <input
            type="number"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            placeholder="Budget"
          />

          <select
            name="service"
            value={form.service}
            onChange={handleChange}
          >
            <option>Tour Package</option>
            <option>Hotel</option>
            <option>Cab</option>
            <option>Bus</option>
            <option>Flight</option>
            <option>Visa</option>
            <option>Passport</option>
            <option>Insurance</option>
          </select>

          <input
            name="customer_name"
            placeholder="Full Name"
            value={form.customer_name}
            onChange={handleChange}
            required
          />

          <input
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Additional Requirement"
            rows="5"
            value={form.message}
            onChange={handleChange}
            style={{
              gridColumn: "1 / span 2",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              gridColumn: "1 / span 2",
              padding: "15px",
              background: "#1d4ed8",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            {loading ? "Submitting..." : "Submit Requirement"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default RequirementForm;