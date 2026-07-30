import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

function CreatePackage() {
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("packages")
      .insert([form]);

    if (error) {
      console.log("Package Error:", error);
      alert("Package creation failed");
      return;
    }

    alert("Package created successfully");
    navigate("/packages");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Create Tour Package
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-slate-800 p-6 rounded-xl"
      >

        <input
          type="text"
          name="package_name"
          placeholder="Package Name"
          value={form.package_name}
          onChange={handleChange}
          className="w-full p-3 rounded text-black"
          required
        />

        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          className="w-full p-3 rounded text-black"
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration (5D/4N)"
          value={form.duration}
          onChange={handleChange}
          className="w-full p-3 rounded text-black"
        />

        <input
          type="text"
          name="package_type"
          placeholder="Package Type"
          value={form.package_type}
          onChange={handleChange}
          className="w-full p-3 rounded text-black"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-3 rounded text-black"
        />

        <input
          type="text"
          name="hotel_category"
          placeholder="Hotel Category"
          value={form.hotel_category}
          onChange={handleChange}
          className="w-full p-3 rounded text-black"
        />

        <input
          type="text"
          name="transport"
          placeholder="Transport"
          value={form.transport}
          onChange={handleChange}
          className="w-full p-3 rounded text-black"
        />

        <input
          type="text"
          name="meals"
          placeholder="Meals"
          value={form.meals}
          onChange={handleChange}
          className="w-full p-3 rounded text-black"
        />

        <textarea
          name="description"
          placeholder="Package Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 rounded text-black"
          rows="4"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-3 rounded text-black"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white"
        >
          Save Package
        </button>

      </form>

    </div>
  );
}

export default CreatePackage;