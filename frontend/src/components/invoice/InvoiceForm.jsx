import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

const initialState = {
  invoice_number: `INV-${Date.now()}`,
  customer_name: "",
  mobile: "",
  email: "",
  destination: "",
  amount: "",
  gst: 18,
  total_amount: 0,
  payment_status: "Pending",
  payment_mode: "Cash",
  notes: "",
};

export default function InvoiceForm({
  selectedInvoice,
  onSaved,
}) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedInvoice) {
      setForm(selectedInvoice);
    } else {
      setForm(initialState);
    }
  }, [selectedInvoice]);

  useEffect(() => {
    const amount = Number(form.amount || 0);
    const gst = Number(form.gst || 0);

    const total = amount + (amount * gst) / 100;

    setForm((prev) => ({
      ...prev,
      total_amount: total.toFixed(2),
    }));
  }, [form.amount, form.gst]);

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

    if (selectedInvoice) {
      ({ error } = await supabase
        .from("invoices")
        .update(form)
        .eq("id", selectedInvoice.id));
    } else {
      ({ error } = await supabase
        .from("invoices")
        .insert([form]));
    }

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      selectedInvoice
        ? "Invoice Updated Successfully"
        : "Invoice Created Successfully"
    );

    setForm({
      ...initialState,
      invoice_number: `INV-${Date.now()}`,
    });

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
        marginBottom: "30px",
      }}
    >
      <h2>Create Invoice</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "15px",
        }}
      >
        <input
          name="invoice_number"
          value={form.invoice_number}
          readOnly
        />

        <input
          name="customer_name"
          placeholder="Customer Name"
          value={form.customer_name}
          onChange={handleChange}
          required
        />

        <input
          name="mobile"
          placeholder="Mobile"
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
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />

        <input
          type="number"
          name="gst"
          placeholder="GST %"
          value={form.gst}
          onChange={handleChange}
        />

        <input
          value={`₹ ${form.total_amount}`}
          readOnly
        />

        <select
          name="payment_mode"
          value={form.payment_mode}
          onChange={handleChange}
        >
          <option>Cash</option>
          <option>UPI</option>
          <option>Bank Transfer</option>
          <option>Card</option>
        </select>

        <select
          name="payment_status"
          value={form.payment_status}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>Paid</option>
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
          : selectedInvoice
          ? "Update Invoice"
          : "Create Invoice"}
      </button>
    </form>
  );
}