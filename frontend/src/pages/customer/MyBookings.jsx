import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  RefreshCw,
  Users,
  XCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";

export default function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    try {
      setLoading(true);

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          packages (
            id,
            package_name,
            destination,
            image_url,
            price,
            duration
          )
        `)
        .eq("customer_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) throw error;

      setBookings(data || []);
    } catch (error) {
      console.error("My Bookings Error:", error);
    } finally {
      setLoading(false);
    }
  }

  function getStatus(status) {
    const normalized = String(status || "pending").toLowerCase();

    if (
      normalized === "confirmed" ||
      normalized === "accepted"
    ) {
      return {
        label: "Confirmed",
        className:
          "bg-emerald-50 text-emerald-700 border-emerald-200",
        icon: <CheckCircle2 size={14} />,
      };
    }

    if (
      normalized === "completed"
    ) {
      return {
        label: "Completed",
        className:
          "bg-blue-50 text-blue-700 border-blue-200",
        icon: <CheckCircle2 size={14} />,
      };
    }

    if (
      normalized === "cancelled" ||
      normalized === "canceled"
    ) {
      return {
        label: "Cancelled",
        className:
          "bg-red-50 text-red-700 border-red-200",
        icon: <XCircle size={14} />,
      };
    }

    return {
      label: "Pending",
      className:
        "bg-orange-50 text-orange-700 border-orange-200",
      icon: <Clock size={14} />,
    };
  }

  function formatDate(date) {
    if (!date) return "Not scheduled";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div
              className="
                mx-auto
                h-10
                w-10
                animate-spin
                rounded-full
                border-4
                border-slate-200
                border-t-blue-600
              "
            />

            <p className="mt-4 text-sm text-slate-500">
              Loading your bookings...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 lg:p-8">

        {/* HEADER */}

        <div
          className="
            mb-8
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-blue-600
              "
            >
              Customer Workspace
            </p>

            <h1
              className="
                mt-2
                text-3xl
                font-extrabold
                text-slate-900
              "
            >
              My Bookings
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              View your travel bookings, status and trip
              details.
            </p>
          </div>

          <button
            type="button"
            onClick={loadBookings}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-700
              shadow-sm
              hover:bg-slate-50
            "
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* EMPTY */}

        {bookings.length === 0 ? (
          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-6
              py-16
              text-center
              shadow-sm
            "
          >
            <CalendarDays
              size={45}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-4 text-xl font-bold text-slate-800">
              No bookings yet
            </h2>

            <p
              className="
                mx-auto
                mt-2
                max-w-md
                text-sm
                leading-6
                text-slate-500
              "
            >
              Once you accept a travel proposal and confirm
              your booking, it will appear here.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/customer/packages")
              }
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-sm
                font-bold
                text-white
                hover:bg-blue-700
              "
            >
              Explore Packages
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (

          /* BOOKING LIST */

          <div className="space-y-5">

            {bookings.map((booking) => {
              const packageData = booking.packages;
              const status = getStatus(
                booking.status
              );

              return (
                <div
                  key={booking.id}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                    transition
                    hover:shadow-md
                  "
                >

                  {/* HEADER */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-4
                      border-b
                      border-slate-100
                      p-5
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <div className="flex items-center gap-4">

                      <div
                        className="
                          h-16
                          w-20
                          shrink-0
                          overflow-hidden
                          rounded-xl
                          bg-slate-100
                        "
                      >
                        {packageData?.image_url ? (
                          <img
                            src={packageData.image_url}
                            alt={
                              packageData.package_name ||
                              "Travel Package"
                            }
                            className="
                              h-full
                              w-full
                              object-cover
                            "
                          />
                        ) : (
                          <MapPin
                            size={25}
                            className="
                              mx-auto
                              mt-5
                              text-slate-300
                            "
                          />
                        )}
                      </div>

                      <div>
                        <p
                          className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wide
                            text-slate-400
                          "
                        >
                          Booking #{booking.id}
                        </p>

                        <h2
                          className="
                            mt-1
                            text-lg
                            font-bold
                            text-slate-900
                          "
                        >
                          {packageData?.package_name ||
                            "Travel Package"}
                        </h2>

                        <p
                          className="
                            mt-1
                            flex
                            items-center
                            gap-1.5
                            text-sm
                            text-slate-500
                          "
                        >
                          <MapPin size={14} />

                          {packageData?.destination ||
                            "Destination"}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`
                        inline-flex
                        w-fit
                        items-center
                        gap-2
                        rounded-full
                        border
                        px-3
                        py-1.5
                        text-xs
                        font-bold
                        ${status.className}
                      `}
                    >
                      {status.icon}
                      {status.label}
                    </span>
                  </div>

                  {/* DETAILS */}

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-3
                      p-5
                      sm:grid-cols-2
                      lg:grid-cols-4
                    "
                  >
                    <BookingDetail
                      icon={<MapPin size={17} />}
                      label="Destination"
                      value={
                        packageData?.destination ||
                        "Not specified"
                      }
                    />

                    <BookingDetail
                      icon={<CalendarDays size={17} />}
                      label="Travel Date"
                      value={formatDate(
                        booking.travel_date
                      )}
                    />

                    <BookingDetail
                      icon={<Users size={17} />}
                      label="Travellers"
                      value={
                        booking.travelers ||
                        1
                      }
                    />

                    <BookingDetail
                      icon={<CreditCard size={17} />}
                      label="Amount"
                      value={
                        booking.amount !== null &&
                        booking.amount !== undefined
                          ? `₹${Number(
                              booking.amount
                            ).toLocaleString("en-IN")}`
                          : "On Request"
                      }
                    />
                  </div>

                  {/* BOOKING INFO */}

                  <div
                    className="
                      border-t
                      border-slate-100
                      bg-slate-50
                      p-5
                    "
                  >
                    <div
                      className="
                        grid
                        grid-cols-1
                        gap-4
                        sm:grid-cols-3
                      "
                    >
                      <BookingMeta
                        label="Booking Created"
                        value={formatDate(
                          booking.created_at
                        )}
                      />

                      <BookingMeta
                        label="Payment Status"
                        value={
                          booking.payment_status ||
                          "Pending"
                        }
                      />

                      <BookingMeta
                        label="Booking Status"
                        value={status.label}
                      />
                    </div>
                  </div>

                  {/* ACTIONS */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-3
                      border-t
                      border-slate-100
                      p-5
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <p className="text-xs text-slate-400">
                      Booking ID: {booking.id}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/customer/bookings/${booking.id}`
                        )
                      }
                      className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-5
                        py-2.5
                        text-sm
                        font-bold
                        text-slate-700
                        hover:border-blue-200
                        hover:bg-blue-50
                        hover:text-blue-700
                      "
                    >
                      View Booking
                      <ArrowRight size={16} />
                    </button>
                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </Layout>
  );
}


/* ==========================================
   BOOKING DETAIL
========================================== */

function BookingDetail({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-slate-400">
        {icon}

        <span className="text-xs font-medium">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}


/* ==========================================
   BOOKING META
========================================== */

function BookingMeta({
  label,
  value,
}) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}