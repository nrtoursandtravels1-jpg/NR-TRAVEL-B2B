import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";


function AdminDashboard(){

  const [stats,setStats] = useState({

    staff:0,
    agents:0,
    customers:0,
    leads:0,
    subscriptions:0,
    bookings:0

  });


  const [loading,setLoading] = useState(true);



  useEffect(()=>{

    loadStats();

  },[]);



  const loadStats = async()=>{


    try{


      const {count:staff}=await supabase
      .from("profiles")
      .select("*",
      {
        count:"exact",
        head:true
      })
      .eq(
        "role",
        "staff"
      );




      const {count:agents}=await supabase
      .from("profiles")
      .select("*",
      {
        count:"exact",
        head:true
      })
      .eq(
        "role",
        "travel_agent"
      );




      const {count:customers}=await supabase
      .from("customers")
      .select("*",
      {
        count:"exact",
        head:true
      });




      const {count:leads}=await supabase
      .from("leads")
      .select("*",
      {
        count:"exact",
        head:true
      });
      
      console.log("Leads Count:", leads);




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




      setStats({

        staff: staff || 0,

        agents: agents || 0,

        customers: customers || 0,

        leads: leads || 0,

        subscriptions: subscriptions || 0,

        bookings:0

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

    return(

      <h2 style={{padding:"30px"}}>
        Loading Dashboard...
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
        NR Travel Admin Dashboard
      </h1>


      <p>
        Internal Management + SaaS Control Center
      </p>




      <h2 style={{marginTop:"30px"}}>
        Company Management
      </h2>




      <div
      style={{
        display:"grid",
        gridTemplateColumns:"repeat(4,1fr)",
        gap:"20px",
        marginTop:"20px"
      }}
      >


        <Card
          title="Staff"
          value={stats.staff}
        />


        <Card
          title="Travel Agents"
          value={stats.agents}
        />


        <Card
          title="Customers"
          value={stats.customers}
        />


        <Card
          title="Leads"
          value={stats.leads}
        />


      </div>





      <h2 style={{marginTop:"40px"}}>
        SaaS Management
      </h2>




      <div
      style={{
        display:"grid",
        gridTemplateColumns:"repeat(3,1fr)",
        gap:"20px",
        marginTop:"20px"
      }}
      >


        <Card
          title="Active Subscriptions"
          value={stats.subscriptions}
        />


        <Card
          title="Bookings"
          value={stats.bookings}
        />


        <Card
          title="Plans"
          value="Manage"
        />


      </div>





      <div
      style={{
        marginTop:"40px"
      }}
      >


        <button
        onClick={()=>
          window.location.href="/admin/users"
        }
        >
          Manage Users
        </button>





        <button
        style={{
          marginLeft:"15px"
        }}
        onClick={()=>
          window.location.href="/admin/customers"
        }
        >
          Manage Customers
        </button>





        <button
        style={{
          marginLeft:"15px"
        }}
        onClick={()=>
          window.location.href="/admin/subscriptions"
        }
        >
          Manage Subscriptions
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

padding:"25px",

borderRadius:"12px",

boxShadow:"0 2px 8px #ddd"

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