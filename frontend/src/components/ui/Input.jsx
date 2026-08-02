export default function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "#334155",
            fontWeight: "600",
            fontSize: "14px",
          }}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%",
          padding: "12px 16px",
          border: "1px solid #CBD5E1",
          borderRadius: "10px",
          fontSize: "15px",
          background: "#FFFFFF",
          color: "#0F172A",
          outline: "none",
          boxSizing: "border-box",
        }}
        onFocus={(e) => {
          e.target.style.border = "1px solid #2563EB";
        }}
        onBlur={(e) => {
          e.target.style.border = "1px solid #CBD5E1";
        }}
      />
    </div>
  );
}