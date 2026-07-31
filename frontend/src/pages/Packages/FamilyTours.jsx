import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

function FamilyTours() {
  const [familyTours, setFamilyTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFamilyTours();
  }, []);

  async function fetchFamilyTours() {
    setLoading(true);

    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("package_type", "Family")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log(error);
    } else {
      setFamilyTours(data || []);
    }

    setLoading(false);
  }

  async function deleteTour(id) {
    const confirmDelete = window.confirm(
      "Delete this family tour?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("packages")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Delete failed");
      return;
    }

    alert("Family Tour deleted successfully.");

    fetchFamilyTours();
  }

  if (loading) {
    return (
      <h2 className="p-6">
        Loading Family Tours...
      </h2>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold">
        Family Tours
      </h1>

      <p className="text-gray-500 mb-6">
        Manage all family tour packages.
      </p>

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="min-w-full">

          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Package</th>
              <th className="p-3 text-left">Destination</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {familyTours.length > 0 ? (

              familyTours.map((tour) => (

                <tr key={tour.id} className="border-t">

                  <td className="p-3">
                    {tour.package_name}
                  </td>

                  <td className="p-3">
                    {tour.destination}
                  </td>

                  <td className="p-3">
                    {tour.duration}
                  </td>

                  <td className="p-3">
                    ₹ {tour.price}
                  </td>

                  <td className="p-3">
                    {tour.status}
                  </td>

                  <td className="p-3">

                    <button
                      onClick={() => deleteTour(tour.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
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
                  No Family Tours Found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default FamilyTours;