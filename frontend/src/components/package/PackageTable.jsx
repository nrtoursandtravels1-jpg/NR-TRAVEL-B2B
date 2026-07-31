import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function PackageTable({ search = "" }) {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    setLoading(true);

    const { data, error } = await supabase
      .from("tour_packages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      alert("Unable to load packages.");
    } else {
      setPackages(data || []);
    }

    setLoading(false);
  }

  async function deletePackage(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this package?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("tour_packages")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Package deleted successfully.");
    fetchPackages();
  }

  const filteredPackages = packages.filter((pkg) => {
    return (
      `${pkg.package_name || ""} ${pkg.destination || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="p-6">
        <h2>Loading Packages...</h2>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Tour Packages
        </h2>

        <span className="bg-blue-600 text-white px-3 py-1 rounded">
          Total : {filteredPackages.length}
        </span>
      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full border">

          <thead className="bg-gray-100">

            <tr>

              <th className="border p-3">Package</th>

              <th className="border p-3">Type</th>

              <th className="border p-3">Destination</th>

              <th className="border p-3">Duration</th>

              <th className="border p-3">Price</th>

              <th className="border p-3">Featured</th>

              <th className="border p-3">Status</th>

              <th className="border p-3">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredPackages.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center p-8"
                >
                  No Packages Found
                </td>

              </tr>

            ) : (

              filteredPackages.map((pkg) => (

                <tr
                  key={pkg.id}
                  className="hover:bg-gray-50"
                >

                  <td className="border p-3 font-semibold">
                    {pkg.package_name}
                  </td>

                  <td className="border p-3">
                    {pkg.package_type}
                  </td>

                  <td className="border p-3">
                    {pkg.destination}
                  </td>

                  <td className="border p-3">
                    {pkg.duration}
                  </td>

                  <td className="border p-3">
                    ₹ {pkg.price}
                  </td>

                  <td className="border p-3">
                    {pkg.featured ? "⭐ Yes" : "No"}
                  </td>

                  <td className="border p-3">
                    {pkg.status}
                  </td>

                  <td className="border p-3">

                    <button
                      onClick={() =>
                        navigate(`/packages/edit/${pkg.id}`)
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deletePackage(pkg.id)
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}