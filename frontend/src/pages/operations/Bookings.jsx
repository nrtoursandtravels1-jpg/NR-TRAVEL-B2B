import { useState } from "react";
import Layout from "../../components/layout/Layout";

import BookingForm from "../../components/booking/BookingForm";
import BookingTable from "../../components/booking/BookingTable";

function Bookings() {
  const [refresh, setRefresh] = useState(false);

  const bookingAdded = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-100 p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Booking Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage customer and agent bookings from one place.
          </p>
        </div>

        {/* Booking Form */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Create New Booking
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add a new customer or agent booking.
            </p>
          </div>

          <BookingForm onBookingAdded={bookingAdded} />
        </div>

        {/* Booking Directory */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Booking Directory
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View and manage all operational bookings.
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              Live Booking Data
            </div>
          </div>

          <BookingTable refresh={refresh} />
        </div>
      </div>
    </Layout>
  );
}

export default Bookings;
