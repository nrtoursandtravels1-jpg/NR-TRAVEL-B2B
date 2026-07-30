import { useState } from "react";
import { supabase } from "../../services/supabase";


export default function AddUser({ onUserAdded }) {


  const [user, setUser] = useState({

    full_name: "",
    email: "",
    phone: "",
    role: "travel_agent",
    status: "active",

  });



  const handleChange = (e) => {

    setUser({

      ...user,

      [e.target.name]: e.target.value,

    });

  };




  const handleSubmit = async (e) => {

    e.preventDefault();



    const { error } = await supabase

      .from("profiles")

      .insert([user]);




    if (error) {

      console.log(
        "User Creation Error:",
        error
      );

      alert(error.message);

      return;

    }




    alert(
      "User created successfully"
    );




    setUser({

      full_name: "",
      email: "",
      phone: "",
      role: "travel_agent",
      status: "active",

    });




    if (onUserAdded) {

      onUserAdded();

    }


  };






  return (

    <div

      style={{

        background:"#ffffff",

        padding:"20px",

        borderRadius:"10px",

        marginTop:"20px"

      }}

    >



      <h2>
        Add New User
      </h2>




      <form onSubmit={handleSubmit}>


        <input

          name="full_name"

          placeholder="Full Name"

          value={user.full_name}

          onChange={handleChange}

          required

        />




        <input

          name="email"

          placeholder="Email"

          type="email"

          value={user.email}

          onChange={handleChange}

          required

        />




        <input

          name="phone"

          placeholder="Phone Number"

          value={user.phone}

          onChange={handleChange}

          required

        />





        <select

          name="role"

          value={user.role}

          onChange={handleChange}

        >

          <option value="admin">
            Admin
          </option>


          <option value="staff">
            Staff
          </option>


          <option value="travel_agent">
            Travel Agent
          </option>


          <option value="customer">
            Customer
          </option>


        </select>





        <select

          name="status"

          value={user.status}

          onChange={handleChange}

        >

          <option value="active">
            Active
          </option>


          <option value="inactive">
            Inactive
          </option>


        </select>





        <button

          type="submit"

        >

          Save User

        </button>



      </form>



    </div>

  );

}