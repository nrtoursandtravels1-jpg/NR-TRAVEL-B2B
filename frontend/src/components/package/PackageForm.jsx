import { useState } from "react";
import { supabase } from "../../services/supabase";

function PackageForm({ onSuccess }) {
  const [form, setForm] = useState({
  package_code: `PKG-${Date.now()}`,

  package_name: "",
  package_type: "Domestic",
  destination: "",
  duration: "",

  hotel_category: "3 Star",
  transport: "",
  meal_plan: "",

  price: "",
  description: "",
  image_url: "",

  featured: false,
  status: "Active",
});

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("tour_packages")
      .insert([form]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Package Added Successfully");

    setForm({
  package_name: "",
  package_type: "Domestic",
  destination: "",
  duration: "",

  hotel_category: "3 Star",
  transport: "",
  meal_plan: "",

  price: "",
  description: "",
  image_url: "",

  featured: false,
  status: "Active",
});

    if (onSuccess) onSuccess();
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: 25,
        borderRadius: 10,
      }}
    >
      <h2>Add Tour Package</h2>

      <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "grid",  
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "15px",
    }}
  >

      <input
          name="package_code"
          placeholder="Package Code"
          value={form.package_code}
          readOnly
          style={{
          background: "#f1f5f9",
          color: "#64748b",
          fontWeight: "bold",
    }}
  />

          <input
            name="package_name"
            placeholder="Package Name"
            value={form.package_name}
            onChange={handleChange}
            required
          />

    
        <select
          name="package_type"
          value={form.package_type}
          onChange={handleChange}
        >
          <option>Domestic</option>
          <option>International</option>
        </select>

        <br /><br />

        <input
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          name="duration"
          placeholder="5 Days / 4 Nights"
          value={form.duration}
          onChange={handleChange}
        />

        <select
  name="hotel_category"
  value={form.hotel_category}
  onChange={handleChange}
>
  <option>3 Star</option>
  <option>4 Star</option>
  <option>5 Star</option>
</select>

<input
  name="transport"
  placeholder="Transport (Flight / Train / Bus)"
  value={form.transport}
  onChange={handleChange}
/>

<input
  name="meal_plan"
  placeholder="Meal Plan (Breakfast / MAP / AP)"
  value={form.meal_plan}
  onChange={handleChange}
/>

        <br /><br />

        <input
          type="number"
          name="price"
          placeholder="Starting Price"
          value={form.price}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="image_url"
          placeholder="Image URL"
          value={form.image_url}
          onChange={handleChange}
        />

        <br /><br />

      </div>

        <textarea
          name="description"
          placeholder="Package Description"
          rows="5"
          value={form.description}
          onChange={handleChange}
        />

        <br /><br />

        <label>
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          Featured Package
        </label>

        <br /><br />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <br /><br />
       <div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
  }}
>
  <button
    type="button"
    onClick={() =>
      setForm({
        package_name: "",
        package_type: "Domestic",
        destination: "",
        duration: "",
        price: "",
        description: "",
        image_url: "",
        featured: false,
        status: "Active",
      })
    }
    style={{
      background: "#64748b",
      color: "#fff",
      border: "none",
      padding: "12px 20px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    Reset
  </button>

  <button
    type="submit"
    disabled={loading}
    style={{
      background: "#2563eb",
      color: "#fff",
      border: "none",
      padding: "12px 25px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    {loading ? "Saving..." : "Save Package"}
  </button>
   </div>        
      </form>
    </div>
  );
}

export default PackageForm;