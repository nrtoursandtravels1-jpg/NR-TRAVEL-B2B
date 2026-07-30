import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";


export default function CustomerTable({ refresh }) {


  const [customers,setCustomers] = useState([]);

  const [loading,setLoading] = useState(true);




  useEffect(()=>{

    fetchCustomers();

  },[refresh]);





  const fetchCustomers = async()=>{


    const { data,error } = await supabase

      .from("customers")

      .select("*")

      .order(
        "created_at",
        {
          ascending:false
        }
      );



    if(error){

      console.log(
        "Customer Fetch Error:",
        error
      );

      return;

    }


    setCustomers(data || []);

    setLoading(false);


  };






  const updateStatus = async(id,status)=>{


    const {error} = await supabase

      .from("customers")

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


    fetchCustomers();


  };






  const deleteCustomer = async(id)=>{


    const confirmDelete = window.confirm(
      "Delete this customer?"
    );


    if(!confirmDelete){

      return;

    }




    const {error} = await supabase

      .from("customers")

      .delete()

      .eq(
        "id",
        id
      );



    if(error){

      console.log(error);

      return;

    }



    alert("Customer deleted");


    fetchCustomers();


  };







  if(loading){

    return <h3>Loading Customers...</h3>;

  }






  return(

    <div
      style={{
        background:"#fff",
        padding:"20px",
        marginTop:"20px",
        borderRadius:"10px",
        color:"#000"
      }}
    >


      <h2>
        Customer List
      </h2>



      <table

      style={{

        width:"100%",
        borderCollapse:"collapse"

      }}

      >


        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Phone</th>

            <th>Status</th>

            <th>Action</th>

          </tr>

        </thead>



        <tbody>


        {
          customers.map((customer)=>(


            <tr key={customer.id}>


              <td>
                {customer.full_name}
              </td>


              <td>
                {customer.email}
              </td>


              <td>
                {customer.phone}
              </td>



              <td>

                <select

                value={customer.status}

                onChange={(e)=>
                  updateStatus(
                    customer.id,
                    e.target.value
                  )
                }

                >

                  <option value="active">
                    Active
                  </option>


                  <option value="inactive">
                    Inactive
                  </option>


                </select>

              </td>




              <td>

                <button

                onClick={()=>
                  deleteCustomer(customer.id)
                }

                >

                  Delete

                </button>


              </td>



            </tr>


          ))

        }


        </tbody>


      </table>



      {
        customers.length===0 &&

        <p>
          No customers found
        </p>
      }



    </div>

  );


}