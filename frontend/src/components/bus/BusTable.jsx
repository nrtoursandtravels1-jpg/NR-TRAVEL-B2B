import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function BusTable({ search }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("bus_bookings")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log(error);
    } else {
      setBookings(data || []);
    }

    setLoading(false);
  }

  async function deleteBooking(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("bus_bookings")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Delete failed.");
      return;
    }

    alert("Booking deleted successfully.");

    fetchBookings();
  }

  const filtered = bookings.filter((item) =>
    (
      (item.customer_name || "") +
      " " +
      (item.mobile || "") +
      " " +
      (item.operator || "")
    )
      .toLowerCase()
      .includes((search || "").toLowerCase())
  );

  if (loading) {
    return <h2>Loading Bus Bookings...</h2>;
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-2xl font-bold">
          Bus Booking List
        </h2>

        <span className="text-gray-500">
          Total Bookings : {filtered.length}
        </span>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full border border-gray-300">

          <thead className="bg-gray-100">

            <tr>

              <th className="border p-3">Customer</th>
              <th className="border p-3">Mobile</th>
              <th className="border p-3">Operator</th>
              <th className="border p-3">Source</th>
              <th className="border p-3">Destination</th>
              <th className="border p-3">Journey</th>
              <th className="border p-3">Bus</th>
              <th className="border p-3">Seats</th>
              <th className="border p-3">Fare</th>
              <th className="border p-3">Payment</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Action</th>

            </tr>

          </thead>

          <tbody>

            {filtered.length > 0 ? (

              filtered.map((item) => (

                <tr key={item.id}>

                  <td className="border p-3">{item.customer_name}</td>

                  <td className="border p-3">{item.mobile}</td>

                  <td className="border p-3">{item.operator}</td>

                  <td className="border p-3">{item.source}</td>

                  <td className="border p-3">{item.destination}</td>

                  <td className="border p-3">{item.journey_date}</td>

                  <td className="border p-3">{item.bus_type}</td>

                  <td className="border p-3">{item.seats}</td>

                  <td className="border p-3">₹ {item.fare}</td>

                  <td className="border p-3">{item.payment_status}</td>

                  <td className="border p-3">{item.booking_status}</td>

                  <td className="border p-3">

                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
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
                  colSpan="12"
                  className="text-center p-8"
                >
                  No Bus Bookings Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}