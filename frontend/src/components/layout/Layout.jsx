import Sidebar from "./Sidebar";
import NavbarCRM from "./NavbarCRM";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-1 ml-[260px]">

        {/* Header */}
        <NavbarCRM />

        <main className="flex-1 pt-[85px] px-8 pb-8">
        {/* Page Content */}

          <div className="bg-white rounded-2xl shadow-md p-8 min-h-[calc(100vh-120px)]">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}