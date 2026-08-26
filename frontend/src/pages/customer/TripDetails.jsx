import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bus,
  Car,
  MapPin,
  Phone,
  UserRound,
  CalendarDays,
  Clock3,
  RefreshCw,
  CheckCircle2,
  Navigation,
} from "lucide-react";

import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";

export default function TripDetails() {
  const [trip, setTrip] = useState(null);
  const [booking, setBooking] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [driver, setDriver] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const bookingId = window.location.pathname.split("/").pop();

  useEffect(() => {
    loadTrip();

    const interval = setInterval(() => {
      loadTrip(true);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadTrip(isRefresh = false) {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      /*
       * -----------------------------------------
       * 1. GET LOGGED-IN CUSTOMER
       * -----------------------------------------
       */

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      if (!user?.email) {
        return;
      }

      /*
       * -----------------------------------------
       * 2. GET BOOKING
       * -----------------------------------------
       */

      const { data: bookingData, error: bookingError } =
        await supabase
          .from("bookings")
          .select("*")
          .eq("id", bookingId)
          .eq("email", user.email)
          .maybeSingle();

      if (bookingError) throw bookingError;

      if (!bookingData) {
        setBooking(null);
        setTrip(null);
        return;
      }

      setBooking(bookingData);

      /*
       * -----------------------------------------
       * 3. GET TRIP
       * -----------------------------------------
       */

      const { data: tripData, error: tripError } =
        await supabase
          .from("trips")
          .select("*")
          .eq("booking_id", bookingData.id)
          .maybeSingle();

      if (tripError) throw tripError;

      if (!tripData) {
        setTrip(null);
        return;
      }

      setTrip(tripData);

      /*
       * -----------------------------------------
       * 4. GET VEHICLE
       * -----------------------------------------
       */

      const { data: vehicleData, error: vehicleError } =
        await supabase
          .from("trip_vehicles")
          .select("*")
          .eq("trip_id", tripData.id)
          .order("created_at", {
            ascending: false,
          })
          .limit(1)
          .maybeSingle();

      if (vehicleError) throw vehicleError;

      setVehicle(vehicleData || null);

      /*
       * -----------------------------------------
       * 5. GET CURRENT DRIVER
       * -----------------------------------------
       */

      const { data: driverData, error: driverError } =
        await supabase
          .from("trip_driver_assignments")
          .select("*")
          .eq("trip_id", tripData.id)
          .eq("is_current", true)
          .order("assigned_at", {
            ascending: false,
          })
          .limit(1)
          .maybeSingle();

      if (driverError) throw driverError;

      setDriver(driverData || null);

      /*
       * -----------------------------------------
       * 6. GET LIVE UPDATES
       * -----------------------------------------
       */

      const { data: updateData, error: updateError } =
        await supabase
          .from("trip_updates")
          .select("*")
          .eq("trip_id", tripData.id)
          .order("created_at", {
            ascending: false,
          });

      if (updateError) throw updateError;

      setUpdates(updateData || []);
    } catch (error) {
      console.error("Trip Details Error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function formatDate(date) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function formatDateTime(date) {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function statusClass(status) {
    switch (status) {
      case "Live":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "Completed":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";

      case "Paused":
        return "bg-orange-50 text-orange-700 border-orange-200";

      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading trip details...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!booking) {
    return (
      <Layout>
        <div className="p-6 lg:p-8">

          <button
            onClick={() => {
              window.location.href = "/customer/bookings";
            }}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to My Bookings
          </button>

          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <h2 className="text-xl font-bold text-slate-800">
              Booking not found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              This booking does not belong to your account or no longer exists.
            </p>
          </div>

        </div>
      </Layout>
    );
  }

  if (!trip) {
    return (
      <Layout>
        <div className="p-6 lg:p-8">

          <button
            onClick={() => {
              window.location.href = "/customer/bookings";
            }}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to My Bookings
          </button>

          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">

            <CalendarDays
              size={45}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-4 text-xl font-bold text-slate-800">
              Trip not started yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Your booking is confirmed, but trip tracking has not been
              activated yet.
            </p>

          </div>

        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 lg:p-8">

        {/* ==========================================
            BACK + REFRESH
        ========================================== */}

        <div className="mb-6 flex items-center justify-between">

          <button
            onClick={() => {
              window.location.href = "/customer/bookings";
            }}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-slate-600
              transition
              hover:text-blue-600
            "
          >
            <ArrowLeft size={17} />
            My Bookings
          </button>

          <button
            onClick={() => loadTrip(true)}
            disabled={refreshing}
            className="
              inline-flex
              items-center
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
              transition
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-blue-700
              disabled:opacity-50
            "
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />

            Refresh
          </button>

        </div>


        {/* ==========================================
            TRIP HEADER
        ========================================== */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="p-6 lg:p-8">

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  Live Trip
                </p>

                <h1 className="mt-2 text-2xl font-extrabold text-slate-900 lg:text-3xl">
                  {booking.package_name || "Your Trip"}
                </h1>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">

                  <span className="inline-flex items-center gap-2">
                    <MapPin size={16} />
                    {booking.destination || "-"}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={16} />
                    {formatDate(booking.travel_date)}
                  </span>

                  <span>
                    Booking #{booking.id}
                  </span>

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
                  px-4
                  py-2
                  text-sm
                  font-bold
                  ${statusClass(trip.trip_status)}
                `}
              >
                {trip.trip_status === "Live" && (
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                )}

                {trip.trip_status}
              </span>

            </div>

          </div>

        </div>


        {/* ==========================================
            LIVE LOCATION
        ========================================== */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 p-6">

            <div className="flex items-center gap-3">

              <div className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-blue-50
                text-blue-600
              ">
                <Navigation size={20} />
              </div>

              <div>

                <h2 className="text-lg font-bold text-slate-900">
                  Live Trip Location
                </h2>

                <p className="text-sm text-slate-500">
                  Latest location shared by your travel operator.
                </p>

              </div>

            </div>

          </div>


          <div className="p-6">

            <div className="rounded-2xl bg-slate-50 p-6">

              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Current Location
              </p>

              <div className="mt-3 flex items-center gap-3">

                <MapPin
                  size={24}
                  className="text-blue-600"
                />

                <p className="text-xl font-extrabold text-slate-900">
                  {trip.current_location || "Location not updated"}
                </p>

              </div>

              <p className="mt-3 text-xs text-slate-400">
                Last updated:{" "}
                {formatDateTime(trip.last_location_update)}
              </p>

            </div>

          </div>

        </div>


        {/* ==========================================
            VEHICLE + DRIVER
        ========================================== */}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* VEHICLE */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-orange-50
                text-orange-600
              ">
                {vehicle?.vehicle_type === "Cab" ? (
                  <Car size={21} />
                ) : (
                  <Bus size={21} />
                )}
              </div>

              <div>

                <h2 className="text-lg font-bold text-slate-900">
                  Your Vehicle
                </h2>

                <p className="text-sm text-slate-500">
                  Current assigned vehicle
                </p>

              </div>

            </div>


            {vehicle ? (

              <div className="mt-6 space-y-4">

                <InfoRow
                  label="Vehicle Type"
                  value={vehicle.vehicle_type}
                />

                <InfoRow
                  label="Vehicle Number"
                  value={vehicle.vehicle_number || "-"}
                />

                <InfoRow
                  label="Vehicle Model"
                  value={vehicle.vehicle_model || "-"}
                />

                <InfoRow
                  label="Capacity"
                  value={
                    vehicle.capacity
                      ? `${vehicle.capacity} passengers`
                      : "-"
                  }
                />

              </div>

            ) : (

              <p className="mt-6 text-sm text-slate-500">
                Vehicle has not been assigned yet.
              </p>

            )}

          </div>


          {/* DRIVER */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-emerald-50
                text-emerald-600
              ">
                <UserRound size={21} />
              </div>

              <div>

                <h2 className="text-lg font-bold text-slate-900">
                  Your Driver
                </h2>

                <p className="text-sm text-slate-500">
                  Current driver assigned to your trip
                </p>

              </div>

            </div>


            {driver ? (

              <div className="mt-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-lg font-bold text-slate-900">
                      {driver.driver_name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Assigned driver
                    </p>

                  </div>

                  {driver.licence_verified && (
                    <span className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      bg-emerald-50
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      text-emerald-700
                    ">
                      <CheckCircle2 size={14} />
                      Verified
                    </span>
                  )}

                </div>


                <a
                  href={
                    driver.driver_phone
                      ? `tel:${driver.driver_phone}`
                      : "#"
                  }
                  className="
                    mt-5
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-emerald-600
                    px-4
                    py-3
                    text-sm
                    font-bold
                    text-white
                    transition
                    hover:bg-emerald-700
                  "
                >
                  <Phone size={17} />
                  {driver.driver_phone || "Phone unavailable"}
                </a>

              </div>

            ) : (

              <p className="mt-6 text-sm text-slate-500">
                Driver has not been assigned yet.
              </p>

            )}

          </div>

        </div>


        {/* ==========================================
            TRIP TIMELINE
        ========================================== */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 p-6">

            <h2 className="text-lg font-bold text-slate-900">
              Trip Updates
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest updates from your travel operator.
            </p>

          </div>


          <div className="p-6">

            {updates.length === 0 ? (

              <div className="py-8 text-center">

                <Clock3
                  size={35}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm text-slate-500">
                  No trip updates yet.
                </p>

              </div>

            ) : (

              <div className="space-y-6">

                {updates.map((update, index) => (

                  <div
                    key={update.id}
                    className="relative flex gap-4"
                  >

                    {index !== updates.length - 1 && (
                      <div className="
                        absolute
                        left-[9px]
                        top-7
                        h-full
                        w-px
                        bg-slate-200
                      " />
                    )}

                    <div className="
                      relative
                      flex
                      h-5
                      w-5
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-blue-100
                    ">
                      <div className="
                        h-2
                        w-2
                        rounded-full
                        bg-blue-600
                      " />
                    </div>


                    <div className="min-w-0">

                      <p className="font-semibold text-slate-800">
                        {update.update_type}
                      </p>

                      {update.message && (
                        <p className="mt-1 text-sm text-slate-600">
                          {update.message}
                        </p>
                      )}

                      {update.location && (
                        <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-400">
                          <MapPin size={13} />
                          {update.location}
                        </p>
                      )}

                      <p className="mt-2 text-xs text-slate-400">
                        {formatDateTime(update.created_at)}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>


        {/* ==========================================
            PASSENGER SUMMARY
        ========================================== */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <div className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-purple-50
              text-purple-600
            ">
              <UserRound size={20} />
            </div>

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                Passenger Summary
              </h2>

              <p className="text-sm text-slate-500">
                People travelling on this booking
              </p>

            </div>

          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">

            <SummaryItem
              label="Total"
              value={booking.passengers || 0}
            />

            <SummaryItem
              label="Adults"
              value={booking.adults || "-"}
            />

            <SummaryItem
              label="Children"
              value={booking.children || "-"}
            />

            <SummaryItem
              label="Infants"
              value={booking.infants || "-"}
            />

          </div>

        </div>

      </div>
    </Layout>
  );
}


/* ==========================================
   INFO ROW
========================================== */

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">

      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-right text-sm font-bold text-slate-800">
        {value}
      </span>

    </div>
  );
}


/* ==========================================
   SUMMARY ITEM
========================================== */

function SummaryItem({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">

      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-extrabold text-slate-900">
        {value}
      </p>

    </div>
  );
}