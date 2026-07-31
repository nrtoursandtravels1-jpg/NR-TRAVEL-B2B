import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function HotelTable({
  search,
  onEdit,
  refresh,
}) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotels();
  }, [refresh]);

  async function fetchHotels() {
    setLoading(true);

    const { data, error } = await supabase
      .from("hotels")
      .select("*")
      .order("hotel_name");

    if (!error) {
      setHotels(data || []);
    }

    setLoading(false);
  }

  async function deleteHotel(id) {
    const confirmDelete = window.confirm(
      "Delete this hotel?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("hotels")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Hotel deleted successfully.");

    fetchHotels();
  }

  const filtered = hotels.filter((hotel) =>
    (
      hotel.hotel_name +
      " " +
      hotel.city
    )
      .toLowerCase()
      .includes((search || "").toLowerCase())
  );

  if (loading) {
    return <h2>Loading Hotels...</h2>;
  }

  return (
    <div className="overflow-x-auto">

      <table className="min-w-full border border-gray-300 bg-white">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3">Hotel</th>

            <th className="p-3">City</th>

            <th className="p-3">Room</th>

            <th className="p-3">Price</th>

            <th className="p-3">Contact</th>

            <th className="p-3">Mobile</th>

            <th className="p-3">Status</th>

            <th className="p-3">Action</th>

          </tr>

        </thead>

        <tbody>

          {filtered.length > 0 ? (

            filtered.map((hotel) => (

              <tr
                key={hotel.id}
                className="border-t"
              >

                <td className="p-3">
                  {hotel.hotel_name}
                </td>

                <td className="p-3">
                  {hotel.city}
                </td>

                <td className="p-3">
                  {hotel.room_type}
                </td>

                <td className="p-3">
                  ₹ {hotel.price_per_night}
                </td>

                <td className="p-3">
                  {hotel.contact_person}
                </td>

                <td className="p-3">
                  {hotel.mobile}
                </td>

                <td className="p-3">
                  {hotel.status}
                </td>

                <td className="p-3">

                  <button
                    onClick={() => onEdit(hotel)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteHotel(hotel.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="8"
                className="text-center p-6"
              >
                No Hotels Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}