export default function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
}) {
  const colors = {
    primary: "#2563EB",
    success: "#16A34A",
    danger: "#DC2626",
    warning: "#F59E0B",
    secondary: "#64748B",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: colors[variant],
        color: "#ffffff",
        border: "none",
        padding: "12px 22px",
        borderRadius: "10px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "15px",
        fontWeight: "600",
        transition: "0.3s",
        opacity: disabled ? 0.6 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </button>
  );
}