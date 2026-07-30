import { useState } from "react";

import CustomerForm from "../../components/customers/CustomerForm";
import CustomerTable from "../../components/customers/CustomerTable";


function Customers() {


  const [refresh, setRefresh] = useState(false);



  const customerAdded = () => {

    setRefresh((prev) => !prev);

  };



  return (

    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        background: "#f5f6fa",
        color: "#111"
      }}
    >


      <h1>
        Customer Management
      </h1>


      <p>
        Manage company customers
      </p>




      <div
        style={{
          marginTop: "25px"
        }}
      >

        <CustomerForm
          onCustomerAdded={customerAdded}
        />

      </div>




      <div
        style={{
          marginTop: "30px"
        }}
      >

        <CustomerTable
          refresh={refresh}
        />

      </div>



    </div>

  );

}


export default Customers;