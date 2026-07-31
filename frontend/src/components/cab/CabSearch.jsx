export default function CabSearch({
  search,
  setSearch,
}) {
  return (
    <div className="mb-6">

      <input
        type="text"
        placeholder="Search by Customer, Mobile, Vehicle..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-lg p-3"
      />

    </div>
  );
}