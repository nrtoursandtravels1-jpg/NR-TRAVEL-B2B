import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";


function UpgradePlan() {

  const [plans, setPlans] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    loadData();

  }, []);




  const loadData = async () => {

    try {

      const {
        data:userData
      } = await supabase.auth.getUser();


      const user = userData.user;


      if(!user){
        return;
      }



      // Check current subscription

      const {
        data:subData
      } = await supabase

      .from("subscriptions")

      .select(`
        *,
        subscription_plans (
          plan_name,
          lead_limit
        )
      `)

      .eq(
        "user_id",
        user.id
      )

      .eq(
        "status",
        "active"
      )

      .maybeSingle();



      setSubscription(subData);



      // Load plans

      const {
        data:planData,
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



      setPlans(planData);



    }
    catch(error){

      console.log(error);

    }
    finally{

      setLoading(false);

    }

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

        start_date:startDate,

        end_date:endDate

      });



      if(error){

        throw error;

      }



      alert(
        "Plan Activated Successfully"
      );


      window.location.reload();



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


      {
        subscription ?


        (

          <>

          <h1>
            Current Plan
          </h1>


          <p>
            Plan:
            {" "}
            {subscription.subscription_plans?.plan_name}
          </p>


          <p>
            Lead Limit:
            {" "}
            {subscription.subscription_plans?.lead_limit}
          </p>


          <p>
            Status:
            {" "}
            {subscription.status}
          </p>


          </>


        )


        :


        (

          <>

          <h1>
            Choose Subscription Plan
          </h1>


          <p>
            Select a plan to continue using CRM.
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


          </>

        )


      }



    </div>

  );

}



export default UpgradePlan;