import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import {
  CheckCircle,
  XCircle,
  Eye,
  Package,
  RefreshCw,
  Clock,
} from "lucide-react";

export default function AdminPackageApproval() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [filter, setFilter] = useState("pending");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadPackages();
  }, [filter]);

  async function loadPackages() {
    try {
      setLoading(true);
      setError("");

      let query = supabase
        .from("packages")
        .select("*")
        .order("created_at", { ascending: false });

      if (filter !== "all") {
        query = query.eq("approval_status", filter);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      setPackages(data || []);
    } catch (err) {
      console.error("Package approval error:", err);
      setError(err.message || "Unable to load packages.");
    } finally {
      setLoading(false);
    }
  }

  async function updateApproval(packageId, status) {
    try {
      setProcessingId(packageId);
      setMessage("");
      setError("");

      const { error: updateError } = await supabase
        .from("packages")
        .update({
          approval_status: status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", packageId);

      if (updateError) {
        throw updateError;
      }

      setMessage(
        status === "approved"
          ? "Package approved successfully."
          : "Package rejected successfully."
      );

      await loadPackages();
    } catch (err) {
      console.error("Approval update error:", err);
      setError(err.message || "Unable to update package.");
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Admin Management
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Package Approval
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Review and approve travel packages before they appear in the
            customer marketplace.
          </p>
        </div>

        <button
          type="button"
          onClick={loadPackages}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>

      </div>

      {/* MESSAGE */}

      {message && (
        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {/* FILTERS */}

      <div className="mb-6 flex flex-wrap gap-2">

        {[
          ["pending", "Pending"],
          ["approved", "Approved"],
          ["rejected", "Rejected"],
          ["all", "All"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
              filter === value
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {label}
          </button>
        ))}

      </div>

      {/* CONTENT */}

      {loading ? (
        <div className="flex min-h-[350px] items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading packages...
            </p>
          </div>
        </div>
      ) : packages.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">

          <Package
            size={42}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-4 text-lg font-bold text-slate-800">
            No packages found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            There are no {filter === "all" ? "" : filter} packages to review.
          </p>

        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

          {packages.map((item) => {

            const packageTitle =
              item.package_name ||
              item.title ||
              item.name ||
              "Untitled Package";

            const destination =
              item.destination ||
              item.location ||
              "Destination not specified";

            const price =
              item.price ||
              item.package_price ||
              item.amount;

            const status =
              item.approval_status || "pending";

            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >

                {/* CARD HEADER */}

                <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">

                  <div className="flex min-w-0 gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Package size={20} />
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-extrabold text-slate-900">
                        {packageTitle}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {destination}
                      </p>
                    </div>

                  </div>

                  <StatusBadge status={status} />

                </div>

                {/* DETAILS */}

                <div className="grid grid-cols-2 gap-4 p-5">

                  <InfoItem
                    label="Destination"
                    value={destination}
                  />

                  <InfoItem
                    label="Price"
                    value={
                      price
                        ? `₹${Number(price).toLocaleString("en-IN")}`
                        : "Not specified"
                    }
                  />

                  <InfoItem
                    label="Duration"
                    value={
                      item.duration ||
                      item.days ||
                      "Not specified"
                    }
                  />

                  <InfoItem
                    label="Travel Type"
                    value={
                      item.package_type ||
                      item.type ||
                      "Tour Package"
                    }
                  />

                </div>

                {/* ACTIONS */}

                <div className="flex flex-wrap gap-3 border-t border-slate-100 bg-slate-50 p-5">

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        JSON.stringify(item, null, 2)
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  {status !== "approved" && (
                    <button
                      type="button"
                      disabled={processingId === item.id}
                      onClick={() =>
                        updateApproval(item.id, "approved")
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <CheckCircle size={16} />
                      Approve
                    </button>
                  )}

                  {status !== "rejected" && (
                    <button
                      type="button"
                      disabled={processingId === item.id}
                      onClick={() =>
                        updateApproval(item.id, "rejected")
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <XCircle size={16} />
                      Reject
                    </button>
                  )}

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}


/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const config = {
    pending: {
      label: "Pending",
      className: "bg-amber-50 text-amber-700",
      icon: Clock,
    },

    approved: {
      label: "Approved",
      className: "bg-green-50 text-green-700",
      icon: CheckCircle,
    },

    rejected: {
      label: "Rejected",
      className: "bg-red-50 text-red-700",
      icon: XCircle,
    },
  };

  const current = config[status] || config.pending;
  const Icon = current.icon;

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${current.className}`}
    >
      <Icon size={13} />
      {current.label}
    </span>
  );
}


/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-slate-700">
        {value}
      </p>
    </div>
  );
}