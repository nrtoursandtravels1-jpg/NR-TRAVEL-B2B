import Sidebar from "./Sidebar";
import NavbarCRM from "./NavbarCRM";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 antialiased">
      {/* FIXED APPLICATION SIDEBAR */}
      <Sidebar />

      {/* MAIN APPLICATION AREA */}
      <div className="min-h-screen lg:ml-[280px]">
        {/* TOP NAVIGATION */}
        <NavbarCRM />

        {/* PAGE CONTENT */}
        <main className="min-h-[calc(100vh-76px)] px-3 py-5 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-[1600px]">
            <div className="min-w-0">
              {children}
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="border-t border-slate-200/80 bg-white/80 px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-1 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} WorldTrip Connect</span>
            <span>Built for smarter travel business management</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default DashboardLayout;