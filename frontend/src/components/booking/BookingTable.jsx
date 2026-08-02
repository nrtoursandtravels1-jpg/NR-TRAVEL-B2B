import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  Pencil,
  Trash2,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import { supabase } from "../../services/supabase";
import BookingSearch from "./BookingSearch";

export default function BookingTable({
  refresh,
  setSelectedBooking,
}) {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookingFilter, setBookingFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchBookings();
  }, [refresh]);

  async function fetchBookings() {
    setLoading(true);

    const { data, error } =
      await supabase
        .from("bookings")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setBookings(data || []);
    setLoading(false);
  }

  async function deleteBooking(id) {
    const confirmDelete =
      window.confirm(
        "Delete this booking?"
      );

    if (!confirmDelete) return;

    const { error } =
      await supabase
        .from("bookings")
        .delete()
        .eq("id", id);

    if (error) {
      alert("Delete failed");
      return;
    }

    fetchBookings();
  }

  async function updateBookingStatus(
    id,
    status
  )
   {
    const { error } =
      await supabase
        .from("bookings")
        .update({
          booking_status: status,
        })
        .eq("id", id);

    if (!error) {
      fetchBookings();
    }
  }

  async function updatePaymentStatus(id, status) {
  const { error } = await supabase
    .from("bookings")
    .update({
      payment_status: status,
    })
    .eq("id", id);

  if (!error) {
    fetchBookings();
  }
}

  function exportToExcel() {
  const exportData = filteredBookings.map((booking) => ({
    "Booking No": booking.booking_no,
    Customer: booking.customer_name,
    Mobile: booking.mobile,
    Email: booking.email,
    Destination: booking.destination,
    "Travel Date": booking.travel_date,
    "Return Date": booking.return_date,
    Passengers: booking.passengers,
    "Total Amount": booking.total_amount,
    Advance: booking.advance_amount,
    Balance: booking.balance_amount,
    "Booking Status": booking.booking_status,
    "Payment Status": booking.payment_status,
    Notes: booking.notes,
  }));

  const worksheet = XLSX.utils.json_to_sheet(exportData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Bookings"
  );

  XLSX.writeFile(
    workbook,
    "NR_Travel_Bookings.xlsx"
  );
} 
  
  const filteredBookings = bookings.filter((booking) => {
  const search = searchTerm.toLowerCase();

  const matchSearch =
    booking.booking_no?.toLowerCase().includes(search) ||
    booking.customer_name?.toLowerCase().includes(search) ||
    booking.mobile?.toLowerCase().includes(search) ||
    booking.destination?.toLowerCase().includes(search);

  const matchBooking =
    bookingFilter === "All" ||
    booking.booking_status === bookingFilter;

  const matchPayment =
    paymentFilter === "All" ||
    booking.payment_status === paymentFilter;

  return matchSearch && matchBooking && matchPayment;
});

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
        marginTop: "20px",
        overflowX: "auto",
      }}
    >
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <h2
    style={{
      fontSize: "22px",
      fontWeight: "700",
    }}
  >
    📋 Booking List
  </h2>

  <button
    onClick={exportToExcel}
    style={{
      padding: "10px 18px",
      background: "#16a34a",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    📤 Export Excel
  </button>
</div>
      <BookingSearch
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
/>
<div
  style={{
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  }}
>
  <select
    value={bookingFilter}
    onChange={(e) =>
      setBookingFilter(e.target.value)
    }
  >
    <option>All</option>
    <option>Pending</option>
    <option>Confirmed</option>
    <option>Completed</option>
    <option>Cancelled</option>
  </select>

  <select
    value={paymentFilter}
    onChange={(e) =>
      setPaymentFilter(e.target.value)
    }
  >
    <option>All</option>
    <option>Pending</option>
    <option>Partial</option>
    <option>Paid</option>
    <option>Refunded</option>
  </select>
</div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>
              Booking
            </th>

            <th style={thStyle}>
              Customer
            </th>

            <th style={thStyle}>
              Destination
            </th>

            <th style={thStyle}>
              Travel
            </th>

            <th style={thStyle}>
              Amount
            </th>

            <th style={thStyle}>
              Booking Status
            </th>

            <th style={thStyle}>
              Payment
            </th>

            <th style={thStyle}>
              Quick Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredBookings.length > 0 ? (
   filteredBookings.map((booking) => (
    <tr key={booking.id}>

      <td style={tdStyle}>
        <strong>{booking.booking_no}</strong>
      </td>

      <td style={tdStyle}>
        <div>
          <strong>
            {booking.customer_name}
          </strong>

          <br />

          <small>
            {booking.mobile}
          </small>
        </div>
      </td>

      <td style={tdStyle}>
        {booking.destination}
      </td>

      <td style={tdStyle}>
        <div>
          {booking.travel_date}

          <br />

          <small>
            {booking.return_date}
          </small>
        </div>
      </td>

      <td style={tdStyle}>
        ₹ {booking.total_amount}
      </td>

      <td style={tdStyle}>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >

          <BookingStatusBadge
            status={
              booking.booking_status
            }
          />

          <select
            value={
              booking.booking_status
            }
            onChange={(e) =>
              updateBookingStatus(
                booking.id,
                e.target.value
              )
            }
          >
            <option>
              Pending
            </option>

            <option>
              Confirmed
            </option>

            <option>
              Completed
            </option>

            <option>
              Cancelled
            </option>

          </select>

        </div>

      </td>

      <td style={tdStyle}>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >

          <PaymentStatusBadge
            status={
              booking.payment_status
            }
          />

          <select
            value={
              booking.payment_status
            }
            onChange={(e) =>
              updatePaymentStatus(
                booking.id,
                e.target.value
              )
            }
          >

            <option>
              Pending
            </option>

            <option>
              Partial
            </option>

            <option>
              Paid
            </option>

            <option>
              Refunded
            </option>

          </select>

        </div>

      </td>

      <td style={tdStyle}>

        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >
        <button
  onClick={() =>
    setSelectedBooking &&
    setSelectedBooking(booking)
  }
  style={iconButton}
  title="Edit"
>
  <Pencil size={16} />
</button>

<a
  href={`tel:${booking.mobile}`}
  style={iconButton}
  title="Call"
>
  <Phone size={16} />
</a>

<a
  href={`mailto:${booking.email}`}
  style={iconButton}
  title="Email"
>
  <Mail size={16} />
</a>

<a
  href={`https://wa.me/91${booking.mobile}`}
  target="_blank"
  rel="noreferrer"
  style={iconButton}
  title="WhatsApp"
>
  <MessageCircle size={16} />
</a>

<button
  onClick={() =>
    deleteBooking(booking.id)
  }
  style={deleteButton}
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
  style={{
    textAlign: "center",
    padding: "25px",
  }}
>
  No Bookings Found
</td>

</tr>

)}

</tbody>

</table>

</div>

);
}
function BookingStatusBadge({ status }) {
  const colors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Confirmed: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

function PaymentStatusBadge({ status }) {
  const colors = {
    Pending: "bg-red-100 text-red-700",
    Partial: "bg-orange-100 text-orange-700",
    Paid: "bg-green-100 text-green-700",
    Refunded: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

const thStyle = {
  padding: "12px",
  background: "#2563eb",
  color: "#fff",
  textAlign: "left",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
};

const iconButton = {
  padding: "8px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#f1f5f9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const deleteButton = {
  padding: "8px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#ef4444",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};