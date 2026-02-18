import React from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { DollarSign, users, Briefcase, TrendingUp, UserCheck, Calendar } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Dashboard() {
    // Mock Data
    const stats = [
        { label: 'Total Revenue', value: '₹45,200', change: '+12%', icon: DollarSign, color: 'bg-green-100 text-green-600' },
        { label: 'Active Jobs', value: '24', change: '+4', icon: Briefcase, color: 'bg-blue-100 text-blue-600' },
        { label: 'Technicians', value: '12', change: '2 Active', icon: UserCheck, color: 'bg-purple-100 text-purple-600' },
        { label: 'Weekly Growth', value: '18%', change: '+2.4%', icon: TrendingUp, color: 'bg-orange-100 text-orange-600' },
    ];

    const bookings = [
        { id: 'RK-8821', customer: 'Amit Singh', service: 'AC Repair', status: 'Pending', time: '10:30 AM' },
        { id: 'RK-8822', customer: 'Priya Sharma', service: 'Plumbing', status: 'Assigned', time: '11:00 AM' },
        { id: 'RK-8823', customer: 'Rahul Verma', service: 'Electrician', status: 'Completed', time: 'Yesterday' },
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
                        <div className="mt-4 flex items-center text-sm font-medium text-green-600">
                            <TrendingUp size={16} className="mr-1" />
                            <span>{stat.change}</span>
                            <span className="text-gray-400 font-normal ml-1">vs last month</span>
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
                            {bookings.map((booking, i) => (
                                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{booking.id}</td>
                                    <td className="px-6 py-4">{booking.customer}</td>
                                    <td className="px-6 py-4">{booking.service}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                booking.status === 'Assigned' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-green-100 text-green-700'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{booking.time}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-600 font-bold hover:text-blue-800">Manage</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </VendorLayout>
    );
}
