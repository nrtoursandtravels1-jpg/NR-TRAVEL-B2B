import { useState } from "react";

export default function AddLead() {

  const [lead, setLead] = useState({
    customerName: "",
    mobile: "",
    destination: "",
  });

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(lead);

    alert("Lead Added");
  };

  return (
    <div style={{padding:"20px"}}>

      <h2>Add New Lead</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="customerName"
          placeholder="Customer Name"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          name="mobile"
          placeholder="Mobile Number"
          onChange={handleChange}
        />

        <br/><br/>

        <input
          name="destination"
          placeholder="Interested Destination"
          onChange={handleChange}
        />

        <br/><br/>

        <button type="submit">
          Save Lead
        </button>

      </form>

    </div>
  );
}