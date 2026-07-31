import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

function CreatePackage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    package_name: "",
    destination: "",
    duration: "",
    package_type: "",
    price: "",
    hotel_category: "",
    transport: "",
    meals: "",
    description: "",
    status: "Active",
  });

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
      .from("packages")
      .insert([form]);

    setLoading(false);

    if (error) {
      console.log(error);
      alert("Package creation failed.");
      return;
    }

    alert("Package created successfully.");

    navigate("/packages");
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-2">
        Create Tour Package
      </h1>

      <p className="text-gray-500 mb-8">
        Add a new package to your travel business.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 space-y-4"
      >

        <input
          className="w-full border rounded-lg p-3"
          name="package_name"
          placeholder="Package Name"
          value={form.package_name}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border rounded-lg p-3"
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
        />

        <input
          className="w-full border rounded-lg p-3"
          name="duration"
          placeholder="Duration (5D / 4N)"
          value={form.duration}
          onChange={handleChange}
        />

        <input
          className="w-full border rounded-lg p-3"
          name="package_type"
          placeholder="Package Type"
          value={form.package_type}
          onChange={handleChange}
        />

        <input
          className="w-full border rounded-lg p-3"
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          className="w-full border rounded-lg p-3"
          name="hotel_category"
          placeholder="Hotel Category"
          value={form.hotel_category}
          onChange={handleChange}
        />

        <input
          className="w-full border rounded-lg p-3"
          name="transport"
          placeholder="Transport"
          value={form.transport}
          onChange={handleChange}
        />

        <input
          className="w-full border rounded-lg p-3"
          name="meals"
          placeholder="Meals"
          value={form.meals}
          onChange={handleChange}
        />

        <textarea
          rows="5"
          className="w-full border rounded-lg p-3"
          name="description"
          placeholder="Package Description"
          value={form.description}
          onChange={handleChange}
        />

        <select
          className="w-full border rounded-lg p-3"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          type="submit"
        >
          {loading ? "Saving..." : "Save Package"}
        </button>

      </form>

    </div>
  );
}

export default CreatePackage;