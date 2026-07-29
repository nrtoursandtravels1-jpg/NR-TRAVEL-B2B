import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import LeadSearch from "../components/leads/LeadSearch";
import LeadForm from "../components/leads/LeadForm";
import LeadTable from "../components/leads/LeadTable";
import BulkLeadUpload from "../components/leads/BulkLeadUpload";

import { supabase } from "../services/supabase";


function Leads() {

  const [searchTerm, setSearchTerm] = useState("");

  const [leads, setLeads] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedLead, setSelectedLead] = useState(null);



  useEffect(() => {

    fetchLeads();

  }, []);




  const fetchLeads = async () => {

    try {

      const { data:userData } = await supabase.auth.getUser();

      const user = userData.user;


      if(!user){
        return;
      }



      const {
        data,
        error
      } = await supabase

        .from("leads")

        .select("*")

        .eq(
          "agent_id",
          user.id
        )

        .order(
          "created_at",
          {
            ascending:false
          }
        );



      if(error){
        throw error;
      }


      setLeads(data || []);



    }
    catch(error){

      console.log(
        "Lead Fetch Error:",
        error
      );

    }
    finally{

      setLoading(false);

    }

  };





  const filteredLeads = leads.filter((lead)=>{


    const keyword = searchTerm.toLowerCase();



    return (

      lead.customer_name
      ?.toLowerCase()
      .includes(keyword)


      ||

      lead.mobile
      ?.includes(keyword)


      ||

      lead.email
      ?.toLowerCase()
      .includes(keyword)

    );


  });






  if(loading){

    return (

      <Layout>

        <h2>
          Loading Leads...
        </h2>

      </Layout>

    );

  }






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


        <LeadForm

          selectedLead={selectedLead}

          clearSelectedLead={() => setSelectedLead(null)}

          refreshLeads={fetchLeads}

        />


      </div>






     <div className="mt-6">

  <BulkLeadUpload />

</div>






      <div className="mt-6">


        <LeadTable

          leads={filteredLeads}

          setSelectedLead={setSelectedLead}

          refreshLeads={fetchLeads}

        />


      </div>




    </Layout>

  );

}


export default Leads;