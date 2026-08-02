export default function PageHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            color: "#0F172A",
            fontSize: "32px",
            fontWeight: "700",
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            style={{
              marginTop: "8px",
              color: "#64748B",
              fontSize: "16px",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {action && action}
    </div>
  );
}