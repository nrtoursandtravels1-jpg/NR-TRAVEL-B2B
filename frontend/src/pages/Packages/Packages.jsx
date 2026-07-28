import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

function Packages() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Tour Packages</h1>
          <p className="text-gray-400 mt-1">
            Manage all your tour packages
          </p>
        </div>

        <Link
          to="/packages/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
        >
          <Plus size={18} />
          Create Package
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
        <div className="bg-slate-800 rounded-xl p-5">
          <h2 className="text-gray-400">Total Packages</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-5">
          <h2 className="text-gray-400">Upcoming Tours</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-5">
          <h2 className="text-gray-400">Group Tours</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-slate-800 rounded-xl p-5">
          <h2 className="text-gray-400">Custom Tours</h2>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
      </div>

      {/* Table Placeholder */}
      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Package List
        </h2>

        <p className="text-gray-400">
          No packages available.
        </p>
      </div>
    </div>
  );
}

export default Packages;