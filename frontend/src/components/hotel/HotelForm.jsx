import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { Upload } from "lucide-react";

const initialHotel = {
  hotel_name: "",
  city: "",
  state: "",
  country: "",
  address: "",

  contact_person: "",
  mobile: "",
  email: "",
  website: "",

  star_rating: "3",

  room_type: "",
  meal_plan: "",

  check_in_time: "",
  check_out_time: "",

  price_per_night: "",

  status: "Active",

  hotel_image: "",
  
  notes: "",
};

export default function HotelForm({
  selectedHotel,
  onHotelAdded,
}) {
  const [hotel, setHotel] = useState(initialHotel);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (selectedHotel) {
      setHotel({
        hotel_name: selectedHotel.hotel_name || "",
        city: selectedHotel.city || "",
        state: selectedHotel.state || "",
        country: selectedHotel.country || "",
        address: selectedHotel.address || "",
        contact_person: selectedHotel.contact_person || "",
        mobile: selectedHotel.mobile || "",
        email: selectedHotel.email || "",
        room_type: selectedHotel.room_type || "",
        price_per_night: selectedHotel.price_per_night || "",
        status: selectedHotel.status || "Active",
        notes: selectedHotel.notes || "",
      });
    } else {
      setHotel(initialHotel);
    }
  }, [selectedHotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setHotel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hotel.hotel_name.trim()) {
      alert("Hotel Name is required.");
      return;
    }

    if (
      hotel.mobile &&
      !/^[0-9]{10}$/.test(hotel.mobile)
    ) {
      alert("Enter a valid 10-digit mobile number.");
      return;
    }

    if (
      hotel.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(hotel.email)
    ) {
      alert("Enter a valid email address.");
      return;
    }

    setLoading(true);

let imageUrl = hotel.hotel_image;

if (image) {
  const fileName = `${Date.now()}-${image.name}`;

  const { error: uploadError } = await supabase.storage
    .from("hotel-images")
    .upload(fileName, image);

  if (uploadError) {
    alert(uploadError.message);
    setLoading(false);
    return;
  }

  const { data } = supabase.storage
    .from("hotel-images")
    .getPublicUrl(fileName);

  imageUrl = data.publicUrl;
}

const hotelData = {
  ...hotel,
  hotel_name: hotel.hotel_name.trim(),
  city: hotel.city.trim(),
  state: hotel.state.trim(),
  country: hotel.country.trim(),
  address: hotel.address.trim(),
  contact_person: hotel.contact_person.trim(),
  mobile: hotel.mobile.trim(),
  email: hotel.email.trim(),
  room_type: hotel.room_type.trim(),
  hotel_image: imageUrl,
  notes: hotel.notes.trim(),
};

    let error;

    if (selectedHotel) {
      ({ error } = await supabase
        .from("hotels")
        .update(hotelData)
        .eq("id", selectedHotel.id));
    } else {
      ({ error } = await supabase
        .from("hotels")
        .insert([hotelData]));
    }

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      selectedHotel
        ? "Hotel updated successfully."
        : "Hotel added successfully."
    );

    setHotel(initialHotel);
    setImage(null);

    if (onHotelAdded) {
      onHotelAdded();
    }
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>
        {selectedHotel ? "Edit Hotel" : "Add Hotel"}
      </h2>

      <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
>

        <input
          type="text"
          name="hotel_name"
          placeholder="Hotel Name"
          value={hotel.hotel_name}
          onChange={handleChange}
          className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        
        <input
          type="text"
          name="city"
          placeholder="City"
          value={hotel.city}
          onChange={handleChange}
          className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        

        <input
          type="text"
          name="state"
          placeholder="State"
          value={hotel.state}
          onChange={handleChange}
        />

        

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={hotel.country}
          onChange={handleChange}
        />

       

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={hotel.address}
          onChange={handleChange}
        />

        

        <input
          type="text"
          name="contact_person"
          placeholder="Contact Person"
          value={hotel.contact_person}
          onChange={handleChange}
        />

        

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={hotel.mobile}
          onChange={handleChange}
        />

        

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={hotel.email}
          onChange={handleChange}
        />

        

        <input
          type="text"
          name="room_type"
          placeholder="Room Type"
          value={hotel.room_type}
          onChange={handleChange}
        />

        

        <input
          type="number"
          name="price_per_night"
          placeholder="Price Per Night"
          value={hotel.price_per_night}
          onChange={handleChange}
        />

        

        <select
          name="status"
          value={hotel.status}
          onChange={handleChange}
          className="border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

       <div className="md:col-span-2">
  <label className="block mb-2 font-semibold text-slate-700">
    Hotel Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
  />
</div> 
{image && (
  <div className="md:col-span-2">
    <img
      src={URL.createObjectURL(image)}
      alt="Hotel Preview"
      className="w-48 h-32 object-cover rounded-xl border shadow-md mt-3"
    />
  </div>
)}

        <textarea
          name="notes"
          placeholder="Notes"
          rows="4"
          value={hotel.notes}
          onChange={handleChange}
          className="border border-slate-300 rounded-xl px-4 py-3 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="md:col-span-2 flex justify-end">

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition disabled:bg-gray-400"
        >
          {loading
            ? "Saving..."
            : selectedHotel
            ? "Update Hotel"
            : "Save Hotel"}

          </button>

    </div>
      

      </form>
    </div>
  );
}