export default function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No data available.",
  onRowClick,
}) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="
                    px-5
                    py-4
                    text-left
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-500
                    whitespace-nowrap
                  "
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length || 1}
                  className="px-5 py-12 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

                    <p className="text-sm font-medium text-slate-500">
                      Loading...
                    </p>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length || 1}
                  className="px-5 py-12 text-center"
                >
                  <p className="text-sm font-medium text-slate-500">
                    {emptyMessage}
                  </p>
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id ?? rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className={`
                    border-b
                    border-slate-100
                    last:border-b-0
                    transition
                    ${
                      onRowClick
                        ? "cursor-pointer hover:bg-slate-50"
                        : "hover:bg-slate-50/70"
                    }
                  `}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="
                        px-5
                        py-4
                        text-sm
                        text-slate-700
                        align-middle
                      "
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
