import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  CalendarDays,
  Users,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Send,
  RefreshCw,
} from "lucide-react";

import Layout from "../../components/layout/Layout";
import { supabase } from "../../services/supabase";

export default function AgentRequirements() {
  const [requirements, setRequirements] = useState([]);
  const [filteredRequirements, setFilteredRequirements] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [selectedRequirement, setSelectedRequirement] =
    useState(null);

  const [response, setResponse] = useState("");
  const [responding, setResponding] = useState(false);

  useEffect(() => {
    loadRequirements();
  }, []);

  useEffect(() => {
    filterRequirements();
  }, [requirements, searchTerm, statusFilter]);

  async function loadRequirements() {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      /*
       * For now we load enquiries assigned to this agent.
       *
       * Later we will add the secure marketplace
       * routing function that automatically matches
       * customer requirements with relevant agents.
       */

      const { data, error } = await supabase
        .from("customer_inquiries")
        .select(`
          *,
          packages (
            id,
            package_name,
            destination,
            category,
            price
          )
        `)
        .eq("agent_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("Requirements Error:", error);
        return;
      }

      setRequirements(data || []);
    } catch (error) {
      console.error("Agent Requirements Error:", error);
    } finally {
      setLoading(false);
    }
  }

  function filterRequirements() {
    let result = [...requirements];

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();

      result = result.filter((item) => {
        const packageName =
          item.packages?.package_name || "";

        const destination =
          item.packages?.destination || "";

        const message =
          item.message || "";

        return (
          packageName.toLowerCase().includes(search) ||
          destination.toLowerCase().includes(search) ||
          message.toLowerCase().includes(search)
        );
      });
    }

    if (statusFilter !== "all") {
      result = result.filter(
        (item) => item.status === statusFilter
      );
    }

    setFilteredRequirements(result);
  }

  async function updateStatus(id, status) {
    try {
      const { error } = await supabase
        .from("customer_inquiries")
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      setRequirements((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                status,
              }
            : item
        )
      );

      if (selectedRequirement?.id === id) {
        setSelectedRequirement({
          ...selectedRequirement,
          status,
        });
      }
    } catch (error) {
      console.error("Status Update Error:", error);
      alert(error.message);
    }
  }

  async function sendResponse() {
    if (!selectedRequirement) return;

    if (!response.trim()) {
      alert("Please enter your response.");
      return;
    }

    try {
      setResponding(true);

      const { error } = await supabase
        .from("customer_inquiries")
        .update({
          agent_response: response.trim(),
          status: "responded",
          responded_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedRequirement.id);

      if (error) throw error;

      setRequirements((current) =>
        current.map((item) =>
          item.id === selectedRequirement.id
            ? {
                ...item,
                agent_response: response.trim(),
                status: "responded",
                responded_at: new Date().toISOString(),
              }
            : item
        )
      );

      setSelectedRequirement({
        ...selectedRequirement,
        agent_response: response.trim(),
        status: "responded",
      });

      setResponse("");

      alert("Response sent successfully.");
    } catch (error) {
      console.error("Response Error:", error);
      alert(error.message);
    } finally {
      setResponding(false);
    }
  }

  function getStatusLabel(status) {
    const labels = {
      new: "New",
      assigned: "Assigned",
      responded: "Responded",
      accepted: "Accepted",
      rejected: "Rejected",
      converted: "Converted",
      closed: "Closed",
    };

    return labels[status] || status;
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

  const counts = {
    all: requirements.length,
    new: requirements.filter(
      (item) => item.status === "new"
    ).length,
    assigned: requirements.filter(
      (item) => item.status === "assigned"
    ).length,
    responded: requirements.filter(
      (item) => item.status === "responded"
    ).length,
  };

  return (
    <Layout>
      <div className="p-6 lg:p-8">

        {/* HEADER */}

        <div className="mb-8">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <p className="
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-blue-600
              ">
                Agent CRM
              </p>

              <h1 className="
                mt-2
                text-3xl
                font-extrabold
                tracking-tight
                text-slate-900
              ">
                Customer Requirements
              </h1>

              <p className="
                mt-2
                text-sm
                text-slate-500
              ">
                View customer travel requirements and respond
                with your best offer.
              </p>

            </div>

            <button
              onClick={loadRequirements}
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

        </div>


        {/* STATS */}

        <div className="
          mb-6
          grid
          grid-cols-2
          gap-4
          lg:grid-cols-4
        ">

          <RequirementStat
            title="All"
            value={counts.all}
            active={statusFilter === "all"}
            onClick={() => setStatusFilter("all")}
          />

          <RequirementStat
            title="New"
            value={counts.new}
            active={statusFilter === "new"}
            onClick={() => setStatusFilter("new")}
          />

          <RequirementStat
            title="Assigned"
            value={counts.assigned}
            active={statusFilter === "assigned"}
            onClick={() => setStatusFilter("assigned")}
          />

          <RequirementStat
            title="Responded"
            value={counts.responded}
            active={statusFilter === "responded"}
            onClick={() => setStatusFilter("responded")}
          />

        </div>


        {/* SEARCH */}

        <div className="
          mb-6
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-4
          shadow-sm
        ">

          <div className="relative">

            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search destination, package or requirement..."
              className="
                h-11
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                pl-11
                pr-4
                text-sm
                outline-none
                focus:border-blue-400
                focus:bg-white
                focus:ring-2
                focus:ring-blue-100
              "
            />

          </div>

        </div>


        {/* REQUIREMENTS */}

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
                Loading customer requirements...
              </p>

            </div>

          </div>

        ) : filteredRequirements.length === 0 ? (

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
              size={42}
              className="mx-auto text-slate-300"
            />

            <h2 className="
              mt-4
              text-lg
              font-bold
              text-slate-800
            ">
              No customer requirements
            </h2>

            <p className="
              mt-2
              text-sm
              text-slate-500
            ">
              New relevant customer enquiries will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {filteredRequirements.map((item) => (

              <RequirementCard
                key={item.id}
                requirement={item}
                onView={() =>
                  setSelectedRequirement(item)
                }
                onAccept={() =>
                  updateStatus(item.id, "accepted")
                }
                onReject={() =>
                  updateStatus(item.id, "rejected")
                }
                getStatusLabel={getStatusLabel}
                getStatusClass={getStatusClass}
              />

            ))}

          </div>

        )}


        {/* DETAIL MODAL */}

        {selectedRequirement && (

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
              max-h-[90vh]
              w-full
              max-w-2xl
              overflow-y-auto
              rounded-2xl
              bg-white
              shadow-xl
            ">

              {/* MODAL HEADER */}

              <div className="
                sticky
                top-0
                z-10
                flex
                items-start
                justify-between
                gap-4
                border-b
                border-slate-100
                bg-white
                p-6
              ">

                <div>

                  <p className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    text-blue-600
                  ">
                    Customer Requirement
                  </p>

                  <h2 className="
                    mt-1
                    text-xl
                    font-extrabold
                    text-slate-900
                  ">
                    {selectedRequirement.packages?.package_name ||
                      "Travel Requirement"}
                  </h2>

                </div>

                <button
                  onClick={() =>
                    setSelectedRequirement(null)
                  }
                  className="
                    text-2xl
                    text-slate-400
                    hover:text-slate-700
                  "
                >
                  ×
                </button>

              </div>


              <div className="space-y-6 p-6">

                {/* TRIP INFO */}

                <div className="
                  grid
                  grid-cols-1
                  gap-3
                  sm:grid-cols-3
                ">

                  <DetailItem
                    icon={MapPin}
                    label="Destination"
                    value={
                      selectedRequirement.packages?.destination ||
                      "Not specified"
                    }
                  />

                  <DetailItem
                    icon={CalendarDays}
                    label="Travel Date"
                    value={
                      selectedRequirement.travel_date
                        ? new Date(
                            selectedRequirement.travel_date
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "Not specified"
                    }
                  />

                  <DetailItem
                    icon={Users}
                    label="Travellers"
                    value={
                      selectedRequirement.travelers ||
                      "Not specified"
                    }
                  />

                </div>


                {/* CUSTOMER MESSAGE */}

                <div>

                  <h3 className="
                    text-sm
                    font-bold
                    text-slate-800
                  ">
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
                      {selectedRequirement.message ||
                        "No additional requirement provided."}
                    </p>

                  </div>

                </div>


                {/* CURRENT RESPONSE */}

                {selectedRequirement.agent_response && (

                  <div>

                    <h3 className="
                      text-sm
                      font-bold
                      text-slate-800
                    ">
                      Your Response
                    </h3>

                    <div className="
                      mt-2
                      rounded-xl
                      bg-green-50
                      p-4
                    ">

                      <p className="
                        whitespace-pre-line
                        text-sm
                        leading-6
                        text-green-800
                      ">
                        {selectedRequirement.agent_response}
                      </p>

                    </div>

                  </div>

                )}


                {/* RESPONSE */}

                {selectedRequirement.status !== "closed" &&
                  selectedRequirement.status !== "rejected" && (
                    <div>

                      <h3 className="
                        text-sm
                        font-bold
                        text-slate-800
                      ">
                        Respond to Customer
                      </h3>

                      <textarea
                        rows="5"
                        value={response}
                        onChange={(e) =>
                          setResponse(e.target.value)
                        }
                        placeholder="Enter price, vehicle availability, hotel details, pickup details and any other offer..."
                        className="
                          mt-2
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
                      />

                      <button
                        onClick={sendResponse}
                        disabled={responding}
                        className="
                          mt-3
                          inline-flex
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
                        <Send size={17} />
                        {responding
                          ? "Sending..."
                          : "Send Response"}
                      </button>

                    </div>
                  )}

              </div>

            </div>

          </div>

        )}

      </div>
    </Layout>
  );
}


