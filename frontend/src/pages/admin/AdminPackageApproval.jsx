import { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Eye,
  Package,
  RefreshCw,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { supabase } from "../../services/supabase";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Loader from "../../components/ui/Loader";
import Modal from "../../components/ui/Modal";
import Badge from "../../components/ui/Badge";


export default function AdminPackageApproval() {
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const [filter, setFilter] = useState("pending");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [selectedPackage, setSelectedPackage] = useState(null);


  useEffect(() => {
    loadPackages();
  }, [filter]);


  async function loadPackages() {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      let query = supabase
        .from("packages")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (filter !== "all") {
        query = query.eq(
          "approval_status",
          filter
        );
      }

      const {
        data,
        error: fetchError,
      } = await query;

      if (fetchError) {
        throw fetchError;
      }

      setPackages(data || []);
    } catch (err) {
      console.error(
        "Package approval error:",
        err
      );

      setError(
        err.message ||
          "Unable to load packages."
      );
    } finally {
      setLoading(false);
    }
  }


  async function updateApproval(
    packageId,
    status
  ) {
    try {
      setProcessingId(packageId);
      setMessage("");
      setError("");

      const {
        error: updateError,
      } = await supabase
        .from("packages")
        .update({
          approval_status: status,
          updated_at:
            new Date().toISOString(),
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

      setSelectedPackage(null);

      await loadPackages();
    } catch (err) {
      console.error(
        "Approval update error:",
        err
      );

      setError(
        err.message ||
          "Unable to update package."
      );
    } finally {
      setProcessingId(null);
    }
  }


  return (
    <DashboardLayout>

      <div className="p-1 sm:p-2 lg:p-4">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Admin Management
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
              Package Approval
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Review and approve travel packages before they appear in the
              customer marketplace.
            </p>
          </div>


          <button
            type="button"
            onClick={loadPackages}
            disabled={loading}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-bold
              text-slate-700
              shadow-sm
              transition
              hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <RefreshCw
              size={16}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>

        </div>


        {/* ==================================================
            MESSAGES
        ================================================== */}

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


        {/* ==================================================
            FILTERS
        ================================================== */}

        <div className="mb-6 flex flex-wrap gap-2">

          {[
            ["pending", "Pending"],
            ["approved", "Approved"],
            ["rejected", "Rejected"],
            ["all", "All"],
          ].map(
            ([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setFilter(value)
                }
                className={`
                  rounded-xl
                  px-4
                  py-2.5
                  text-sm
                  font-bold
                  transition
                  ${
                    filter === value
                      ? "bg-blue-600 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                {label}
              </button>
            )
          )}

        </div>


        {/* ==================================================
            CONTENT
        ================================================== */}

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white">
            <Loader
              text="Loading packages..."
              size="md"
            />
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
              There are no{" "}
              {filter === "all"
                ? ""
                : filter}{" "}
              packages to review.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

            {packages.map(
              (item) => {

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
                  item.price ??
                  item.package_price ??
                  item.amount;

                const status =
                  item.approval_status ||
                  "pending";

                return (
                  <div
                    key={item.id}
                    className="
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      shadow-sm
                      transition
                      hover:shadow-md
                    "
                  >

                    {/* ==================================
                        CARD HEADER
                    ================================== */}

                    <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">

                      <div className="flex min-w-0 gap-3">

                        <div
                          className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-50
                            text-blue-600
                          "
                        >
                          <Package size={20} />
                        </div>


                        <div className="min-w-0">

                          <h2 className="truncate text-lg font-extrabold text-slate-900">
                            {packageTitle}
                          </h2>

                          <p className="mt-1 truncate text-sm text-slate-500">
                            {destination}
                          </p>

                        </div>

                      </div>


                      <StatusBadge
                        status={status}
                      />

                    </div>


                    {/* ==================================
                        DETAILS
                    ================================== */}

                    <div className="grid grid-cols-2 gap-5 p-5">

                      <InfoItem
                        label="Destination"
                        value={destination}
                      />

                      <InfoItem
                        label="Price"
                        value={
                          price !==
                          undefined &&
                          price !== null &&
                          price !== ""
                            ? `â‚¹${Number(
                                price
                              ).toLocaleString(
                                "en-IN"
                              )}`
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


                    {/* ==================================
                        ACTIONS
                    ================================== */}

                    <div className="flex flex-wrap gap-3 border-t border-slate-100 bg-slate-50 p-5">

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedPackage(
                            item
                          )
                        }
                        className="
                          inline-flex
                          items-center
                          gap-2
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          px-4
                          py-2.5
                          text-sm
                          font-bold
                          text-slate-700
                          transition
                          hover:bg-slate-100
                        "
                      >
                        <Eye size={16} />
                        View
                      </button>


                      {status !==
                        "approved" && (
                        <button
                          type="button"
                          disabled={
                            processingId ===
                            item.id
                          }
                          onClick={() =>
                            updateApproval(
                              item.id,
                              "approved"
                            )
                          }
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-green-600
                            px-4
                            py-2.5
                            text-sm
                            font-bold
                            text-white
                            transition
                            hover:bg-green-700
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                          "
                        >
                          <CheckCircle
                            size={16}
                          />

                          {processingId ===
                          item.id
                            ? "Processing..."
                            : "Approve"}
                        </button>
                      )}


                      {status !==
                        "rejected" && (
                        <button
                          type="button"
                          disabled={
                            processingId ===
                            item.id
                          }
                          onClick={() =>
                            updateApproval(
                              item.id,
                              "rejected"
                            )
                          }
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-red-600
                            px-4
                            py-2.5
                            text-sm
                            font-bold
                            text-white
                            transition
                            hover:bg-red-700
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                          "
                        >
                          <XCircle
                            size={16}
                          />

                          {processingId ===
                          item.id
                            ? "Processing..."
                            : "Reject"}
                        </button>
                      )}

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}

      </div>


      {/* ====================================================
          PACKAGE DETAILS MODAL
      ==================================================== */}

      <Modal
        isOpen={
          Boolean(selectedPackage)
        }
        onClose={() =>
          setSelectedPackage(null)
        }
        title="Package Details"
        size="lg"
      >

        {selectedPackage && (
          <PackageDetails
            packageData={
              selectedPackage
            }
            processing={
              processingId ===
              selectedPackage.id
            }
            onApprove={() =>
              updateApproval(
                selectedPackage.id,
                "approved"
              )
            }
            onReject={() =>
              updateApproval(
                selectedPackage.id,
                "rejected"
              )
            }
          />
        )}

      </Modal>

    </DashboardLayout>
  );
}


/* ============================================================
   STATUS BADGE
============================================================ */

function StatusBadge({ status }) {
  const config = {
    pending: {
      label: "Pending",
      variant: "warning",
    },

    approved: {
      label: "Approved",
      variant: "success",
    },

    rejected: {
      label: "Rejected",
      variant: "danger",
    },
  };

  const current =
    config[status] ||
    config.pending;

  return (
    <Badge variant={current.variant}>
      {current.label}
    </Badge>
  );
}


/* ============================================================
   INFO ITEM
============================================================ */

function InfoItem({
  label,
  value,
}) {
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


/* ============================================================
   PACKAGE DETAILS
============================================================ */

function PackageDetails({
  packageData,
  processing,
  onApprove,
  onReject,
}) {
  const packageTitle =
    packageData.package_name ||
    packageData.title ||
    packageData.name ||
    "Untitled Package";

  const destination =
    packageData.destination ||
    packageData.location ||
    "Not specified";

  const price =
    packageData.price ??
    packageData.package_price ??
    packageData.amount;

  const status =
    packageData.approval_status ||
    "pending";

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-slate-50 p-5">

        <div className="flex items-start gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <Package size={22} />
          </div>

          <div className="min-w-0 flex-1">

            <div className="flex flex-wrap items-center gap-3">

              <h3 className="text-xl font-extrabold text-slate-900">
                {packageTitle}
              </h3>

              <StatusBadge
                status={status}
              />

            </div>

            <p className="mt-1 text-sm text-slate-500">
              {destination}
            </p>

          </div>

        </div>

      </div>


      {/* Main details */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

        <InfoItem
          label="Destination"
          value={destination}
        />

        <InfoItem
          label="Price"
          value={
            price !== undefined &&
            price !== null &&
            price !== ""
              ? `â‚¹${Number(
                  price
                ).toLocaleString(
                  "en-IN"
                )}`
              : "Not specified"
          }
        />

        <InfoItem
          label="Duration"
          value={
            packageData.duration ||
            packageData.days ||
            "Not specified"
          }
        />

        <InfoItem
          label="Travel Type"
          value={
            packageData.package_type ||
            packageData.type ||
            "Tour Package"
          }
        />

        <InfoItem
          label="Created"
          value={
            packageData.created_at
              ? new Date(
                  packageData.created_at
                ).toLocaleString(
                  "en-IN"
                )
              : "Not available"
          }
        />

        <InfoItem
          label="Updated"
          value={
            packageData.updated_at
              ? new Date(
                  packageData.updated_at
                ).toLocaleString(
                  "en-IN"
                )
              : "Not available"
          }
        />

      </div>


      {/* Additional fields */}

      <div>

        <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-400">
          Package Information
        </h4>

        <div className="rounded-xl border border-slate-200 bg-white">

          <pre className="max-h-[300px] overflow-auto whitespace-pre-wrap break-words p-4 text-xs leading-6 text-slate-600">
            {JSON.stringify(
              packageData,
              null,
              2
            )}
          </pre>

        </div>

      </div>


      {/* Actions */}

      {(status !== "approved" ||
        status !== "rejected") && (
        <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5">

          {status !==
            "approved" && (
            <button
              type="button"
              onClick={onApprove}
              disabled={processing}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-green-600
                px-5
                py-2.5
                text-sm
                font-bold
                text-white
                transition
                hover:bg-green-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <CheckCircle
                size={17}
              />

              {processing
                ? "Processing..."
                : "Approve Package"}
            </button>
          )}

          {status !==
            "rejected" && (
            <button
              type="button"
              onClick={onReject}
              disabled={processing}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-red-600
                px-5
                py-2.5
                text-sm
                font-bold
                text-white
                transition
                hover:bg-red-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <XCircle
                size={17}
              />

              {processing
                ? "Processing..."
                : "Reject Package"}
            </button>
          )}

        </div>
      )}

    </div>
  );
}
