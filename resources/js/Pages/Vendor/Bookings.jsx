import React, { useState } from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { Calendar, User, MapPin, Clock, MoreVertical, Search, Filter } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function Bookings() {
    const [activeTab, setActiveTab] = useState('All');

    // Mock Data
    const bookings = [
        { id: 'RK-8821', customer: 'Amit Singh', service: 'AC Repair', status: 'Pending', time: '10:30 AM', address: 'Sector 62, Noida' },
        { id: 'RK-8822', customer: 'Priya Sharma', service: 'Plumbing', status: 'Assigned', time: '11:00 AM', address: 'Indirapuram, GZB', technician: 'Vikram Singh' },
        { id: 'RK-8823', customer: 'Rahul Verma', service: 'Electrician', status: 'Completed', time: 'Yesterday', address: 'Sector 18, Noida', technician: 'Amit Kumar' },
    ];

    const filteredBookings = activeTab === 'All' ? bookings : bookings.filter(b => b.status === activeTab);

    return (
        <VendorLayout title="Bookings">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
                <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                        <Filter size={16} /> Filter
                    </Button>
                    <Button className="bg-(--primary) text-white flex items-center gap-2">
                        <Calendar size={16} /> New Booking
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto gap-2 mb-6 pb-2 no-scrollbar">
                {['All', 'Pending', 'Assigned', 'Completed', 'Cancelled'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeTab === tab
                                ? 'bg-gray-900 text-white'
                                : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Booking List */}
            <div className="space-y-4">
                {filteredBookings.map((booking) => (
                    <div key={booking.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${booking.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' :
                                        booking.status === 'Assigned' ? 'bg-blue-50 text-blue-600' :
                                            'bg-green-50 text-green-600'
                                    }`}>
                                    {booking.service.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{booking.service}</h3>
                                    <p className="text-xs text-gray-500 font-mono">{booking.id}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                    booking.status === 'Assigned' ? 'bg-blue-100 text-blue-700' :
                                        'bg-green-100 text-green-700'
                                }`}>
                                {booking.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <User size={14} className="text-gray-400" />
                                <span className="font-medium text-gray-900">{booking.customer}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={14} className="text-gray-400" />
                                <span>{booking.time}</span>
                            </div>
                            <div className="flex items-center gap-2 sm:col-span-2">
                                <MapPin size={14} className="text-gray-400" />
                                <span className="truncate">{booking.address}</span>
                            </div>
                        </div>

                        {booking.status === 'Assigned' && (
                            <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                                <div className="text-xs text-gray-500">
                                    Assigned to <span className="font-bold text-gray-900">{booking.technician}</span>
                                </div>
                                <button className="text-blue-600 text-xs font-bold hover:underline">Change</button>
                            </div>
                        )}

                        {booking.status === 'Pending' && (
                            <div className="mt-4 flex gap-2">
                                <Button className="flex-1 bg-(--primary) text-white text-sm py-2">Assign Technician</Button>
                                <Button variant="outline" className="flex-1 border-gray-200 text-gray-600 text-sm py-2">Reject</Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </VendorLayout>
    );
}
