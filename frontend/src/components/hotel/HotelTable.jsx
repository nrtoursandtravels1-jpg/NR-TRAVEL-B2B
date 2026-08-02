import { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import { supabase } from "../../services/supabase";

export default function HotelTable({
  refresh,
  setSelectedHotel,
}) {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const iconButton = {
  padding: "8px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#f1f5f9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const deleteButton = {
  padding: "8px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#ef4444",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

  useEffect(() => {
    fetchHotels();
  }, [refresh]);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFilteredHotels(
      hotels.filter(
        (hotel) =>
          hotel.hotel_name?.toLowerCase().includes(keyword) ||
          hotel.city?.toLowerCase().includes(keyword) ||
          hotel.contact_person?.toLowerCase().includes(keyword)
      )
    );
  }, [search, hotels]);

  async function fetchHotels() {
    setLoading(true);

    const { data, error } = await supabase
      .from("hotels")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setHotels(data || []);
    setFilteredHotels(data || []);
    setLoading(false);
  }

  async function deleteHotel(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hotel?"
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

  if (loading) {
    return <h3>Loading Hotels...</h3>;
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
      }}
    >
      <h2>Hotel List</h2>

      <input
        type="text"
        placeholder="Search hotel..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "300px",
          padding: "8px",
          marginBottom: "20px",
        }}
      />

      <table
        border="1"
        cellPadding="10"
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
            <th>Price</th>
            <th>Status</th>
            <th width="170">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <tr key={hotel.id}>
                <td>{hotel.hotel_name}</td>
                <td>{hotel.city}</td>
                <td>{hotel.contact_person}</td>
                <td>{hotel.mobile}</td>
                <td>{hotel.room_type}</td>
                <td>₹ {hotel.price_per_night}</td>
                <td>{hotel.status}</td>

               <td>
               <div
                 style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => setSelectedHotel(hotel)}
                  style={iconButton}
                  title="Edit"
                >
                 <Pencil size={16} />
                  </button>

                 <a
                  href={`tel:${hotel.mobile}`}
                  style={iconButton}
                  title="Call"
                  >
                <Phone size={16} />
              </a>

              <a
               href={`mailto:${hotel.email}`}
               style={iconButton}
               title="Email"
              >
               <Mail size={16} />
             </a>

             <a
              href={`https://wa.me/91${hotel.mobile}`}
              target="_blank"
              rel="noreferrer"
              style={iconButton}
              title="WhatsApp"
            >
            <MessageCircle size={16} />
            </a>

             <button
             onClick={() => deleteHotel(hotel.id)}
             style={deleteButton}
             title="Delete"
            >
             <Trash2 size={16} />
               </button>
              </div>
               </td>                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" align="center">
                No hotels found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}