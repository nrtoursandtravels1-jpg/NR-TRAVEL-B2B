export default function StatCard({
  title,
  value,
  color = "bg-blue-600",
  icon = "📊",
}) {
  return (
    <div
      className="
      bg-gradient-to-br 
      from-white
       to-slate-50
      rounded-2xl
      p-6
      shadow-lg
      hover:shadow-2xl
      hover:-translate-y-1
      transition-all
      duration-300
      border
      border-slate-200
    "
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-slate-800 mt-2">
            {value}
          </h2>

        </div>

        <div
          className={`
            ${color}
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            text-3xl
            text-white
            shadow-md
          `}
        >
          {icon}
        </div>

      </div>

      <div className="mt-5 border-t border-slate-200 pt-3 flex justify-between">

        <span className="text-green-600 font-semibold text-sm">
              ↗ Growth
        </span>

        <span className="text-slate-400 text-sm">
          This Month
        </span>

      </div>

    </div>
  );
}