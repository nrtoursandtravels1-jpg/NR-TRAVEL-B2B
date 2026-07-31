import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

const initialHotel = {
  hotel_name: "",
  city: "",
  state: "",
  country: "",
  address: "",
  contact_person: "",
  mobile: "",
  email: "",
  room_type: "",
  price_per_night: "",
  status: "Active",
  notes: "",
};

export default function HotelForm({
  selectedHotel,
  onHotelAdded,
}) {
  const [hotel, setHotel] = useState(initialHotel);
  const [loading, setLoading] = useState(false);

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

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="hotel_name"
          placeholder="Hotel Name"
          value={hotel.hotel_name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={hotel.city}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={hotel.state}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={hotel.country}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={hotel.address}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="contact_person"
          placeholder="Contact Person"
          value={hotel.contact_person}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={hotel.mobile}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={hotel.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="room_type"
          placeholder="Room Type"
          value={hotel.room_type}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="price_per_night"
          placeholder="Price Per Night"
          value={hotel.price_per_night}
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="status"
          value={hotel.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <br /><br />

        <textarea
          name="notes"
          placeholder="Notes"
          rows="4"
          value={hotel.notes}
          onChange={handleChange}
        />

        <br /><br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : selectedHotel
            ? "Update Hotel"
            : "Save Hotel"}
        </button>

      </form>
    </div>
  );
}