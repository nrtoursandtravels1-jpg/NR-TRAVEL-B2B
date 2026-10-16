import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import LeadForm from "../components/leads/LeadForm";
import LeadTable from "../components/leads/LeadTable";
import LeadSearch from "../components/leads/LeadSearch";
import LeadFilters from "../components/leads/LeadFilters";
import LeadStats from "../components/leads/LeadStats";
import BulkLeadUpload from "../components/leads/BulkLeadUpload";
import LeadDetails from "../components/leads/LeadDetails";

import { supabase } from "../services/supabase";

function Leads() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedLead, setSelectedLead] = useState(null);
  const [viewLead, setViewLead] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  // ==========================================
  // ADMIN: FETCH ALL LEADS
  // ==========================================

  const fetchLeads = async () => {
  try {
    setLoading(true);

    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    setLeads(data || []);
  } catch (error) {
    console.error("Lead Fetch Error:", error);
    setLeads([]);
  } finally {
    setLoading(false);
  }
};
  // ==========================================
  // SEARCH + FILTER
  // ==========================================

  const filteredLeads = leads.filter((lead) => {
    const keyword = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !keyword ||
      lead.customer_name?.toLowerCase().includes(keyword) ||
      lead.mobile?.toLowerCase().includes(keyword) ||
      lead.email?.toLowerCase().includes(keyword) ||
      lead.destination?.toLowerCase().includes(keyword) ||
      lead.source?.toLowerCase().includes(keyword) ||
      lead.lead_source?.toLowerCase().includes(keyword);

    const matchesStatus =
      statusFilter === "" ||
      lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <Layout>
        <div className="py-10 text-center">
          <h2 className="text-xl font-semibold text-slate-700">
            Loading Leads...
          </h2>

          <p className="text-sm text-slate-400 mt-2">
            Loading your lead management center.
          </p>
        </div>
      </Layout>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <Layout>

      {/* PAGE HEADER */}
      <div className="mb-8">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">

          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2">
              Lead Business
            </p>

            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Lead Management
            </h1>

            <p className="mt-2 text-slate-500">
              Capture, qualify and manage every travel enquiry from one
              central control center.
            </p>
          </div>

          <div className="text-sm text-slate-500">
            <span className="font-semibold text-slate-800">
              {leads.length}
            </span>{" "}
            total leads
          </div>

        </div>

      </div>

      {/* CREATE / EDIT LEAD */}
      <div className="mb-8">

        <LeadForm
          selectedLead={selectedLead}
          clearSelectedLead={() => setSelectedLead(null)}
          refreshLeads={fetchLeads}
        />

      </div>

      {/* BULK EXCEL */}
      <div className="mb-8">

        <BulkLeadUpload
          leads={filteredLeads}
        />

      </div>

      {/* SEARCH */}
      <div className="mb-6">

        <LeadSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

      </div>

      {/* FILTERS */}
      <div className="mb-6">

        <LeadFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

      </div>

      {/* STATS */}
      <div className="mb-8">

        <LeadStats
          leads={filteredLeads}
        />

      </div>

      {/* LEAD DIRECTORY */}
      <div>

        <LeadTable
          leads={filteredLeads}
          setSelectedLead={setViewLead}
          refreshLeads={fetchLeads}
        />

      </div>

      {/* DETAILS */}
      <LeadDetails
        lead={viewLead}
        onClose={() => setViewLead(null)}
        onEdit={(lead) => {
          setSelectedLead(lead);
          setViewLead(null);
        }}
      />

    </Layout>
  );
}

export default Leads;