import Sidebar from "./Sidebar";
import NavbarCRM from "./NavbarCRM";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <Sidebar />

      {/* ==========================================
          MAIN APPLICATION AREA
      ========================================== */}

      <div className="min-h-screen lg:ml-[280px]">

        {/* ========================================
            TOP NAVBAR
        ======================================== */}

        <NavbarCRM />

        {/* ========================================
            PAGE CONTENT
        ======================================== */}

        <main
          className="
            min-h-[calc(100vh-76px)]
            bg-slate-50
            px-4
            py-6
            sm:px-6
            lg:px-8
            lg:py-8
          "
        >
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;
