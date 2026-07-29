import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

function Subscriptions() {
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("id, user_id, plan_id, status, start_date, end_date")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setSubscriptions(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h2 style={{ padding: "40px" }}>
        Loading subscriptions...
      </h2>
    );
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Subscriptions</h1>
      <p>Review and manage active subscriptions for your platform.</p>

      {subscriptions.length === 0 ? (
        <p>No subscriptions found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "20px",
            marginTop: "30px"
          }}
        >
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              style={{
                background: "#fff",
                color: "#000",
                padding: "25px",
                borderRadius: "12px"
              }}
            >
              <h2>Subscription #{subscription.id}</h2>
              <p>
                <strong>User ID:</strong> {subscription.user_id}
              </p>
              <p>
                <strong>Plan ID:</strong> {subscription.plan_id}
              </p>
              <p>
                <strong>Status:</strong> {subscription.status}
              </p>
              <p>
                <strong>Start:</strong>{" "}
                {subscription.start_date
                  ? new Date(subscription.start_date).toLocaleDateString()
                  : "-"}
              </p>
              <p>
                <strong>End:</strong>{" "}
                {subscription.end_date
                  ? new Date(subscription.end_date).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Subscriptions;
