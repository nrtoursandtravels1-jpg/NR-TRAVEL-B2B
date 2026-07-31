import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

const initialState = {
  applicant_name: "",
  mobile: "",
  email: "",
  passport_number: "",
  destination_country: "",
  visa_type: "Tourist",
  application_date: "",
  appointment_date: "",
  visa_fee: "",
  payment_status: "Pending",
  visa_status: "Processing",
  notes: "",
};

export default function VisaForm({
  selectedVisa,
  onSaved,
}) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedVisa) {
      setForm(selectedVisa);
    } else {
      setForm(initialState);
    }
  }, [selectedVisa]);

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

    if (selectedVisa) {
      ({ error } = await supabase
        .from("visa_applications")
        .update(form)
        .eq("id", selectedVisa.id));
    } else {
      ({ error } = await supabase
        .from("visa_applications")
        .insert([form]));
    }

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      selectedVisa
        ? "Visa Application Updated Successfully"
        : "Visa Application Added Successfully"
    );

    setForm(initialState);

    if (onSaved) onSaved();
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#ffffff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      <h2>Visa Application Form</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "15px",
        }}
      >
        <input
          name="applicant_name"
          placeholder="Applicant Name"
          value={form.applicant_name}
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
          name="passport_number"
          placeholder="Passport Number"
          value={form.passport_number}
          onChange={handleChange}
        />

        <input
          name="destination_country"
          placeholder="Destination Country"
          value={form.destination_country}
          onChange={handleChange}
        />

        <select
          name="visa_type"
          value={form.visa_type}
          onChange={handleChange}
        >
          <option>Tourist</option>
          <option>Business</option>
          <option>Student</option>
          <option>Work</option>
          <option>Medical</option>
        </select>

        <input
          type="date"
          name="application_date"
          value={form.application_date}
          onChange={handleChange}
        />

        <input
          type="date"
          name="appointment_date"
          value={form.appointment_date}
          onChange={handleChange}
        />

        <input
          type="number"
          name="visa_fee"
          placeholder="Visa Fee"
          value={form.visa_fee}
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
          name="visa_status"
          value={form.visa_status}
          onChange={handleChange}
        >
          <option>Processing</option>
          <option>Approved</option>
          <option>Rejected</option>
          <option>Completed</option>
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
          color: "#ffffff",
          border: "none",
          padding: "12px 25px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {loading
          ? "Saving..."
          : selectedVisa
          ? "Update Visa"
          : "Save Visa"}
      </button>
    </form>
  );
}