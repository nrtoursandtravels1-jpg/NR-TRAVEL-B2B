import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function CabTable({ search }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("cab_bookings")
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
      "Delete this booking?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("cab_bookings")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Delete failed");
      return;
    }

    alert("Booking deleted.");

    fetchBookings();
  }

  const filtered = bookings.filter((item) =>
    (
      (item.customer_name || "") +
      " " +
      (item.mobile || "") +
      " " +
      (item.vehicle_type || "")
    )
      .toLowerCase()
      .includes((search || "").toLowerCase())
  );

  if (loading) {
    return <h2>Loading Cab Bookings...</h2>;
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <h2 className="text-2xl font-bold mb-5">
        Cab Booking List
      </h2>

      <div className="overflow-x-auto">

        <table className="min-w-full border">

          <thead className="bg-gray-100">

            <tr>

              <th className="border p-3">Customer</th>
              <th className="border p-3">Mobile</th>
              <th className="border p-3">Pickup</th>
              <th className="border p-3">Drop</th>
              <th className="border p-3">Date</th>
              <th className="border p-3">Vehicle</th>
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

                  <td className="border p-3">
                    {item.customer_name}
                  </td>

                  <td className="border p-3">
                    {item.mobile}
                  </td>

                  <td className="border p-3">
                    {item.pickup_location}
                  </td>

                  <td className="border p-3">
                    {item.drop_location}
                  </td>

                  <td className="border p-3">
                    {item.journey_date}
                  </td>

                  <td className="border p-3">
                    {item.vehicle_type}
                  </td>

                  <td className="border p-3">
                    ₹ {item.fare}
                  </td>

                  <td className="border p-3">
                    {item.payment_status}
                  </td>

                  <td className="border p-3">
                    {item.booking_status}
                  </td>

                  <td className="border p-3">

                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      onClick={() =>
                        deleteBooking(item.id)
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
                  colSpan="10"
                  className="text-center p-8"
                >
                  No Bookings Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}