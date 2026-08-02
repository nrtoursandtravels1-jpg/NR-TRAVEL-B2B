import Sidebar from "./Sidebar";
import NavbarCRM from "./NavbarCRM";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="flex flex-1 flex-col ml-[260px]">

        {/* Navbar */}
        <NavbarCRM />

        {/* Main Content */}
        <main className="flex-1 mt-[75px] p-8 overflow-y-auto bg-slate-100">

          <div className="bg-white rounded-2xl shadow-lg p-8 min-h-[calc(100vh-140px)]">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}