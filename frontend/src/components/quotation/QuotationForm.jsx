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
  onPreview,
}) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedQuotation) {
      setForm({
        ...initialState,
        ...selectedQuotation,
      });
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
  const { name, value } = e.target;

  setForm((prev) => {
    const updatedForm = {
      ...prev,
      [name]: value,
    };

    if (onPreview) {
      onPreview(updatedForm);
    }

    return updatedForm;
  });
}


  function handleReset() {
    setForm(initialState);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const quotationData = {
      customer_name: form.customer_name,
      mobile: form.mobile,
      email: form.email,
      destination: form.destination,

      hotel_amount: Number(form.hotel_amount || 0),
      flight_amount: Number(form.flight_amount || 0),
      train_amount: Number(form.train_amount || 0),
      bus_amount: Number(form.bus_amount || 0),
      cab_amount: Number(form.cab_amount || 0),
      visa_amount: Number(form.visa_amount || 0),
      package_amount: Number(form.package_amount || 0),
      other_amount: Number(form.other_amount || 0),

      total_amount: Number(form.total_amount || 0),

      status: form.status,
      notes: form.notes,
    };

    let error;

    if (selectedQuotation) {
      ({ error } = await supabase
        .from("quotations")
        .update(quotationData)
        .eq("id", selectedQuotation.id));
    } else {
      ({ error } = await supabase
        .from("quotations")
        .insert([quotationData]));
    }

    setLoading(false);

    if (error) {
      console.error("Quotation Error:", error);
      alert(error.message);
      return;
    }

    alert(
      selectedQuotation
        ? "Quotation Updated Successfully"
        : "Quotation Created Successfully"
    );

    setForm(initialState);

    if (onSaved) {
      onSaved();
    }
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
      <h2
        style={{
          marginBottom: "20px",
          color: "#0f172a",
        }}
      >
        {selectedQuotation
          ? "Edit Quotation"
          : "Create Quotation"}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "15px",
        }}
      >
        <input
          name="customer_name"
          placeholder="Customer Name"
          value={form.customer_name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile"
          value={form.mobile}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          style={inputStyle}
        />

        {amountFields.map(([field, label]) => (
          <input
            key={field}
            type="number"
            min="0"
            name={field}
            placeholder={`${label} Amount`}
            value={form[field]}
            onChange={handleChange}
            style={inputStyle}
          />
        ))}

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Draft">Draft</option>
          <option value="Sent">Sent</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
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
          padding: "12px",
          border: "1px solid #cbd5e1",
          borderRadius: "8px",
          resize: "vertical",
        }}
      />

      <h2
        style={{
          marginTop: "20px",
          color: "#2563eb",
        }}
      >
        Grand Total : ₹{" "}
        {Number(form.total_amount || 0).toLocaleString("en-IN")}
      </h2>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
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
          onClick={handleReset}
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
      </div>
    </form>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  outline: "none",
  boxSizing: "border-box",
};