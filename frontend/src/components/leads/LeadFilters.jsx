export default function LeadFilters({
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "14px",
        marginBottom: "20px",
        display: "flex",
        gap: "20px",
        alignItems: "center",
        flexWrap: "wrap",
        boxShadow: "0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      <label style={{ fontWeight: "600" }}>
        Lead Status
      </label>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        style={{
          padding: "10px 14px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
        }}
      >
        <option value="">All</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Follow Up">Follow Up</option>
        <option value="Booked">Booked</option>
        <option value="Lost">Lost</option>
      </select>
    </div>
  );
}