import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { supabase } from "../../services/supabase";

import PackageSearch from "../../components/package/PackageSearch";
import PackageTable from "../../components/package/PackageTable";

function Packages() {
  const [search, setSearch] = useState("");

  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    group: 0,
    custom: 0,
  });

  useEffect(() => {
    loadStatistics();
  }, []);

  async function loadStatistics() {
    try {
      const { count } = await supabase
        .from("packages")
        .select("*", {
          count: "exact",
          head: true,
        });

      setStats({
        total: count || 0,
        upcoming: 0,
        group: 0,
        custom: 0,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const cardStyle = {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,.08)",
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              color: "#0f172a",
            }}
          >
            Tour Package Management
          </h1>

          <p
            style={{
              color: "#64748b",
              marginTop: "8px",
            }}
          >
            Create, edit and manage travel packages.
          </p>
        </div>

        <Link
          to="/packages/create"
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Plus size={18} />
          Create Package
        </Link>
      </div>

      {/* Statistics */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Packages</h3>
          <h1>{stats.total}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Upcoming Tours</h3>
          <h1>{stats.upcoming}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Group Tours</h3>
          <h1>{stats.group}</h1>
        </div>

        <div style={cardStyle}>
          <h3>Custom Tours</h3>
          <h1>{stats.custom}</h1>
        </div>
      </div>

      {/* Package List */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          padding: "25px",
          boxShadow: "0 2px 8px rgba(0,0,0,.08)",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          Package List
        </h2>

        <PackageSearch
          search={search}
          setSearch={setSearch}
        />

        <div
          style={{
            marginTop: "25px",
          }}
        >
          <PackageTable
            search={search}
          />
        </div>
      </div>
    </div>
  );
}

export default Packages;