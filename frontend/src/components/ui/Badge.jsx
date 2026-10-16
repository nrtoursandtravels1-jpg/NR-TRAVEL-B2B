export default function Badge({
  children,
  variant = "default",
}) {
  const variants = {
    default: "bg-slate-100 text-slate-700",
    primary: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
    danger: "bg-red-100 text-red-700",
    warning: "bg-amber-100 text-amber-700",
    info: "bg-cyan-100 text-cyan-700",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        whitespace-nowrap
        ${variants[variant] || variants.default}
      `}
    >
      {children}
    </span>
  );
}
