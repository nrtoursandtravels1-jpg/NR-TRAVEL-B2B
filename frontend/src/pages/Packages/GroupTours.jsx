import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

function GroupTours() {
  const navigate = useNavigate();

  const [groupTours, setGroupTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroupTours();
  }, []);

  async function fetchGroupTours() {
    setLoading(true);

    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("package_type", "Group")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log("Fetch Error:", error);
    } else {
      setGroupTours(data || []);
    }

    setLoading(false);
  }

  async function deleteTour(id) {
    const confirmDelete = window.confirm(
      "Delete this group tour?"
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

    alert("Group Tour deleted successfully.");

    fetchGroupTours();
  }

  if (loading) {
    return (
      <h2 className="p-6">
        Loading Group Tours...
      </h2>
    );
  }

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Group Tours
          </h1>

          <p className="text-gray-500">
            Manage all group tour packages.
          </p>
        </div>

        <button
          onClick={() => navigate("/packages/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Create Group Tour
        </button>

      </div>

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

            {groupTours.length > 0 ? (

              groupTours.map((tour) => (

                <tr
                  key={tour.id}
                  className="border-t"
                >

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
                      onClick={() =>
                        navigate(`/packages/edit/${tour.id}`)
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

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
                  No Group Tours Found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default GroupTours;