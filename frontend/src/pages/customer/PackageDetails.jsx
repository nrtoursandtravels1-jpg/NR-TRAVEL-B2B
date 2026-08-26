import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  MapPin,
  CalendarDays,
  Clock,
  Users,
  Bus,
  Car,
  Train,
  CheckCircle2,
  MessageSquare,
  Hotel,
  Utensils,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";

export default function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInquiry, setShowInquiry] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [inquiry, setInquiry] = useState({
    travelers: "",
    travel_date: "",
    message: "",
  });

  useEffect(() => {
    loadPackage();
  }, [id]);

  async function loadPackage() {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .eq("id", id)
        .eq("status", "approved")
        .maybeSingle();

      if (error) throw error;

      setPackageData(data);
    } catch (error) {
      console.error("Package Details Error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function submitInquiry(event) {
  event.preventDefault();

  try {
    setSubmitting(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    // 1. Create customer enquiry
    const { data: newInquiry, error: inquiryError } =
      await supabase
        .from("customer_inquiries")
        .insert({
          customer_id: user.id,
          package_id: packageData.id,
          travelers: Number(inquiry.travelers),
          travel_date: inquiry.travel_date,
          message: inquiry.message,
          status: "new",
        })
        .select()
        .single();

    if (inquiryError) {
      throw inquiryError;
    }

    // 2. Securely assign enquiry to package agent
    const { data: assignedInquiry, error: assignError } =
      await supabase.rpc(
        "assign_customer_inquiry",
        {
          p_inquiry_id: newInquiry.id,
        }
      );

    if (assignError) {
      console.error(
        "Inquiry Assignment Error:",
        assignError
      );

      alert(
        "Enquiry submitted, but agent assignment is pending."
      );
    } else {
      console.log(
        "Assigned Inquiry:",
        assignedInquiry
      );

      alert(
        "Your enquiry has been sent to the travel agent successfully."
      );
    }

    // 3. Close enquiry form
    setShowInquiry(false);

    // 4. Reset form
    setInquiry({
      travelers: "",
      travel_date: "",
      message: "",
    });

  } catch (error) {
    console.error("Inquiry Error:", error);

    alert(
      error.message ||
        "Unable to submit enquiry."
    );

  } finally {
    setSubmitting(false);
  }
}
  if (!packageData) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <h2 className="text-xl font-bold text-slate-800">
            Package not found
          </h2>

          <button
            onClick={() => navigate("/customer/packages")}
            className="
              mt-5
              rounded-xl
              bg-blue-600
              px-5
              py-2.5
              text-sm
              font-bold
              text-white
            "
          >
            Back to Packages
          </button>
        </div>
      </Layout>
    );
  }

  const transport = String(
    packageData.transport || ""
  ).toLowerCase();

  const TransportIcon =
    transport.includes("bus")
      ? Bus
      : transport.includes("cab") ||
        transport.includes("car")
      ? Car
      : Train;

  return (
    <Layout>
      <div className="p-6 lg:p-8">

        {/* BACK */}

        <button
          onClick={() => navigate("/customer/packages")}
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
          Back to Packages
        </button>


        {/* PACKAGE HEADER */}

        <div className="
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-sm
        ">

          <div className="
            relative
            flex
            h-[280px]
            items-center
            justify-center
            bg-slate-100
            lg:h-[380px]
          ">

            {packageData.image_url ? (
              <img
                src={packageData.image_url}
                alt={packageData.package_name}
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            ) : (
              <MapPin
                size={60}
                className="text-slate-300"
              />
            )}

            <button
              className="
                absolute
                right-5
                top-5
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-white
                text-slate-600
                shadow-md
                hover:text-red-500
              "
            >
              <Heart size={20} />
            </button>

          </div>


          <div className="p-6 lg:p-8">

            <div className="
              flex
              flex-col
              gap-5
              lg:flex-row
              lg:items-start
              lg:justify-between
            ">

              <div>

                {packageData.category && (
                  <span className="
                    inline-flex
                    rounded-full
                    bg-blue-50
                    px-3
                    py-1
                    text-xs
                    font-bold
                    text-blue-700
                  ">
                    {packageData.category}
                  </span>
                )}

                <h1 className="
                  mt-3
                  text-3xl
                  font-extrabold
                  text-slate-900
                ">
                  {packageData.package_name}
                </h1>

                <div className="
                  mt-3
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
                    {packageData.destination ||
                      "Destination"}
                  </span>

                  {packageData.duration && (
                    <span className="
                      inline-flex
                      items-center
                      gap-1.5
                    ">
                      <Clock size={16} />
                      {packageData.duration}
                    </span>
                  )}

                  {packageData.travelers && (
                    <span className="
                      inline-flex
                      items-center
                      gap-1.5
                    ">
                      <Users size={16} />
                      {packageData.travelers}
                    </span>
                  )}

                  {packageData.transport && (
                    <span className="
                      inline-flex
                      items-center
                      gap-1.5
                    ">
                      <TransportIcon size={16} />
                      {packageData.transport}
                    </span>
                  )}

                </div>

              </div>


              <div className="lg:text-right">

                <p className="text-xs text-slate-400">
                  Starting from
                </p>

                <p className="
                  mt-1
                  text-3xl
                  font-extrabold
                  text-slate-900
                ">
                  ₹
                  {Number(
                    packageData.price || 0
                  ).toLocaleString("en-IN")}
                </p>

                <p className="
                  mt-1
                  text-xs
                  text-slate-400
                ">
                  per person
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* DETAILS GRID */}

        <div className="
          mt-6
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-3
        ">

          <div className="xl:col-span-2 space-y-6">

            {/* DESCRIPTION */}

            <Section
              title="About This Package"
              icon={MapPin}
            >
              <p className="
                whitespace-pre-line
                text-sm
                leading-7
                text-slate-600
              ">
                {packageData.description ||
                  "Package details will be provided by the travel agent."}
              </p>
            </Section>


            {/* ITINERARY */}

            <Section
              title="Itinerary"
              icon={CalendarDays}
            >
              <p className="
                whitespace-pre-line
                text-sm
                leading-7
                text-slate-600
              ">
                {packageData.itinerary ||
                  "Detailed itinerary will be shared by the travel agent."}
              </p>
            </Section>


            {/* SERVICES */}

            <Section
              title="Package Facilities"
              icon={CheckCircle2}
            >

              <div className="
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-2
              ">

                <Facility
                  icon={Hotel}
                  text="Hotel Accommodation"
                />

                <Facility
                  icon={Utensils}
                  text="Meals as per package"
                />

                <Facility
                  icon={TransportIcon}
                  text={
                    packageData.transport ||
                    "Transportation"
                  }
                />

                <Facility
                  icon={Users}
                  text="Travel Assistance"
                />

              </div>

            </Section>

          </div>


          {/* BOOK / ENQUIRY */}

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
                Interested?
              </p>

              <h2 className="
                mt-2
                text-xl
                font-extrabold
                text-slate-900
              ">
                Plan This Journey
              </h2>

              <p className="
                mt-2
                text-sm
                leading-6
                text-slate-500
              ">
                Send your requirement to the travel
                agent and discuss the trip before booking.
              </p>


              <button
                onClick={() => setShowInquiry(true)}
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
                "
              >
                <MessageSquare size={18} />
                Send Enquiry
              </button>


              <div className="
                mt-5
                rounded-xl
                bg-slate-50
                p-4
              ">

                <p className="
                  text-xs
                  font-bold
                  text-slate-700
                ">
                  Why enquire first?
                </p>

                <ul className="
                  mt-2
                  space-y-2
                  text-xs
                  text-slate-500
                ">

                  <li>✓ Confirm availability</li>
                  <li>✓ Discuss vehicle options</li>
                  <li>✓ Confirm driver details</li>
                  <li>✓ Request custom requirements</li>
                  <li>✓ Finalize price before booking</li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* INQUIRY MODAL */}

      {showInquiry && (

        <div className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-slate-900/50
          p-4
        ">

          <div className="
            w-full
            max-w-lg
            rounded-2xl
            bg-white
            p-6
            shadow-xl
          ">

            <div className="
              flex
              items-start
              justify-between
              gap-4
            ">

              <div>

                <h2 className="
                  text-xl
                  font-extrabold
                  text-slate-900
                ">
                  Send Travel Enquiry
                </h2>

                <p className="
                  mt-1
                  text-sm
                  text-slate-500
                ">
                  Tell the agent about your travel requirement.
                </p>

              </div>

              <button
                onClick={() => setShowInquiry(false)}
                className="
                  text-2xl
                  text-slate-400
                  hover:text-slate-700
                "
              >
                ×
              </button>

            </div>


            <form
              onSubmit={submitInquiry}
              className="mt-6 space-y-4"
            >

              <div>

                <label className="
                  mb-1.5
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                ">
                  Number of Travellers
                </label>

                <input
                  required
                  type="number"
                  min="1"
                  value={inquiry.travelers}
                  onChange={(e) =>
                    setInquiry({
                      ...inquiry,
                      travelers: e.target.value,
                    })
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    py-3
                    text-sm
                    outline-none
                    focus:border-blue-400
                    focus:ring-2
                    focus:ring-blue-100
                  "
                  placeholder="Example: 4"
                />

              </div>


              <div>

                <label className="
                  mb-1.5
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                ">
                  Preferred Travel Date
                </label>

                <input
                  required
                  type="date"
                  value={inquiry.travel_date}
                  onChange={(e) =>
                    setInquiry({
                      ...inquiry,
                      travel_date: e.target.value,
                    })
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    py-3
                    text-sm
                    outline-none
                    focus:border-blue-400
                    focus:ring-2
                    focus:ring-blue-100
                  "
                />

              </div>


              <div>

                <label className="
                  mb-1.5
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                ">
                  Requirement
                </label>

                <textarea
                  rows="4"
                  value={inquiry.message}
                  onChange={(e) =>
                    setInquiry({
                      ...inquiry,
                      message: e.target.value,
                    })
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
                    outline-none
                    focus:border-blue-400
                    focus:ring-2
                    focus:ring-blue-100
                  "
                  placeholder="Tell us about hotel, bus, cab, train, pickup, special requirements..."
                />

              </div>


              <button
                disabled={submitting}
                type="submit"
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
                  hover:bg-blue-700
                  disabled:opacity-50
                "
              >
                {submitting
                  ? "Sending..."
                  : "Send Enquiry"}
                {!submitting && <ArrowRight size={17} />}
              </button>

            </form>

          </div>

        </div>

      )}

    </Layout>
  );
}


/* ==========================================
   SECTION
========================================== */

function Section({
  title,
  icon: Icon,
  children,
}) {
  return (
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
          <Icon size={19} />
        </div>

        <h2 className="
          text-lg
          font-bold
          text-slate-900
        ">
          {title}
        </h2>

      </div>

      <div className="mt-5">
        {children}
      </div>

    </div>
  );
}


/* ==========================================
   FACILITY
========================================== */

function Facility({
  icon: Icon,
  text,
}) {
  return (
    <div className="
      flex
      items-center
      gap-3
      rounded-xl
      bg-slate-50
      p-3
    ">

      <Icon
        size={18}
        className="text-blue-600"
      />

      <span className="
        text-sm
        font-medium
        text-slate-700
      ">
        {text}
      </span>

    </div>
  );
}