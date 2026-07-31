import { Search } from "lucide-react";

export default function PackageSearch({
  search,
  setSearch,
}) {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-6">

      <div className="relative">

        <Search
          size={20}
          className="absolute left-3 top-3 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search Package or Destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

    </div>
  );
}