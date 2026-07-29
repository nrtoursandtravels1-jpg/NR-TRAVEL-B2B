import { useState } from "react";
import * as XLSX from "xlsx";
import { supabase } from "../../services/supabase";

export default function LeadImport({ refreshLeads }) {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);



  const handleFileChange = (e) => {

    setFile(e.target.files[0]);

  };




  const handleImport = async () => {


    if(!file){

      alert("Please select Excel file");

      return;

    }



    try {

      setLoading(true);



      const data = await file.arrayBuffer();



      const workbook = XLSX.read(
        data
      );



      const sheetName =
        workbook.SheetNames[0];



      const worksheet =
        workbook.Sheets[sheetName];



      const rows =
        XLSX.utils.sheet_to_json(
          worksheet
        );




      if(rows.length === 0){

        alert("No data found");

        return;

      }




      const leads = rows.map((row)=>({

        customer_name:
          row["Customer Name"] || "",


        mobile:
          row["Mobile"] || "",


        email:
          row["Email"] || "",


        destination:
          row["Destination"] || "",


        travel_date:
          row["Travel Date"] || null,


        travelers:
          row["Travelers"] || "",


        budget:
          row["Budget"] || "",


        lead_source:
          row["Lead Source"] || "Excel Import",


        status:
          row["Status"] || "New",


        notes:
          row["Notes"] || "",

      }));






      const {
        data:userData
      } = await supabase.auth.getUser();



      const user =
        userData.user;



      const finalLeads =
        leads.map((lead)=>({

          ...lead,

          agent_id:user?.id

        }));







      const {
        error
      } = await supabase

        .from("leads")

        .insert(finalLeads);





      if(error){

        console.log(
          "Import Error:",
          error
        );

        alert("Import Failed");

        return;

      }





      alert(
        `${finalLeads.length} Leads Imported Successfully`
      );



      setFile(null);



      if(refreshLeads){

        refreshLeads();

      }



    }
    catch(error){

      console.log(error);

      alert("Excel Import Error");

    }
    finally{

      setLoading(false);

    }


  };





  return (

    <div
      style={{
        background:"#fff",
        padding:"20px",
        borderRadius:"10px",
        marginTop:"20px"
      }}
    >

      <h2>
        Bulk Lead Import
      </h2>



      <p>
        Upload Excel file with columns:
      </p>


      <small>
        Customer Name, Mobile, Email,
        Destination, Travel Date,
        Travelers, Budget, Lead Source,
        Status, Notes
      </small>




      <br/><br/>




      <input

        type="file"

        accept=".xlsx,.xls,.csv"

        onChange={handleFileChange}

      />





      <br/><br/>




      <button

        onClick={handleImport}

        disabled={loading}

        style={{
          padding:"10px 20px",
          background:"#2563eb",
          color:"white",
          border:"none",
          borderRadius:"5px"
        }}

      >

        {
          loading
          ? "Importing..."
          : "Import Leads"
        }


      </button>



    </div>

  );

}