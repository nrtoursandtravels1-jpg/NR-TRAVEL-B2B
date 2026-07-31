export default function PackageSearch({
  search,
  setSearch,
}) {
  return (
    <div
      style={{
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        placeholder="🔍 Search package by name or destination..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "12px 16px",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          fontSize: "15px",
          outline: "none",
        }}
      />
    </div>
  );
}