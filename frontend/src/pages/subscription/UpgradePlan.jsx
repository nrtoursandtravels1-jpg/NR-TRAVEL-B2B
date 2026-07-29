import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";


function UpgradePlan() {


  const [plans, setPlans] = useState([]);
  const [loading,setLoading] = useState(true);



  useEffect(()=>{

    fetchPlans();

  },[]);




  const fetchPlans = async()=>{


    const {
      data,
      error
    } = await supabase

    .from("subscription_plans")

    .select("*")

    .order(
      "created_at",
      {
        ascending:true
      }
    );



    if(error){

      console.log(error);

      return;

    }



    setPlans(data);

    setLoading(false);


  };






  const choosePlan = async(plan)=>{


    try{


      const {
        data:userData
      } = await supabase.auth.getUser();



      const user = userData.user;



      if(!user){

        alert(
          "Please login first"
        );

        return;

      }




      // Create Subscription


      const startDate = new Date();


      const endDate = new Date();



      endDate.setMonth(

        endDate.getMonth()+1

      );



      const {
        error
      } = await supabase

      .from("subscriptions")

      .insert({


        user_id:user.id,


        plan_id:plan.id,


        status:"active",


        start_date:
        startDate,


        end_date:
        endDate


      });




      if(error){

        throw error;

      }





      // Create Lead Wallet


      await supabase

      .from("lead_wallets")

      .insert({


        user_id:user.id,


        total_leads:
        plan.lead_limit,


        used_leads:0,


        remaining_leads:
        plan.lead_limit


      });





      alert(
        "Plan Activated Successfully"
      );



      window.location.href="/agent-dashboard";



    }
    catch(error){


      console.log(error);


      alert(error.message);


    }


  };







  if(loading){

    return (

      <h2 style={{padding:"40px"}}>

        Loading Plans...

      </h2>

    );

  }






  return (

    <div
      style={{
        padding:"40px"
      }}
    >


      <h1>
        Your Trial Expired
      </h1>


      <p>
        Choose your subscription plan
        to continue using the platform.
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



      {
        plans.map((plan)=>(


          <div

            key={plan.id}

            style={{

              background:"#fff",

              color:"#000",

              padding:"25px",

              borderRadius:"12px"

            }}

          >


            <h2>
              {plan.plan_name}
            </h2>


            <h3>
              Leads:
              {" "}
              {plan.lead_limit}
            </h3>



            <button

              onClick={()=>
                choosePlan(plan)
              }

            >

              Select Plan

            </button>


          </div>


        ))

      }


      </div>


    </div>

  );


}


export default UpgradePlan;