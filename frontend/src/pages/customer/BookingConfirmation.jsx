import { useEffect, useState } from "react";
import {
  CheckCircle2,
  CalendarDays,
  MapPin,
  Users,
  CreditCard,
  ArrowRight,
  Home,
  FileText,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";

export default function BookingConfirmation() {
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

      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", id)
        .eq("customer_id", user.id)
        .maybeSingle();

      if (error) throw error;

      setBooking(data || null);
    } catch (error) {
      console.error("Booking Confirmation Error:", error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(date) {
    if (!date) return "Not scheduled";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function formatAmount(value) {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading booking confirmation...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!booking) {
    return (
      <Layout>
        <div className="p-8">
          <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

            <FileText
              size={45}
              className="mx-auto text-slate-300"
            />

            <h2 className="mt-4 text-xl font-bold text-slate-800">
              Booking Not Found
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              We could not find this booking or you may not
              have permission to view it.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/customer/bookings")
              }
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              My Bookings
              <ArrowRight size={16} />
            </button>

          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 p-6 lg:p-8">

        <div className="mx-auto max-w-4xl">

          {/* SUCCESS */}

          <div className="rounded-3xl bg-slate-900 p-8 text-center text-white shadow-sm md:p-12">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">

              <CheckCircle2
                size={48}
                className="text-emerald-400"
              />

            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
              Booking Successful
            </p>

            <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
              Your Trip Is Booked!
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-300">
              Thank you for booking with us. Your travel
              booking has been successfully created.
            </p>

            <div className="mx-auto mt-6 inline-flex items-center rounded-full bg-white/10 px-5 py-2.5 text-sm font-bold">
              Booking #{booking.booking_no || booking.id}
            </div>

          </div>


          {/* BOOKING DETAILS */}

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

            {/* MAIN */}

            <div className="space-y-6 lg:col-span-2">

              {/* PACKAGE */}

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <CalendarDays size={21} />
                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Travel Package
                    </p>

                    <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                      {booking.package_name ||
                        "Travel Package"}
                    </h2>

                  </div>

                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <Detail
                    icon={MapPin}
                    label="Destination"
                    value={booking.destination || "-"}
                  />

                  <Detail
                    icon={CalendarDays}
                    label="Travel Date"
                    value={formatDate(
                      booking.travel_date
                    )}
                  />

                  <Detail
                    icon={Users}
                    label="Travellers"
                    value={booking.passengers || 1}
                  />

                  <Detail
                    icon={CreditCard}
                    label="Payment Status"
                    value={
                      booking.payment_status ||
                      "Pending"
                    }
                  />

                </div>

              </div>


              {/* CUSTOMER */}

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="text-lg font-extrabold text-slate-900">
                  Traveller Information
                </h2>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <Detail
                    label="Name"
                    value={
                      booking.customer_name || "-"
                    }
                  />

                  <Detail
                    label="Phone"
                    value={booking.phone || "-"}
                  />

                  <Detail
                    label="Email"
                    value={booking.email || "-"}
                  />

                  <Detail
                    label="Booked On"
                    value={formatDate(
                      booking.created_at
                    )}
                  />

                </div>

              </div>

            </div>


            {/* PAYMENT SUMMARY */}

            <div>

              <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  Payment Summary
                </p>

                <h2 className="mt-2 text-xl font-extrabold text-slate-900">
                  Booking Amount
                </h2>

                <div className="mt-6 space-y-4">

                  <AmountRow
                    label="Total Amount"
                    value={booking.total_amount}
                  />

                  <AmountRow
                    label="Advance Paid"
                    value={booking.advance_amount}
                  />

                </div>

                <div className="my-5 border-t border-slate-100" />

                <div className="rounded-xl bg-slate-50 p-4">

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-bold text-slate-700">
                      Balance
                    </span>

                    <span className="text-xl font-extrabold text-slate-900">
                      {formatAmount(
                        booking.balance_amount
                      )}
                    </span>

                  </div>

                </div>

                <div className="mt-5 rounded-xl bg-emerald-50 p-4">

                  <div className="flex items-start gap-3">

                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />

                    <p className="text-xs leading-5 text-emerald-800">
                      Your booking has been recorded
                      successfully. Keep your booking
                      number for future reference.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* ACTIONS */}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">

            <button
              type="button"
              onClick={() =>
                navigate("/customer/bookings")
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              <FileText size={17} />
              View My Bookings
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/customer/dashboard")
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              <Home size={17} />
              Customer Dashboard
            </button>

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
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">

      <div className="flex items-center gap-2 text-slate-400">

        {Icon && <Icon size={16} />}

        <span className="text-xs font-semibold">
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

function AmountRow({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-sm font-bold text-slate-900">
        ₹{Number(value || 0).toLocaleString("en-IN")}
      </span>

    </div>
  );
}