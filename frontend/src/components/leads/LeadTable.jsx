import { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import { supabase } from "../../services/supabase";


export default function LeadTable({
  leads: propsLeads,
  setSelectedLead,
  refreshLeads
}) {


  const [leads, setLeads] = useState(propsLeads || []);



  useEffect(() => {

    setLeads(propsLeads || []);

  }, [propsLeads]);





  // Update Lead Status

  const updateStatus = async (id, status) => {


    const { error } = await supabase

      .from("leads")

      .update({
        status: status
      })

      .eq("id", id);



    if (error) {

      console.log("Status Update Error:", error);

      return;

    }



    setLeads(

      leads.map((lead) =>

        lead.id === id

          ? {
              ...lead,
              status: status
            }

          : lead

      )

    );


  };







  // Delete Lead

  const deleteLead = async (id) => {


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );



    if (!confirmDelete) {

      return;

    }




    const { error } = await supabase

      .from("leads")

      .delete()

      .eq("id", id);




    if (error) {

      console.log(
        "Delete Error:",
        error
      );

      alert("Delete failed");

      return;

    }




    alert("Lead deleted successfully");



    if (refreshLeads) {

      refreshLeads();

    }


  };







return (

  <div className="bg-white rounded-2xl shadow-lg p-6 mt-5">

    <h2 className="text-2xl font-bold mb-5">
      📋 Lead List
    </h2>

    <div className="overflow-x-auto rounded-xl border border-slate-200">

     <table className="min-w-full w-full">

        
        <thead>

          <tr>

            <th style={thStyle}>
              Customer
            </th>


            <th style={thStyle}>
              Mobile
            </th>


            <th style={thStyle}>
              Email
            </th>


            <th style={thStyle}>
              Destination
            </th>


            <th style={thStyle}>
              Status
            </th>


            <th style={thStyle}>
              Quick Actions
            </th>


          </tr>

        </thead>





        <tbody>


          {
            leads.map((lead) => (


              <tr
              key={lead.id}
              className="hover:bg-slate-50 transition border-b border-slate-200"
              >

                <td style={tdStyle}>
                  {lead.customer_name}
                </td>



                <td style={tdStyle}>
                  {lead.mobile}
                </td>



                <td style={tdStyle}>
                  {lead.email}
                </td>



                <td style={tdStyle}>
                  {lead.destination}
                </td>





                <td style={tdStyle}>


                 
                 
                  <div className="flex flex-col gap-2">
                    
                  <StatusBadge status={lead.status || "New"} />

                  <select
                  className="border rounded-lg px-2 py-1 text-sm w-full"
                  value={lead.status || "New"}
                  onChange={(e) =>
                 updateStatus(lead.id, e.target.value)
               }
             >
                    <option value="New">
                      New
                    </option>


                    <option value="Contacted">
                      Contacted
                    </option>


                    <option value="Follow Up">
                      Follow Up
                    </option>


                    <option value="Booked">
                      Booked
                    </option>


                    <option value="Lost">
                      Lost
                    </option>


                  </select>
                  </div>


                </td>







                <td style={tdStyle}>


                  {/* EDIT BUTTON */}

                <div className="flex items-center gap-2">
               <button
                onClick={() => setSelectedLead(lead)}
                style={iconButton}
                title="Edit"
              >
               <Pencil size={16} />
             </button>

            <a
              href={`tel:${lead.mobile}`}
              style={iconButton}
               title="Call"
              >
               <Phone size={16} />
              </a>

            <a
             href={`mailto:${lead.email}`}
             style={iconButton}
            title="Email"
           >
            <Mail size={16} />
           </a>

           <a 
            href={`https://wa.me/91${lead.mobile}`}
            target="_blank"
            rel="noreferrer"
            style={iconButton}
            title="WhatsApp"
         >
          <MessageCircle size={16} />
        </a>

         <button
          onClick={() => deleteLead(lead.id)}
          style={deleteButton}
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>


                </td>




              </tr>


            ))

          }


        </tbody>

</table>

</div>

{
  leads.length === 0 && (
    <p className="mt-5 text-center text-slate-500">
      No leads found
    </p>
  )
}

</div>
    
  );

}







function StatusBadge({ status }) {
  const colors = {
    New: "bg-blue-100 text-blue-700",
    Contacted: "bg-yellow-100 text-yellow-700",
    "Follow Up": "bg-orange-100 text-orange-700",
    Booked: "bg-green-100 text-green-700",
    Lost: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

const thStyle = {

  padding: "12px",
  background: "#2563eb",
  color: "#fff",
  textAlign: "left"

};




const tdStyle = {

  padding: "12px",
  borderBottom: "1px solid #ddd"

};


const iconButton = {
  padding: "8px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#f1f5f9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
    transition: "0.3s",
};

const deleteButton = {

  padding: "8px",
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "0.3s",
};