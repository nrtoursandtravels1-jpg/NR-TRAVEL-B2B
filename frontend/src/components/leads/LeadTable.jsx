import { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import { supabase } from "../../services/supabase";

export default function LeadTable({
  leads: propsLeads,
  setSelectedLead,
  refreshLeads,
}) {
  const [leads, setLeads] = useState(propsLeads || []);

  useEffect(() => {
    setLeads(propsLeads || []);
  }, [propsLeads]);

  // ==========================================
  // UPDATE STATUS
  // ==========================================

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("leads")
      .update({
        status,
      })
      .eq("id", id);

    if (error) {
      console.error("Status Update Error:", error);
      alert("Status update failed.");
      return;
    }

    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === id
          ? {
              ...lead,
              status,
            }
          : lead
      )
    );

    if (refreshLeads) {
      refreshLeads();
    }
  };

  // ==========================================
  // DELETE LEAD
  // ==========================================

  const deleteLead = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) {
      return;
    }

    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete Error:", error);
      alert("Delete failed.");
      return;
    }

    alert("Lead deleted successfully.");

    if (refreshLeads) {
      refreshLeads();
    }
  };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ==========================================
  // FORMAT CURRENCY
  // ==========================================

  const formatBudget = (budget) => {
    if (!budget) return "-";

    return `₹ ${Number(budget).toLocaleString("en-IN")}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mt-5">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

        <div>
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-blue-600 mb-1">
            Lead Directory
          </p>

          <h2 className="text-2xl font-extrabold text-slate-900">
            All Leads
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Manage customer enquiries and marketplace-ready leads.
          </p>
        </div>

        <div className="text-sm text-slate-500">
          <span className="font-bold text-slate-900">
            {leads.length}
          </span>{" "}
          leads
        </div>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">

        <table className="min-w-[1250px] w-full">

          <thead>
            <tr className="bg-slate-900 text-white">

              <th className={thStyle}>
                Customer
              </th>

              <th className={thStyle}>
                Contact
              </th>

              <th className={thStyle}>
                Destination
              </th>

              <th className={thStyle}>
                Travel Date
              </th>

              <th className={thStyle}>
                Travelers
              </th>

              <th className={thStyle}>
                Budget
              </th>

              <th className={thStyle}>
                Source
              </th>

              <th className={thStyle}>
                Status
              </th>

              <th className={thStyle}>
                Marketplace
              </th>

              <th className={thStyle}>
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {leads.map((lead) => {

              const isQualified =
                lead.status === "Qualified";

              return (
                <tr
                  key={lead.id}
                  className="
                    border-b
                    border-slate-100
                    hover:bg-slate-50
                    transition
                  "
                >

                  {/* CUSTOMER */}
                  <td className={tdStyle}>

                    <div>
                      <p className="font-semibold text-slate-800">
                        {lead.customer_name || "-"}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        ID #{lead.id}
                      </p>
                    </div>

                  </td>

                  {/* CONTACT */}
                  <td className={tdStyle}>

                    <div className="space-y-1">

                      <p className="text-sm text-slate-700">
                        {lead.mobile || "-"}
                      </p>

                      <p className="text-xs text-slate-500">
                        {lead.email || "-"}
                      </p>

                    </div>

                  </td>

                  {/* DESTINATION */}
                  <td className={tdStyle}>

                    <span className="font-medium text-slate-700">
                      {lead.destination || "-"}
                    </span>

                  </td>

                  {/* TRAVEL DATE */}
                  <td className={tdStyle}>
                    {formatDate(lead.travel_date)}
                  </td>

                  {/* TRAVELERS */}
                  <td className={tdStyle}>
                    {lead.travelers || "-"}
                  </td>

                  {/* BUDGET */}
                  <td className={tdStyle}>
                    {formatBudget(lead.budget)}
                  </td>

                  {/* SOURCE */}
                  <td className={tdStyle}>

                    <SourceBadge
                      source={
                        lead.lead_source ||
                        lead.source ||
                        "Unknown"
                      }
                    />

                  </td>

                  {/* STATUS */}
                  <td className={tdStyle}>

                    <div className="flex flex-col gap-2">

                      <StatusBadge
                        status={lead.status || "New"}
                      />

                      <select
                        value={lead.status || "New"}
                        onChange={(e) =>
                          updateStatus(
                            lead.id,
                            e.target.value
                          )
                        }
                        className="
                          border
                          border-slate-200
                          rounded-lg
                          px-2
                          py-1.5
                          text-xs
                          bg-white
                          outline-none
                          focus:border-blue-500
                        "
                      >

                        <option value="New">
                          New
                        </option>

                        <option value="Qualified">
                          Qualified
                        </option>

                        <option value="Contacted">
                          Contacted
                        </option>

                        <option value="Follow Up">
                          Follow Up
                        </option>

                        <option value="Booked">
                          Booked
                        </option>

                        <option value="Lost">
                          Lost
                        </option>

                      </select>

                    </div>

                  </td>

                  {/* MARKETPLACE */}
                  <td className={tdStyle}>

                    {isQualified ? (
                      <div className="flex items-center gap-2">

                        <span className="
                          w-2
                          h-2
                          rounded-full
                          bg-green-500
                        " />

                        <span className="
                          text-xs
                          font-semibold
                          text-green-700
                        ">
                          Ready
                        </span>

                      </div>
                    ) : (
                      <span className="
                        text-xs
                        font-medium
                        text-slate-400
                      ">
                        Not Ready
                      </span>
                    )}

                  </td>

                  {/* ACTIONS */}
                  <td className={tdStyle}>

                    <div className="flex items-center gap-2">

                      {/* EDIT */}
                      <button
                        onClick={() =>
                          setSelectedLead(lead)
                        }
                        className={iconButton}
                        title="Edit Lead"
                      >
                        <Pencil size={15} />
                      </button>

                      {/* CALL */}
                      {lead.mobile && (
                        <a
                          href={`tel:${lead.mobile}`}
                          className={iconButton}
                          title="Call Customer"
                        >
                          <Phone size={15} />
                        </a>
                      )}

                      {/* EMAIL */}
                      {lead.email && (
                        <a
                          href={`mailto:${lead.email}`}
                          className={iconButton}
                          title="Send Email"
                        >
                          <Mail size={15} />
                        </a>
                      )}

                      {/* WHATSAPP */}
                      {lead.mobile && (
                        <a
                          href={`https://wa.me/91${String(
                            lead.mobile
                          ).replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className={iconButton}
                          title="WhatsApp"
                        >
                          <MessageCircle size={15} />
                        </a>
                      )}

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          deleteLead(lead.id)
                        }
                        className={deleteButton}
                        title="Delete Lead"
                      >
                        <Trash2 size={15} />
                      </button>

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      {/* EMPTY STATE */}
      {leads.length === 0 && (
        <div className="py-12 text-center">

          <p className="text-slate-600 font-semibold">
            No leads found
          </p>

          <p className="text-sm text-slate-400 mt-1">
            New customer enquiries will appear here.
          </p>

        </div>
      )}

    </div>
  );
}


