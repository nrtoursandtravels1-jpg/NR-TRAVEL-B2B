import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Loader2,
  MapPin,
  Phone,
  UserRound,
  Users,
  XCircle,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooking();
  }, [id]);

  async function loadBooking() {
    try {
      setLoading(true);

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user?.email) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", id)
        .eq("email", user.email)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        setBooking(null);
        return;
      }

      setBooking(data);
    } catch (error) {
      console.error("Booking Details Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(date) {
    if (!date) return "Not scheduled";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function formatDateTime(date) {
    if (!date) return "Not available";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function statusStyle(status) {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "Completed":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-200";

      case "Pending":
        return "bg-orange-50 text-orange-700 border-orange-200";

      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  }

  function PaymentStatus({ status }) {
    const normalized = String(status || "Pending").toLowerCase();

    if (normalized === "paid" || normalized === "completed") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
          <CheckCircle2 size={14} />
          {status}
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700">
        <Clock size={14} />
        {status || "Pending"}
      </span>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <Loader2
              size={40}
              className="mx-auto animate-spin text-blue-600"
            />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading booking details...
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
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <FileText
              size={45}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-4 text-xl font-bold text-slate-800">
              Booking not found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              This booking does not exist or you do not have
              permission to view it.
            </p>

            <button
              type="button"
              onClick={() => navigate("/customer/bookings")}
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
                transition
                hover:bg-blue-700
              "
            >
              <ArrowLeft size={17} />
              Back to My Bookings
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const bookingStatus = booking.booking_status || "Pending";

  return (
    <Layout>
      <div className="p-6 lg:p-8">

        {/* BACK */}

        <button
          type="button"
          onClick={() => navigate("/customer/bookings")}
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-slate-500
            transition
            hover:text-blue-600
          "
        >
          <ArrowLeft size={17} />
          Back to My Bookings
        </button>


        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Customer Workspace
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
              Booking Details
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Review your booking, travel and payment information.
            </p>
          </div>

          <div
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
              ${statusStyle(bookingStatus)}
            `}
          >
            {bookingStatus === "Confirmed" && (
              <CheckCircle2 size={16} />
            )}

            {bookingStatus === "Cancelled" && (
              <XCircle size={16} />
            )}

            {bookingStatus === "Pending" && (
              <Clock size={16} />
            )}

            {bookingStatus}
          </div>
        </div>


        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* LEFT */}

          <div className="space-y-6 xl:col-span-2">

            {/* BOOKING SUMMARY */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 p-6">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-4">

                    <div className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                    ">
                      <CalendarDays size={23} />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Booking Number
                      </p>

                      <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                        #{booking.booking_no || booking.id}
                      </h2>
                    </div>

                  </div>

                  <div className="text-left sm:text-right">

                    <p className="text-xs text-slate-400">
                      Booked on
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {formatDateTime(booking.created_at)}
                    </p>

                  </div>

                </div>

              </div>


              {/* PACKAGE */}

              <div className="p-6">

                <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                  Travel Package
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                  {booking.package_name || "Travel Package"}
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

                  <Detail
                    icon={<MapPin size={17} />}
                    label="Destination"
                    value={booking.destination || "-"}
                  />

                  <Detail
                    icon={<CalendarDays size={17} />}
                    label="Travel Date"
                    value={formatDate(booking.travel_date)}
                  />

                  <Detail
                    icon={<Users size={17} />}
                    label="Passengers"
                    value={booking.passengers || 0}
                  />

                  <Detail
                    icon={<Clock size={17} />}
                    label="Booking Status"
                    value={bookingStatus}
                  />

                </div>

              </div>

            </div>


            {/* CUSTOMER INFORMATION */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                  text-blue-600
                ">
                  <UserRound size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Customer
                  </p>

                  <h2 className="text-lg font-bold text-slate-900">
                    Customer Information
                  </h2>
                </div>

              </div>


              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                <Detail
                  icon={<UserRound size={17} />}
                  label="Name"
                  value={booking.customer_name || "-"}
                />

                <Detail
                  icon={<Phone size={17} />}
                  label="Phone"
                  value={booking.mobile || booking.phone || "-"}
                />

                <Detail
                  icon={<FileText size={17} />}
                  label="Email"
                  value={booking.email || "-"}
                />

                <Detail
                  icon={<Users size={17} />}
                  label="Passengers"
                  value={booking.passengers || 0}
                />

              </div>

            </div>


            {/* PAYMENT INFORMATION */}

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 p-6">

                <div className="flex items-center gap-3">

                  <div className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-emerald-50
                    text-emerald-600
                  ">
                    <CreditCard size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Payment
                    </p>

                    <h2 className="text-lg font-bold text-slate-900">
                      Payment Summary
                    </h2>
                  </div>

                </div>

              </div>


              <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-3">

                <Amount
                  label="Total Amount"
                  value={booking.total_amount}
                />

                <Amount
                  label="Advance Paid"
                  value={booking.advance_amount}
                />

                <Amount
                  label="Balance"
                  value={booking.balance_amount}
                />

              </div>


              <div className="border-t border-slate-100 bg-slate-50 p-6">

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Payment Status
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      Current payment status
                    </p>
                  </div>

                  <PaymentStatus
                    status={booking.payment_status}
                  />

                </div>

              </div>

            </div>

          </div>


          {/* RIGHT */}

          <div>

            <div className="
              sticky
              top-6
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
            ">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Booking Overview
              </p>

              <h2 className="mt-2 text-xl font-extrabold text-slate-900">
                Your Trip
              </h2>


              <div className="mt-6 space-y-5">

                <TimelineItem
                  active
                  icon={<FileText size={17} />}
                  title="Booking Created"
                  description={
                    booking.created_at
                      ? formatDateTime(booking.created_at)
                      : "Booking created"
                  }
                />

                <TimelineItem
                  active={
                    bookingStatus === "Confirmed" ||
                    bookingStatus === "Completed"
                  }
                  icon={<CheckCircle2 size={17} />}
                  title="Booking Status"
                  description={bookingStatus}
                />

                <TimelineItem
                  active={
                    booking.payment_status &&
                    String(booking.payment_status).toLowerCase() !==
                      "pending"
                  }
                  icon={<CreditCard size={17} />}
                  title="Payment"
                  description={
                    booking.payment_status || "Pending"
                  }
                />

                <TimelineItem
                  active={booking.travel_date}
                  last
                  icon={<MapPin size={17} />}
                  title="Travel Date"
                  description={formatDate(booking.travel_date)}
                />

              </div>


              {booking.booking_status === "Confirmed" && (
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/customer/trips/${booking.id}`)
                  }
                  className="
                    mt-7
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-3
                    text-sm
                    font-bold
                    text-white
                    transition
                    hover:bg-blue-700
                  "
                >
                  Track Trip
                  <ArrowRightIcon />
                </button>
              )}


              <button
                type="button"
                onClick={() => navigate("/customer/bookings")}
                className="
                  mt-3
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-slate-700
                  transition
                  hover:bg-slate-50
                "
              >
                <ArrowLeft size={16} />
                My Bookings
              </button>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
}


