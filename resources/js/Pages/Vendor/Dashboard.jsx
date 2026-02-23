import React from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { DollarSign, Users, Briefcase, TrendingUp, UserCheck, Calendar } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { stats: backendStats, recentBookings } = usePage().props;

    // Map dynamic stats
    const stats = [
        { label: 'Total Revenue', value: `₹${backendStats.revenue || 0}`, change: '', icon: DollarSign, color: 'bg-green-100 text-green-600' },
        { label: 'Active Jobs', value: backendStats.activeJobs || 0, change: '', icon: Briefcase, color: 'bg-blue-100 text-blue-600' },
        { label: 'Technicians', value: backendStats.techniciansCount || 0, change: '', icon: UserCheck, color: 'bg-purple-100 text-purple-600' },
        { label: 'Total Bookings', value: backendStats.totalBookings || 0, change: '', icon: Calendar, color: 'bg-orange-100 text-orange-600' },
    ];

    return (
        <VendorLayout title="Dashboard">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm font-medium text-gray-400">
                            Updating live from your activity...
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity / Bookings Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
                    <Link href="/vendor/bookings" className="text-blue-600 text-sm font-bold hover:underline">View All</Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Booking ID</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Service</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Time</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBookings && recentBookings.length > 0 ? recentBookings.map((booking, i) => (
                                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{booking.booking_id || `#${booking.id}`}</td>
                                    <td className="px-6 py-4">{booking.name || booking.user?.name || 'Customer'}</td>
                                    <td className="px-6 py-4 text-xs">{(booking.service_ids ? JSON.parse(booking.service_ids).length : 1) + ' Services'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                            booking.status === 'assigned' ? 'bg-blue-100 text-blue-700' :
                                                'bg-green-100 text-green-700'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{booking.time || booking.created_at?.substring(0, 10)}</td>
                                    <td className="px-6 py-4">
                                        <Link href="/vendor/bookings" className="text-blue-600 font-bold hover:text-blue-800">Manage</Link>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-6 text-gray-500">No recent bookings found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </VendorLayout>
    );
}
