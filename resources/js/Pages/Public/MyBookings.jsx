import React, { useState } from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, Clock, MapPin, Search, Filter, ChevronRight, Download, MoreVertical } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function MyBookings() {
    const [activeTab, setActiveTab] = useState('upcoming');

    const bookings = [
        {
            id: 'RK-88219',
            service: 'AC Repair',
            date: 'Feb 20, 2026',
            time: '10:00 AM',
            status: 'Confirmed',
            amount: '₹499',
            technician: 'Rahul Sharma',
            type: 'upcoming',
            image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=100'
        },
        {
            id: 'RK-77321',
            service: 'Plumbing Check',
            date: 'Feb 22, 2026',
            time: '02:00 PM',
            status: 'Pending',
            amount: '₹199',
            technician: 'Assigning...',
            type: 'upcoming',
            image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=100'
        },
        {
            id: 'RK-55102',
            service: 'House Painting',
            date: 'Jan 15, 2026',
            time: '09:00 AM',
            status: 'Completed',
            amount: '₹2,500',
            technician: 'Color Pro Team',
            type: 'past',
            image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=100'
        },
        {
            id: 'RK-44001',
            service: 'Fan Installation',
            date: 'Dec 10, 2025',
            time: '04:30 PM',
            status: 'Cancelled',
            amount: '₹299',
            technician: '-',
            type: 'past',
            image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=100'
        }
    ];

    const filteredBookings = bookings.filter(b => b.type === activeTab);

    return (
        <PublicLayout>
            <Head title="My Bookings" />

            <div className="bg-gray-50 min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Page Header - Desktop: Left aligned, Mobile: Centered */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
                            <p className="text-sm text-gray-500 mt-1">Manage your upcoming and past service requests</p>
                        </div>
                        <div className="flex gap-2">
                            <Link href="/book-now">
                                <Button className="w-full md:w-auto shadow-md">Book New Service</Button>
                            </Link>
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
                                                    <img src={booking.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                                                    <div>
                                                        <p className="font-bold text-gray-900">{booking.service}</p>
                                                        <p className="text-xs text-gray-500">ID: {booking.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                                        <Calendar size={14} className="text-gray-400" /> {booking.date}
                                                    </span>
                                                    <span className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                                                        <Clock size={14} className="text-gray-400" /> {booking.time}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">{booking.technician}</td>
                                            <td className="px-6 py-4 font-bold text-gray-900">{booking.amount}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-400 hover:text-(--primary) p-2 rounded-full hover:bg-gray-100 transition-all">
                                                    <MoreVertical size={18} />
                                                </button>
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
                                            <img src={booking.image} alt="" className="w-14 h-14 rounded-xl object-cover bg-gray-100" />
                                            <div>
                                                <h3 className="font-bold text-gray-900">{booking.service}</h3>
                                                <p className="text-xs text-gray-500 mt-0.5">ID: {booking.id}</p>
                                                <span className={`mt-2 inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide ${booking.status === 'Confirmed' ? 'bg-green-50 text-green-700 border border-green-100' :
                                                    booking.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                                                        booking.status === 'Completed' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                                            'bg-red-50 text-red-700 border border-red-100'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="font-bold text-(--primary)">{booking.amount}</p>
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
