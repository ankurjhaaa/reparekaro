import React from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import {
    ChevronLeft, Calendar, Clock, MapPin, User, Phone,
    MessageSquare, CreditCard, Shield, CheckCircle2,
    Download, KeyRound, Wrench, ChevronRight,
    Star, Info, Printer, ExternalLink, Package
} from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function BookingDetails({ booking }) {
    if (!booking) return <div className="p-8 text-center text-gray-400 font-bold uppercase tracking-widest">Booking not found</div>;

    const services = booking.service_ids ? JSON.parse(booking.service_ids) : [];
    const mainService = services.length > 0 ? (services[0].title || services[0].name) : 'Service Request';

    const statusColors = {
        pending: 'bg-amber-50 text-amber-600 border-amber-100',
        confirmed: 'bg-blue-50 text-blue-600 border-blue-100',
        assigned: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        in_progress: 'bg-sky-50 text-sky-600 border-sky-100',
        completed: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        cancelled: 'bg-rose-50 text-rose-600 border-rose-100',
    };

    const statusLabel = booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace('_', ' ');

    const handlePrint = () => {
        window.print();
    };

    return (
        <PublicLayout>
            <Head title={`Booking #${booking.booking_id}`} />

            <div className="bg-gray-50 min-h-screen pt-4 pb-24 md:pb-12 px-4 max-w-xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <Link href="/my-bookings" className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-gray-100 text-gray-600 hover:text-gray-900 transition-all active:scale-95 shadow-sm">
                            <ChevronLeft size={18} strokeWidth={2.5} />
                        </Link>
                        <h1 className="text-base font-black text-gray-900 tracking-tight">Booking Info</h1>
                    </div>
                    <button
                        onClick={handlePrint}
                        className="text-(--primary) text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all flex items-center gap-1.5"
                    >
                        <Download size={12} strokeWidth={3} /> Receipt
                    </button>
                </div>

                {/* Status Bar - Flat Design */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-4">
                    <div className="p-5 flex justify-between items-center bg-gray-900 text-white">
                        <div className="min-w-0">
                            <h2 className="text-lg font-black tracking-tight truncate leading-none mb-1.5">{mainService}</h2>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Order Reference: {booking.booking_id}</p>
                        </div>
                        <div className="px-2.5 py-1 bg-white/10 rounded-md border border-white/20 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                            {statusLabel}
                        </div>
                    </div>

                    {/* OTP - High Visibility Flat */}
                    {['pending', 'confirmed', 'assigned'].includes(booking.status) && (
                        <div className="bg-blue-50/70 p-4 border-b border-blue-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-(--primary) border border-blue-100 shadow-sm">
                                    <KeyRound size={18} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-blue-900 uppercase tracking-widest mb-0.5">Service OTP</p>
                                    <p className="text-[10px] font-bold text-blue-600/60 leading-none tracking-tight">Show to technician on arrival</p>
                                </div>
                            </div>
                            <div className="text-xl font-black text-gray-900 tracking-[0.05em] px-3.5 py-1.5 bg-white rounded-lg border border-blue-200 shadow-sm font-mono">
                                {booking.otp || '----'}
                            </div>
                        </div>
                    )}

                    <div className="p-5 space-y-6">
                        {/* Primary Info Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <Calendar size={12} className="text-(--primary)" strokeWidth={2.5} />
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Date</span>
                                </div>
                                <p className="text-xs font-black text-gray-900 leading-none">
                                    {booking.date ? new Date(booking.date).toLocaleDateString() : 'Pending'}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <Clock size={12} className="text-indigo-500" strokeWidth={2.5} />
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Time Slot</span>
                                </div>
                                <p className="text-xs font-black text-gray-900 leading-none">{booking.time || 'Pending'}</p>
                            </div>
                        </div>

                        {/* Location Details */}
                        <div className="flex items-start gap-3.5 pt-2">
                            <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 border border-gray-200/50">
                                <MapPin size={18} strokeWidth={2.5} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Service Address</p>
                                <p className="text-xs font-bold text-gray-700 leading-relaxed truncate-3-lines">
                                    {booking.address}, {booking.city} {booking.landmark && <span className="text-gray-400 italic block mt-0.5">L: {booking.landmark}</span>}
                                </p>
                            </div>
                        </div>

                        {/* Payment Status Bar */}
                        <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-2.5">
                                <CreditCard size={16} className="text-gray-400" />
                                <span className="text-[10px] font-black text-gray-900 uppercase tracking-wider">₹{parseFloat(booking.total_amount).toFixed(0)}</span>
                            </div>
                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${booking.is_paid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                {booking.is_paid ? 'Paid' : 'Pay on Service'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Technician Card - Cleaner Flat Design */}
                {booking.assigned_to && (
                    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm mb-4 flex items-center gap-4">
                        <div className="relative">
                            <img
                                src={booking.assigned_to.avatar || 'https://ui-avatars.com/api/?name=' + booking.assigned_to.name + '&background=000&color=fff'}
                                className="w-12 h-12 rounded-lg object-cover border border-gray-100 shadow-sm"
                                alt=""
                            />
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-md flex items-center justify-center text-white border-2 border-white">
                                <CheckCircle2 size={10} strokeWidth={3} />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-black text-gray-900 truncate leading-none mb-1">{booking.assigned_to.name}</h4>
                            <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                <span className="flex items-center gap-0.5 text-amber-500"><Star size={10} fill="currentColor" /> 4.9</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span>Expert Tech</span>
                            </div>
                        </div>
                        <div className="flex gap-1.5">
                            <a href={`tel:${booking.assigned_to.phone}`} className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-(--primary) hover:bg-blue-100 transition-all">
                                <Phone size={16} strokeWidth={2.5} />
                            </a>
                            <Link href={`/chat/${booking.booking_id}`} className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center text-white hover:bg-black transition-all">
                                <MessageSquare size={16} strokeWidth={2.5} />
                            </Link>
                        </div>
                    </div>
                )}

                {/* Items Summary - Compact List */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-4 overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Order Summary</span>
                        <span className="text-[10px] font-bold text-gray-400">Total {services.length + (booking.requirements?.length || 0)} items</span>
                    </div>
                    <div className="p-1">
                        {/* Services */}
                        {services.map((item, idx) => (
                            <div key={`svc-${idx}`} className="flex justify-between items-center px-4 py-3 group hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <Wrench size={12} className="text-gray-300 group-hover:text-(--primary) transition-colors" />
                                    <span className="text-xs font-bold text-gray-700 truncate">{item.title || item.name}</span>
                                </div>
                                <span className="text-[11px] font-black text-gray-900">₹{item.price}</span>
                            </div>
                        ))}

                        {/* Materials/Requirements */}
                        {booking.requirements?.length > 0 && (
                            <>
                                <div className="px-4 py-2 bg-orange-50/30 text-[9px] font-black text-orange-600 uppercase tracking-widest border-y border-orange-50/50">
                                    Materials & Parts
                                </div>
                                {booking.requirements.map((item, idx) => (
                                    <div key={`req-${idx}`} className="flex justify-between items-center px-4 py-3 group hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <Package size={12} className="text-orange-300 group-hover:text-orange-500 transition-colors" />
                                            <div className="min-w-0">
                                                <p className="text-xs font-bold text-gray-700 truncate">{item.name}</p>
                                                <p className="text-[9px] font-bold text-gray-400">Qty: {item.qty} × ₹{parseFloat(item.price).toFixed(0)}</p>
                                            </div>
                                        </div>
                                        <span className="text-[11px] font-black text-gray-900">₹{parseFloat(item.total_price).toFixed(0)}</span>
                                    </div>
                                ))}
                            </>
                        )}

                        {/* Grand Total */}
                        <div className="mt-1 border-t border-gray-100 bg-gray-50/50 px-4 py-4 flex justify-between items-center">
                            <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Grand Total</span>
                            <span className="text-sm font-black text-(--primary) tracking-tight">
                                ₹{(parseFloat(booking.total_amount) + (booking.requirements?.reduce((sum, r) => sum + parseFloat(r.total_price), 0) || 0)).toFixed(0)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <Link href="/help" className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl border border-gray-100 text-gray-500 font-black text-[10px] uppercase tracking-widest hover:bg-gray-50">
                        <Info size={14} strokeWidth={2.5} /> Get Help
                    </Link>
                    <button onClick={handlePrint} className="flex items-center justify-center gap-2 p-3 bg-white rounded-xl border border-gray-100 text-gray-500 font-black text-[10px] uppercase tracking-widest hover:bg-gray-50">
                        <Printer size={14} strokeWidth={2.5} /> View Receipt
                    </button>
                </div>

                {/* Protection Banner - Flat Style */}
                <div className="bg-emerald-50 rounded-xl p-3.5 border border-emerald-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-emerald-500 border border-emerald-100 shadow-sm shrink-0">
                        <Shield size={16} strokeWidth={3} />
                    </div>
                    <p className="text-[10px] font-bold text-emerald-800 tracking-tight leading-snug">
                        <span className="font-black uppercase tracking-widest block mb-0.5">RepairKaro Assurance</span>
                        Every booking is covered for your total peace of mind.
                    </p>
                </div>

                {/* Print Context Styles */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @media print {
                        nav, footer, .no-print, button, a { display: none !important; }
                        body { background: white !important; font-family: system-ui, -apple-system, sans-serif !important; }
                        .bg-gray-50 { background: transparent !important; }
                        .rounded-xl { border-radius: 0 !important; border-bottom: 1px solid #eee !important; box-shadow: none !important; }
                        .bg-gray-900 { background: #000 !important; color: white !important; -webkit-print-color-adjust: exact; }
                        * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    }
                `}} />
            </div>
        </PublicLayout>
    );
}
