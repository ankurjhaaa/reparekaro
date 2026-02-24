import React from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { BarChart, PieChart, Activity, TrendingUp, DollarSign, Calendar, CheckCircle } from 'lucide-react';
import { usePage } from '@inertiajs/react';

export default function Reports() {
    const { stats, topTechnicians } = usePage().props;

    const cards = [
        { label: 'Total Revenue', value: `₹${stats?.totalRevenue || 0}`, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { label: 'Total Bookings', value: stats?.totalBookings || 0, icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Completed', value: stats?.completedBookings || 0, icon: CheckCircle, color: 'text-purple-500', bg: 'bg-purple-50' },
        { label: 'Cancelled', value: stats?.cancelledBookings || 0, icon: Activity, color: 'text-red-500', bg: 'bg-red-50' },
    ];

    return (
        <VendorLayout title="Analytics & Reports">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Analytics Overview</h1>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Track your business performance and technician metrics</p>
                </div>
                <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white border border-gray-200 shadow-sm text-[10px] sm:text-xs font-bold text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1.5 sm:gap-2">
                    <BarChart size={14} className="text-gray-400 sm:w-4 sm:h-4" />
                    Download CSV
                </button>
            </div>

            {/* Top Level Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                {cards.map((card, i) => (
                    <div key={i} className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-blue-100 transition-colors">
                        <div>
                            <p className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5 sm:mb-1">{card.label}</p>
                            <h3 className="text-lg sm:text-xl font-black text-gray-900">{card.value}</h3>
                        </div>
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${card.bg} ${card.color} group-hover:scale-110 transition-transform`}>
                            <card.icon size={20} className="sm:w-6 sm:h-6" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Revenue Overview Placeholder */}
                <div className="lg:col-span-2 bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <h3 className="font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                        <TrendingUp size={16} className="text-(--primary) sm:w-5 sm:h-5" /> Monthly Revenue Trend
                    </h3>
                    <div className="flex-1 flex flex-col items-center justify-center text-center bg-gray-50 rounded-lg sm:rounded-xl border border-gray-100/50 p-4 sm:p-6 min-h-[250px] sm:min-h-[300px]">
                        <BarChart size={40} className="text-gray-300 mb-3 sm:mb-4 sm:w-12 sm:h-12" />
                        <h3 className="text-base sm:text-lg font-bold text-gray-400 mb-1">More data needed</h3>
                        <p className="text-[10px] sm:text-xs text-gray-400 max-w-xs">We are collecting more data to build your long-term revenue chart. Check back soon!</p>
                    </div>
                </div>

                {/* Top Technicians List */}
                <div className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <h3 className="font-bold text-gray-900 mb-4 sm:mb-5 flex items-center justify-between text-sm sm:text-base">
                        <span className="flex items-center gap-1.5 sm:gap-2"><Activity size={16} className="text-emerald-500 sm:w-5 sm:h-5" /> Top Technicians</span>
                        <span className="text-[9px] sm:text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded font-bold uppercase tracking-wider">By Jobs</span>
                    </h3>
                    <div className="space-y-3 sm:space-y-4 flex-1">
                        {topTechnicians && topTechnicians.length > 0 ? (
                            topTechnicians.map((tech, i) => (
                                <div key={tech.id} className="flex items-center gap-3 sm:gap-4 group">
                                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold ${i === 0 ? 'bg-yellow-100 text-yellow-700' : i === 1 ? 'bg-gray-100 text-gray-700' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-blue-50 text-blue-600'}`}>
                                        #{i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xs sm:text-sm font-bold text-gray-900">{tech.name}</h4>
                                        <p className="text-[10px] sm:text-xs text-gray-500">{tech.completed_jobs} Jobs Completed</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs sm:text-sm font-black text-(--primary)">
                                            {tech.rating ? `${tech.rating}★` : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-6 sm:py-8 text-gray-400 text-[10px] sm:text-xs">
                                No technician data available yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </VendorLayout>
    );
}
