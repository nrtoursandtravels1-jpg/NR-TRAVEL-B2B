import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";


function Users(){


  const [users,setUsers] = useState([]);

  const [loading,setLoading] = useState(true);



  useEffect(()=>{

    fetchUsers();

  },[]);





  const fetchUsers = async()=>{


    const {

      data,

      error

    } = await supabase

    .from("profiles")

    .select("*")

    .order(

      "created_at",

      {
        ascending:false
      }

    );



    if(error){

      console.log(
        "Users Fetch Error:",
        error
      );

      return;

    }



    setUsers(data || []);

    setLoading(false);


  };






  const updateStatus = async(id,status)=>{


    const {

      error

    } = await supabase

    .from("profiles")

    .update({

      status:status

    })

    .eq(

      "id",

      id

    );



    if(error){

      console.log(error);

      return;

    }



    fetchUsers();


  };







  if(loading){

    return(

      <h2 style={{padding:"30px"}}>

        Loading Users...

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
        User & Team Management
      </h1>


      <p>
        Manage Admin, Staff, Travel Agents and Customers
      </p>




      <table

      style={{

        width:"100%",

        marginTop:"30px",

        background:"#fff",

        color:"#000",

        borderCollapse:"collapse"

      }}

      >



      <thead>


        <tr>

          <th>
            Name
          </th>


          <th>
            Email
          </th>


          <th>
            Phone
          </th>


          <th>
            Role
          </th>


          <th>
            Status
          </th>


          <th>
            Action
          </th>


        </tr>


      </thead>





      <tbody>


      {

      users.map((user)=>(


        <tr key={user.id}>


          <td>
            {user.full_name}
          </td>



          <td>
            {user.email}
          </td>



          <td>
            {user.phone}
          </td>



          <td>
            {user.role}
          </td>



          <td>
            {user.status}
          </td>




          <td>


          {

          user.status==="active"


          ?


          <button

          onClick={()=>updateStatus(
            user.id,
            "inactive"
          )}

          >

            Disable

          </button>


          :


          <button

          onClick={()=>updateStatus(
            user.id,
            "active"
          )}

          >

            Activate

          </button>


          }


          </td>



        </tr>


      ))

      }


      </tbody>



      </table>





      {
        users.length===0 &&

        <p>
          No users found
        </p>
      }



    </div>

  );


}


export default Users;