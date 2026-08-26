export default function PageHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <div className="mb-8">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

        <div className="min-w-0">

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              {subtitle}
            </p>
          )}

        </div>

        {action && (
          <div className="shrink-0">
            {action}
          </div>
        )}

      </div>

    </div>
  );
}