/* ==========================================
   DETAIL
========================================== */

function Detail({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">

      <div className="flex items-center gap-2 text-blue-600">
        {icon}

        <span className="text-xs font-bold uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-2 break-words text-sm font-bold text-slate-800">
        {value}
      </p>

    </div>
  );
}


/* ==========================================
   AMOUNT
========================================== */

function Amount({
  label,
  value,
}) {
  return (
    <div>

      <p className="text-xs font-medium text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-extrabold text-slate-900">
        ₹{Number(value || 0).toLocaleString("en-IN")}
      </p>

    </div>
  );
}


/* ==========================================
   TIMELINE
========================================== */

function TimelineItem({
  active,
  icon,
  title,
  description,
  last = false,
}) {
  return (
    <div className="flex gap-3">

      <div className="flex flex-col items-center">

        <div
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            ${
              active
                ? "bg-blue-50 text-blue-600"
                : "bg-slate-100 text-slate-400"
            }
          `}
        >
          {icon}
        </div>

        {!last && (
          <div
            className={`
              mt-1
              h-full
              min-h-8
              w-px
              ${
                active
                  ? "bg-blue-100"
                  : "bg-slate-200"
              }
            `}
          />
        )}

      </div>


      <div className="pb-5">

        <p className="text-sm font-bold text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
}


/* ==========================================
   ARROW ICON
========================================== */

function ArrowRightIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}