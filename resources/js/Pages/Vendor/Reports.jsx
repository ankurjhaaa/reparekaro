import React from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { BarChart, PieChart, Activity } from 'lucide-react';

export default function Reports() {
    return (
        <VendorLayout title="Reports">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Financial Reports</h1>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center h-64 mb-6">
                <BarChart size={48} className="text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-gray-400">Revenue Chart Placeholder</h3>
                <p className="text-sm text-gray-300">Detailed graphs coming soon</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <PieChart size={20} className="text-blue-500" /> Category Breakdown
                    </h3>
                    <div className="space-y-3">
                        {['AC Repair', 'Plumbing', 'Electrical'].map((cat, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{cat}</span>
                                <div className="flex-1 mx-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full bg-blue-500 w-[${Math.random() * 80 + 10}%]`}></div>
                                </div>
                                <span className="text-xs font-bold text-gray-900">34%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Activity size={20} className="text-green-500" /> Performance
                    </h3>
                    <p className="text-sm text-gray-500">Top Performing Technician: <span className="font-bold text-gray-900">Rahul Sharma</span></p>
                </div>
            </div>
        </VendorLayout>
    );
}
