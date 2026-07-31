import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../services/supabase";

function EditPackage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchPackage();
  }, []);

  async function fetchPackage() {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
      alert("Package not found");
      navigate("/packages");
      return;
    }

    setForm(data);
    setLoading(false);
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("packages")
      .update({
        package_name: form.package_name,
        destination: form.destination,
        duration: form.duration,
        package_type: form.package_type,
        price: form.price,
        hotel_category: form.hotel_category,
        transport: form.transport,
        meals: form.meals,
        description: form.description,
        status: form.status,
      })
      .eq("id", id);

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
      <h2 className="p-6">
        Loading Package...
      </h2>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Edit Tour Package
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow"
      >

        <input
          className="w-full border p-3 rounded"
          name="package_name"
          value={form.package_name}
          onChange={handleChange}
          placeholder="Package Name"
          required
        />

        <input
          className="w-full border p-3 rounded"
          name="destination"
          value={form.destination}
          onChange={handleChange}
          placeholder="Destination"
        />

        <input
          className="w-full border p-3 rounded"
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration"
        />

        <input
          className="w-full border p-3 rounded"
          name="package_type"
          value={form.package_type}
          onChange={handleChange}
          placeholder="Package Type"
        />

        <input
          className="w-full border p-3 rounded"
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <input
          className="w-full border p-3 rounded"
          name="hotel_category"
          value={form.hotel_category}
          onChange={handleChange}
          placeholder="Hotel Category"
        />

        <input
          className="w-full border p-3 rounded"
          name="transport"
          value={form.transport}
          onChange={handleChange}
          placeholder="Transport"
        />

        <input
          className="w-full border p-3 rounded"
          name="meals"
          value={form.meals}
          onChange={handleChange}
          placeholder="Meals"
        />

        <textarea
          rows="4"
          className="w-full border p-3 rounded"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <select
          className="w-full border p-3 rounded"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Update Package
        </button>

      </form>

    </div>
  );
}

export default EditPackage;