import Sidebar from "./Sidebar";
import NavbarCRM from "./NavbarCRM";

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <NavbarCRM />

        <main className="p-6 bg-gray-100 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;