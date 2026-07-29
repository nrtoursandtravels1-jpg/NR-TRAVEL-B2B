import { useState } from "react";
import * as XLSX from "xlsx";
import { supabase } from "../../services/supabase";

export default function BulkLeadUpload() {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);


  const handleFile = (e) => {

    setFile(e.target.files[0]);

  };



  const uploadLeads = async () => {

    if (!file) {
      alert("Please select Excel file");
      return;
    }


    setLoading(true);


    const reader = new FileReader();


    reader.onload = async (event) => {


      const data = new Uint8Array(
        event.target.result
      );


      const workbook = XLSX.read(
        data,
        {
          type: "array"
        }
      );


      const sheetName =
        workbook.SheetNames[0];


      const worksheet =
        workbook.Sheets[sheetName];


      const rows =
        XLSX.utils.sheet_to_json(
          worksheet
        );



      const {
        data:userData
      } = await supabase.auth.getUser();


      const user =
        userData.user;



      if(!user){

        alert("User not logged in");
        return;

      }



      const leads = rows.map((row)=>({

        agent_id:user.id,

        customer_name:
          row["Customer Name"],

        mobile:
          String(row["Mobile"] || ""),

        email:
          row["Email"] || "",

        destination:
          row["Destination"] || "",

        travel_date:
          row["Travel Date"] || null,

        travelers:
          row["Travelers"] || 1,

        budget:
          row["Budget"] || 0,

        lead_source:
          row["Lead Source"] || "Excel",

        status:
          "New",

        notes:
          row["Notes"] || ""

      }));





      const {
        error
      } = await supabase
        .from("leads")
        .insert(leads);



      if(error){

        console.log(
          "Bulk Upload Error:",
          error
        );

        alert(
          "Upload Failed"
        );

      }
      else{

        setCount(
          leads.length
        );

        alert(
          `${leads.length} Leads Imported Successfully`
        );

      }


      setLoading(false);


    };


    reader.readAsArrayBuffer(file);


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
        Bulk Lead Upload
      </h2>


      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFile}
      />


      <br/><br/>


      <button
        onClick={uploadLeads}
        disabled={loading}
      >

        {
          loading
          ?
          "Uploading..."
          :
          "Import Excel Leads"
        }

      </button>



      {
        count > 0 &&
        <p>
          Imported Leads: {count}
        </p>
      }


    </div>

  );

}