import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function FlightTable({
  refresh,
  setSelectedFlight,
}) {
  const [flights, setFlights] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlights();
  }, [refresh]);

  async function fetchFlights() {
    setLoading(true);

    const { data, error } = await supabase
      .from("flight_bookings")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      alert(error.message);
    } else {
      setFlights(data || []);
    }

    setLoading(false);
  }

  async function deleteFlight(id) {
    if (!window.confirm("Delete this booking?")) return;

    const { error } = await supabase
      .from("flight_bookings")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Booking deleted successfully.");

    fetchFlights();
  }

  const filtered = flights.filter((flight) =>
    (
      (flight.passenger_name || "") +
      " " +
      (flight.mobile || "") +
      " " +
      (flight.from_city || "") +
      " " +
      (flight.to_city || "")
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <h3>Loading Flight Bookings...</h3>;
  }

  return (
    <div
      style={{
        marginTop: "30px",
        background: "#fff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      <h2>Flight Bookings</h2>

      <input
        type="text"
        placeholder="Search Passenger / Mobile / Route"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "320px",
          padding: "10px",
          marginBottom: "20px",
        }}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#f1f5f9" }}>
            <th>Passenger</th>
            <th>Route</th>
            <th>Airline</th>
            <th>Date</th>
            <th>Fare</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length > 0 ? (
            filtered.map((flight) => (
              <tr
                key={flight.id}
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <td>{flight.passenger_name}</td>

                <td>
                  {flight.from_city} ➜ {flight.to_city}
                </td>

                <td>{flight.airline}</td>

                <td>{flight.departure_date}</td>

                <td>₹ {flight.fare}</td>

                <td>{flight.booking_status}</td>

                <td>
                  <button
                    onClick={() =>
                      setSelectedFlight(flight)
                    }
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteFlight(flight.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No Flight Bookings Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}