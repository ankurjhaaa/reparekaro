import React from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { DollarSign, Users, Briefcase, TrendingUp, UserCheck, Calendar } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { stats: backendStats, recentBookings, revenueChart } = usePage().props;

    // Map dynamic stats
    const stats = [
        { label: 'Total Revenue', value: `₹${backendStats.revenue || 0}`, change: '+12% this week', icon: DollarSign, color: 'bg-green-100 text-green-600', trend: 'up' },
        { label: 'Active Jobs', value: backendStats.activeJobs || 0, change: 'Currently active', icon: Briefcase, color: 'bg-blue-100 text-blue-600', trend: 'neutral' },
        { label: 'Technicians', value: backendStats.techniciansCount || 0, change: 'Available staff', icon: UserCheck, color: 'bg-purple-100 text-purple-600', trend: 'neutral' },
        { label: 'Total Bookings', value: backendStats.totalBookings || 0, change: '+5% this week', icon: Calendar, color: 'bg-orange-100 text-orange-600', trend: 'up' },
    ];

    // Chart processing
    const maxRevenue = revenueChart && revenueChart.length > 0 ? Math.max(...revenueChart.map(r => r.total)) : 1;

    return (
        <VendorLayout title="Dashboard">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white/80 backdrop-blur-xl p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-white/60 hover:shadow-[0_4px_15px_rgb(0,0,0,0.05)] transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/20 to-white/0 rounded-bl-full pointer-events-none -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-[10px] sm:text-xs font-semibold text-gray-500 mb-1">{stat.label}</p>
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">{stat.value}</h3>
                            </div>
                            <div className={`p-2.5 sm:p-3 rounded-xl shadow-inner ${stat.color}`}>
                                <stat.icon size={20} className="sm:w-[22px] sm:h-[22px]" strokeWidth={2.5} />
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-5 flex items-center text-[10px] sm:text-xs font-semibold text-gray-500 relative z-10">
                            {stat.trend === 'up' && <TrendingUp size={14} className="text-emerald-500 mr-1.5" />}
                            {stat.change}
                        </div>
                    </div>
                ))}
            </div>

            {/* Middle Section: Chart and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
                {/* Revenue Chart */}
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 p-4 sm:p-5">
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                        <div>
                            <h2 className="text-base sm:text-lg font-bold text-gray-900">Revenue Overview</h2>
                            <p className="text-[10px] sm:text-xs text-gray-500">Last 7 Days</p>
                        </div>
                    </div>

                    <div className="h-56 sm:h-64 flex items-end gap-2 sm:gap-4 relative pt-4 sm:pt-6">
                        {/* Y-axis guidelines */}
                        <div className="absolute inset-0 flex flex-col justify-between pt-4 sm:pt-6 pb-6 pointer-events-none">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="border-b border-gray-100/60 w-full h-0"></div>
                            ))}
                        </div>

                        {revenueChart && revenueChart.length > 0 ? revenueChart.map((item, index) => {
                            const heightPercent = Math.max((item.total / maxRevenue) * 100, 4);
                            const dateObj = new Date(item.date);
                            const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
                            return (
                                <div key={index} className="flex-1 flex flex-col items-center group relative z-10 h-full justify-end pb-6 sm:pb-8">
                                    <div className="absolute -top-8 sm:-top-10 bg-gray-900 text-white text-[10px] sm:text-xs py-1 px-1.5 sm:px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                        ₹{item.total}
                                    </div>
                                    <div
                                        className="w-full max-w-[32px] sm:max-w-[48px] bg-gradient-to-t from-blue-600/80 to-blue-400 rounded-t-sm transition-all duration-500 group-hover:brightness-110 shadow-sm relative after:absolute after:inset-x-0 after:bottom-0 after:h-1/2 after:bg-gradient-to-t after:from-black/10 after:to-transparent"
                                        style={{ height: `${heightPercent}%` }}
                                    ></div>
                                    <span className="text-[9px] sm:text-[10px] font-semibold text-gray-500 mt-2 sm:mt-3 absolute bottom-0">{dayName}</span>
                                </div>
                            );
                        }) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 pb-6 sm:pb-8 z-10">
                                <DollarSign size={24} className="mb-2 opacity-50 sm:w-8 sm:h-8" />
                                <p className="text-xs sm:text-sm font-semibold">No finished revenue this week</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions / Tips */}
                <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 text-white relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                    <div className="relative z-10">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 border border-white/20 backdrop-blur-md">
                            <TrendingUp className="text-blue-200" size={20} />
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2 tracking-tight">Grow Your Business</h2>
                        <p className="text-blue-100/80 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                            Keep your technician profiles updated and accept jobs quickly to boost your rating and earn more on RepairKaro.
                        </p>
                    </div>
                    <div className="space-y-2.5 sm:space-y-3 relative z-10">
                        <Link href="/vendor/technicians" className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-lg sm:rounded-xl p-2.5 sm:p-3 transition-colors group">
                            <span className="font-semibold text-xs sm:text-sm">Add New Technician</span>
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white text-blue-900 rounded-md sm:rounded-lg flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
                                <UserCheck size={14} className="sm:w-4 sm:h-4" />
                            </div>
                        </Link>
                        <Link href="/vendor/reports" className="flex items-center justify-between w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-lg sm:rounded-xl p-2.5 sm:p-3 transition-colors group">
                            <span className="font-semibold text-xs sm:text-sm">View Analytics</span>
                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white text-blue-900 rounded-md sm:rounded-lg flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
                                <DollarSign size={14} className="sm:w-4 sm:h-4" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Recent Activity / Bookings Table */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-gray-100 flex justify-between items-center bg-white">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">Recent Bookings</h2>
                    <Link href="/vendor/bookings" className="text-blue-600 text-[10px] sm:text-xs font-bold hover:text-blue-700 hover:underline px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-50 rounded-lg transition-colors">View All Bookings</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm text-left">
                        <thead className="text-[10px] sm:text-xs text-gray-500 uppercase bg-gray-50/80">
                            <tr>
                                <th className="px-4 sm:px-5 py-2.5 sm:py-3 whitespace-nowrap">Booking ID</th>
                                <th className="px-4 sm:px-5 py-2.5 sm:py-3 whitespace-nowrap">Customer</th>
                                <th className="px-4 sm:px-5 py-2.5 sm:py-3 whitespace-nowrap">Service</th>
                                <th className="px-4 sm:px-5 py-2.5 sm:py-3 whitespace-nowrap">Status</th>
                                <th className="px-4 sm:px-5 py-2.5 sm:py-3 whitespace-nowrap">Time</th>
                                <th className="px-4 sm:px-5 py-2.5 sm:py-3 whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBookings && recentBookings.length > 0 ? recentBookings.map((booking, i) => (
                                <tr key={i} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${i === recentBookings.length - 1 ? 'border-b-0' : ''}`}>
                                    <td className="px-4 sm:px-5 py-3 sm:py-4 font-semibold text-gray-900">{booking.booking_id || `#${booking.id}`}</td>
                                    <td className="px-4 sm:px-5 py-3 sm:py-4 truncate max-w-[120px]">{booking.name || booking.user?.name || 'Customer'}</td>
                                    <td className="px-4 sm:px-5 py-3 sm:py-4 text-[10px] sm:text-xs">{(booking.service_ids ? JSON.parse(booking.service_ids).length : 1) + ' Services'}</td>
                                    <td className="px-4 sm:px-5 py-3 sm:py-4">
                                        <span className={`px-2 py-0.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${booking.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200/50' :
                                            booking.status === 'assigned' ? 'bg-blue-50 text-blue-700 border border-blue-200/50' :
                                                'bg-green-50 text-green-700 border border-green-200/50'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-4 sm:px-5 py-3 sm:py-4 text-gray-500 text-[10px] sm:text-xs whitespace-nowrap">{booking.time || booking.created_at?.substring(0, 10)}</td>
                                    <td className="px-4 sm:px-5 py-3 sm:py-4">
                                        <Link href="/vendor/bookings" className="text-(--primary) font-bold hover:text-blue-800 text-[10px] sm:text-xs flex items-center gap-1">Manage</Link>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-6 sm:py-8 text-gray-500 text-xs sm:text-sm">No recent bookings found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </VendorLayout>
    );
}
