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

  const fetchLeads = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();

      const user = userData.user;

      if (!user) return;

      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("agent_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setLeads(data || []);
    } catch (error) {
      console.log("Lead Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const keyword = searchTerm.toLowerCase();

    const matchesSearch =
      lead.customer_name?.toLowerCase().includes(keyword) ||
      lead.mobile?.includes(keyword) ||
      lead.email?.toLowerCase().includes(keyword);

    const matchesStatus =
      statusFilter === "" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <Layout>
        <h2>Loading Leads...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">
        Lead Management
      </h1>

      <div className="mt-6">
        <LeadForm
          selectedLead={selectedLead}
          clearSelectedLead={() => setSelectedLead(null)}
          refreshLeads={fetchLeads}
        />
      </div>

      <div className="mt-6">
       <BulkLeadUpload leads={filteredLeads} />
      </div>

      <div className="mt-6">
        <LeadSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <LeadFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <LeadStats leads={filteredLeads} />

        <LeadTable
         leads={filteredLeads}
         setSelectedLead={setViewLead}
         refreshLeads={fetchLeads}
        />

        <LeadDetails
         lead={viewLead}
         onClose={() => setViewLead(null)}
         onEdit={(lead) => {
         setSelectedLead(lead);
         setViewLead(null);
         }}
        />
      </div>
    </Layout>
  );
}

export default Leads;