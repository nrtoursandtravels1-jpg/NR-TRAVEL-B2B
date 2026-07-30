export default function PackageSearch({
  search,
  setSearch,
}) {
  return (
    <div className="mb-5">

      <input
        type="text"
        placeholder="Search package..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full md:w-96 p-3 rounded-lg border border-gray-300 text-black focus:outline-none"
      />

    </div>
  );
}