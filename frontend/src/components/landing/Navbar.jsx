import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const resize = () => setMobile(window.innerWidth < 768);

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        background: "rgba(15,23,42,.75)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "16px 25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}

        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#fff",
            fontWeight: "700",
            fontSize: mobile ? "22px" : "28px",
            letterSpacing: "1px",
          }}
        >
          🌍 WorldTrip Connect
        </Link>

        {/* Mobile Menu Button */}

        {mobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "transparent",
              color: "#fff",
              border: "none",
              fontSize: "30px",
              cursor: "pointer",
            }}
          >
            ☰
          </button>
        )}

        {/* Desktop Menu */}

        {!mobile && (
          <>
            <nav
              style={{
                display: "flex",
                gap: "30px",
                alignItems: "center",
              }}
            >
              <Link to="/" style={linkStyle}>Home</Link>

              <Link to="/packages" style={linkStyle}>Packages</Link>

              <Link to="/hotel" style={linkStyle}>Hotels</Link>

              <Link to="/about" style={linkStyle}>About</Link>

              <Link to="/contact" style={linkStyle}>Contact</Link>
            </nav>

            <div
              style={{
                display: "flex",
                gap: "12px",
              }}
            >
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "#fff",
                  border: "1px solid #fff",
                  padding: "10px 18px",
                  borderRadius: "8px",
                }}
              >
                Login
              </Link>

              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  background: "#2563eb",
                  color: "#fff",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  fontWeight: "600",
                }}
              >
                Register
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Mobile Menu */}

      {mobile && menuOpen && (
        <div
          style={{
            background: "#0f172a",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            gap: "15px",
          }}
        >
          <Link to="/" style={mobileLink}>Home</Link>

          <Link to="/packages" style={mobileLink}>Packages</Link>

          <Link to="/hotel" style={mobileLink}>Hotels</Link>

          <Link to="/about" style={mobileLink}>About</Link>

          <Link to="/contact" style={mobileLink}>Contact</Link>

          <hr />

          <Link to="/login" style={mobileLink}>Login</Link>

          <Link to="/register" style={mobileLink}>Register</Link>
        </div>
      )}
    </header>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#fff",
  fontWeight: "500",
};

const mobileLink = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "18px",
};

export default Navbar;