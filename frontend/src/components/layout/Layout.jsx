import Sidebar from "./Sidebar";
import NavbarCRM from "./NavbarCRM";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* WorldTrip Connect Sidebar */}
      <Sidebar />

      {/* Main Application Area */}
      <div className="flex flex-col flex-1 ml-[260px]">

        {/* Top Navigation */}
        <NavbarCRM />

        {/* Page Area */}
        <main className="flex-1 pt-[85px] px-6 lg:px-8 pb-8">

          <div
            className="
              min-h-[calc(100vh-120px)]
              bg-white
              rounded-2xl
              border border-slate-200
              shadow-sm
              overflow-hidden
            "
          >
            {children}
          </div>

        </main>
      </div>

    </div>
  );
}