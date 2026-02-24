import React, { useState } from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Calendar, Clock, MapPin, Search, Filter, ChevronRight, Download, MoreVertical } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function MyBookings() {
    const { bookings } = usePage().props;
    const [activeTab, setActiveTab] = useState('upcoming');

    // Parse statuses for our two tabs
    const upcomingStatuses = ['pending', 'confirmed', 'assigned', 'in_progress', 'payment_pending'];

    // Map the raw DB array into display friendly format
    const formattedBookings = (bookings || []).map(b => {
        const services = b.service_ids ? JSON.parse(b.service_ids) : [];
        const mainService = services.length > 0 ? services[0].title : 'Custom Service Request';
        // Calculate type based on status for filtering
        const type = upcomingStatuses.includes(b.status) ? 'upcoming' : 'past';

        return {
            id: b.booking_id || `RK-${b.id}`,
            dbId: b.id,
            service: mainService,
            date: b.date ? new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Pending',
            time: b.time || 'Pending',
            status: b.status.charAt(0).toUpperCase() + b.status.slice(1).replace('_', ' '),
            rawStatus: b.status,
            amount: `₹${parseFloat(b.total_amount).toFixed(0)}`,
            technician: b.assigned_to ? 'Assigned' : 'Pending',
            type: type,
            image: services.length > 0 && services[0].category_image ? services[0].category_image : 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=100'
        };
    });

    const filteredBookings = formattedBookings.filter(b => b.type === activeTab);

    return (
        <PublicLayout noFooter={true} noScroll={true}>
            <Head title="My Bookings" />

            <div className="bg-gray-50 h-[calc(100vh-64px)] overflow-y-auto md:pb-8 pt-6 sm:pt-8 w-full block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Page Header - Desktop: Left aligned, Mobile: Centered */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
                            <p className="text-sm text-gray-500 mt-1">Manage your upcoming and past service requests</p>
                        </div>
                        
                    </div>

                    {/* Tabs */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 mb-6 inline-flex w-full md:w-auto">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={`flex-1 md:flex-none px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === 'upcoming' ? 'bg-(--primary) text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            Upcoming
                        </button>
                        <button
                            onClick={() => setActiveTab('past')}
                            className={`flex-1 md:flex-none px-6 py-2.5 text-sm font-semibold rounded-lg transition-all ${activeTab === 'past' ? 'bg-(--primary) text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            History
                        </button>
                    </div>

                    {/* Desktop View: Table Layout */}
                    <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Service Details</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date & Time</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Technician</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredBookings.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                            No {activeTab} bookings found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredBookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    {booking.image ? (
                                                        <img src={booking.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                                                            <MapPin className="text-gray-400" size={20} />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-bold text-gray-900">{booking.service || 'Unknown Service'}</p>
                                                        <p className="text-xs text-gray-500">ID: {booking.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                                        <Calendar size={14} className="text-gray-400" /> {booking.date || 'Pending'}
                                                    </span>
                                                    <span className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                                                        <Clock size={14} className="text-gray-400" /> {booking.time || 'Pending'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{booking.technician || 'Pending'}</td>
                                            <td className="px-6 py-4 font-bold text-gray-900">{booking.amount || '0'}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {booking.status || 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link href={`/booking/${booking.id}`}>
                                                    <button className="text-gray-400 hover:text-(--primary) p-2 rounded-full hover:bg-gray-100 transition-all">
                                                        <ChevronRight size={18} />
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View: Cards Layout */}
                    <div className="md:hidden space-y-4 pb-20">
                        {filteredBookings.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <p className="text-gray-500">No {activeTab} bookings found.</p>
                            </div>
                        ) : (
                            filteredBookings.map((booking) => (
                                <div key={booking.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex gap-3">
                                            {booking.image ? (
                                                <img src={booking.image} alt="" className="w-14 h-14 rounded-xl object-cover bg-gray-100" />
                                            ) : (
                                                <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
                                                    <MapPin className="text-gray-400" size={24} />
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="font-bold text-gray-900">{booking.service || 'Unknown Service'}</h3>
                                                <p className="text-xs text-gray-500 mt-0.5">ID: {booking.id}</p>
                                                <span className={`mt-2 inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${booking.status === 'Confirmed' ? 'bg-green-50 text-green-700 border border-green-100' :
                                                    booking.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                                                        booking.status === 'Completed' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                                            'bg-gray-50 text-gray-700 border border-gray-100'
                                                    }`}>
                                                    {booking.status || 'Pending'}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="font-bold text-(--primary)">{booking.amount || '0'}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-gray-50">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-gray-400" />
                                            <span className="text-xs font-medium text-gray-700">{booking.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} className="text-gray-400" />
                                            <span className="text-xs font-medium text-gray-700">{booking.time}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-3">
                                        <Link href={`/booking/${booking.id}`} className="flex-1">
                                            <button className="w-full py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                                                View Details
                                            </button>
                                        </Link>
                                        {booking.status === 'Completed' && (
                                            <button className="flex-1 py-2 rounded-lg bg-(--primary) text-white text-xs font-semibold shadow-sm hover:opacity-90">
                                                Download Invoice
                                            </button>
                                        )}
                                        {booking.status === 'Confirmed' && (
                                            <button className="flex-1 py-2 rounded-lg text-red-600 border border-red-100 bg-red-50 text-xs font-semibold hover:bg-red-100">
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
