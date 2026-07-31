import Sidebar from "./Sidebar";
import NavbarCRM from "./NavbarCRM";

export default function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#eef2f7",
      }}
    >
      {/* Sidebar */}

      <Sidebar />

      {/* Right Side */}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          marginLeft: "260px",
        }}
      >
        {/* Top Navbar */}

        <NavbarCRM />

        {/* Main Content */}

        <main
          style={{
            flex: 1,
            padding: "35px",
            marginTop: "75px",
            overflowY: "auto",
            background: "#f8fafc",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "30px",
              boxShadow: "0 4px 15px rgba(0,0,0,.08)",
              minHeight: "calc(100vh - 150px)",
            }}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}