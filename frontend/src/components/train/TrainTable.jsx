import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function TrainTable({
  refresh,
  setSelectedTrain,
}) {
  const [trains, setTrains] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [refresh]);

  async function fetchBookings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("train_bookings")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      alert(error.message);
    } else {
      setTrains(data || []);
    }

    setLoading(false);
  }

  async function deleteBooking(id) {
    if (!window.confirm("Delete this booking?")) return;

    const { error } = await supabase
      .from("train_bookings")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Booking deleted successfully.");

    fetchBookings();
  }

  const filtered = trains.filter((item) =>
    (
      (item.passenger_name || "") +
      " " +
      (item.mobile || "") +
      " " +
      (item.train_name || "") +
      " " +
      (item.train_number || "")
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <h3>Loading Train Bookings...</h3>;
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
      <h2>Train Bookings</h2>

      <input
        type="text"
        placeholder="Search Passenger / Train"
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
            <th>Train</th>
            <th>Route</th>
            <th>Date</th>
            <th>Fare</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <tr
                key={item.id}
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <td>{item.passenger_name}</td>

                <td>
                  {item.train_name}
                  <br />
                  <small>{item.train_number}</small>
                </td>

                <td>
                  {item.from_station} ➜ {item.to_station}
                </td>

                <td>{item.journey_date}</td>

                <td>₹ {item.fare}</td>

                <td>{item.booking_status}</td>

                <td>
                  <button
                    onClick={() => setSelectedTrain(item)}
                    style={{
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteBooking(item.id)}
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
                No Train Bookings Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}