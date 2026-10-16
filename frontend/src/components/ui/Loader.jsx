export default function Loader({
  size = "md",
  text = "Loading...",
  fullScreen = false,
}) {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`
          ${sizes[size] || sizes.md}
          animate-spin
          rounded-full
          border-slate-200
          border-t-blue-600
        `}
      />

      {text && (
        <p className="text-sm font-medium text-slate-500">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        {content}
      </div>
    );
  }

  return (
    <div className="flex min-h-[200px] items-center justify-center">
      {content}
    </div>
  );
}
