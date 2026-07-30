import { useState } from "react";
import { supabase } from "../../services/supabase";


export default function CustomerForm({ onCustomerAdded }) {


  const [customer, setCustomer] = useState({

    full_name: "",
    email: "",
    phone: "",
    address: "",
    status: "active"

  });



  const handleChange = (e)=>{

    setCustomer({

      ...customer,

      [e.target.name]: e.target.value

    });

  };




  const handleSubmit = async(e)=>{

    e.preventDefault();



    const { error } = await supabase

      .from("customers")

      .insert([customer]);



    if(error){

      console.log(
        "Customer Add Error:",
        error
      );

      alert("Customer creation failed");

      return;

    }



    alert("Customer added successfully");



    setCustomer({

      full_name:"",
      email:"",
      phone:"",
      address:"",
      status:"active"

    });



    if(onCustomerAdded){

      onCustomerAdded();

    }


  };





  return (

    <div
      style={{
        background:"#fff",
        padding:"20px",
        borderRadius:"10px",
        marginTop:"20px",
        color:"#000"
      }}
    >

      <h2>
        Add Customer
      </h2>



      <form onSubmit={handleSubmit}>


        <input
          name="full_name"
          placeholder="Customer Name"
          value={customer.full_name}
          onChange={handleChange}
          required
        />


        <br/><br/>


        <input
          name="email"
          placeholder="Email"
          type="email"
          value={customer.email}
          onChange={handleChange}
        />


        <br/><br/>


        <input
          name="phone"
          placeholder="Phone Number"
          value={customer.phone}
          onChange={handleChange}
        />


        <br/><br/>


        <input
          name="address"
          placeholder="Address"
          value={customer.address}
          onChange={handleChange}
        />


        <br/><br/>


        <select
          name="status"
          value={customer.status}
          onChange={handleChange}
        >

          <option value="active">
            Active
          </option>


          <option value="inactive">
            Inactive
          </option>


        </select>


        <br/><br/>


        <button type="submit">
          Save Customer
        </button>


      </form>


    </div>

  );

}