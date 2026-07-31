import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../services/supabase";

function EditPackage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
    featured: false,
    status: "Active",
  });

  useEffect(() => {
    fetchPackage();
  }, []);

  async function fetchPackage() {
    const { data, error } = await supabase
      .from("tour_packages")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
      alert("Package not found");
      navigate("/packages");
      return;
    }

    setForm({
      package_name: data.package_name || "",
      destination: data.destination || "",
      duration: data.duration || "",
      package_type: data.package_type || "",
      price: data.price || "",
      hotel_category: data.hotel_category || "",
      transport: data.transport || "",
      meals: data.meals || "",
      description: data.description || "",
      featured: data.featured || false,
      status: data.status || "Active",
    });

    setLoading(false);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);

    const { error } = await supabase
      .from("tour_packages")
      .update(form)
      .eq("id", id);

    setSaving(false);

    if (error) {
      console.log(error);
      alert("Update failed");
      return;
    }

    alert("Package updated successfully");

    navigate("/packages");
  }

  if (loading) {
    return (
      <div className="p-6">
        <h2>Loading Package...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-2">
        Edit Tour Package
      </h1>

      <p className="text-gray-500 mb-8">
        Update your package information.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 space-y-4"
      >

        <input
          className="w-full border rounded-lg p-3"
          name="package_name"
          value={form.package_name}
          onChange={handleChange}
          placeholder="Package Name"
        />

        <input
          className="w-full border rounded-lg p-3"
          name="destination"
          value={form.destination}
          onChange={handleChange}
          placeholder="Destination"
        />

        <input
          className="w-full border rounded-lg p-3"
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration"
        />

        <input
          className="w-full border rounded-lg p-3"
          name="package_type"
          value={form.package_type}
          onChange={handleChange}
          placeholder="Package Type"
        />

        <input
          className="w-full border rounded-lg p-3"
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <input
          className="w-full border rounded-lg p-3"
          name="hotel_category"
          value={form.hotel_category}
          onChange={handleChange}
          placeholder="Hotel Category"
        />

        <input
          className="w-full border rounded-lg p-3"
          name="transport"
          value={form.transport}
          onChange={handleChange}
          placeholder="Transport"
        />

        <input
          className="w-full border rounded-lg p-3"
          name="meals"
          value={form.meals}
          onChange={handleChange}
          placeholder="Meals"
        />

        <textarea
          rows="4"
          className="w-full border rounded-lg p-3"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          Featured Package
        </label>

        <select
          className="w-full border rounded-lg p-3"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          {saving ? "Updating..." : "Update Package"}
        </button>

      </form>

    </div>
  );
}

export default EditPackage;