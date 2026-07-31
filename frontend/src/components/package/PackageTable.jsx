import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

export default function PackageTable({ search }) {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    setLoading(true);

    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log("Package Fetch Error:", error);
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
      .from("packages")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Failed to delete package.");
      return;
    }

    alert("Package deleted successfully.");
    fetchPackages();
  }

  const filteredPackages = packages.filter((pkg) =>
    (
      (pkg.package_name || "") +
      " " +
      (pkg.destination || "")
    )
      .toLowerCase()
      .includes((search || "").toLowerCase())
  );

  if (loading) {
    return <h2>Loading Packages...</h2>;
  }

  return (
    <div className="overflow-x-auto">

      <div className="mb-4">
        <h3 className="text-lg font-semibold">
          Total Packages : {filteredPackages.length}
        </h3>
      </div>

      <table className="min-w-full border border-gray-300 bg-white">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-3 text-left">Package</th>
            <th className="p-3 text-left">Destination</th>
            <th className="p-3 text-left">Duration</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-center">Action</th>
          </tr>

        </thead>

        <tbody>

          {filteredPackages.length > 0 ? (

            filteredPackages.map((pkg) => (

              <tr
                key={pkg.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3 font-medium">
                  {pkg.package_name}
                </td>

                <td className="p-3">
                  {pkg.destination}
                </td>

                <td className="p-3">
                  {pkg.duration}
                </td>

                <td className="p-3">
                  ₹ {pkg.price}
                </td>

                <td className="p-3">
                  {pkg.status}
                </td>

                <td className="p-3 text-center">

                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                    onClick={() =>
                      navigate(`/packages/edit/${pkg.id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    onClick={() =>
                      deletePackage(pkg.id)
                    }
                  >
                    Delete
                  </button>

                </td>
              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="6"
                className="text-center p-8 text-gray-500"
              >
                No packages found.
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}