import { useEffect, useState } from "react";
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

    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px"
      }}
    >


      <h2>
        Lead List
      </h2>




      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "15px"
        }}
      >



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
              Action
            </th>


          </tr>

        </thead>





        <tbody>


          {
            leads.map((lead) => (


              <tr key={lead.id}>


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


                  <select

                    value={lead.status || "New"}

                    onChange={(e) =>
                      updateStatus(
                        lead.id,
                        e.target.value
                      )
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


                </td>







                <td style={tdStyle}>


                  {/* EDIT BUTTON */}

                  <button

                    onClick={() =>
                      setSelectedLead(lead)
                    }

                    style={editButton}

                  >

                    Edit

                  </button>





                  {/* DELETE BUTTON */}

                  <button

                    onClick={() =>
                      deleteLead(lead.id)
                    }

                    style={deleteButton}

                  >

                    Delete

                  </button>



                </td>




              </tr>


            ))

          }


        </tbody>


      </table>






      {
        leads.length === 0 &&

        <p style={{ marginTop: "20px" }}>

          No leads found

        </p>

      }




    </div>

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





const editButton = {

  padding: "6px 12px",
  marginRight: "8px",
  background: "green",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"

};





const deleteButton = {

  padding: "6px 12px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"

};