import { useState } from "react";

import Layout from "../components/layout/Layout";
import LeadSearch from "../components/leads/LeadSearch";
import LeadForm from "../components/leads/LeadForm";
import LeadTable from "../components/leads/LeadTable";

function Leads() {
  const [searchTerm, setSearchTerm] = useState("");

  const leads = [
    {
      id: 1,
      name: "Rahul Sharma",
      phone: "9876543210",
      email: "rahul@gmail.com",
      status: "New",
    },
    {
      id: 2,
      name: "Priya Patel",
      phone: "9876501234",
      email: "priya@gmail.com",
      status: "Follow-up",
    },
  ];

  const filteredLeads = leads.filter((lead) => {
    const keyword = searchTerm.toLowerCase();

    return (
      lead.name.toLowerCase().includes(keyword) ||
      lead.phone.includes(keyword) ||
      lead.email.toLowerCase().includes(keyword)
    );
  });

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">
        Lead Management
      </h1>

      <LeadSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="mt-6">
        <LeadForm />
      </div>

      <div className="mt-6">
        <LeadTable leads={filteredLeads} />
      </div>
    </Layout>
  );
}

export default Leads;