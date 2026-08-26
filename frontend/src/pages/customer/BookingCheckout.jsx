import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  MapPin,
  Users,
  UserRound,
  Phone,
  Mail,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";

export default function BookingCheckout() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inquiry, setInquiry] = useState(null);
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    passengers: 1,
    travelDate: "",
    advanceAmount: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    loadCheckout();
  }, [id]);

  async function loadCheckout() {
    try {
      setLoading(true);
      setError("");

      const {
        data: { user: currentUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!currentUser) {
        navigate("/login");
        return;
      }

      setUser(currentUser);

      const { data, error } = await supabase
        .from("customer_inquiries")
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
        .eq("id", id)
        .eq("customer_id", currentUser.id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        setError("Booking enquiry not found.");
        return;
      }

      if (
        data.status !== "accepted" &&
        data.status !== "converted"
      ) {
        setError(
          "This enquiry has not been accepted yet."
        );
        return;
      }

      setInquiry(data);

      setForm({
        fullName:
          currentUser.user_metadata?.full_name ||
          currentUser.user_metadata?.name ||
          "",
        email: currentUser.email || "",
        phone:
          currentUser.user_metadata?.phone ||
          currentUser.phone ||
          "",
        passengers: data.travelers || 1,
        travelDate: data.travel_date || "",
        advanceAmount: "",
      });
    } catch (error) {
      console.error("Checkout Load Error:", error);
      setError(error.message || "Unable to load checkout.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function getPackagePrice() {
    const price = Number(inquiry?.packages?.price || 0);
    const passengers = Number(form.passengers || 1);

    return price * passengers;
  }

  function getAdvanceAmount() {
    const total = getPackagePrice();
    const entered = Number(form.advanceAmount || 0);

    if (entered <= 0) {
      return 0;
    }

    return Math.min(entered, total);
  }

  function getBalanceAmount() {
    return Math.max(
      getPackagePrice() - getAdvanceAmount(),
      0
    );
  }

  async function handleConfirmBooking(event) {
    event.preventDefault();

    try {
      setBooking(true);
      setError("");

      if (!user) {
        navigate("/login");
        return;
      }

      if (!inquiry) {
        setError("Booking enquiry not found.");
        return;
      }

      if (!form.fullName.trim()) {
        setError("Please enter your full name.");
        return;
      }

      if (!form.phone.trim()) {
        setError("Please enter your phone number.");
        return;
      }

      if (!form.travelDate) {
        setError("Please select your travel date.");
        return;
      }

      if (Number(form.passengers) < 1) {
        setError("Please enter a valid number of passengers.");
        return;
      }

      const totalAmount = getPackagePrice();
      const advanceAmount = getAdvanceAmount();
      const balanceAmount = getBalanceAmount();

      /*
       * Prevent duplicate booking for this enquiry.
       */

      const { data: existingBooking, error: existingError } =
        await supabase
          .from("bookings")
          .select("id, booking_no")
          .eq("customer_id", user.id)
          .eq("inquiry_id", inquiry.id)
          .maybeSingle();

      if (existingError) {
        console.error(
          "Existing Booking Check Error:",
          existingError
        );
      }

      if (existingBooking) {
        navigate(
          `/customer/bookings/${existingBooking.id}`
        );
        return;
      }

      /*
       * Generate booking number.
       */

      const bookingNo =
        "WT-" +
        Date.now().toString().slice(-8);

      /*
       * Create booking.
       */

      const { data: newBooking, error: bookingError } =
        await supabase
          .from("bookings")
          .insert([
            {
              booking_no: bookingNo,

              customer_id: user.id,

              inquiry_id: inquiry.id,

              package_id:
                inquiry.package_id ||
                inquiry.packages?.id ||
                null,

              package_name:
                inquiry.packages?.package_name ||
                "Travel Package",

              destination:
                inquiry.packages?.destination ||
                "",

              email: form.email.trim(),

              customer_name:
                form.fullName.trim(),

              phone:
                form.phone.trim(),

              travel_date:
                form.travelDate,

              passengers:
                Number(form.passengers),

              total_amount:
                totalAmount,

              advance_amount:
                advanceAmount,

              balance_amount:
                balanceAmount,

              payment_status:
                advanceAmount >= totalAmount
                  ? "Paid"
                  : advanceAmount > 0
                  ? "Partially Paid"
                  : "Pending",

              booking_status:
                "Pending",

              created_at:
                new Date().toISOString(),
            },
          ])
          .select()
          .single();

      if (bookingError) {
        console.error(
          "Create Booking Error:",
          bookingError
        );

        setError(bookingError.message);
        return;
      }

      /*
       * Mark enquiry as converted.
       */

      const { error: inquiryUpdateError } =
        await supabase
          .from("customer_inquiries")
          .update({
            status: "converted",
          })
          .eq("id", inquiry.id)
          .eq("customer_id", user.id);

      if (inquiryUpdateError) {
        console.error(
          "Inquiry Update Error:",
          inquiryUpdateError
        );
      }

      /*
       * Redirect to confirmation.
       */

      navigate(
        `/customer/booking-confirmation/${newBooking.id}`
      );
    } catch (error) {
      console.error(
        "Confirm Booking Error:",
        error
      );

      setError(
        error.message ||
          "Unable to create booking. Please try again."
      );
    } finally {
      setBooking(false);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading checkout...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error && !inquiry) {
    return (
      <Layout>
        <div className="p-8">
          <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="text-xl font-bold text-red-800">
              Unable to Continue
            </h2>

            <p className="mt-2 text-sm text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/customer/enquiries")
              }
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              <ArrowLeft size={17} />
              Back to Enquiries
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const packageData = inquiry?.packages;

  const totalAmount = getPackagePrice();
  const advanceAmount = getAdvanceAmount();
  const balanceAmount = getBalanceAmount();

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 p-6 lg:p-8">

        {/* BACK */}

        <button
          type="button"
          onClick={() =>
            navigate("/customer/enquiries")
          }
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to My Enquiries
        </button>

        {/* HEADER */}

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Customer Portal
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Booking Checkout
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Confirm your travel details and proceed with
            your booking.
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleConfirmBooking}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >

          {/* LEFT */}

          <div className="space-y-6 lg:col-span-2">

            {/* PACKAGE */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="relative h-60 bg-slate-100">

                {packageData?.image_url ? (
                  <img
                    src={packageData.image_url}
                    alt={
                      packageData.package_name ||
                      "Travel Package"
                    }
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <MapPin
                    size={50}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-300"
                  />
                )}

              </div>

              <div className="p-6">

                <h2 className="text-2xl font-extrabold text-slate-900">
                  {packageData?.package_name ||
                    "Travel Package"}
                </h2>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">

                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={16} />
                    {packageData?.destination ||
                      "Destination"}
                  </span>

                  {packageData?.duration && (
                    <span>
                      {packageData.duration}
                    </span>
                  )}

                </div>

              </div>

            </div>

            {/* CUSTOMER DETAILS */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <UserRound size={19} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Traveller Details
                  </h2>

                  <p className="text-xs text-slate-500">
                    Enter the details for your booking
                  </p>
                </div>

              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* NAME */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Full Name *
                  </label>

                  <div className="relative">

                    <UserRound
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="h-12 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>
                </div>

                {/* PHONE */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Phone Number *
                  </label>

                  <div className="relative">

                    <Phone
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className="h-12 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>
                </div>

                {/* EMAIL */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Email
                  </label>

                  <div className="relative">

                    <Mail
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      className="h-12 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>
                </div>

                {/* PASSENGERS */}

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Travellers *
                  </label>

                  <div className="relative">

                    <Users
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="number"
                      name="passengers"
                      min="1"
                      value={form.passengers}
                      onChange={handleChange}
                      className="h-12 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>
                </div>

                {/* TRAVEL DATE */}

                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Travel Date *
                  </label>

                  <div className="relative">

                    <CalendarDays
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="date"
                      name="travelDate"
                      value={form.travelDate}
                      onChange={handleChange}
                      min={
                        new Date()
                          .toISOString()
                          .split("T")[0]
                      }
                      className="h-12 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* PAYMENT */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <CreditCard size={19} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Payment
                  </h2>

                  <p className="text-xs text-slate-500">
                    Enter the advance amount you want to pay
                  </p>
                </div>

              </div>

              <div className="mt-6">

                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Advance Amount
                </label>

                <div className="relative">

                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                    ₹
                  </span>

                  <input
                    type="number"
                    name="advanceAmount"
                    min="0"
                    max={totalAmount}
                    value={form.advanceAmount}
                    onChange={handleChange}
                    placeholder="Enter advance amount"
                    className="h-12 w-full rounded-xl border border-slate-200 pl-8 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Maximum advance: ₹
                  {totalAmount.toLocaleString("en-IN")}
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT SUMMARY */}

          <div>

            <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Booking Summary
              </p>

              <h2 className="mt-2 text-xl font-extrabold text-slate-900">
                Your Trip
              </h2>

              <div className="mt-6 space-y-4">

                <SummaryRow
                  label="Package"
                  value={
                    packageData?.package_name ||
                    "Travel Package"
                  }
                />

                <SummaryRow
                  label="Destination"
                  value={
                    packageData?.destination ||
                    "-"
                  }
                />

                <SummaryRow
                  label="Travellers"
                  value={form.passengers}
                />

                <SummaryRow
                  label="Travel Date"
                  value={
                    form.travelDate
                      ? new Date(
                          form.travelDate
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "-"
                  }
                />

              </div>

              <div className="my-6 border-t border-slate-100" />

              <AmountRow
                label="Total Amount"
                value={totalAmount}
              />

              <AmountRow
                label="Advance"
                value={advanceAmount}
              />

              <div className="mt-4 rounded-xl bg-slate-50 p-4">

                <div className="flex items-center justify-between">

                  <span className="text-sm font-bold text-slate-700">
                    Balance
                  </span>

                  <span className="text-xl font-extrabold text-slate-900">
                    ₹
                    {balanceAmount.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

              </div>

              <div className="mt-5 rounded-xl bg-blue-50 p-4">

                <div className="flex items-start gap-3">

                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <p className="text-xs leading-5 text-blue-800">
                    Your booking will be created after
                    you confirm the details.
                  </p>

                </div>

              </div>

              <button
                type="submit"
                disabled={booking}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {booking
                  ? "Creating Booking..."
                  : "Confirm Booking"}

                {!booking && (
                  <ArrowRight size={17} />
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/customer/enquiries")
                }
                className="mt-3 flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-50"
              >
                Cancel
              </button>

            </div>

          </div>

        </form>
      </div>
    </Layout>
  );
}


/* ==========================================
   SUMMARY ROW
========================================== */

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">

      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="max-w-[60%] text-right text-sm font-bold text-slate-800">
        {value}
      </span>

    </div>
  );
}


/* ==========================================
   AMOUNT ROW
========================================== */

function AmountRow({ label, value }) {
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