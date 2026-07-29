import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

function UpgradePlan() {

  const [plans, setPlans] = useState([]);


  const fetchPlans = async () => {

    const { data, error } = await supabase
      .from("subscription_plans")
      .select("*")
      .eq("status", "active")
      .neq("duration_type", "trial")
      .order("price", { ascending: true });


    if(error){
      console.log("Plan Error:", error);
      return;
    }


    setPlans(data);

  };


  useEffect(() => {
    fetchPlans();
  }, []);



  return (

    <div
      style={{
        minHeight:"100vh",
        padding:"50px",
        background:"#0f172a",
        color:"white"
      }}
    >

      <h1 style={{textAlign:"center"}}>
        Your Trial Expired
      </h1>


      <p
        style={{
          textAlign:"center",
          fontSize:"18px"
        }}
      >
        Choose a subscription plan to continue using the platform.
      </p>



      <div
        style={{
          display:"grid",
          gridTemplateColumns:
          "repeat(auto-fit,minmax(250px,1fr))",
          gap:"25px",
          marginTop:"40px"
        }}
      >


      {
        plans.map((plan)=>(

          <div
            key={plan.id}
            style={{
              background:"#1e293b",
              padding:"30px",
              borderRadius:"15px",
              textAlign:"center"
            }}
          >

            <h2>
              {plan.plan_name}
            </h2>


            <h1>
              ${plan.price}
            </h1>


            <p>
              {plan.duration_days} Days
            </p>



            <ul
              style={{
                textAlign:"left"
              }}
            >

            {
              plan.features?.map((item,index)=>(

                <li key={index}>
                  ✓ {item}
                </li>

              ))
            }

            </ul>



            <button
              onClick={() =>
                alert(
                  "Payment integration will be connected next."
                )
              }
              style={{
                marginTop:"20px",
                padding:"12px 25px",
                cursor:"pointer"
              }}
            >

              Subscribe Now

            </button>


          </div>

        ))
      }


      </div>


    </div>

  );

}


export default UpgradePlan;