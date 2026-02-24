import React, { useState } from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { Calendar, User, MapPin, Clock, Filter, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import Button from '../../Components/Forms/Button';
import { usePage, Link, router } from '@inertiajs/react';

export default function Bookings() {
    const { bookings, filters } = usePage().props;
    const [activeTab, setActiveTab] = useState(filters.status || 'All');
    const [activeDateRange, setActiveDateRange] = useState(filters.date_range || 'all');

    const handleFilterChange = (type, value) => {
        const newFilters = { ...filters, [type]: value };
        if (type === 'status') setActiveTab(value);
        if (type === 'date_range') setActiveDateRange(value);

        router.get('/vendor/bookings', newFilters, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    const dateRanges = [
        { label: 'All Time', value: 'all' },
        { label: 'Today', value: 'today' },
        { label: 'Yesterday', value: 'yesterday' },
        { label: '7 Days', value: 'last_7_days' },
        { label: 'This Month', value: 'this_month' },
    ];

    const statusTabs = ['All', 'Pending', 'Assigned', 'In_Progress', 'Completed', 'Cancelled'];

    return (
        <VendorLayout title="Bookings Management">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <div>
                    <h1 className="text-xl font-black text-gray-900 tracking-tight">Bookings</h1>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{bookings.total} Total Records</p>
                </div>

            </div>

            {/* Advanced Filter Section */}
            <div className="space-y-2 mb-8">
                {/* Date Range Quick Select */}
                <div className="bg-white p-1.5 rounded-xl border border-gray-100 shadow-sm inline-flex gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto">
                    {dateRanges.map((range) => (
                        <button
                            key={range.value}
                            onClick={() => handleFilterChange('date_range', range.value)}
                            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap ${activeDateRange === range.value
                                ? 'bg-gray-900 text-white shadow-md'
                                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>

                {/* Status Tabs */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    {statusTabs.map((status) => (
                        <button
                            key={status}
                            onClick={() => handleFilterChange('status', status)}
                            className={`px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border whitespace-nowrap ${activeTab === status
                                ? 'bg-blue-50 text-(--primary) border-blue-100 shadow-sm'
                                : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'
                                }`}
                        >
                            {status.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bookings List */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {bookings.data.length > 0 ? bookings.data.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col">
                        {/* Card Top: ID & Status */}
                        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                            <span className="text-[11px] font-black text-gray-900 tracking-tighter">#{booking.booking_id}</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${booking.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                                booking.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                                    'bg-blue-50 text-(--primary)'
                                }`}>
                                {booking.status}
                            </span>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 flex-1 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-(--primary) shrink-0 group-hover:scale-110 transition-transform">
                                    <User size={18} strokeWidth={2.5} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-black text-gray-900 truncate">{booking.name || booking.user?.name}</p>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                        <Clock size={10} />
                                        <span>{booking.time || 'Schedule pending'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-start gap-2.5 text-xs text-gray-500 font-semibold leading-relaxed">
                                    <MapPin size={14} className="shrink-0 text-gray-300 mt-0.5" />
                                    <span className="line-clamp-2">{booking.address}, {booking.city}</span>
                                </div>
                                <div className="flex items-center gap-2.5 text-xs text-gray-500 font-semibold">
                                    <CheckCircle2 size={14} className="shrink-0 text-gray-300" />
                                    <span>{JSON.parse(booking.service_ids || "[]").length} Services requested</span>
                                </div>
                            </div>
                        </div>

                        {/* Card Footer: Action */}
                        <div className="p-3 bg-white border-t border-gray-50">
                            <Link
                                href={`/vendor/bookings/${booking.booking_id || booking.id}`}
                                className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-colors"
                            >
                                Manage Booking <ChevronRight size={14} strokeWidth={3} />
                            </Link>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                        <Filter size={40} className="mx-auto text-gray-200 mb-4" />
                        <p className="text-sm font-bold text-gray-400">No bookings match your selected filters</p>
                        <button onClick={() => handleFilterChange('date_range', 'all')} className="mt-4 text-(--primary) text-[10px] font-black uppercase tracking-widest hover:underline">Clear all filters</button>
                    </div>
                )}
            </div>

            {/* Compact Pagination */}
            {bookings.links && bookings.links.length > 3 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                    {bookings.links.map((link, i) => {
                        if (link.label.includes('Previous')) {
                            return (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`p-2 rounded-xl border transition-all ${!link.url ? 'text-gray-200 border-gray-50 bg-gray-50/50 cursor-not-allowed' : 'text-gray-600 border-gray-100 hover:border-(--primary) hover:text-(--primary) bg-white'}`}
                                >
                                    <ChevronLeft size={18} strokeWidth={2.5} />
                                </Link>
                            );
                        }
                        if (link.label.includes('Next')) {
                            return (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`p-2 rounded-xl border transition-all ${!link.url ? 'text-gray-200 border-gray-50 bg-gray-50/50 cursor-not-allowed' : 'text-gray-600 border-gray-100 hover:border-(--primary) hover:text-(--primary) bg-white'}`}
                                >
                                    <ChevronRight size={18} strokeWidth={2.5} />
                                </Link>
                            );
                        }
                        if (link.label === '...') {
                            return <span key={i} className="px-2 text-gray-300">...</span>;
                        }
                        return (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`w-10 h-10 flex items-center justify-center rounded-xl text-[11px] font-black tracking-widest border transition-all ${link.active
                                    ? 'bg-gray-900 border-gray-900 text-white shadow-lg'
                                    : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200 hover:text-gray-600'
                                    }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    })}
                </div>
            )}
        </VendorLayout>
    );
}
