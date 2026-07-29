import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";


function Users(){

  const [agents,setAgents] = useState([]);

  const [loading,setLoading] = useState(true);



  useEffect(()=>{

    fetchAgents();

  },[]);




  const fetchAgents = async()=>{


    const {

      data,

      error

    } = await supabase

    .from("profiles")

    .select("*")

    .eq(
      "role",
      "b2b_agent"
    )

    .order(
      "created_at",
      {
        ascending:false
      }
    );



    if(error){

      console.log(error);

      return;

    }



    setAgents(data);

    setLoading(false);


  };





  const updateStatus = async(id,status)=>{


    const {

      error

    } = await supabase

    .from("profiles")

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



    fetchAgents();


  };





  if(loading){

    return (

      <h2 style={{padding:"30px"}}>

        Loading Agents...

      </h2>

    );

  }





  return (

    <div
      style={{
        padding:"30px"
      }}
    >


      <h1>
        B2B Agent Management
      </h1>


      <p>
        Manage registered travel partners
      </p>




      <table

      style={{

        width:"100%",

        marginTop:"30px",

        background:"#fff",

        color:"#000",

        borderCollapse:"collapse"

      }}

      >


        <thead>

          <tr>

            <th>
              Name
            </th>

            <th>
              Email
            </th>

            <th>
              Status
            </th>

            <th>
              Action
            </th>

          </tr>

        </thead>




        <tbody>


        {
          agents.map((agent)=>(


            <tr key={agent.id}>


              <td>
                {agent.full_name}
              </td>


              <td>
                {agent.email}
              </td>



              <td>
                {agent.status}
              </td>



              <td>


                {
                  agent.status === "active"

                  ?

                  <button

                  onClick={()=>updateStatus(
                    agent.id,
                    "inactive"
                  )}

                  >

                    Disable

                  </button>


                  :


                  <button

                  onClick={()=>updateStatus(
                    agent.id,
                    "active"
                  )}

                  >

                    Activate

                  </button>

                }


              </td>



            </tr>


          ))

        }


        </tbody>


      </table>



      {
        agents.length===0 &&

        <p>
          No B2B agents found
        </p>

      }



    </div>

  );

}


export default Users;