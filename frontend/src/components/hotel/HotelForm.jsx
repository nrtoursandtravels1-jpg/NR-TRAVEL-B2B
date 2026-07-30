import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function HotelForm({
  selectedHotel,
  onHotelAdded,
}) {
  const [hotel, setHotel] = useState({
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
  });

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
    }
  }, [selectedHotel]);

  const handleChange = (e) => {
    setHotel({
      ...hotel,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error;

    if (selectedHotel) {
      ({ error } = await supabase
        .from("hotels")
        .update(hotel)
        .eq("id", selectedHotel.id));
    } else {
      ({ error } = await supabase
        .from("hotels")
        .insert([hotel]));
    }

    if (error) {
      console.log(error);
      alert("Failed to save hotel");
      return;
    }

    alert(
      selectedHotel
        ? "Hotel updated successfully"
        : "Hotel added successfully"
    );

    setHotel({
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
    });

    if (onHotelAdded) {
      onHotelAdded();
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        color: "#000",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>
        {selectedHotel ? "Edit Hotel" : "Add Hotel"}
      </h2>

      <form onSubmit={handleSubmit}>

        <input
          name="hotel_name"
          placeholder="Hotel Name"
          value={hotel.hotel_name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          name="city"
          placeholder="City"
          value={hotel.city}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="state"
          placeholder="State"
          value={hotel.state}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="country"
          placeholder="Country"
          value={hotel.country}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="address"
          placeholder="Address"
          value={hotel.address}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="contact_person"
          placeholder="Contact Person"
          value={hotel.contact_person}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="mobile"
          placeholder="Mobile"
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
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <br /><br />

        <textarea
          name="notes"
          placeholder="Notes"
          value={hotel.notes}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          {selectedHotel ? "Update Hotel" : "Save Hotel"}
        </button>

      </form>
    </div>
  );
}