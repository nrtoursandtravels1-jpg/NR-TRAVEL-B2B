import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function LeadForm({
  selectedLead,
  clearSelectedLead,
  refreshLeads,
}) {

  const initialState = {
    customerName: "",
    mobile: "",
    email: "",
    destination: "",
    travelDate: "",
    travelers: "",
    budget: "",
    leadSource: "",
    status: "New",
    notes: "",
  };


  const [lead, setLead] = useState(initialState);



  useEffect(() => {

    if(selectedLead){

      setLead({
        customerName: selectedLead.customer_name || "",
        mobile: selectedLead.mobile || "",
        email: selectedLead.email || "",
        destination: selectedLead.destination || "",
        travelDate: selectedLead.travel_date || "",
        travelers: selectedLead.travelers || "",
        budget: selectedLead.budget || "",
        leadSource: selectedLead.lead_source || "",
        status: selectedLead.status || "New",
        notes: selectedLead.notes || "",
      });

    }

  },[selectedLead]);





  const handleChange = (e)=>{

    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });

  };





  const handleSubmit = async(e)=>{

    e.preventDefault();



    if(!lead.customerName || !lead.mobile || !lead.destination){

      alert("Please fill required fields");
      return;

    }



    const leadData = {

      customer_name: lead.customerName,
      mobile: lead.mobile,
      email: lead.email,
      destination: lead.destination,
      travel_date: lead.travelDate,
      travelers: lead.travelers,
      budget: lead.budget,
      lead_source: lead.leadSource,
      status: lead.status,
      notes: lead.notes,

    };





    let error;



    if(selectedLead){


      const response = await supabase

        .from("leads")

        .update(leadData)

        .eq(
          "id",
          selectedLead.id
        );


      error = response.error;


    }
    else{


      const response = await supabase

        .from("leads")

        .insert([
          leadData
        ]);


      error = response.error;

    }





    if(error){

      console.log(
        "Lead Save Error:",
        error
      );

      alert("Lead Save Failed");

      return;

    }





    alert(
      selectedLead
      ? "Lead Updated Successfully"
      : "Lead Saved Successfully"
    );



    setLead(initialState);



    if(clearSelectedLead){

      clearSelectedLead();

    }



    if(refreshLeads){

      refreshLeads();

    }


  };






  return (

    <div
      style={{
        background:"#fff",
        padding:"20px",
        borderRadius:"10px",
        marginBottom:"20px"
      }}
    >

      <h2>
        {
          selectedLead
          ? "Edit Lead"
          : "Add New Lead"
        }
      </h2>



      <form onSubmit={handleSubmit}>


        {[
          ["customerName","Customer Name"],
          ["mobile","Mobile Number"],
          ["email","Email"],
          ["destination","Destination"],
          ["travelDate","Travel Date"],
          ["travelers","Travelers"],
          ["budget","Budget"],
          ["leadSource","Lead Source"]
        ].map(([name,placeholder])=>(

          <input

            key={name}

            type={
              name==="travelDate"
              ? "date"
              : "text"
            }

            name={name}

            placeholder={placeholder}

            value={lead[name]}

            onChange={handleChange}

            style={inputStyle}

          />

        ))}



        <select
          name="status"
          value={lead.status}
          onChange={handleChange}
          style={inputStyle}
        >

          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Follow Up">Follow Up</option>
          <option value="Booked">Booked</option>
          <option value="Lost">Lost</option>

        </select>




        <textarea

          name="notes"

          placeholder="Notes"

          value={lead.notes}

          onChange={handleChange}

          style={inputStyle}

        />



        <button
          type="submit"
          style={buttonStyle}
        >

          {
            selectedLead
            ? "Update Lead"
            : "Save Lead"
          }

        </button>


      </form>


    </div>

  );

}



const inputStyle = {

  width:"100%",
  padding:"10px",
  marginBottom:"15px",
  borderRadius:"5px",
  border:"1px solid #ccc"

};



const buttonStyle = {

  padding:"10px 20px",
  background:"#2563eb",
  color:"white",
  border:"none",
  borderRadius:"5px",
  cursor:"pointer"

};