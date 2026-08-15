import { useEffect, useMemo, useState } from "react";
import { supabase } from "../services/supabase";
import Layout from "../components/layout/Layout";

export default function LeadMarketplace() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claimingLeadId, setClaimingLeadId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");

  useEffect(() => {
    fetchQualifiedLeads();
  }, []);

  // ==========================================
  // FETCH QUALIFIED LEADS
  // ==========================================

  const fetchQualifiedLeads = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("status", "Qualified")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      setLeads(data || []);
    } catch (error) {
      console.error("Marketplace Lead Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // DESTINATIONS
  // ==========================================

  const destinations = useMemo(() => {
    return [
      ...new Set(
        leads
          .map((lead) => lead.destination)
          .filter(Boolean)
      ),
    ];
  }, [leads]);

  // ==========================================
  // FILTER
  // ==========================================

  const filteredLeads = useMemo(() => {
    const keyword = searchTerm.toLowerCase().trim();

    return leads.filter((lead) => {
      const matchesSearch =
        !keyword ||
        lead.customer_name
          ?.toLowerCase()
          .includes(keyword) ||
        lead.destination
          ?.toLowerCase()
          .includes(keyword) ||
        lead.lead_source
          ?.toLowerCase()
          .includes(keyword);

      const matchesDestination =
        !destinationFilter ||
        lead.destination === destinationFilter;

      return matchesSearch && matchesDestination;
    });
  }, [
    leads,
    searchTerm,
    destinationFilter,
  ]);

  // ==========================================
  // CLAIM LEAD
  // ==========================================

  const claimLead = async (lead) => {
    try {
      setClaimingLeadId(lead.id);

      // Check logged-in user
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      const user = userData?.user;

      if (!user) {
        alert("Please login as an agent.");
        return;
      }

      // Call secure Supabase transaction
      const { data, error } = await supabase.rpc(
        "claim_lead",
        {
          p_lead_id: lead.id,
        }
      );

      if (error) {
        console.error("Claim Lead Error:", error);

        alert(
          error.message ||
            "Unable to claim this lead."
        );

        return;
      }

      console.log("Claim Result:", data);

      alert("Lead claimed successfully.");

      // Remove claimed lead from marketplace
      setLeads((currentLeads) =>
        currentLeads.filter(
          (item) => item.id !== lead.id
        )
      );
    } catch (error) {
      console.error(
        "Claim Lead Error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong while claiming the lead."
      );
    } finally {
      setClaimingLeadId(null);
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // FORMAT BUDGET
  // ==========================================

  const formatBudget = (budget) => {
    if (!budget) {
      return "Budget not specified";
    }

    return `₹ ${Number(
      budget
    ).toLocaleString("en-IN")}`;
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <Layout>
        <div className="py-16 text-center">
          <p className="text-sm font-semibold text-blue-600">
            LEAD MARKETPLACE
          </p>

          <h1 className="text-2xl font-bold text-slate-900 mt-2">
            Loading available leads...
          </h1>
        </div>
      </Layout>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <Layout>
      {/* HEADER */}
      <div className="mb-8">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
          Lead Marketplace
        </p>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mt-2">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Qualified Travel Leads
            </h1>

            <p className="text-slate-500 mt-2">
              Discover qualified customer enquiries
              and connect with new business opportunities.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-3">
            <p className="text-xs text-blue-500 font-semibold">
              AVAILABLE LEADS
            </p>

            <p className="text-2xl font-extrabold text-blue-700">
              {filteredLeads.length}
            </p>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search customer, destination or source..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="
              w-full
              border border-slate-200
              bg-slate-50
              rounded-xl
              px-4
              py-3
              text-sm
              outline-none
              focus:bg-white
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />

          {/* DESTINATION */}
          <select
            value={destinationFilter}
            onChange={(e) =>
              setDestinationFilter(e.target.value)
            }
            className="
              w-full
              border border-slate-200
              bg-slate-50
              rounded-xl
              px-4
              py-3
              text-sm
              outline-none
              focus:bg-white
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          >
            <option value="">
              All Destinations
            </option>

            {destinations.map((destination) => (
              <option
                key={destination}
                value={destination}
              >
                {destination}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* LEADS */}
      {filteredLeads.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl py-16 text-center">
          <p className="text-lg font-semibold text-slate-700">
            No qualified leads available
          </p>

          <p className="text-sm text-slate-400 mt-2">
            Qualified leads will appear here
            when they become marketplace-ready.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {filteredLeads.map((lead) => {
            const isClaiming =
              claimingLeadId === lead.id;

            return (
              <div
                key={lead.id}
                className="
                  bg-white
                  border border-slate-200
                  rounded-2xl
                  p-6
                  shadow-sm
                  hover:shadow-md
                  transition
                "
              >
                {/* TOP */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                      Qualified Lead
                    </p>

                    <h2 className="text-xl font-bold text-slate-900 mt-1">
                      {lead.destination ||
                        "Travel Enquiry"}
                    </h2>
                  </div>

                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-emerald-50
                      text-emerald-700
                      border border-emerald-100
                      text-xs
                      font-semibold
                    "
                  >
                    Available
                  </span>
                </div>

                {/* DETAILS */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <p className="text-xs text-slate-400">
                      Customer
                    </p>

                    <p className="text-sm font-semibold text-slate-800 mt-1">
                      {lead.customer_name || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Travel Date
                    </p>

                    <p className="text-sm font-semibold text-slate-800 mt-1">
                      {formatDate(
                        lead.travel_date
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Travelers
                    </p>

                    <p className="text-sm font-semibold text-slate-800 mt-1">
                      {lead.travelers || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Budget
                    </p>

                    <p className="text-sm font-semibold text-slate-800 mt-1">
                      {formatBudget(lead.budget)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Lead Source
                    </p>

                    <p className="text-sm font-semibold text-slate-800 mt-1 capitalize">
                      {(
                        lead.lead_source ||
                        "Unknown"
                      ).replaceAll("_", " ")}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Created
                    </p>

                    <p className="text-sm font-semibold text-slate-800 mt-1">
                      {formatDate(
                        lead.created_at
                      )}
                    </p>
                  </div>
                </div>

                {/* NOTES */}
                {lead.notes && (
                  <div
                    className="
                      mt-5
                      bg-slate-50
                      rounded-xl
                      p-4
                    "
                  >
                    <p className="text-xs font-semibold text-slate-500 mb-1">
                      Requirement
                    </p>

                    <p className="text-sm text-slate-600">
                      {lead.notes}
                    </p>
                  </div>
                )}

                {/* ACTION */}
                <div
                  className="
                    mt-6
                    pt-5
                    border-t
                    border-slate-100
                    flex
                    justify-end
                  "
                >
                  <button
                    onClick={() => claimLead(lead)}
                    disabled={isClaiming}
                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      disabled:bg-blue-300
                      disabled:cursor-not-allowed
                      text-white
                      px-6
                      py-3
                      rounded-xl
                      text-sm
                      font-semibold
                      transition
                    "
                  >
                    {isClaiming
                      ? "Claiming..."
                      : "Claim Lead"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}