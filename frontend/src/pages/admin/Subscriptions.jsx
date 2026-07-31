import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFilteredSubscriptions(
      subscriptions.filter((subscription) =>
        (
          subscription.user_id +
          " " +
          subscription.plan_id +
          " " +
          subscription.status
        )
          .toLowerCase()
          .includes(keyword)
      )
    );
  }, [search, subscriptions]);

  async function fetchSubscriptions() {
    setLoading(true);

    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log(error);
    } else {
      setSubscriptions(data || []);
      setFilteredSubscriptions(data || []);
    }

    setLoading(false);
  }

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from("subscriptions")
      .update({ status })
      .eq("id", id);

    if (error) {
      alert("Unable to update subscription.");
      return;
    }

    fetchSubscriptions();
  }

  if (loading) {
    return (
      <h2 style={{ padding: "30px" }}>
        Loading Subscriptions...
      </h2>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      <h1>Subscription Management</h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "25px",
        }}
      >
        Manage all subscription plans and their status.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h3>
          Total Subscriptions: {filteredSubscriptions.length}
        </h3>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          borderRadius: "10px",
        }}
      >
        <thead
          style={{
            background: "#e2e8f0",
          }}
        >
          <tr>
            <th style={{ padding: "12px" }}>User</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredSubscriptions.map((subscription) => (
            <tr
              key={subscription.id}
              style={{
                borderBottom: "1px solid #eee",
              }}
            >
              <td style={{ padding: "12px" }}>
                {subscription.user_id}
              </td>

              <td>{subscription.plan_id}</td>

              <td>{subscription.status}</td>

              <td>
                {subscription.start_date
                  ? new Date(
                      subscription.start_date
                    ).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                {subscription.end_date
                  ? new Date(
                      subscription.end_date
                    ).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                {subscription.status === "active" ? (
                  <button
                    onClick={() =>
                      updateStatus(
                        subscription.id,
                        "inactive"
                      )
                    }
                    style={{
                      background: "#dc2626",
                      color: "#fff",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Deactivate
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      updateStatus(
                        subscription.id,
                        "active"
                      )
                    }
                    style={{
                      background: "#16a34a",
                      color: "#fff",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Activate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredSubscriptions.length === 0 && (
        <p
          style={{
            marginTop: "20px",
          }}
        >
          No subscriptions found.
        </p>
      )}
    </div>
  );
}

export default Subscriptions;