// ==========================================
// STATUS BADGE
// ==========================================

function StatusBadge({ status }) {
  const colors = {
    New: "bg-blue-50 text-blue-700 border-blue-100",

    Qualified:
      "bg-emerald-50 text-emerald-700 border-emerald-100",

    Contacted:
      "bg-yellow-50 text-yellow-700 border-yellow-100",

    "Follow Up":
      "bg-orange-50 text-orange-700 border-orange-100",

    Booked:
      "bg-green-50 text-green-700 border-green-100",

    Lost:
      "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <span
      className={`
        inline-flex
        w-fit
        px-3
        py-1
        rounded-full
        border
        text-xs
        font-semibold
        ${colors[status] || "bg-slate-50 text-slate-600 border-slate-100"}
      `}
    >
      {status}
    </span>
  );
}


// ==========================================
// SOURCE BADGE
// ==========================================

function SourceBadge({ source }) {
  const formatted =
    source
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );

  return (
    <span className="
      inline-flex
      px-2.5
      py-1
      rounded-lg
      bg-slate-100
      text-slate-600
      text-xs
      font-medium
      whitespace-nowrap
    ">
      {formatted}
    </span>
  );
}


// ==========================================
// STYLES
// ==========================================

const thStyle = `
  px-4
  py-3
  text-left
  text-xs
  font-semibold
  uppercase
  tracking-wide
  whitespace-nowrap
`;

const tdStyle = `
  px-4
  py-4
  text-sm
  text-slate-600
  align-middle
`;

const iconButton = `
  w-8
  h-8
  rounded-lg
  bg-slate-100
  text-slate-600
  flex
  items-center
  justify-center
  transition
  hover:bg-blue-50
  hover:text-blue-600
`;

const deleteButton = `
  w-8
  h-8
  rounded-lg
  bg-red-50
  text-red-500
  flex
  items-center
  justify-center
  transition
  hover:bg-red-100
`;