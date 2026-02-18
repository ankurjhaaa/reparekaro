import React from 'react';
import { BarChart, AreaChart, PieChart } from 'lucide-react';

export default function ChartPlaceholder({ type = 'bar', title }) {
    return (
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 min-h-[300px]">
            {type === 'bar' && <BarChart className="w-12 h-12 text-gray-300 mb-3" />}
            {type === 'area' && <AreaChart className="w-12 h-12 text-gray-300 mb-3" />}
            {type === 'pie' && <PieChart className="w-12 h-12 text-gray-300 mb-3" />}
            <p className="text-gray-500 font-medium">{title || 'Chart Area'}</p>
            <p className="text-xs text-gray-400 mt-1">Visualization placeholder</p>
        </div>
    );
}
