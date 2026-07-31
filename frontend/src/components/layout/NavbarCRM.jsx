import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";

function NavbarCRM() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: "260px",
        right: 0,
        height: "75px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        zIndex: 999,
        boxShadow: "0 2px 10px rgba(0,0,0,.05)",
      }}
    >
      {/* Left */}

      <div>
        <h2
          style={{
            margin: 0,
            color: "#0f172a",
            fontSize: "24px",
          }}
        >
          NR Tours & Travels
        </h2>

        <small
          style={{
            color: "#64748b",
            fontSize: "13px",
          }}
        >
          Complete Travel ERP System
        </small>
      </div>

      {/* Center */}

      <div
        style={{
          background: "#f8fafc",
          padding: "10px 20px",
          borderRadius: "10px",
          color: "#334155",
          fontWeight: "600",
        }}
      >
        📅 {today}
      </div>

      {/* Right */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "#2563eb",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "700",
            fontSize: "18px",
          }}
        >
          A
        </div>

        <div>
          <div
            style={{
              fontWeight: "700",
              color: "#0f172a",
            }}
          >
            Administrator
          </div>

          <small
            style={{
              color: "#64748b",
            }}
          >
            Super Admin
          </small>
        </div>

        <button
          onClick={handleLogout}
          style={{
            background: "#dc2626",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            cursor: "pointer",
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