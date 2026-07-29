import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function PricingPlans() {

  const [plans, setPlans] = useState([]);


  const fetchPlans = async () => {

    const { data, error } = await supabase
      .from("subscription_plans")
      .select("*")
      .eq("status", "active")
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

    <section
      style={{
        padding:"60px 30px",
        background:"#f8fafc"
      }}
    >

      <h2
        style={{
          textAlign:"center",
          color:"#0f172a"
        }}
      >
        Choose Your Growth Plan
      </h2>


      <p
        style={{
          textAlign:"center"
        }}
      >
        Start your travel business journey with our SaaS platform.
      </p>



      <div
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
          gap:"25px",
          marginTop:"40px"
        }}
      >


      {
        plans.map((plan)=>(

          <div
            key={plan.id}
            style={{
              background:"white",
              padding:"30px",
              borderRadius:"15px",
              boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
            }}
          >


            <h3>
              {plan.plan_name}
            </h3>


            <h1>
              ${plan.price}
            </h1>


            <p>
              Valid for {plan.duration_days} days
            </p>



            <ul>

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
                window.location.href="/register"
              }
              style={{
                marginTop:"20px",
                padding:"12px 25px",
                cursor:"pointer"
              }}
            >

              {
                plan.plan_name === "2 Day Trial"
                ?
                "Start Free Trial"
                :
                "Subscribe Now"
              }

            </button>


          </div>

        ))
      }


      </div>


    </section>

  );

}


export default PricingPlans;