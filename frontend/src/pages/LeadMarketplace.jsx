import { useEffect, useMemo, useState } from "react";
import {
  Search,
  MapPin,
  CalendarDays,
  Users,
  WalletCards,
  CheckCircle2,
  Loader2,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

import { supabase } from "../services/supabase";
import Layout from "../components/layout/Layout";

export default function LeadMarketplace() {
  const [leads, setLeads] = useState([]);
  const [credits, setCredits] = useState(0);

  const [loading, setLoading] = useState(true);
  const [creditsLoading, setCreditsLoading] = useState(true);
  const [claimingLeadId, setClaimingLeadId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");

  useEffect(() => {
    loadMarketplace();
  }, []);

  // =========================================================
  // LOAD MARKETPLACE
  // =========================================================

  const loadMarketplace = async () => {
    await Promise.all([
      fetchQualifiedLeads(),
      fetchCredits(),
    ]);
  };

  // =========================================================
  // FETCH QUALIFIED LEADS
  // =========================================================

  const fetchQualifiedLeads = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("status", "Qualified")
        .is("agent_id", null)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      setLeads(data || []);
    } catch (error) {
      console.error("Marketplace Lead Error:", error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FETCH AGENT CREDITS
  // =========================================================

  const fetchCredits = async () => {
    try {
      setCreditsLoading(true);

      const {
        data: userData,
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      const user = userData?.user;

      if (!user) {
        setCredits(0);
        return;
      }

      // IMPORTANT:
      // lead_wallets is the live credit balance table.
      // user_id = logged-in agent
      // remaining_leads = available credits

      const {
        data,
        error,
      } = await supabase
        .from("lead_wallets")
        .select(
          "id, total_leads, used_leads, remaining_leads"
        )
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      setCredits(
        Number(data?.remaining_leads || 0)
      );
    } catch (error) {
      console.error(
        "Credit Loading Error:",
        error
      );

      setCredits(0);
    } finally {
      setCreditsLoading(false);
    }
  };

  // =========================================================
  // DESTINATIONS
  // =========================================================

  const destinations = useMemo(() => {
    return [
      ...new Set(
        leads
          .map((lead) => lead.destination)
          .filter(Boolean)
      ),
    ].sort();
  }, [leads]);

  // =========================================================
  // FILTER
  // =========================================================

  const filteredLeads = useMemo(() => {
    const keyword = searchTerm
      .toLowerCase()
      .trim();

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
          .includes(keyword) ||
        lead.service
          ?.toLowerCase()
          .includes(keyword);

      const matchesDestination =
        !destinationFilter ||
        lead.destination === destinationFilter;

      return (
        matchesSearch &&
        matchesDestination
      );
    });
  }, [
    leads,
    searchTerm,
    destinationFilter,
  ]);

  // =========================================================
  // CLAIM LEAD
  // =========================================================

  const claimLead = async (lead) => {
    if (claimingLeadId) {
      return;
    }

    try {
      setClaimingLeadId(lead.id);

      // -----------------------------------------------------
      // Check logged-in user
      // -----------------------------------------------------

      const {
        data: userData,
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      const user = userData?.user;

      if (!user) {
        alert("Please login as a travel agent.");
        return;
      }

      // -----------------------------------------------------
      // UI credit check
      // -----------------------------------------------------

      if (credits < 1) {
        alert(
          "You do not have enough lead credits. Please upgrade your plan."
        );

        return;
      }

      // -----------------------------------------------------
      // SECURE DATABASE RPC
      //
      // The RPC uses auth.uid().
      // Frontend does NOT send agent_id.
      // -----------------------------------------------------

      const {
        data,
        error,
      } = await supabase.rpc(
        "claim_lead",
        {
          p_lead_id: lead.id,
        }
      );

      if (error) {
        console.error(
          "Claim Lead RPC Error:",
          error
        );

        alert(
          error.message ||
            "Unable to claim this lead."
        );

        return;
      }

      console.log(
        "Lead Claim Result:",
        data
      );

      // -----------------------------------------------------
      // RPC returns JSONB
      //
      // Example:
      // {
      //   success: true,
      //   message: "Lead claimed successfully"
      // }
      // -----------------------------------------------------

      if (!data?.success) {
        alert(
          data?.message ||
            "Lead could not be claimed."
        );

        // Refresh because another agent may
        // have claimed it or credits may have changed.
        await Promise.all([
          fetchQualifiedLeads(),
          fetchCredits(),
        ]);

        return;
      }

      // -----------------------------------------------------
      // SUCCESS
      // -----------------------------------------------------

      setLeads((currentLeads) =>
        currentLeads.filter(
          (item) => item.id !== lead.id
        )
      );

      // Refresh wallet from database
      await fetchCredits();

      alert(
        data?.message ||
          "Lead claimed successfully!"
      );
    } catch (error) {
      console.error(
        "Claim Lead Error:",
        error
      );

      alert(
        error?.message ||
          "Something went wrong while claiming the lead."
      );
    } finally {
      setClaimingLeadId(null);
    }
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================================
  // FORMAT BUDGET
  // =========================================================

  const formatBudget = (budget) => {
    if (
      budget === null ||
      budget === undefined ||
      budget === ""
    ) {
      return "Budget not specified";
    }

    const numericBudget = Number(budget);

    if (Number.isNaN(numericBudget)) {
      return budget;
    }

    return `₹ ${numericBudget.toLocaleString(
      "en-IN"
    )}`;
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <Loader2
            size={32}
            className="mx-auto text-blue-600 animate-spin"
          />

          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 mt-5">
            Lead Marketplace
          </p>

          <h1 className="text-2xl font-bold text-slate-900 mt-2">
            Loading available leads...
          </h1>
        </div>
      </Layout>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <Layout>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600">
              Lead Marketplace
            </p>

            <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
              Qualified Travel Leads
            </h1>

            <p className="text-slate-500 mt-2 max-w-2xl">
              Discover qualified customer enquiries
              and grow your travel business with
              new opportunities.
            </p>
          </div>

          {/* =================================================
              CREDIT CARD
          ================================================= */}

          <div className="
            bg-white
            border
            border-slate-200
            rounded-2xl
            px-5
            py-4
            shadow-sm
            min-w-[220px]
          ">
            <div className="flex items-center justify-between gap-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Lead Credits
                </p>

                {creditsLoading ? (
                  <Loader2
                    size={22}
                    className="text-blue-600 animate-spin mt-2"
                  />
                ) : (
                  <p className="text-3xl font-extrabold text-blue-700 mt-1">
                    {credits}
                  </p>
                )}

                <p className="text-xs text-slate-400 mt-1">
                  1 credit = 1 lead
                </p>
              </div>

              <div className="
                w-11
                h-11
                rounded-xl
                bg-blue-50
                text-blue-600
                flex
                items-center
                justify-center
              ">
                <WalletCards size={21} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MARKETPLACE SUMMARY
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <MarketplaceStat
          label="Available Leads"
          value={filteredLeads.length}
          icon={<CheckCircle2 size={19} />}
        />

        <MarketplaceStat
          label="Lead Credit Balance"
          value={credits}
          icon={<WalletCards size={19} />}
        />

        <MarketplaceStat
          label="Cost Per Lead"
          value="1 Credit"
          icon={<ArrowRight size={19} />}
        />
      </div>

      {/* =====================================================
          FILTER BAR
      ===================================================== */}

      <div className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        p-5
        mb-8
        shadow-sm
      ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* SEARCH */}

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
              placeholder="Search destination, customer, service..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="
                w-full
                border border-slate-200
                bg-slate-50
                rounded-xl
                pl-11
                pr-4
                py-3
                text-sm
                outline-none
                focus:bg-white
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            />
          </div>

          {/* DESTINATION */}

          <select
            value={destinationFilter}
            onChange={(e) =>
              setDestinationFilter(
                e.target.value
              )
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

            {destinations.map(
              (destination) => (
                <option
                  key={destination}
                  value={destination}
                >
                  {destination}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* =====================================================
          NO LEADS
      ===================================================== */}

      {filteredLeads.length === 0 ? (
        <div className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          py-20
          text-center
          shadow-sm
        ">
          <CheckCircle2
            size={40}
            className="mx-auto text-slate-300"
          />

          <p className="text-lg font-semibold text-slate-700 mt-4">
            No qualified leads available
          </p>

          <p className="text-sm text-slate-400 mt-2">
            New qualified leads will appear
            here when they become marketplace-ready.
          </p>

          <button
            onClick={loadMarketplace}
            className="
              inline-flex
              items-center
              gap-2
              mt-6
              px-5
              py-2.5
              rounded-xl
              border
              border-slate-200
              bg-white
              hover:bg-slate-50
              text-sm
              font-semibold
              text-slate-700
              transition
            "
          >
            <RefreshCw size={16} />
            Refresh Marketplace
          </button>
        </div>
      ) : (
        /* ===================================================
           LEADS
        =================================================== */

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {filteredLeads.map((lead) => {
            const isClaiming =
              claimingLeadId === lead.id;

            return (
              <div
                key={lead.id}
                className="
                  bg-white
                  border
                  border-slate-200
                  rounded-2xl
                  p-6
                  shadow-sm
                  hover:shadow-md
                  hover:border-blue-200
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

                  <span className="
                    px-3
                    py-1
                    rounded-full
                    bg-emerald-50
                    text-emerald-700
                    border
                    border-emerald-100
                    text-xs
                    font-semibold
                  ">
                    Available
                  </span>
                </div>

                {/* DETAILS */}

                <div className="grid grid-cols-2 gap-5 mt-6">
                  <LeadDetail
                    icon={<Users size={15} />}
                    label="Customer"
                    value={
                      lead.customer_name || "-"
                    }
                  />

                  <LeadDetail
                    icon={<CalendarDays size={15} />}
                    label="Travel Date"
                    value={formatDate(
                      lead.travel_date
                    )}
                  />

                  <LeadDetail
                    icon={<Users size={15} />}
                    label="Travelers"
                    value={
                      lead.travelers ||
                      lead.passengers ||
                      "-"
                    }
                  />

                  <LeadDetail
                    icon={<WalletCards size={15} />}
                    label="Budget"
                    value={formatBudget(
                      lead.budget
                    )}
                  />

                  <LeadDetail
                    icon={<MapPin size={15} />}
                    label="Destination"
                    value={
                      lead.destination || "-"
                    }
                  />

                  <LeadDetail
                    icon={<CheckCircle2 size={15} />}
                    label="Created"
                    value={formatDate(
                      lead.created_at
                    )}
                  />
                </div>

                {/* SERVICE */}

                {lead.service && (
                  <div className="
                    mt-5
                    rounded-xl
                    bg-blue-50
                    border
                    border-blue-100
                    px-4
                    py-3
                  ">
                    <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide">
                      Service
                    </p>

                    <p className="text-sm font-bold text-blue-900 mt-1">
                      {lead.service}
                    </p>
                  </div>
                )}

                {/* NOTES */}

                {lead.notes && (
                  <div className="
                    mt-4
                    bg-slate-50
                    rounded-xl
                    p-4
                  ">
                    <p className="text-xs font-semibold text-slate-500 mb-1">
                      Requirement
                    </p>

                    <p className="text-sm text-slate-600 leading-6">
                      {lead.notes}
                    </p>
                  </div>
                )}

                {/* ACTION */}

                <div className="
                  mt-6
                  pt-5
                  border-t
                  border-slate-100
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-4
                ">
                  <div>
                    <p className="text-xs text-slate-400">
                      Claim cost
                    </p>

                    <p className="text-sm font-bold text-slate-800 mt-1">
                      1 Lead Credit
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      claimLead(lead)
                    }
                    disabled={
                      isClaiming ||
                      credits < 1 ||
                      creditsLoading
                    }
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      bg-blue-600
                      hover:bg-blue-700
                      disabled:bg-slate-300
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
                    {isClaiming ? (
                      <>
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />
                        Claiming...
                      </>
                    ) : credits < 1 ? (
                      "No Credits"
                    ) : (
                      <>
                        Claim Lead
                        <ArrowRight size={16} />
                      </>
                    )}
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

// ============================================================
// MARKETPLACE STAT
// ============================================================

function MarketplaceStat({
  label,
  value,
  icon,
}) {
  return (
    <div className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      p-5
      shadow-sm
    ">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="text-2xl font-extrabold text-slate-900 mt-2">
            {value}
          </p>
        </div>

        <div className="
          w-10
          h-10
          rounded-xl
          bg-blue-50
          text-blue-600
          flex
          items-center
          justify-center
        ">
          {icon}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// LEAD DETAIL
// ============================================================

function LeadDetail({
  icon,
  label,
  value,
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-slate-400">
        {icon}

        <p className="text-xs">
          {label}
        </p>
      </div>

      <p className="text-sm font-semibold text-slate-800 mt-1">
        {value}
      </p>
    </div>
  );
}