import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function CabTable({
  search,
  refreshKey = 0,
}) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [refreshKey]);

  async function fetchBookings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("cab_bookings")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("CAB FETCH ERROR:", error);
    } else {
      setBookings(data || []);
    }

    setLoading(false);
  }

  async function deleteBooking(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this cab booking?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("cab_bookings")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Delete failed: " + error.message);
      return;
    }

    alert("Cab booking deleted.");

    fetchBookings();
  }

  const keyword = (search || "").toLowerCase();

  const filtered = bookings.filter((item) => {
    const text = [
      item.customer_name,
      item.mobile,
      item.pickup_location,
      item.drop_location,
      item.vehicle_type,
      item.driver_name,
      item.vehicle_number,
      item.booking_status,
      item.payment_status,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return text.includes(keyword);
  });

  function statusClass(status) {
    if (status === "Confirmed") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "Completed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Cancelled") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border">
        Loading Cab Bookings...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Cab Booking List
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {filtered.length} booking
              {filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1200px] w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-4 text-sm">
                Customer
              </th>

              <th className="text-left p-4 text-sm">
                Route
              </th>

              <th className="text-left p-4 text-sm">
                Journey
              </th>

              <th className="text-left p-4 text-sm">
                Vehicle
              </th>

              <th className="text-left p-4 text-sm">
                Driver
              </th>

              <th className="text-left p-4 text-sm">
                Fare
              </th>

              <th className="text-left p-4 text-sm">
                Payment
              </th>

              <th className="text-left p-4 text-sm">
                Status
              </th>

              <th className="text-left p-4 text-sm">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="p-4">
                    <div className="font-semibold">
                      {item.customer_name || "-"}
                    </div>

                    <div className="text-sm text-slate-500">
                      {item.mobile || "-"}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="font-medium">
                      {item.pickup_location || "-"}
                    </div>

                    <div className="text-sm text-slate-500">
                      → {item.drop_location || "-"}
                    </div>
                  </td>

                  <td className="p-4">
                    <div>
                      {item.journey_date || "-"}
                    </div>

                    <div className="text-sm text-slate-500">
                      {item.journey_time || ""}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="font-medium">
                      {item.vehicle_type || "-"}
                    </div>

                    <div className="text-sm text-slate-500">
                      {item.vehicle_number || ""}
                    </div>
                  </td>

                  <td className="p-4">
                    {item.driver_name || "-"}
                  </td>

                  <td className="p-4 font-semibold">
                    ₹{" "}
                    {Number(item.fare || 0).toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100">
                      {item.payment_status || "Pending"}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass(
                        item.booking_status
                      )}`}
                    >
                      {item.booking_status || "Pending"}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        deleteBooking(item.id)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="text-center p-12 text-slate-500"
                >
                  No cab bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}