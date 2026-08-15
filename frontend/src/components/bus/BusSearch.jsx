export default function BusSearch({ search, setSearch }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "18px",
        borderRadius: "14px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <input
        type="text"
        placeholder="Search by Customer, Mobile, Bus Operator..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg p-3"
        style={{
          outline: "none",
          fontSize: "15px",
        }}
      />
    </div>
  );
}