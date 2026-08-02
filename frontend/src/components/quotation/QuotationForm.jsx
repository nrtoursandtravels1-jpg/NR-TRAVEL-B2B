import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

const initialState = {
  customer_name: "",
  mobile: "",
  email: "",
  destination: "",

  hotel_amount: 0,
  flight_amount: 0,
  train_amount: 0,
  bus_amount: 0,
  cab_amount: 0,
  visa_amount: 0,
  package_amount: 0,
  other_amount: 0,

  total_amount: 0,

  status: "Draft",

  notes: "",
};

export default function QuotationForm({
  selectedQuotation,
  onSaved,
}) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedQuotation) {
      setForm(selectedQuotation);
    } else {
      setForm(initialState);
    }
  }, [selectedQuotation]);

  useEffect(() => {
    const total =
      Number(form.hotel_amount || 0) +
      Number(form.flight_amount || 0) +
      Number(form.train_amount || 0) +
      Number(form.bus_amount || 0) +
      Number(form.cab_amount || 0) +
      Number(form.visa_amount || 0) +
      Number(form.package_amount || 0) +
      Number(form.other_amount || 0);

    setForm((prev) => ({
      ...prev,
      total_amount: total,
    }));
  }, [
    form.hotel_amount,
    form.flight_amount,
    form.train_amount,
    form.bus_amount,
    form.cab_amount,
    form.visa_amount,
    form.package_amount,
    form.other_amount,
  ]);

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

    if (selectedQuotation) {
      ({ error } = await supabase
        .from("quotations")
        .update(form)
        .eq("id", selectedQuotation.id));
    } else {
      ({ error } = await supabase
        .from("quotations")
        .insert([form]));
    }

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      selectedQuotation
        ? "Quotation Updated Successfully"
        : "Quotation Created Successfully"
    );

    setForm(initialState);

    if (onSaved) onSaved();
  }

  const amountFields = [
    ["hotel_amount", "Hotel"],
    ["flight_amount", "Flight"],
    ["train_amount", "Train"],
    ["bus_amount", "Bus"],
    ["cab_amount", "Cab"],
    ["visa_amount", "Visa"],
    ["package_amount", "Package"],
    ["other_amount", "Other"],
  ];

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
        marginBottom: "30px",
      }}
    >
      <h2>Create Quotation</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "15px",
        }}
      >
        <input
          name="customer_name"
          placeholder="Customer Name"
          value={form.customer_name}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile"
          value={form.mobile}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
        />

        {amountFields.map(([field, label]) => (
          <input
            key={field}
            type="number"
            name={field}
            placeholder={`${label} Amount`}
            value={form[field]}
            onChange={handleChange}
          />
        ))}

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Draft</option>
          <option>Sent</option>
          <option>Accepted</option>
          <option>Rejected</option>
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

      <h2
        style={{
          marginTop: "20px",
          color: "#2563eb",
        }}
      >
        Grand Total :  ₹ {Number(form.total_amount).toLocaleString()}
      </h2>

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
          : selectedQuotation
          ? "Update Quotation"
          : "Create Quotation"}
      </button>
        
        <button
          type="button"
          onClick={() => setForm(initialState)}
          style={{
          background: "#64748b",
          color: "#fff",
          border: "none",
          padding: "12px 25px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
       >
    Reset
  </button>
</form>
);
}