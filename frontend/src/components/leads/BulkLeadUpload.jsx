import { useState } from "react";
import * as XLSX from "xlsx";
import {
  Download,
  FileSpreadsheet,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { supabase } from "../../services/supabase";

export default function BulkLeadUpload({ leads = [] }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFile = (e) => {
    const selectedFile = e.target.files?.[0];

    setResult(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const validExtensions = [".xlsx", ".xls"];
    const extension = selectedFile.name
      .substring(selectedFile.name.lastIndexOf("."))
      .toLowerCase();

    if (!validExtensions.includes(extension)) {
      setFile(null);
      setResult({
        type: "error",
        message: "Please select a valid Excel file (.xlsx or .xls).",
      });
      return;
    }

    setFile(selectedFile);
  };

  // ==========================================
  // EXCEL DATE CONVERSION
  // ==========================================

  const formatExcelDate = (value) => {
    if (!value) return null;

    // If Excel already returns a Date object
    if (value instanceof Date && !isNaN(value)) {
      return value.toISOString().split("T")[0];
    }

    // Excel serial date number
    if (typeof value === "number") {
      const parsed = XLSX.SSF.parse_date_code(value);

      if (parsed) {
        const month = String(parsed.m).padStart(2, "0");
        const day = String(parsed.d).padStart(2, "0");

        return `${parsed.y}-${month}-${day}`;
      }
    }

    const stringValue = String(value).trim();

    if (!stringValue) return null;

    // Try normal date parsing
    const parsedDate = new Date(stringValue);

    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString().split("T")[0];
    }

    return null;
  };

  // ==========================================
  // IMPORT EXCEL
  // ==========================================

  const uploadLeads = async () => {
    if (!file) {
      setResult({
        type: "error",
        message: "Please select an Excel file first.",
      });

      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        throw new Error("User is not logged in.");
      }

      const arrayBuffer = await file.arrayBuffer();

      const workbook = XLSX.read(arrayBuffer, {
        type: "array",
        cellDates: true,
      });

      if (!workbook.SheetNames.length) {
        throw new Error("Excel file does not contain any worksheet.");
      }

      const sheetName = workbook.SheetNames[0];

      const worksheet = workbook.Sheets[sheetName];

      const rows = XLSX.utils.sheet_to_json(worksheet, {
        defval: "",
      });

      if (!rows.length) {
        throw new Error("Excel file is empty.");
      }

      // ==========================================
      // VALIDATE + PREPARE ROWS
      // ==========================================

      const validLeads = [];
      const invalidRows = [];

      rows.forEach((row, index) => {
        const customerName = String(
          row["Customer Name"] || ""
        ).trim();

        const mobile = String(
          row["Mobile"] || ""
        ).trim();

        const email = String(
          row["Email"] || ""
        ).trim();

        const destination = String(
          row["Destination"] || ""
        ).trim();

        const travelDate = formatExcelDate(
          row["Travel Date"]
        );

        const travelers = Number(
          row["Travelers"] || 0
        );

        const budget = Number(
          row["Budget"] || 0
        );

        const leadSource = String(
          row["Lead Source"] || "Excel"
        ).trim();

        const status = String(
          row["Status"] || "New"
        ).trim();

        const notes = String(
          row["Notes"] || ""
        ).trim();

        // Required fields according to leads table
        if (
          !customerName ||
          !mobile ||
          !destination ||
          !travelDate ||
          !travelers ||
          budget < 0 ||
          !leadSource ||
          !notes
        ) {
          invalidRows.push(index + 2);
          return;
        }

        validLeads.push({
          agent_id: user.id,

          customer_name: customerName,

          mobile,

          email,

          destination,

          travel_date: travelDate,

          travelers,

          budget,

          lead_source: leadSource,

          status,

          notes,
        });
      });

      if (!validLeads.length) {
        throw new Error(
          "No valid lead rows found. Please check your Excel columns and required fields."
        );
      }

      // ==========================================
      // INSERT
      // ==========================================

      const { error } = await supabase
        .from("leads")
        .insert(validLeads);

      if (error) {
        throw error;
      }

      setResult({
        type: "success",
        imported: validLeads.length,
        skipped: invalidRows.length,
      });

      setFile(null);

      // Reset file input
      const fileInput =
        document.getElementById("bulk-lead-file");

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Bulk Lead Upload Error:", error);

      setResult({
        type: "error",
        message:
          error.message ||
          "Unable to import leads.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // EXPORT EXCEL
  // ==========================================

  const exportLeads = () => {
    if (!leads.length) {
      setResult({
        type: "error",
        message: "No leads available to export.",
      });

      return;
    }

    const exportData = leads.map((lead) => ({
      "Customer Name":
        lead.customer_name || "",

      Mobile:
        lead.mobile || "",

      Email:
        lead.email || "",

      Destination:
        lead.destination || "",

      "Travel Date":
        lead.travel_date || "",

      Travelers:
        lead.travelers || "",

      Budget:
        lead.budget || "",

      "Lead Source":
        lead.lead_source || "",

      Status:
        lead.status || "",

      Notes:
        lead.notes || "",
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(exportData);

    // Better column widths
    worksheet["!cols"] = [
      { wch: 22 },
      { wch: 16 },
      { wch: 28 },
      { wch: 20 },
      { wch: 15 },
      { wch: 12 },
      { wch: 14 },
      { wch: 16 },
      { wch: 15 },
      { wch: 40 },
    ];

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Leads"
    );

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    XLSX.writeFile(
      workbook,
      `WorldTrip_Connect_Leads_${today}.xlsx`
    );

    setResult({
      type: "export",
      message: `${leads.length} leads exported successfully.`,
    });
  };

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* HEADER */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <FileSpreadsheet
              size={21}
              className="text-blue-600"
            />

            <h2 className="text-lg font-bold text-slate-900">
              Import / Export Leads
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Import leads from Excel or export your CRM
            leads for reporting.
          </p>
        </div>

        <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">
          {leads.length} Leads
        </div>
      </div>

      {/* RESULT */}

      {result?.type === "success" && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          <CheckCircle2
            size={19}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-semibold">
              Import completed successfully.
            </p>

            <p className="mt-1">
              Imported: {result.imported}
              {result.skipped > 0 &&
                ` • Skipped: ${result.skipped}`}
            </p>
          </div>
        </div>
      )}

      {result?.type === "error" && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle
            size={19}
            className="mt-0.5 shrink-0"
          />

          <p className="font-medium">
            {result.message}
          </p>
        </div>
      )}

      {result?.type === "export" && (
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
          <Download size={19} />

          <p className="font-semibold">
            {result.message}
          </p>
        </div>
      )}

      {/* IMPORT */}

      <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
        <div className="flex items-center gap-2">
          <Upload
            size={19}
            className="text-blue-600"
          />

          <h3 className="font-semibold text-slate-800">
            Import Excel
          </h3>
        </div>

        <p className="mt-1 text-xs text-slate-500">
          Required columns: Customer Name, Mobile,
          Destination, Travel Date, Travelers, Budget
          and Notes.
        </p>

        <input
          id="bulk-lead-file"
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFile}
          className="
            mt-4
            block
            w-full
            rounded-lg
            border
            border-slate-200
            bg-white
            p-2
            text-sm
            text-slate-600
            file:mr-4
            file:rounded-lg
            file:border-0
            file:bg-blue-50
            file:px-4
            file:py-2
            file:text-sm
            file:font-semibold
            file:text-blue-700
          "
        />

        {file && (
          <p className="mt-3 text-xs font-medium text-slate-600">
            Selected: {file.name}
          </p>
        )}

        <button
          type="button"
          onClick={uploadLeads}
          disabled={loading || !file}
          className="
            mt-4
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:bg-slate-300
          "
        >
          {loading ? (
            <>
              <Loader2
                size={17}
                className="animate-spin"
              />
              Importing...
            </>
          ) : (
            <>
              <Upload size={17} />
              Import Excel Leads
            </>
          )}
        </button>
      </div>

      {/* EXPORT */}

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2">
          <Download
            size={19}
            className="text-green-600"
          />

          <h3 className="font-semibold text-slate-800">
            Export Leads
          </h3>
        </div>

        <p className="mt-1 text-xs text-slate-500">
          Download your currently loaded leads as an
          Excel report.
        </p>

        <button
          type="button"
          onClick={exportLeads}
          disabled={!leads.length}
          className="
            mt-4
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-green-600
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-green-700
            disabled:cursor-not-allowed
            disabled:bg-slate-300
          "
        >
          <Download size={17} />
          Export Excel
        </button>
      </div>

      {/* EXCEL FORMAT */}

      <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Excel Format
        </p>

        <p className="mt-2 text-xs leading-6 text-slate-600">
          Customer Name → Mobile → Email →
          Destination → Travel Date → Travelers →
          Budget → Lead Source → Status → Notes
        </p>

        <p className="mt-2 text-xs text-slate-500">
          Example Status values: New, Contacted,
          Qualified, Proposal, Won, Lost.
        </p>
      </div>
    </div>
  );
}