import { useState } from "react";
import { supabase } from "../../services/supabase";

export default function LeadForm() {

  const [lead, setLead] = useState({
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
  });


  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });
  };


  // 👇 PASTE YOUR CODE HERE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!lead.customerName || !lead.mobile || !lead.destination) {
      alert("Please fill all required fields.");
      return;
    }

    const { error } = await supabase
      .from("leads")
      .insert([
        {
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
        },
      ]);

    if (error) {
      console.log("Supabase Error:", error);
      alert("Lead Save Failed");
      return;
    }

    alert("Lead Saved Successfully!");

    setLead({
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
    });
  };


  return (
    // your form code remains here
  );
}