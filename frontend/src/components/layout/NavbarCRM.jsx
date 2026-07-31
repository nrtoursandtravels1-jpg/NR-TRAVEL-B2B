import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

function NavbarCRM() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <header
      style={{
        height: "70px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 25px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: "#0f172a",
          }}
        >
          NR Tours & Travels CRM
        </h2>

        <small style={{ color: "#64748b" }}>
          Travel Management System
        </small>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <span
          style={{
            fontWeight: "600",
            color: "#334155",
          }}
        >
          Admin
        </span>

        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background: "#dc2626",
            color: "#fff",
            fontWeight: "600",
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default NavbarCRM;