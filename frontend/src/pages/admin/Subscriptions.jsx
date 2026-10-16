import { useEffect, useState } from "react";
import { RefreshCw, Search } from "lucide-react";

import { supabase } from "../../services/supabase";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import Loader from "../../components/ui/Loader";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import DataTable from "../../components/ui/DataTable";

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  async function fetchSubscriptions() {
    try {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("Subscription Fetch Error:", error);
        setErrorMessage(error.message);
        setSubscriptions([]);
        return;
      }

      setSubscriptions(data || []);
    } catch (error) {
      console.error("Subscription Error:", error);
      setErrorMessage("Unable to load subscriptions.");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, status) {
    if (updatingId) return;

    try {
      setUpdatingId(id);

      const { error } = await supabase
        .from("subscriptions")
        .update({ status })
        .eq("id", id);

      if (error) {
        console.error("Subscription Status Error:", error);
        alert(error.message || "Unable to update subscription.");
        return;
      }

      await fetchSubscriptions();
    } catch (error) {
      console.error("Update Subscription Error:", error);
      alert("Something went wrong while updating the subscription.");
    } finally {
      setUpdatingId(null);
    }
  }

  const keyword = search.trim().toLowerCase();

  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const searchableText = [
      subscription.user_id,
      subscription.plan_id,
      subscription.status,
      subscription.payment_status,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(keyword);
  });

  function formatDate(date) {
    if (!date) return "â€”";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function getStatusVariant(status) {
    switch (status) {
      case "active":
        return "success";

      case "inactive":
        return "danger";

      case "trial":
        return "warning";

      case "expired":
        return "danger";

      default:
        return "default";
    }
  }

  const columns = [
    {
      key: "user_id",
      label: "User",
      render: (value) => (
        <span
          className="block max-w-[220px] truncate font-medium text-slate-700"
          title={value || ""}
        >
          {value || "â€”"}
        </span>
      ),
    },
    {
      key: "plan_id",
      label: "Plan",
      render: (value) => (
        <span
          className="block max-w-[220px] truncate text-slate-600"
          title={value || ""}
        >
          {value || "â€”"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <Badge variant={getStatusVariant(value)}>
          {value || "unknown"}
        </Badge>
      ),
    },
    {
      key: "payment_status",
      label: "Payment",
      render: (value) => (
        <Badge
          variant={
            value === "paid"
              ? "success"
              : value === "pending"
              ? "warning"
              : "default"
          }
        >
          {value || "â€”"}
        </Badge>
      ),
    },
    {
      key: "start_date",
      label: "Start Date",
      render: (value) => formatDate(value),
    },
    {
      key: "end_date",
      label: "End Date",
      render: (value) => formatDate(value),
    },
    {
      key: "id",
      label: "Action",
      render: (_, subscription) => {
        const isUpdating = updatingId === subscription.id;
        const isActive = subscription.status === "active";

        return (
          <Button
            type="button"
            variant={isActive ? "danger" : "success"}
            disabled={isUpdating}
            onClick={(event) => {
              event.stopPropagation();

              updateStatus(
                subscription.id,
                isActive ? "inactive" : "active"
              );
            }}
          >
            {isUpdating
              ? "Updating..."
              : isActive
              ? "Deactivate"
              : "Activate"}
          </Button>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="Subscription Management"
          description="Manage customer and agent subscriptions, payment status, and activation."
        />

        {/* Summary / Controls */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Subscriptions
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                {filteredSubscriptions.length}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative w-full sm:w-80">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search user, plan, status..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <Button
                type="button"
                variant="secondary"
                onClick={fetchSubscriptions}
                disabled={loading}
              >
                <span className="flex items-center gap-2">
                  <RefreshCw
                    size={16}
                    className={loading ? "animate-spin" : ""}
                  />
                  Refresh
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Error */}
        {errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {errorMessage}
          </div>
        )}

        {/* Table */}
        {loading ? (
          <Loader text="Loading subscriptions..." />
        ) : (
          <DataTable
            columns={columns}
            data={filteredSubscriptions}
            loading={false}
            emptyMessage={
              search
                ? "No subscriptions match your search."
                : "No subscriptions found."
            }
          />
        )}
      </div>
    </DashboardLayout>
  );
}

export default Subscriptions;
