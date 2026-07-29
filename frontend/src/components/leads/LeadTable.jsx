import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";


export default function LeadTable({ leads: propsLeads }) {


  const [leads,setLeads] = useState(
    propsLeads || []
  );


  useEffect(()=>{

    if(propsLeads){

      setLeads(propsLeads);

    }
    else{

      fetchLeads();

    }

  },[propsLeads]);





  const fetchLeads = async()=>{


    const {

      data:userData

    } = await supabase.auth.getUser();



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

      console.log(
        "Fetch Leads Error:",
        error
      );

      return;

    }


    setLeads(data);


  };





  const updateStatus = async(id,status)=>{


    const {

      error

    } = await supabase

    .from("leads")

    .update({

      status:status

    })

    .eq(
      "id",
      id
    );



    if(error){

      console.log(error);

      return;

    }



    setLeads(

      leads.map((lead)=>

        lead.id === id

        ?

        {
          ...lead,
          status:status
        }

        :

        lead

      )

    );


  };





  return (

    <div
      style={{
        background:"#fff",
        padding:"20px",
        borderRadius:"10px",
        marginTop:"20px"
      }}
    >


      <h2>
        Lead List
      </h2>



      <table
        style={{
          width:"100%",
          borderCollapse:"collapse",
          marginTop:"15px"
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
          leads.map((lead)=>(


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

                {lead.status}


              </td>



              <td style={tdStyle}>


                <select

                  value={lead.status || "new"}

                  onChange={(e)=>
                    updateStatus(
                      lead.id,
                      e.target.value
                    )
                  }

                >

                  <option value="new">
                    New
                  </option>


                  <option value="follow-up">
                    Follow-up
                  </option>


                  <option value="converted">
                    Converted
                  </option>


                  <option value="lost">
                    Lost
                  </option>


                </select>


              </td>



            </tr>


          ))

        }


        </tbody>


      </table>




      {
        leads.length === 0 &&

        <p style={{marginTop:"20px"}}>

          No leads found

        </p>

      }


    </div>

  );

}





const thStyle = {

  padding:"12px",

  background:"#2563eb",

  color:"#fff",

  textAlign:"left"

};



const tdStyle = {

  padding:"12px",

  borderBottom:"1px solid #ddd"

};