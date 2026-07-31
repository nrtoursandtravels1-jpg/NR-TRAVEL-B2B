import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function CustomerForm({
  selectedCustomer,
  onCustomerAdded,
}) {
  const emptyCustomer = {
    customer_name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    notes: "",
  };

  const [customer, setCustomer] = useState(emptyCustomer);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selectedCustomer) {
      setCustomer({
        customer_name: selectedCustomer.customer_name || "",
        mobile: selectedCustomer.mobile || "",
        email: selectedCustomer.email || "",
        address: selectedCustomer.address || "",
        city: selectedCustomer.city || "",
        state: selectedCustomer.state || "",
        country: selectedCustomer.country || "",
        notes: selectedCustomer.notes || "",
      });
    } else {
      setCustomer(emptyCustomer);
    }
  }, [selectedCustomer]);

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    let error;

    if (selectedCustomer) {
      ({ error } = await supabase
        .from("customers")
        .update(customer)
        .eq("id", selectedCustomer.id));
    } else {
      ({ error } = await supabase
        .from("customers")
        .insert([customer]));
    }

    setSaving(false);

    if (error) {
      alert("Unable to save customer.");
      console.log(error);
      return;
    }

    alert(
      selectedCustomer
        ? "Customer updated successfully."
        : "Customer added successfully."
    );

    setCustomer(emptyCustomer);

    if (onCustomerAdded) {
      onCustomerAdded();
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    boxSizing: "border-box",
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>
        {selectedCustomer ? "Edit Customer" : "Add Customer"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          name="customer_name"
          placeholder="Customer Name"
          value={customer.customer_name}
          onChange={handleChange}
          required
        />

        <input
          style={inputStyle}
          name="mobile"
          placeholder="Mobile Number"
          value={customer.mobile}
          onChange={handleChange}
          required
        />

        <input
          style={inputStyle}
          type="email"
          name="email"
          placeholder="Email Address"
          value={customer.email}
          onChange={handleChange}
        />

        <input
          style={inputStyle}
          name="address"
          placeholder="Address"
          value={customer.address}
          onChange={handleChange}
        />

        <input
          style={inputStyle}
          name="city"
          placeholder="City"
          value={customer.city}
          onChange={handleChange}
        />

        <input
          style={inputStyle}
          name="state"
          placeholder="State"
          value={customer.state}
          onChange={handleChange}
        />

        <input
          style={inputStyle}
          name="country"
          placeholder="Country"
          value={customer.country}
          onChange={handleChange}
        />

        <textarea
          style={{
            ...inputStyle,
            minHeight: "100px",
          }}
          name="notes"
          placeholder="Notes"
          value={customer.notes}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "12px 25px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: saving ? "not-allowed" : "pointer",
          }}
        >
          {saving
            ? "Saving..."
            : selectedCustomer
            ? "Update Customer"
            : "Save Customer"}
        </button>
      </form>
    </div>
  );
}