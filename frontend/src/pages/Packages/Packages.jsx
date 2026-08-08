import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { supabase } from "../../services/supabase";

import PackageSearch from "../../components/package/PackageSearch";
import PackageTable from "../../components/package/PackageTable";

function Packages() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [viewMode, setViewMode] = useState("table");

  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    group: 0,
    custom: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  async function loadStatistics() {
    setLoadingStats(true);

    try {
      const { data, error } = await supabase
        .from("tour_packages")
        .select("*");

      if (error) {
        console.error("PACKAGE STATS ERROR:", error);
        return;
      }

      const packages = data || [];

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const upcomingPackages = packages.filter((pkg) => {
        if (!pkg.start_date) return false;

        const startDate = new Date(pkg.start_date);

        if (Number.isNaN(startDate.getTime())) {
          return false;
        }

        startDate.setHours(0, 0, 0, 0);

        return startDate >= today && pkg.status !== "Inactive";
      });

      setStats({
        total: packages.length,

        upcoming: upcomingPackages.length,

        group: packages.filter(
          (pkg) =>
            pkg.package_type === "Group Tour" ||
            pkg.package_type === "Group"
        ).length,

        custom: packages.filter(
          (pkg) =>
            pkg.package_type === "Custom Tour" ||
            pkg.package_type === "Custom"
        ).length,
      });
    } catch (error) {
      console.error("STATISTICS ERROR:", error);
    } finally {
      setLoadingStats(false);
    }
  }

  const cardStyle = {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
  };

  const numberStyle = {
    margin: "8px 0 0",
    fontSize: "30px",
    fontWeight: "700",
    color: "#0f172a",
  };

  return (
    <div
      style={{
        padding: "30px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* ================= HEADER ================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              color: "#0f172a",
              fontSize: "30px",
              fontWeight: "700",
            }}
          >
            Tour Package Management
          </h1>

          <p
            style={{
              color: "#64748b",
              marginTop: "8px",
              marginBottom: 0,
            }}
          >
            Create, edit and manage travel packages.
          </p>
        </div>

        <Link
          to="/packages/create"
          style={{
            background: "#2563eb",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "600",
          }}
        >
          <Plus size={18} />
          Create Package
        </Link>
      </div>

      {/* ================= STATISTICS ================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {/* TOTAL */}

        <div style={cardStyle}>
          <h3
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Total Packages
          </h3>

          <h2 style={numberStyle}>
            {loadingStats ? "..." : stats.total}
          </h2>
        </div>

        {/* UPCOMING */}

        <div style={cardStyle}>
          <h3
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Upcoming Tours
          </h3>

          <h2 style={numberStyle}>
            {loadingStats ? "..." : stats.upcoming}
          </h2>
        </div>

        {/* GROUP */}

        <div style={cardStyle}>
          <h3
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Group Tours
          </h3>

          <h2 style={numberStyle}>
            {loadingStats ? "..." : stats.group}
          </h2>
        </div>

        {/* CUSTOM */}

        <div style={cardStyle}>
          <h3
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "15px",
            }}
          >
            Custom Tours
          </h3>

          <h2 style={numberStyle}>
            {loadingStats ? "..." : stats.custom}
          </h2>
        </div>
      </div>

      {/* ================= PACKAGE LIST ================= */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          padding: "25px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          border: "1px solid #e2e8f0",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: "20px",
            color: "#0f172a",
          }}
        >
          Package List
        </h2>

        {/* SEARCH */}

        <PackageSearch
          search={search}
          setSearch={setSearch}
        />

        {/* FILTER + VIEW CONTROLS */}

        <div
          style={{
            marginTop: "15px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {/* FILTER */}

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              color: "#0f172a",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            <option value="All">
              All Packages
            </option>

            <option value="Domestic">
              Domestic
            </option>

            <option value="International">
              International
            </option>

            <option value="Featured">
              Featured
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

          {/* TABLE VIEW */}

          <button
            type="button"
            onClick={() => setViewMode("table")}
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background:
                viewMode === "table"
                  ? "#2563eb"
                  : "#e5e7eb",
              color:
                viewMode === "table"
                  ? "#ffffff"
                  : "#000000",
              fontWeight: "600",
            }}
          >
            📋 Table View
          </button>

          {/* CARD VIEW */}

          <button
            type="button"
            onClick={() => setViewMode("card")}
            style={{
              padding: "10px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background:
                viewMode === "card"
                  ? "#2563eb"
                  : "#e5e7eb",
              color:
                viewMode === "card"
                  ? "#ffffff"
                  : "#000000",
              fontWeight: "600",
            }}
          >
            🖼 Card View
          </button>
        </div>

        {/* ================= PACKAGE TABLE ================= */}

        <PackageTable
          search={search}
          filter={filter}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
}

export default Packages;