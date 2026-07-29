import { useState } from "react";
import LeadSearch from "./LeadSearch";
import LeadForm from "./LeadForm";
import LeadTable from "./LeadTable";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lead Management</h1>

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
    </div>
  );
}

export default Leads;