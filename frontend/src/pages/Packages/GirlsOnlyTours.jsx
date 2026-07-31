import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";

function GirlsOnlyTours() {
  const navigate = useNavigate();

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours();
  }, []);

  async function fetchTours() {
    setLoading(true);

    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("package_type", "Girls Only")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log(error);
    } else {
      setTours(data || []);
    }

    setLoading(false);
  }

  async function deleteTour(id) {
    const confirmDelete = window.confirm(
      "Delete this Girls Only Tour?"
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

    alert("Tour deleted successfully.");

    fetchTours();
  }

  if (loading) {
    return (
      <h2 className="p-6">
        Loading Girls Only Tours...
      </h2>
    );
  }

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Girls Only Tours
          </h1>

          <p className="text-gray-500">
            Manage women-only travel packages.
          </p>
        </div>

        <button
          onClick={() => navigate("/packages/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Create Tour
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

            {tours.length > 0 ? (

              tours.map((tour) => (

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
                  No Girls Only Tours Found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default GirlsOnlyTours;