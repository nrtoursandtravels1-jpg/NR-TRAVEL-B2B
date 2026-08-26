import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  MessageSquare,
  RefreshCw,
  Send,
  UserRound,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";

export default function MyEnquiries() {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnquiries();
  }, []);

  async function loadEnquiries() {
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
        .eq("customer_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      setEnquiries(data || []);
    } catch (error) {
      console.error("My Enquiries Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function getStatusClass(status) {
    const classes = {
      new: "bg-blue-50 text-blue-700",
      assigned: "bg-amber-50 text-amber-700",
      responded: "bg-green-50 text-green-700",
      accepted: "bg-green-50 text-green-700",
      rejected: "bg-red-50 text-red-700",
      converted: "bg-purple-50 text-purple-700",
      closed: "bg-slate-100 text-slate-600",
    };

    return classes[status] || "bg-slate-100 text-slate-600";
  }

  function getStatusLabel(status) {
    const labels = {
      new: "New",
      assigned: "Agent Assigned",
      responded: "Agent Responded",
      accepted: "Accepted",
      rejected: "Rejected",
      converted: "Booking Created",
      closed: "Closed",
    };

    return labels[status] || status || "Pending";
  }

  return (
    <Layout>
      <div className="p-6 lg:p-8">

        {/* HEADER */}

        <div className="
          mb-8
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-end
          lg:justify-between
        ">

          <div>

            <button
              onClick={() => navigate("/customer/dashboard")}
              className="
                mb-4
                inline-flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-slate-500
                hover:text-blue-600
              "
            >
              <ArrowLeft size={16} />
              Dashboard
            </button>

            <p className="
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              text-blue-600
            ">
              Customer Portal
            </p>

            <h1 className="
              mt-2
              text-3xl
              font-extrabold
              text-slate-900
            ">
              My Enquiries
            </h1>

            <p className="
              mt-2
              text-sm
              text-slate-500
            ">
              Track your travel requirements and agent responses.
            </p>

          </div>

          <button
            onClick={loadEnquiries}
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


        {/* LOADING */}

        {loading ? (

          <div className="
            flex
            min-h-[400px]
            items-center
            justify-center
            rounded-2xl
            border
            border-slate-200
            bg-white
          ">

            <div className="text-center">

              <div className="
                mx-auto
                h-10
                w-10
                animate-spin
                rounded-full
                border-4
                border-slate-200
                border-t-blue-600
              " />

              <p className="
                mt-4
                text-sm
                text-slate-500
              ">
                Loading your enquiries...
              </p>

            </div>

          </div>

        ) : enquiries.length === 0 ? (

          /* EMPTY */

          <div className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-6
            py-16
            text-center
            shadow-sm
          ">

            <MessageSquare
              size={45}
              className="mx-auto text-slate-300"
            />

            <h2 className="
              mt-4
              text-xl
              font-bold
              text-slate-800
            ">
              No enquiries yet
            </h2>

            <p className="
              mx-auto
              mt-2
              max-w-md
              text-sm
              leading-6
              text-slate-500
            ">
              Explore travel packages and send an enquiry
              when you find a journey you like.
            </p>

            <button
              onClick={() => navigate("/customer/packages")}
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
            </button>

          </div>

        ) : (

          /* ENQUIRY LIST */

          <div className="space-y-5">

            {enquiries.map((enquiry) => (

             <EnquiryCard
  key={enquiry.id}
  enquiry={enquiry}
  getStatusClass={getStatusClass}
  getStatusLabel={getStatusLabel}
  onViewPackage={() =>
    navigate(
      `/customer/packages/${enquiry.package_id}`
    )
  }
  onAccept={() =>
    navigate(
      `/customer/enquiries/${enquiry.id}/accept`
    )
  }
/>
            ))}

          </div>

        )}

      </div>
    </Layout>
  );
}


/* ==========================================
   ENQUIRY CARD
========================================== */

function EnquiryCard({
  enquiry,
  getStatusClass,
  getStatusLabel,
  onViewPackage,
  onAccept,
}) {
  const packageData = enquiry.packages;

  return (
    <div className="
      overflow-hidden
      rounded-2xl
      border
      border-slate-200
      bg-white
      shadow-sm
    ">

      {/* PACKAGE HEADER */}

      <div className="
        flex
        flex-col
        gap-4
        border-b
        border-slate-100
        p-5
        sm:flex-row
        sm:items-center
        sm:justify-between
      ">

        <div className="flex items-center gap-4">

          <div className="
            h-16
            w-20
            shrink-0
            overflow-hidden
            rounded-xl
            bg-slate-100
          ">

            {packageData?.image_url ? (
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

            <h2 className="
              font-bold
              text-slate-900
            ">
              {packageData?.package_name ||
                "Travel Package"}
            </h2>

            <p className="
              mt-1
              flex
              items-center
              gap-1.5
              text-sm
              text-slate-500
            ">
              <MapPin size={14} />
              {packageData?.destination ||
                "Destination"}
            </p>

          </div>

        </div>


        <span className={`
          inline-flex
          w-fit
          rounded-full
          px-3
          py-1.5
          text-xs
          font-bold
          ${getStatusClass(enquiry.status)}
        `}>
          {getStatusLabel(enquiry.status)}
        </span>

      </div>


      <div className="p-5">

        {/* TRIP INFORMATION */}

        <div className="
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-3
        ">

          <InfoItem
            icon={CalendarDays}
            label="Travel Date"
            value={
              enquiry.travel_date
                ? new Date(
                    enquiry.travel_date
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Not specified"
            }
          />

          <InfoItem
            icon={Users}
            label="Travellers"
            value={
              enquiry.travelers ||
              "Not specified"
            }
          />

          <InfoItem
            icon={Clock}
            label="Enquiry Sent"
            value={
              enquiry.created_at
                ? new Date(
                    enquiry.created_at
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })
                : "Recently"
            }
          />

        </div>


        {/* CUSTOMER REQUIREMENT */}

        <div className="mt-5">

          <h3 className="
            flex
            items-center
            gap-2
            text-sm
            font-bold
            text-slate-800
          ">
            <MessageSquare
              size={16}
              className="text-blue-600"
            />
            My Requirement
          </h3>

          <div className="
            mt-2
            rounded-xl
            bg-slate-50
            p-4
          ">

            <p className="
              whitespace-pre-line
              text-sm
              leading-6
              text-slate-600
            ">
              {enquiry.message ||
                "No additional requirement provided."}
            </p>

          </div>

        </div>


        {/* AGENT */}

        <div className="
          mt-5
          rounded-xl
          border
          border-blue-100
          bg-blue-50/50
          p-4
        ">

          <div className="
            flex
            items-center
            gap-2
            text-sm
            font-bold
            text-slate-800
          ">

            <UserRound
              size={17}
              className="text-blue-600"
            />

            Travel Agent

          </div>

          {enquiry.agent_id ? (

            <p className="
              mt-2
              text-sm
              text-slate-600
            ">
              Your requirement has been assigned to a
              travel agent.
            </p>

          ) : (

            <p className="
              mt-2
              text-sm
              text-slate-500
            ">
              Finding a suitable travel agent...
            </p>

          )}

        </div>


        {/* AGENT RESPONSE */}

        {enquiry.agent_response ? (

          <div className="
            mt-5
            rounded-xl
            border
            border-green-100
            bg-green-50
            p-4
          ">

            <div className="
              flex
              items-center
              gap-2
              text-sm
              font-bold
              text-green-800
            ">

              <Send size={16} />

              Agent Response

            </div>

            <p className="
              mt-2
              whitespace-pre-line
              text-sm
              leading-6
              text-green-900
            ">
              {enquiry.agent_response}
            </p>

          </div>

        ) : (

          <div className="
            mt-5
            rounded-xl
            bg-amber-50
            p-4
          ">

            <p className="
              text-sm
              font-semibold
              text-amber-800
            ">
              Waiting for agent response
            </p>

            <p className="
              mt-1
              text-xs
              text-amber-700
            ">
              The travel agent will review your requirement
              and respond with availability and pricing.
            </p>

          </div>

        )}


              {/* FOOTER */}

        <div
          className="
            mt-5
            flex
            flex-col
            gap-3
            border-t
            border-slate-100
            pt-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          {/* ENQUIRY ID */}

          <p
            className="
              text-xs
              text-slate-400
            "
          >
            Enquiry #{enquiry.id}
          </p>


          {/* ACTIONS */}

          <div
            className="
              flex
              flex-col
              gap-2
              sm:flex-row
            "
          >

            {/* VIEW PACKAGE */}

            <button
              type="button"
              onClick={onViewPackage}
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
                transition
                hover:border-blue-200
                hover:bg-blue-50
                hover:text-blue-700
              "
            >
              <MapPin size={16} />
              View Package
            </button>


            {/* ACCEPT & PROCEED */}

            {enquiry.agent_response &&
              enquiry.status !== "converted" &&
              enquiry.status !== "closed" && (

                <button
                  type="button"
                  onClick={onAccept}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-2.5
                    text-sm
                    font-bold
                    text-white
                    transition
                    hover:bg-blue-700
                  "
                >
                  Accept & Proceed
                  <ArrowRight size={16} />
                </button>

              )}

          </div>

        </div>

      </div>
    </div>
  );
}


/* ==========================================
   INFO ITEM
========================================== */

function InfoItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="
      rounded-xl
      bg-slate-50
      p-4
    ">

      <div className="
        flex
        items-center
        gap-2
        text-blue-600
      ">

        <Icon size={15} />

        <span className="
          text-xs
          font-bold
          uppercase
          tracking-wide
        ">
          {label}
        </span>

      </div>

      <p className="
        mt-2
        text-sm
        font-bold
        text-slate-800
      ">
        {value}
      </p>

    </div>
  );
}