export default function BusSearch({
  search,
  setSearch,
}) {
  return (
    <div className="mb-6">

      <input
        type="text"
        placeholder="Search by Customer, Mobile, Bus Operator..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-lg p-3"
      />

    </div>
  );
}