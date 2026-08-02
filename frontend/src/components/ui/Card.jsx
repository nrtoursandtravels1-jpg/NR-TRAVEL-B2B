export default function Card({ title, children }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 8px 25px rgba(15,23,42,.08)",
        border: "1px solid #e2e8f0",
        marginBottom: "20px",
      }}
    >
      {title && (
        <h3
          style={{
            marginTop: 0,
            marginBottom: "20px",
            color: "#0f172a",
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          {title}
        </h3>
      )}

      {children}
    </div>
  );
}