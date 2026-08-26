import { useEffect, useState } from "react";
import {
  CalendarDays,
  MessageSquare,
  MapPin,
  RefreshCw,
  Send,
  Users,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";

export default function AgentInquiries() {
  const navigate = useNavigate();

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInquiries();
  }, []);

  async function loadInquiries() {
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
            image_url
          )
        `)
        .eq("agent_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) throw error;

      setInquiries(data || []);
    } catch (error) {
      console.error("Agent Inquiries Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function statusClass(status) {
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

  function statusLabel(status) {
    const labels = {
      new: "New",
      assigned: "Assigned",
      responded: "Responded",
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
              Customer Enquiries
            </h1>

            <p className="
              mt-2
              text-sm
              text-slate-500
            ">
              Review customer travel requirements and respond.
            </p>

          </div>

          <button
            onClick={loadInquiries}
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
                Loading customer enquiries...
              </p>

            </div>

          </div>

        ) : inquiries.length === 0 ? (

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
              No customer enquiries
            </h2>

            <p className="
              mt-2
              text-sm
              text-slate-500
            ">
              New customer requirements assigned to you
              will appear here.
            </p>

          </div>

        ) : (

          /* LIST */

          <div className="space-y-5">

            {inquiries.map((inquiry) => (

              <InquiryCard
                key={inquiry.id}
                inquiry={inquiry}
                statusClass={statusClass}
                statusLabel={statusLabel}
                onRespond={() =>
                  navigate(
                    `/agent/inquiries/${inquiry.id}`
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
   INQUIRY CARD
========================================== */

function InquiryCard({
  inquiry,
  statusClass,
  statusLabel,
  onRespond,
}) {
  const packageData = inquiry.packages;

  return (
    <div className="
      overflow-hidden
      rounded-2xl
      border
      border-slate-200
      bg-white
      shadow-sm
    ">

      {/* HEADER */}

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

        <div>

          <h2 className="
            text-lg
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

        <span className={`
          inline-flex
          w-fit
          rounded-full
          px-3
          py-1.5
          text-xs
          font-bold
          ${statusClass(inquiry.status)}
        `}>
          {statusLabel(inquiry.status)}
        </span>

      </div>


      <div className="p-5">

        {/* TRIP DATA */}

        <div className="
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-3
        ">

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
              inquiry.travelers || "Not specified"
            }
          />

          <Info
            icon={MessageSquare}
            label="Inquiry ID"
            value={`#${inquiry.id}`}
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
            Customer Requirement
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
              {inquiry.message ||
                "No additional requirement provided."}
            </p>

          </div>

        </div>


        {/* EXISTING RESPONSE */}

        {inquiry.agent_response && (

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
              Your Response
            </div>

            <p className="
              mt-2
              whitespace-pre-line
              text-sm
              leading-6
              text-green-900
            ">
              {inquiry.agent_response}
            </p>

          </div>

        )}


        {/* ACTION */}

        <div className="
          mt-5
          flex
          justify-end
          border-t
          border-slate-100
          pt-5
        ">

          <button
            onClick={onRespond}
            className="
              inline-flex
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
            <Send size={16} />
            {inquiry.agent_response
              ? "Update Response"
              : "Respond"}
            <ArrowRight size={16} />
          </button>

        </div>

      </div>

    </div>
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