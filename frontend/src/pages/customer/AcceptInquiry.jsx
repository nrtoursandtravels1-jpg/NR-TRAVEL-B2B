import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  Users,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";

export default function AcceptInquiry() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

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
        setInquiry(null);
        return;
      }

      setInquiry(data);
    } catch (error) {
      console.error("Accept Inquiry Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAccept() {
    try {
      setAccepting(true);

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

      if (!inquiry.agent_response) {
        alert("The agent has not responded yet.");
        return;
      }

      if (
        inquiry.status === "converted" ||
        inquiry.status === "closed"
      ) {
        alert("This enquiry is no longer available.");
        return;
      }

      const { data, error } = await supabase
        .from("customer_inquiries")
        .update({
          status: "accepted",
        })
        .eq("id", inquiry.id)
        .eq("customer_id", user.id)
        .select()
        .single();

      if (error) throw error;

      setInquiry({
        ...inquiry,
        ...data,
      });

      alert(
        "Enquiry accepted successfully. Your booking process can now continue."
      );

      navigate("/customer/enquiries");
    } catch (error) {
      console.error("Accept Inquiry Update Error:", error);
      alert(error.message);
    } finally {
      setAccepting(false);
    }
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
              Loading enquiry...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!inquiry) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <MessageSquare
            size={45}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-4 text-xl font-bold text-slate-800">
            Enquiry not found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            This enquiry may have been removed or you may not
            have permission to view it.
          </p>

          <button
            type="button"
            onClick={() => navigate("/customer/enquiries")}
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
            <ArrowLeft size={17} />
            Back to Enquiries
          </button>
        </div>
      </Layout>
    );
  }

  const packageData = inquiry.packages;

  const alreadyAccepted =
    inquiry.status === "accepted" ||
    inquiry.status === "converted";

  return (
    <Layout>
      <div className="p-6 lg:p-8">

        {/* BACK */}

        <button
          type="button"
          onClick={() => navigate("/customer/enquiries")}
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
          Back to My Enquiries
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
            Accept Travel Proposal
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Review the agent response before proceeding.
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

              <div
                className="
                  relative
                  h-64
                  bg-slate-100
                  sm:h-80
                "
              >

                {packageData?.image_url ? (
                  <img
                    src={packageData.image_url}
                    alt={packageData.package_name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <MapPin
                    size={55}
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      -translate-x-1/2
                      -translate-y-1/2
                      text-slate-300
                    "
                  />
                )}

              </div>


              <div className="p-6">

                <h2
                  className="
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
                    mt-3
                    flex
                    flex-wrap
                    gap-4
                    text-sm
                    text-slate-500
                  "
                >

                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={16} />
                    {packageData?.destination ||
                      "Destination"}
                  </span>

                  {packageData?.duration && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={16} />
                      {packageData.duration}
                    </span>
                  )}

                  {packageData?.price !== null &&
                    packageData?.price !== undefined && (
                      <span className="font-bold text-slate-800">
                        ₹
                        {Number(
                          packageData.price
                        ).toLocaleString("en-IN")}
                      </span>
                    )}

                </div>

              </div>

            </div>


            {/* TRAVEL REQUIREMENT */}

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

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-50
                    text-blue-600
                  "
                >
                  <MessageSquare size={19} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Your Requirement
                  </h2>

                  <p className="text-xs text-slate-500">
                    Details submitted with your enquiry
                  </p>
                </div>

              </div>


              <div
                className="
                  mt-5
                  grid
                  grid-cols-1
                  gap-3
                  sm:grid-cols-2
                "
              >

                <Info
                  icon={CalendarDays}
                  label="Travel Date"
                  value={
                    inquiry.travel_date
                      ? new Date(
                          inquiry.travel_date
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Not specified"
                  }
                />

                <Info
                  icon={Users}
                  label="Travellers"
                  value={
                    inquiry.travelers ||
                    "Not specified"
                  }
                />

              </div>


              <div className="mt-4 rounded-xl bg-slate-50 p-4">

                <p
                  className="
                    whitespace-pre-line
                    text-sm
                    leading-6
                    text-slate-600
                  "
                >
                  {inquiry.message ||
                    "No additional requirement provided."}
                </p>

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

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-green-600
                  "
                >
                  <MessageSquare size={19} />
                </div>

                <div>
                  <h2 className="font-bold text-green-900">
                    Agent Response
                  </h2>

                  <p className="text-xs text-green-700">
                    Travel agent proposal
                  </p>
                </div>

              </div>


              <div
                className="
                  mt-5
                  rounded-xl
                  bg-white
                  p-5
                "
              >

                <p
                  className="
                    whitespace-pre-line
                    text-sm
                    leading-7
                    text-green-950
                  "
                >
                  {inquiry.agent_response ||
                    "No response available yet."}
                </p>

              </div>

            </div>

          </div>


          {/* RIGHT ACTION */}

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

              {alreadyAccepted ? (

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
                    Enquiry Accepted
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    You have accepted the travel agent's
                    proposal. The next step is booking.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/customer/enquiries")
                    }
                    className="
                      mt-6
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-slate-200
                      px-5
                      py-3
                      text-sm
                      font-bold
                      text-slate-700
                      hover:bg-slate-50
                    "
                  >
                    Back to Enquiries
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
                    Ready to Continue?
                  </p>

                  <h2
                    className="
                      mt-2
                      text-xl
                      font-extrabold
                      text-slate-900
                    "
                  >
                    Accept This Proposal
                  </h2>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    By accepting, you confirm that you want
                    to proceed with this travel proposal.
                  </p>


                  <div
                    className="
                      mt-5
                      rounded-xl
                      bg-slate-50
                      p-4
                    "
                  >

                    <div className="flex items-start gap-3">

                      <CheckCircle2
                        size={18}
                        className="
                          mt-0.5
                          shrink-0
                          text-green-600
                        "
                      />

                      <p className="text-xs leading-5 text-slate-600">
                        Your enquiry will be marked as
                        accepted. Booking creation will be
                        handled in the next step.
                      </p>

                    </div>

                  </div>


                  <button
                    type="button"
                    disabled={accepting}
                    onClick={handleAccept}
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
                    {accepting
                      ? "Accepting..."
                      : "Accept & Proceed"}

                    {!accepting && (
                      <ArrowRight size={17} />
                    )}
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      navigate("/customer/enquiries")
                    }
                    className="
                      mt-3
                      flex
                      w-full
                      items-center
                      justify-center
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
   INFO
========================================== */

function Info({
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

