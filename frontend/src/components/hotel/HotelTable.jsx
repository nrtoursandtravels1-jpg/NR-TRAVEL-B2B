import { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Star,
  Globe,
} from "lucide-react";
import { supabase } from "../../services/supabase";

export default function HotelTable({
  refresh,
  search,
  setSelectedHotel,
}) {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetchHotels();
  }, [refresh]);

  useEffect(() => {
    const keyword = (search || "").toLowerCase();

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
    if (!window.confirm("Are you sure you want to delete this hotel?")) {
      return;
    }

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
    return (
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
        <p className="text-slate-500 font-medium">
          Loading Hotels...
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-5 py-4 text-left font-semibold text-slate-700">
            Image
           </th>

            <th className="px-5 py-4 text-left font-semibold text-slate-700">
              Hotel
            </th>

            <th className="px-5 py-4 text-left font-semibold text-slate-700">
              City
            </th>

            <th className="px-5 py-4 text-left font-semibold text-slate-700">
              Contact Person
            </th>

            <th className="px-5 py-4 text-left font-semibold text-slate-700">
              Mobile
            </th>

            <th className="px-5 py-4 text-left font-semibold text-slate-700">
              Room
            </th>

            <th className="px-5 py-4 text-left font-semibold text-slate-700">
              Price
            </th>

            <th className="px-5 py-4 text-left font-semibold text-slate-700">
              Status
            </th>

            <th className="px-5 py-4 text-left font-semibold text-slate-700">
            Links
            </th>


            <th className="px-5 py-4 text-center font-semibold text-slate-700">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredHotels.length > 0 ? (

            filteredHotels.map((hotel) => (

              <tr
                key={hotel.id}
                className="border-b border-slate-200 hover:bg-blue-50 transition-all duration-200"
              >

                <td className="px-5 py-4">
  {hotel.hotel_image ? (
    <a
  href={hotel.hotel_image}
  target="_blank"
  rel="noreferrer"
>
  <img
    src={hotel.hotel_image}
    alt={hotel.hotel_name}
    className="w-16 h-16 rounded-xl object-cover border hover:scale-110 transition"
  />
</a>
  ) : (
    <div className="w-16 h-16 rounded-xl bg-slate-200 flex items-center justify-center">
      📷
    </div>
  )}
</td>

<td className="px-5 py-4 font-medium">
  {hotel.hotel_name}
</td>

                <td className="px-5 py-4">
                <div className="flex items-center gap-2 text-slate-700">
                <MapPin size={16} className="text-red-500" />
               {hotel.city}
             </div>
                </td>

                <td className="px-5 py-4">
                <div className="font-medium text-slate-800">
                {hotel.contact_person}
                </div>

                <div className="text-xs text-slate-500">
                Hotel Manager
                </div>
              </td>
                <td className="px-5 py-4 font-medium">
                {hotel.mobile}
                 </td>
                <td className="px-5 py-4">
                  {hotel.room_type}
                </td>

                <td className="px-5 py-4">
  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
    ₹ {Number(hotel.price_per_night).toLocaleString()}
  </span>
</td>

<td className="px-5 py-4">
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold ${
      hotel.status === "Active"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {hotel.status}
  </span>
</td>

{/* NEW COLUMN */}
<td className="px-5 py-4">
  <div className="flex gap-2">

    {hotel.website && (
      <a
        href={hotel.website}
        target="_blank"
        rel="noreferrer"
        className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
      >
        🌐
      </a>
    )}

    {hotel.google_map_link && (
      <a
        href={hotel.google_map_link}
        target="_blank"
        rel="noreferrer"
        className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
      >
        📍
      </a>
    )}

  </div>
</td>


                <td className="px-5 py-4">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => setSelectedHotel(hotel)}
                      className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>

                    <a
                      href={`tel:${hotel.mobile}`}
                      className="p-2 rounded-lg bg-green-100 hover:bg-green-200"
                      title="Call"
                    >
                      <Phone size={16} />
                    </a>

                    <a
                      href={`mailto:${hotel.email}`}
                      className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200"
                      title="Email"
                    >
                      <Mail size={16} />
                    </a>

                    <a
                      href={`https://wa.me/91${hotel.mobile}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-emerald-100 hover:bg-emerald-200"
                      title="WhatsApp"
                    >
                      <MessageCircle size={16} />
                    </a>

                    <button
                      onClick={() => deleteHotel(hotel.id)}
                      className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
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

              <td
                colSpan="8"
                className="text-center py-10 text-slate-500"
              >
                No Hotels Found
              </td>

            </tr>

          )}

        </tbody>

      </table>
      {viewHotel && (
  <HotelViewModal
    hotel={viewHotel}
    onClose={() => setViewHotel(null)}
  />
)}
    </div>
  );
}