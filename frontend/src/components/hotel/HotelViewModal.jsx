export default function HotelViewModal({ hotel, onClose }) {
  if (!hotel) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[700px] max-w-[95%] p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-xl"
        >
          ✖
        </button>

        <div className="flex gap-6">

          <img
            src={
              hotel.hotel_image ||
              "https://placehold.co/300x200?text=Hotel"
            }
            alt={hotel.hotel_name}
            className="w-72 h-52 rounded-xl object-cover"
          />

          <div className="space-y-3">

            <h2 className="text-3xl font-bold">
              {hotel.hotel_name}
            </h2>

            <p>⭐ {hotel.star_rating} Star</p>

            <p>📍 {hotel.city}, {hotel.state}</p>

            <p>🛏 {hotel.room_type}</p>

            <p>🍽 {hotel.meal_plan}</p>

            <p className="font-bold text-green-600">
              ₹ {hotel.price_per_night}
            </p>

            <p>📞 {hotel.mobile}</p>

            <p>✉ {hotel.email}</p>

            <p>
              🌐{" "}
              <a
                href={hotel.website}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600"
              >
                Visit Website
              </a>
            </p>

            <p>
              📍{" "}
              <a
                href={hotel.google_map_link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600"
              >
                Open Google Maps
              </a>
            </p>

          </div>

        </div>

        <div className="mt-6">

          <h3 className="font-bold text-lg">
            Notes
          </h3>

          <p className="text-slate-600 mt-2">
            {hotel.notes || "No notes available"}
          </p>

        </div>

      </div>
    </div>
  );
}