import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";


function AgentDashboard() {


  const [agent,setAgent] = useState(null);

  const [subscription,setSubscription] = useState(null);

  const [stats,setStats] = useState({

    total:0,
    new:0,
    followup:0,
    converted:0,
    remaining:0

  });


  const [loading,setLoading] = useState(true);



  useEffect(()=>{

    loadDashboard();

  },[]);




  const loadDashboard = async()=>{


    try{


      const {
        data:userData
      } = await supabase.auth.getUser();



      const user = userData.user;



      if(!user){
        return;
      }




      // Profile

      const {
        data:profile
      } = await supabase

      .from("profiles")

      .select("*")

      .eq(
        "id",
        user.id
      )

      .single();



      setAgent(profile);






      // Subscription

      const {
        data:sub
      } = await supabase

      .from("subscriptions")

      .select(`
        *,
        subscription_plans(
          plan_name,
          lead_limit
        )
      `)

      .eq(
        "user_id",
        user.id
      )

      .order(
        "created_at",
        {
          ascending:false
        }
      )

      .limit(1)

      .single();



      setSubscription(sub);






      // Leads Count


      const {
        data:leads
      } = await supabase

      .from("leads")

      .select("status")

      .eq(
        "agent_id",
        user.id
      );




      const total = leads?.length || 0;



      const newLeads = leads?.filter(

        lead =>
        lead.status === "new"

      ).length || 0;




      const followup = leads?.filter(

        lead =>
        lead.status === "follow-up"

      ).length || 0;




      const converted = leads?.filter(

        lead =>
        lead.status === "converted"

      ).length || 0;





      // Lead Wallet


      const {
        data:wallet
      } = await supabase

      .from("lead_wallets")

      .select("*")

      .eq(
        "user_id",
        user.id
      )

      .single();




      setStats({

        total:total,

        new:newLeads,

        followup:followup,

        converted:converted,

        remaining:
        wallet?.remaining_leads || 0

      });



    }
    catch(error){

      console.log(
        "Dashboard Error:",
        error
      );

    }
    finally{

      setLoading(false);

    }


  };






  if(loading){

    return (

      <h2 style={{padding:"30px"}}>

        Loading Dashboard...

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
        Welcome {agent?.full_name}
      </h1>


      <p>
        B2B Travel Agent Dashboard
      </p>





      <div
        style={{
          display:"grid",
          gridTemplateColumns:
          "repeat(5,1fr)",
          gap:"20px",
          marginTop:"30px"
        }}
      >



        <Card
          title="Subscription"
          value={
            subscription
            ?.subscription_plans
            ?.plan_name
          }
        />



        <Card
          title="Lead Limit"
          value={
            subscription
            ?.subscription_plans
            ?.lead_limit
          }
        />



        <Card
          title="Total Leads"
          value={stats.total}
        />



        <Card
          title="Converted"
          value={stats.converted}
        />



        <Card
          title="Remaining Credits"
          value={stats.remaining}
        />



      </div>





      <div
        style={{
          marginTop:"40px"
        }}
      >


        <h2>
          Lead Pipeline
        </h2>


        <p>
          New Leads: {stats.new}
        </p>


        <p>
          Follow-ups: {stats.followup}
        </p>


        <p>
          Converted Leads: {stats.converted}
        </p>


      </div>






      <div
        style={{
          marginTop:"40px"
        }}
      >


        <button
          onClick={()=>
            window.location.href="/add-lead"
          }
        >
          + Add Lead
        </button>



        <button
          style={{
            marginLeft:"15px"
          }}

          onClick={()=>
            window.location.href="/leads"
          }
        >
          My Leads
        </button>



        <button
          style={{
            marginLeft:"15px"
          }}

          onClick={()=>
            window.location.href="/upgrade-plan"
          }
        >
          Upgrade Plan
        </button>



      </div>



    </div>

  );

}





function Card({title,value}){


  return (

    <div

      style={{

        background:"#fff",

        color:"#000",

        padding:"20px",

        borderRadius:"10px"

      }}

    >

      <h3>
        {title}
      </h3>


      <h2>
        {value || 0}
      </h2>


    </div>

  );

}



export default AgentDashboard;