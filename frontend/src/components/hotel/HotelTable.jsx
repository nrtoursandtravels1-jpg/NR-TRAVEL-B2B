import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function HotelTable({
  refresh,
  setSelectedHotel,
}) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotels();
  }, [refresh]);

  const fetchHotels = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("hotels")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setHotels(data || []);
    setLoading(false);
  };

  const deleteHotel = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this hotel?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("hotels")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      alert("Delete failed");
      return;
    }

    alert("Hotel deleted successfully");
    fetchHotels();
  };

  if (loading) {
    return <h3>Loading Hotels...</h3>;
  }

  return (
    <div
      style={{
        background: "#fff",
        color: "#000",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h2>Hotel List</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Hotel</th>
            <th>City</th>
            <th>Contact</th>
            <th>Mobile</th>
            <th>Room</th>
            <th>Price/Night</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.id}>
              <td>{hotel.hotel_name}</td>
              <td>{hotel.city}</td>
              <td>{hotel.contact_person}</td>
              <td>{hotel.mobile}</td>
              <td>{hotel.room_type}</td>
              <td>₹ {hotel.price_per_night}</td>
              <td>{hotel.status}</td>

              <td>
                <button
                  onClick={() =>
                    setSelectedHotel(hotel)
                  }
                >
                  Edit
                </button>

                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() =>
                    deleteHotel(hotel.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {hotels.length === 0 && (
        <p>No hotels found.</p>
      )}
    </div>
  );
}