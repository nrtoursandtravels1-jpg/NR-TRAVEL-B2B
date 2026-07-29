import Sidebar from "./Sidebar";
import NavbarCRM from "./NavbarCRM";

export default function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          background: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <NavbarCRM />

        <div style={{ padding: "30px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}