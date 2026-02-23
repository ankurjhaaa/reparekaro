import React, { useState } from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { Calendar, User, MapPin, Clock, MoreVertical, Search, Filter, X } from 'lucide-react';
import Button from '../../Components/Forms/Button';
import { usePage, Link, router, useForm } from '@inertiajs/react';

export default function Bookings() {
    const { bookings = [], technicians = [] } = usePage().props;
    const [activeTab, setActiveTab] = useState('All');
    const [assigningBooking, setAssigningBooking] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        technician_id: ''
    });

    const filteredBookings = activeTab === 'All' ? bookings : bookings.filter(b => b && b.status === activeTab.toLowerCase());

    const openAssignModal = (booking) => {
        if (!booking) return;
        setAssigningBooking(booking);
        setData('technician_id', (booking.assigned_to && booking.assigned_to.id) ? booking.assigned_to.id : '');
    };

    const handleAssign = (e) => {
        e.preventDefault();
        if (!assigningBooking || !assigningBooking.id) return;
        post(route('vendor.bookings.assign', assigningBooking.id), {
            onSuccess: () => {
                setAssigningBooking(null);
                reset();
            }
        });
    };

    const cleanTechnicians = technicians || [];

    const handleReject = (id) => {
        if (!id) return;
        if (confirm('Are you sure you want to reject this booking?')) {
            router.put(route('vendor.bookings.status', id), { status: 'cancelled' }, { preserveScroll: true });
        }
    };

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
                {filteredBookings && filteredBookings.length > 0 ? filteredBookings.map((booking) => {
                    if (!booking) return null;
                    return (
                        <div key={booking.id || Math.random()} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${booking.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                                        booking.status === 'assigned' ? 'bg-blue-50 text-blue-600' :
                                            'bg-green-50 text-green-600'
                                        }`}>
                                        {booking.name ? booking.name.charAt(0).toUpperCase() : 'S'}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{booking.booking_id || `#${booking?.id}`}</h3>
                                        <p className="text-xs text-gray-500 font-mono">{(booking.service_ids ? JSON.parse(booking.service_ids).length : 1)} Service(s)</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                    booking.status === 'assigned' ? 'bg-blue-100 text-blue-700' :
                                        'bg-green-100 text-green-700'
                                    }`}>
                                    {booking.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <User size={14} className="text-gray-400 shrink-0" />
                                    <span className="font-medium text-gray-900 truncate">{booking.name || booking.user?.name || 'Customer'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={14} className="text-gray-400 shrink-0" />
                                    <span>{booking.date ? new Date(booking.date).toLocaleDateString() : booking.created_at?.substring(0, 10)} {booking.time}</span>
                                </div>
                                <div className="flex items-center gap-2 sm:col-span-2">
                                    <MapPin size={14} className="text-gray-400 shrink-0" />
                                    <span className="truncate">{booking.address || 'Address not provided'} {booking.city ? `, ${booking.city}` : ''}</span>
                                </div>
                            </div>

                            {booking.status === 'assigned' && booking.assigned_to && (
                                <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                                    <div className="text-xs text-gray-500">
                                        Assigned to <span className="font-bold text-gray-900">{typeof booking.assigned_to === 'object' ? booking.assigned_to?.name : 'Technician'}</span>
                                    </div>
                                    <button onClick={() => openAssignModal(booking)} className="text-blue-600 text-xs font-bold hover:underline">Change</button>
                                </div>
                            )}

                            {booking.status === 'pending' && (
                                <div className="mt-4 flex gap-2">
                                    <Button onClick={() => openAssignModal(booking)} className="flex-1 bg-(--primary) text-white text-sm py-2">Assign Technician</Button>
                                    <Button onClick={() => handleReject(booking.id)} variant="outline" className="flex-1 border-gray-200 text-gray-600 text-sm py-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200">Reject</Button>
                                </div>
                            )}
                        </div>
                    );
                }) : (
                    <div className="col-span-full py-16 text-center bg-white rounded-xl shadow-sm border border-gray-100 text-gray-500">
                        No bookings found.
                    </div>
                )}
            </div>

            {/* Assign Technician Modal */}
            {assigningBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-slide-up">
                        <div className="flex justify-between items-center p-5 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Assign Technician</h2>
                            <button onClick={() => setAssigningBooking(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleAssign} className="p-5 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Technician</label>
                                <select
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-(--primary)/20 focus:border-(--primary) outline-none transition-all"
                                    value={data.technician_id}
                                    onChange={e => setData('technician_id', e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Choose a technician...</option>
                                    {cleanTechnicians.map(tech => (tech && tech.id) ? (
                                        <option key={tech.id} value={tech.id}>{tech.name || 'Unknown'}</option>
                                    ) : null)}
                                </select>
                                {errors.technician_id && <p className="text-red-500 text-xs mt-1">{errors.technician_id}</p>}
                                {cleanTechnicians.length === 0 && <p className="text-amber-500 text-xs mt-1">No active technicians available. Please add some first.</p>}
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                <Button type="button" onClick={() => setAssigningBooking(null)} className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 justify-center py-2.5">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing || cleanTechnicians.length === 0} className="flex-1 justify-center py-2.5">
                                    {processing ? 'Assigning...' : 'Confirm Assignment'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </VendorLayout>
    );
}
