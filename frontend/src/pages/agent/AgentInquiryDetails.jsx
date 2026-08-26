import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Loader2,
  MapPin,
  MessageSquare,
  Send,
  Users,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";

export default function AgentInquiryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("responded");

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
            price
          )
        `)
        .eq("id", id)
        .eq("agent_id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        alert("Inquiry not found or you are not assigned to this enquiry.");
        navigate("/agent/inquiries");
        return;
      }

      setInquiry(data);
      setResponse(data.agent_response || "");

      if (data.status) {
        setStatus(
          data.status === "new"
            ? "responded"
            : data.status
        );
      }
    } catch (error) {
      console.error("Inquiry Details Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function submitResponse(event) {
    event.preventDefault();

    if (!response.trim()) {
      alert("Please enter a response for the customer.");
      return;
    }

    try {
      setSubmitting(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { error } = await supabase
        .from("customer_inquiries")
        .update({
          agent_response: response.trim(),
          status: status,
          responded_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("agent_id", user.id);

      if (error) throw error;

      alert("Response sent to customer successfully.");

      navigate("/agent/inquiries");
    } catch (error) {
      console.error("Response Update Error:", error);
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
              Loading enquiry...
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
          onClick={() => navigate("/agent/inquiries")}
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
          Back to Customer Enquiries
        </button>


        {/* HEADER */}

        <div className="mb-8">

          <p className="
            text-xs
            font-bold
            uppercase
            tracking-[0.2em]
            text-blue-600
          ">
            Agent Portal
          </p>

          <h1 className="
            mt-2
            text-3xl
            font-extrabold
            text-slate-900
          ">
            Customer Enquiry
          </h1>

          <p className="
            mt-2
            text-sm
            text-slate-500
          ">
            Review the customer's requirement and send your response.
          </p>

        </div>


        <div className="
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-3
        ">

          {/* LEFT */}

          <div className="space-y-6 xl:col-span-2">

            {/* PACKAGE */}

            <div className="
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-sm
            ">

              {packageData?.image_url && (
                <div className="h-52 w-full">

                  <img
                    src={packageData.image_url}
                    alt={packageData.package_name}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />

                </div>
              )}

              <div className="p-6">

                <p className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-blue-600
                ">
                  Package
                </p>

                <h2 className="
                  mt-2
                  text-2xl
                  font-extrabold
                  text-slate-900
                ">
                  {packageData?.package_name ||
                    "Travel Package"}
                </h2>

                <div className="
                  mt-4
                  flex
                  flex-wrap
                  gap-4
                  text-sm
                  text-slate-500
                ">

                  <span className="
                    inline-flex
                    items-center
                    gap-1.5
                  ">
                    <MapPin size={16} />
                    {packageData?.destination ||
                      "Destination"}
                  </span>

                  <span className="
                    inline-flex
                    items-center
                    gap-1.5
                  ">
                    <CalendarDays size={16} />
                    {inquiry.travel_date
                      ? new Date(
                          inquiry.travel_date
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Date not specified"}
                  </span>

                  <span className="
                    inline-flex
                    items-center
                    gap-1.5
                  ">
                    <Users size={16} />
                    {inquiry.travelers || 1} Travellers
                  </span>

                </div>

              </div>

            </div>


            {/* CUSTOMER REQUIREMENT */}

            <div className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
            ">

              <div className="
                flex
                items-center
                gap-3
              ">

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
                  <MessageSquare size={19} />
                </div>

                <div>

                  <p className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-slate-400
                  ">
                    Customer
                  </p>

                  <h2 className="
                    text-lg
                    font-bold
                    text-slate-900
                  ">
                    Travel Requirement
                  </h2>

                </div>

              </div>


              <div className="
                mt-5
                rounded-xl
                bg-slate-50
                p-5
              ">

                <p className="
                  whitespace-pre-line
                  text-sm
                  leading-7
                  text-slate-600
                ">
                  {inquiry.message ||
                    "Customer has not provided additional requirements."}
                </p>

              </div>

            </div>


            {/* PREVIOUS RESPONSE */}

            {inquiry.agent_response && (

              <div className="
                rounded-2xl
                border
                border-green-100
                bg-green-50
                p-6
              ">

                <div className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-bold
                  text-green-800
                ">
                  <CheckCircle2 size={18} />
                  Previous Response
                </div>

                <p className="
                  mt-3
                  whitespace-pre-line
                  text-sm
                  leading-7
                  text-green-900
                ">
                  {inquiry.agent_response}
                </p>

                {inquiry.responded_at && (
                  <p className="
                    mt-3
                    text-xs
                    text-green-700
                  ">
                    Responded on{" "}
                    {new Date(
                      inquiry.responded_at
                    ).toLocaleString("en-IN")}
                  </p>
                )}

              </div>

            )}

          </div>


          {/* RIGHT RESPONSE PANEL */}

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

              <p className="
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-blue-600
              ">
                Agent Response
              </p>

              <h2 className="
                mt-2
                text-xl
                font-extrabold
                text-slate-900
              ">
                Respond to Customer
              </h2>

              <p className="
                mt-2
                text-sm
                leading-6
                text-slate-500
              ">
                Send availability, vehicle information,
                pricing and other travel details.
              </p>


              <form
                onSubmit={submitResponse}
                className="mt-6 space-y-5"
              >

                {/* STATUS */}

                <div>

                  <label className="
                    mb-1.5
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                  ">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      py-3
                      text-sm
                      outline-none
                      focus:border-blue-400
                      focus:ring-2
                      focus:ring-blue-100
                    "
                  >
                    <option value="responded">
                      Responded
                    </option>

                    <option value="accepted">
                      Accepted
                    </option>

                    <option value="rejected">
                      Rejected
                    </option>

                    <option value="closed">
                      Closed
                    </option>
                  </select>

                </div>


                {/* RESPONSE */}

                <div>

                  <label className="
                    mb-1.5
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                  ">
                    Response to Customer
                  </label>

                  <textarea
                    required
                    rows="9"
                    value={response}
                    onChange={(e) =>
                      setResponse(e.target.value)
                    }
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-slate-200
                      px-4
                      py-3
                      text-sm
                      leading-6
                      outline-none
                      focus:border-blue-400
                      focus:ring-2
                      focus:ring-blue-100
                    "
                    placeholder={`Example:

Hello,

Your trip is available on the requested date.

Vehicle: Tempo Traveller
Hotel: 3 Star
Pickup: Delhi
Estimated Price: ₹25,000

Please confirm if you would like to proceed.`}
                  />

                </div>


                {/* QUICK TEMPLATE */}

                <div className="
                  rounded-xl
                  bg-slate-50
                  p-4
                ">

                  <p className="
                    text-xs
                    font-bold
                    text-slate-700
                  ">
                    Response should include
                  </p>

                  <ul className="
                    mt-2
                    space-y-1.5
                    text-xs
                    text-slate-500
                  ">
                    <li>✓ Availability</li>
                    <li>✓ Vehicle / transport</li>
                    <li>✓ Hotel details</li>
                    <li>✓ Approximate price</li>
                    <li>✓ Pickup / drop details</li>
                  </ul>

                </div>


                {/* SEND */}

                <button
                  type="submit"
                  disabled={submitting}
                  className="
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
                      Sending Response...
                    </>
                  ) : (
                    <>
                      <Send size={17} />
                      Send Response
                    </>
                  )}

                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
}