/* ==========================================
   REQUIREMENT CARD
========================================== */

function RequirementCard({
  requirement,
  onView,
  onAccept,
  onReject,
  getStatusLabel,
  getStatusClass,
}) {
  return (
    <div className="
      rounded-2xl
      border
      border-slate-200
      bg-white
      p-5
      shadow-sm
    ">

      <div className="
        flex
        flex-col
        gap-5
        lg:flex-row
        lg:items-center
        lg:justify-between
      ">

        <div className="min-w-0 flex-1">

          <div className="
            flex
            flex-wrap
            items-center
            gap-2
          ">

            <span className="
              text-xs
              font-bold
              uppercase
              tracking-wide
              text-blue-600
            ">
              Requirement #{requirement.id}
            </span>

            <span className={`
              rounded-full
              px-2.5
              py-1
              text-xs
              font-bold
              ${getStatusClass(requirement.status)}
            `}>
              {getStatusLabel(requirement.status)}
            </span>

          </div>


          <h2 className="
            mt-2
            text-lg
            font-extrabold
            text-slate-900
          ">
            {requirement.packages?.package_name ||
              "Travel Requirement"}
          </h2>


          <div className="
            mt-3
            flex
            flex-wrap
            gap-x-5
            gap-y-2
            text-sm
            text-slate-500
          ">

            <span className="
              inline-flex
              items-center
              gap-1.5
            ">
              <MapPin size={15} />
              {requirement.packages?.destination ||
                "Destination not specified"}
            </span>

            <span className="
              inline-flex
              items-center
              gap-1.5
            ">
              <CalendarDays size={15} />
              {requirement.travel_date
                ? new Date(
                    requirement.travel_date
                  ).toLocaleDateString("en-IN")
                : "Date not specified"}
            </span>

            <span className="
              inline-flex
              items-center
              gap-1.5
            ">
              <Users size={15} />
              {requirement.travelers || 1} travellers
            </span>

          </div>


          <p className="
            mt-3
            line-clamp-2
            text-sm
            text-slate-500
          ">
            {requirement.message ||
              "No additional requirement provided."}
          </p>

        </div>


        {/* ACTIONS */}

        <div className="
          flex
          shrink-0
          flex-wrap
          gap-2
        ">

          <button
            onClick={onView}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-700
              hover:bg-slate-50
            "
          >
            <Eye size={16} />
            View
          </button>


          {(requirement.status === "new" ||
            requirement.status === "assigned") && (

            <>
              <button
                onClick={onAccept}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-green-600
                  px-4
                  py-2.5
                  text-sm
                  font-bold
                  text-white
                  hover:bg-green-700
                "
              >
                <CheckCircle2 size={16} />
                Accept
              </button>

              <button
                onClick={onReject}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-red-50
                  px-4
                  py-2.5
                  text-sm
                  font-bold
                  text-red-600
                  hover:bg-red-100
                "
              >
                <XCircle size={16} />
                Reject
              </button>
            </>

          )}

        </div>

      </div>


      <div className="
        mt-4
        flex
        items-center
        gap-1.5
        text-xs
        text-slate-400
      ">
        <Clock size={13} />

        Received{" "}
        {requirement.created_at
          ? new Date(
              requirement.created_at
            ).toLocaleString("en-IN")
          : "recently"}
      </div>

    </div>
  );
}


/* ==========================================
   STAT
========================================== */

function RequirementStat({
  title,
  value,
  active,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-2xl
        border
        p-4
        text-left
        transition
        ${
          active
            ? "border-blue-200 bg-blue-50"
            : "border-slate-200 bg-white hover:border-blue-200"
        }
      `}
    >

      <p className="
        text-xs
        font-bold
        uppercase
        tracking-wide
        text-slate-400
      ">
        {title}
      </p>

      <p className="
        mt-2
        text-2xl
        font-extrabold
        text-slate-900
      ">
        {value}
      </p>

    </button>
  );
}


/* ==========================================
   DETAIL ITEM
========================================== */

function DetailItem({
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
        <Icon size={16} />

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