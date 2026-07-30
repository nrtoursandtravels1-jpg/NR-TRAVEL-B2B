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

  const fetchPackages = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log("Package Fetch Error:", error);
      setLoading(false);
      return;
    }

    setPackages(data || []);
    setLoading(false);
  };

  const deletePackage = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this package?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("packages")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      alert("Delete failed");
      return;
    }

    alert("Package deleted successfully");
    fetchPackages();
  };

  const filteredPackages = packages.filter((pkg) =>
    pkg.package_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <h2>Loading Packages...</h2>;
  }

  return (
    <div className="overflow-x-auto">

      <table className="min-w-full border border-slate-700">

        <thead className="bg-slate-700">

          <tr>
            <th className="p-3">Package</th>
            <th className="p-3">Destination</th>
            <th className="p-3">Duration</th>
            <th className="p-3">Price</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>

        </thead>

        <tbody>

          {filteredPackages.length > 0 ? (

            filteredPackages.map((pkg) => (

              <tr
                key={pkg.id}
                className="border-t border-slate-700"
              >

                <td className="p-3">
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

                <td className="p-3">

                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded mr-2"
                    onClick={() =>
                      navigate(`/packages/edit/${pkg.id}`)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
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
                className="text-center p-6"
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