"use client";

type Column<T> = {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  onDelete?: (row: T) => void;
  onToggle?: (row: T) => void;
  onEdit?: (row: T) => void;
};

export default function DataTable<T extends { id: string; active?: boolean }>({
  data,
  columns,
  onDelete,
  onToggle,
  onEdit,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-xl">
      <table className="w-full text-sm">
        <thead className="text-gray-600 bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-3 text-left">
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-t">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3">
                  {col.render ? col.render(row) : String(row[col.key])}
                </td>
              ))}

              <td className="px-4 py-3 space-x-3 text-right">
                {onToggle && (
                  <button
                    onClick={() => onToggle(row)}
                    className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200"
                  >
                    {row.active ? "Deactivate" : "Activate"}
                  </button>
                )}

                {onEdit && (
                  <button
                    onClick={() => onEdit(row)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                )}

                {onDelete && (
                  <button
                    onClick={() => onDelete(row)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="py-10 text-center text-gray-500"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
