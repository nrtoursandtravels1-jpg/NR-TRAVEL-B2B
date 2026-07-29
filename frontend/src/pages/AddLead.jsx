import { useState } from "react";
import { supabase } from "../services/supabase";

export default function AddLead() {


  const [lead, setLead] = useState({

    customerName: "",
    mobile: "",
    email: "",
    destination: "",
    travelDate: "",
    adults: "",
    message: "",

  });


  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {

    setLead({

      ...lead,

      [e.target.name]: e.target.value,

    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();


    if(
      !lead.customerName ||
      !lead.mobile ||
      !lead.destination
    ){

      alert("Please fill required fields");

      return;

    }



    try {


      setLoading(true);



      const {
        data:userData
      } = await supabase.auth.getUser();



      const { error } = await supabase
      .from("leads")
      .insert({

        customer_name: lead.customerName,

        mobile: lead.mobile,

        email: lead.email,

        destination: lead.destination,

        travel_date: lead.travelDate,

        adults: lead.adults,

        message: lead.message,

        agent_id:userData.user.id,

        status:"new",

      });



      if(error){

        throw error;

      }



      alert("Lead Added Successfully");



      setLead({

        customerName:"",
        mobile:"",
        email:"",
        destination:"",
        travelDate:"",
        adults:"",
        message:"",

      });



    }
    catch(error){

      console.log(
        "Lead Error:",
        error
      );

      alert(error.message);

    }
    finally{

      setLoading(false);

    }


  };




  return (

    <div
      style={{
        padding:"30px"
      }}
    >


      <h2>
        Add New Lead
      </h2>


      <p>
        Capture customer enquiry for travel business.
      </p>



      <form onSubmit={handleSubmit}>


        <input

          name="customerName"

          placeholder="Customer Name"

          value={lead.customerName}

          onChange={handleChange}

        />

        <br/><br/>



        <input

          name="mobile"

          placeholder="Mobile Number"

          value={lead.mobile}

          onChange={handleChange}

        />

        <br/><br/>



        <input

          name="email"

          placeholder="Email Address"

          value={lead.email}

          onChange={handleChange}

        />

        <br/><br/>



        <input

          name="destination"

          placeholder="Interested Destination"

          value={lead.destination}

          onChange={handleChange}

        />

        <br/><br/>



        <input

          name="travelDate"

          placeholder="Travel Date"

          value={lead.travelDate}

          onChange={handleChange}

        />

        <br/><br/>



        <input

          name="adults"

          placeholder="Number of Travellers"

          value={lead.adults}

          onChange={handleChange}

        />

        <br/><br/>



        <textarea

          name="message"

          placeholder="Customer Requirement"

          value={lead.message}

          onChange={handleChange}

        />


        <br/><br/>



        <button
          type="submit"
          disabled={loading}
        >

        {
          loading
          ?
          "Saving..."
          :
          "Save Lead"
        }

        </button>



      </form>


    </div>

  );

}