import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";


function AdminDashboard(){

  const [stats,setStats] = useState({
    agents:0,
    subscriptions:0,
    leads:0
  });


  const [loading,setLoading] = useState(true);



  useEffect(()=>{

    loadStats();

  },[]);




  const loadStats = async()=>{


    try{


      const {count:agents}=await supabase

      .from("profiles")

      .select("*",
      {
        count:"exact",
        head:true
      })

      .eq(
        "role",
        "b2b_agent"
      );




      const {count:subscriptions}=await supabase

      .from("subscriptions")

      .select("*",
      {
        count:"exact",
        head:true
      })

      .eq(
        "status",
        "active"
      );





      const {count:leads}=await supabase

      .from("leads")

      .select("*",
      {
        count:"exact",
        head:true
      });





      setStats({

        agents:agents || 0,

        subscriptions:subscriptions || 0,

        leads:leads || 0

      });



    }
    catch(error){

      console.log(error);

    }
    finally{

      setLoading(false);

    }


  };





  if(loading){

    return (

      <h2 style={{padding:"30px"}}>
        Loading Admin Dashboard...
      </h2>

    );

  }




  return(

    <div
      style={{
        padding:"30px"
      }}
    >


      <h1>
        Admin Dashboard
      </h1>


      <p>
        Travel SaaS Platform Control Center
      </p>





      <div

      style={{

        display:"grid",

        gridTemplateColumns:
        "repeat(3,1fr)",

        gap:"20px",

        marginTop:"30px"

      }}

      >



        <Card
          title="B2B Agents"
          value={stats.agents}
        />



        <Card
          title="Active Subscriptions"
          value={stats.subscriptions}
        />



        <Card
          title="Total Leads"
          value={stats.leads}
        />


      </div>





      <div
        style={{
          marginTop:"40px"
        }}
      >

        <h2>
          Management
        </h2>


        <button
          onClick={()=>
            window.location.href="/admin/users"
          }
        >
          Manage Agents
        </button>



        <button
          style={{
            marginLeft:"15px"
          }}

          onClick={()=>
            window.location.href="/upgrade-plan"
          }
        >
          Manage Plans
        </button>



      </div>


    </div>

  );

}




function Card({title,value}){

  return(

    <div

    style={{

      background:"#fff",

      color:"#000",

      padding:"25px",

      borderRadius:"12px"

    }}

    >

      <h3>
        {title}
      </h3>

      <h1>
        {value}
      </h1>


    </div>

  );

}



export default AdminDashboard;