import React from 'react';

export default function DataTable({ columns, data, actions }) {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className="px-4 py-3 text-left font-medium text-gray-900 whitespace-nowrap"
                            >
                                {col.header}
                            </th>
                        ))}
                        {actions && <th className="px-4 py-3 text-right">Actions</th>}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.map((row, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
                            {columns.map((col, colIdx) => (
                                <td key={colIdx} className="px-4 py-3 text-gray-700 whitespace-nowrap">
                                    {col.render ? col.render(row) : row[col.accessor]}
                                </td>
                            ))}
                            {actions && (
                                <td className="px-4 py-3 text-right">
                                    {actions(row)}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length === 0 && (
                <div className="p-4 text-center text-gray-500">No data available</div>
            )}
        </div>
    );
}
