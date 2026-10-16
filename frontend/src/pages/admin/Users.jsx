import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Search } from "lucide-react";

import { supabase } from "../../services/supabase";
import DashboardLayout from "../../components/layout/DashboardLayout";
import PageHeader from "../../components/ui/PageHeader";
import Loader from "../../components/ui/Loader";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import DataTable from "../../components/ui/DataTable";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("Users Fetch Error:", error);
        setErrorMessage(error.message);
        setUsers([]);
        return;
      }

      setUsers(data || []);
    } catch (error) {
      console.error("Users Error:", error);
      setErrorMessage("Unable to load users.");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, status) {
    if (updatingId) return;

    try {
      setUpdatingId(id);

      const { error } = await supabase
        .from("profiles")
        .update({
          status,
        })
        .eq("id", id);

      if (error) {
        console.error("User Status Error:", error);
        alert(error.message || "Unable to update user status.");
        return;
      }

      await fetchUsers();
    } catch (error) {
      console.error("Update User Error:", error);
      alert("Something went wrong while updating the user.");
    } finally {
      setUpdatingId(null);
    }
  }

  const filteredUsers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return users;
    }

    return users.filter((user) => {
      const searchableText = [
        user.full_name,
        user.email,
        user.phone_number,
        user.role,
        user.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(keyword);
    });
  }, [users, search]);

  function getRoleLabel(role) {
    const roleLabels = {
      admin: "Admin",
      administrator: "Administrator",
      super_admin: "Super Admin",
      staff: "Staff",
      travel_agent: "Travel Agent",
      b2b_agent: "B2B Agent",
      agent: "Agent",
      customer: "Customer",
    };

    return roleLabels[role] || role || "Unknown";
  }

  function getRoleVariant(role) {
    switch (role) {
      case "admin":
      case "administrator":
      case "super_admin":
        return "danger";

      case "staff":
        return "warning";

      case "travel_agent":
      case "b2b_agent":
      case "agent":
        return "primary";

      case "customer":
        return "info";

      default:
        return "default";
    }
  }

  const columns = [
    {
      key: "full_name",
      label: "Name",
      render: (value) => (
        <div className="font-semibold text-slate-900">
          {value || "â€”"}
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (value) => (
        <span className="text-slate-600">
          {value || "â€”"}
        </span>
      ),
    },
    {
      key: "phone_number",
      label: "Phone",
      render: (value) => (
        <span className="text-slate-600">
          {value || "â€”"}
        </span>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (value) => (
        <Badge variant={getRoleVariant(value)}>
          {getRoleLabel(value)}
        </Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <Badge
          variant={
            value === "active"
              ? "success"
              : "danger"
          }
        >
          {value || "unknown"}
        </Badge>
      ),
    },
    {
      key: "id",
      label: "Action",
      render: (_, user) => {
        const isUpdating = updatingId === user.id;
        const isActive = user.status === "active";

        return (
          <Button
            type="button"
            variant={isActive ? "danger" : "success"}
            disabled={isUpdating}
            onClick={(event) => {
              event.stopPropagation();

              updateStatus(
                user.id,
                isActive ? "inactive" : "active"
              );
            }}
          >
            {isUpdating
              ? "Updating..."
              : isActive
              ? "Disable"
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
          title="User & Team Management"
          description="Manage Admin, Staff, Travel Agents and Customers."
        />

        {/* Controls */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Users
              </p>

              <p className="mt-1 text-3xl font-bold text-slate-900">
                {filteredUsers.length}
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
                  placeholder="Search name, email, role..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <Button
                type="button"
                variant="secondary"
                onClick={fetchUsers}
                disabled={loading}
              >
                <span className="flex items-center gap-2">
                  <RefreshCw
                    size={16}
                    className={
                      loading ? "animate-spin" : ""
                    }
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

        {/* Users Table */}
        {loading ? (
          <Loader text="Loading users..." />
        ) : (
          <DataTable
            columns={columns}
            data={filteredUsers}
            loading={false}
            emptyMessage={
              search
                ? "No users match your search."
                : "No users found."
            }
          />
        )}
      </div>
    </DashboardLayout>
  );
}

export default Users;
