import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function CustomerForm({
  selectedCustomer,
  onCustomerAdded,
}) {
  const [customer, setCustomer] = useState({
    customer_name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    notes: "",
  });

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

    if (error) {
      console.log(error);
      alert("Failed to save customer");
      return;
    }

    alert(
      selectedCustomer
        ? "Customer updated successfully"
        : "Customer added successfully"
    );

    setCustomer({
      customer_name: "",
      mobile: "",
      email: "",
      address: "",
      city: "",
      state: "",
      country: "",
      notes: "",
    });

    if (onCustomerAdded) {
      onCustomerAdded();
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        color: "#000",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h2>
        {selectedCustomer ? "Edit Customer" : "Add Customer"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          name="customer_name"
          placeholder="Customer Name"
          value={customer.customer_name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          name="mobile"
          placeholder="Mobile Number"
          value={customer.mobile}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="address"
          placeholder="Address"
          value={customer.address}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="city"
          placeholder="City"
          value={customer.city}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="state"
          placeholder="State"
          value={customer.state}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="country"
          placeholder="Country"
          value={customer.country}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="notes"
          placeholder="Notes"
          value={customer.notes}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          {selectedCustomer ? "Update Customer" : "Save Customer"}
        </button>
      </form>
    </div>
  );
}