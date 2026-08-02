import { Search } from "lucide-react";

export default function BookingSearch({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "320px",
        marginBottom: "20px",
      }}
    >
      <Search
        size={18}
        style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#64748b",
        }}
      />

      <input
        type="text"
        placeholder="Search booking..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        style={{
          width: "100%",
          padding: "12px 12px 12px 40px",
          borderRadius: "10px",
          border: "1px solid #cbd5e1",
          outline: "none",
          fontSize: "14px",
        }}
      />
    </div>
  );
}