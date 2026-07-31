import { useState } from "react";
import { supabase } from "../../services/supabase";

function PackageForm({ onSuccess }) {
  const [form, setForm] = useState({
    package_name: "",
    package_type: "Domestic",
    destination: "",
    duration: "",
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

        <input
          name="package_name"
          placeholder="Package Name"
          value={form.package_name}
          onChange={handleChange}
          required
        />

        <br /><br />

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

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Package"}
        </button>

      </form>
    </div>
  );
}

export default PackageForm;