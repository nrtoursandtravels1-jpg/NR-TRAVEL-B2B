import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Loader2,
  MapPin,
  Users,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";

export default function CustomerBooking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadInquiry();
  }, [id]);

  async function loadInquiry() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

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
        .eq("customer_id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        alert("Inquiry not found.");
        navigate("/customer/enquiries");
        return;
      }

      if (
        data.status !== "accepted" &&
        data.status !== "converted"
      ) {
        alert("Please accept the agent proposal first.");
        navigate("/customer/enquiries");
        return;
      }

      setInquiry(data);

      // Check whether booking already exists
      const { data: existingBooking, error: bookingError } =
        await supabase
          .from("bookings")
          .select("*")
          .eq("inquiry_id", data.id)
          .maybeSingle();

      if (bookingError) {
        console.warn(
          "Existing booking check:",
          bookingError.message
        );
      }

      if (existingBooking) {
        setBooking(existingBooking);
      }
    } catch (error) {
      console.error("Customer Booking Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function createBooking() {
    try {
      setSubmitting(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      if (!inquiry) {
        alert("Inquiry not found.");
        return;
      }

      if (booking) {
        alert("Booking already exists.");
        return;
      }

      const packageData = inquiry.packages;

      const bookingPayload = {
        customer_id: user.id,
        agent_id: inquiry.agent_id,
        inquiry_id: inquiry.id,
        package_id: inquiry.package_id || packageData?.id || null,
        travel_date: inquiry.travel_date,
        travelers: inquiry.travelers || 1,
        amount: packageData?.price
          ? Number(packageData.price)
          : 0,
        status: "pending",
        notes: inquiry.message || null,
      };

      const { data, error } = await supabase
        .from("bookings")
        .insert([bookingPayload])
        .select()
        .single();

      if (error) throw error;

      // Mark enquiry as converted
      const { error: inquiryError } = await supabase
        .from("customer_inquiries")
        .update({
          status: "converted",
          updated_at: new Date().toISOString(),
        })
        .eq("id", inquiry.id)
        .eq("customer_id", user.id);

      if (inquiryError) {
        console.warn(
          "Inquiry status update:",
          inquiryError.message
        );
      }

      setBooking(data);

      alert(
        "Booking request created successfully!"
      );
    } catch (error) {
      console.error(
        "Create Booking Error:",
        error
      );

      alert(error.message);
    } finally {
      setSubmitting(false);
    }
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

            <p className="mt-4 text-sm text-slate-500">
              Loading booking details...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!inquiry) {
    return null;
  }

  const packageData = inquiry.packages;

  return (
    <Layout>
      <div className="p-6 lg:p-8">

        {/* BACK */}

        <button
          type="button"
          onClick={() =>
            navigate("/customer/enquiries")
          }
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-slate-500
            hover:text-blue-600
          "
        >
          <ArrowLeft size={17} />
          Back to Enquiries
        </button>

        {/* HEADER */}

        <div className="mb-8">
          <p
            className="
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              text-blue-600
            "
          >
            Customer Portal
          </p>

          <h1
            className="
              mt-2
              text-3xl
              font-extrabold
              text-slate-900
            "
          >
            Confirm Your Booking
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Review your accepted travel proposal and
            create your booking request.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* LEFT */}

          <div className="space-y-6 lg:col-span-2">

            {/* PACKAGE */}

            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
              "
            >
              {packageData?.image_url && (
                <div className="h-64 w-full">
                  <img
                    src={packageData.image_url}
                    alt={packageData.package_name}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">

                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-blue-600
                  "
                >
                  Selected Package
                </p>

                <h2
                  className="
                    mt-2
                    text-2xl
                    font-extrabold
                    text-slate-900
                  "
                >
                  {packageData?.package_name ||
                    "Travel Package"}
                </h2>

                <div
                  className="
                    mt-4
                    flex
                    flex-wrap
                    gap-5
                    text-sm
                    text-slate-500
                  "
                >
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={16} />
                    {packageData?.destination ||
                      "Destination"}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={16} />
                    {inquiry.travel_date
                      ? new Date(
                          inquiry.travel_date
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "Not specified"}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <Users size={16} />
                    {inquiry.travelers || 1} Travellers
                  </span>
                </div>

              </div>
            </div>

            {/* TRAVEL DETAILS */}

            <div
              className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
              "
            >
              <h2 className="text-lg font-bold text-slate-900">
                Travel Details
              </h2>

              <div
                className="
                  mt-5
                  grid
                  grid-cols-1
                  gap-4
                  sm:grid-cols-2
                "
              >
                <Detail
                  icon={CalendarDays}
                  label="Travel Date"
                  value={
                    inquiry.travel_date
                      ? new Date(
                          inquiry.travel_date
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "Not specified"
                  }
                />

                <Detail
                  icon={Users}
                  label="Travellers"
                  value={`${inquiry.travelers || 1} Persons`}
                />

                <Detail
                  icon={MapPin}
                  label="Destination"
                  value={
                    packageData?.destination ||
                    "Destination"
                  }
                />

                <Detail
                  icon={CreditCard}
                  label="Package Price"
                  value={
                    packageData?.price !== null &&
                    packageData?.price !== undefined
                      ? `₹${Number(
                          packageData.price
                        ).toLocaleString("en-IN")}`
                      : "Price on request"
                  }
                />
              </div>
            </div>

            {/* AGENT RESPONSE */}

            <div
              className="
                rounded-2xl
                border
                border-green-100
                bg-green-50
                p-6
              "
            >
              <div className="flex items-center gap-3">
                <CheckCircle2
                  size={20}
                  className="text-green-600"
                />

                <div>
                  <h2 className="font-bold text-green-900">
                    Agent Proposal Accepted
                  </h2>

                  <p className="text-xs text-green-700">
                    This proposal has been accepted.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-white p-5">
                <p
                  className="
                    whitespace-pre-line
                    text-sm
                    leading-7
                    text-green-950
                  "
                >
                  {inquiry.agent_response ||
                    "Agent proposal accepted."}
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT */}

          <div>
            <div
              className="
                sticky
                top-6
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
              "
            >

              {booking ? (
                <>
                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-green-50
                      text-green-600
                    "
                  >
                    <CheckCircle2 size={25} />
                  </div>

                  <h2
                    className="
                      mt-4
                      text-xl
                      font-extrabold
                      text-slate-900
                    "
                  >
                    Booking Created
                  </h2>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    Your booking request has been
                    successfully created.
                  </p>

                  <div
                    className="
                      mt-5
                      rounded-xl
                      bg-slate-50
                      p-4
                    "
                  >
                    <p className="text-xs text-slate-500">
                      Booking ID
                    </p>

                    <p className="mt-1 font-bold text-slate-900">
                      #{booking.id}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/customer/bookings")
                    }
                    className="
                      mt-6
                      flex
                      w-full
                      items-center
                      justify-center
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
                    View My Bookings
                  </button>
                </>
              ) : (
                <>
                  <p
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-blue-600
                    "
                  >
                    Booking
                  </p>

                  <h2
                    className="
                      mt-2
                      text-xl
                      font-extrabold
                      text-slate-900
                    "
                  >
                    Confirm Booking Request
                  </h2>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    Create a booking request using the
                    accepted travel proposal.
                  </p>

                  <div
                    className="
                      mt-5
                      rounded-xl
                      bg-slate-50
                      p-4
                    "
                  >
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">
                        Package
                      </span>

                      <span className="text-sm font-bold text-slate-800">
                        {packageData?.package_name ||
                          "Travel Package"}
                      </span>
                    </div>

                    <div className="mt-3 flex justify-between">
                      <span className="text-sm text-slate-500">
                        Travellers
                      </span>

                      <span className="text-sm font-bold text-slate-800">
                        {inquiry.travelers || 1}
                      </span>
                    </div>

                    <div className="mt-3 flex justify-between">
                      <span className="text-sm text-slate-500">
                        Amount
                      </span>

                      <span className="text-sm font-bold text-slate-900">
                        {packageData?.price !== null &&
                        packageData?.price !== undefined
                          ? `₹${Number(
                              packageData.price
                            ).toLocaleString("en-IN")}`
                          : "On Request"}
                      </span>
                    </div>
                  </div>

                  <div
                    className="
                      mt-5
                      rounded-xl
                      border
                      border-blue-100
                      bg-blue-50
                      p-4
                    "
                  >
                    <p className="text-xs leading-5 text-blue-700">
                      Creating this booking will send the
                      booking request to the assigned travel
                      agent.
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={submitting}
                    onClick={createBooking}
                    className="
                      mt-6
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
                      hover:bg-blue-700
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    {submitting ? (
                      <>
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />
                        Creating Booking...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={17} />
                        Confirm Booking
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/customer/enquiries")
                    }
                    className="
                      mt-3
                      w-full
                      rounded-xl
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-slate-500
                      hover:bg-slate-50
                    "
                  >
                    Cancel
                  </button>
                </>
              )}

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
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-blue-600">
        <Icon size={15} />

        <span
          className="
            text-xs
            font-bold
            uppercase
            tracking-wide
          "
        >
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}