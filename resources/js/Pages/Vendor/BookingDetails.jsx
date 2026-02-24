import React from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { usePage, useForm, Link } from '@inertiajs/react';
import {
    Calendar, User, MapPin, Clock, ArrowLeft,
    CheckCircle2, Wrench, CreditCard, StickyNote,
    UserPlus, ShieldCheck, Phone, ChevronRight,
    Loader2, ReceiptText, Package
} from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function BookingDetails() {
    const { booking, technicians = [] } = usePage().props;

    const statusForm = useForm({ status: booking.status });
    const assignForm = useForm({ technician_id: booking.assigned_to?.id || '' });
    const noteForm = useForm({ admin_note: booking.admin_note || '' });
    const paymentForm = useForm({
        total_amount: booking.total_amount,
        payment_method: booking.payment_method || '',
        is_paid: booking.is_paid
    });

    const serviceList = booking.service_ids ? JSON.parse(booking.service_ids) : [];

    const handleStatusUpdate = (e) => {
        e.preventDefault();
        statusForm.put(`/vendor/bookings/${booking.id}/status`);
    };

    const handleAssign = (e) => {
        e.preventDefault();
        assignForm.post(`/vendor/bookings/${booking.id}/assign`);
    };

    const handleNoteUpdate = (e) => {
        e.preventDefault();
        noteForm.post(`/vendor/bookings/${booking.id}/notes`);
    };

    const handlePaymentUpdate = (e) => {
        e.preventDefault();
        paymentForm.post(`/vendor/bookings/${booking.id}/payment`);
    };

    return (
        <VendorLayout title={`Booking #${booking.booking_id}`}>
            {/* Top Navigation & Status Bar */}
            <div className="mb-6">
                <Link href="/vendor/bookings" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-(--primary) transition-colors mb-4 text-xs font-bold uppercase tracking-wider">
                    <ArrowLeft size={14} strokeWidth={3} /> Back to Bookings
                </Link>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-(--primary) shrink-0">
                            <ReceiptText size={24} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-black text-gray-900 tracking-tight">#{booking.booking_id}</h1>
                                <span className={`px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border ${booking.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200/50' :
                                    booking.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/50' :
                                        booking.status === 'cancelled' ? 'bg-rose-50 text-rose-700 border-rose-200/50' :
                                            'bg-blue-50 text-blue-700 border-blue-200/50'
                                    }`}>
                                    {booking.status}
                                </span>
                            </div>
                            <p className="text-[11px] text-gray-400 font-bold flex items-center gap-1.5 mt-0.5">
                                <Calendar size={12} /> {booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}
                                <span className="text-gray-200 mx-1">|</span>
                                <Clock size={12} /> {booking.time || 'N/A'}
                            </p>
                        </div>
                    </div>
                    <Button variant="outline" className="text-[11px] px-5 py-2 font-black uppercase tracking-widest border-gray-200 hover:bg-gray-50">
                        Download Report
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Content Areas (8/12 on desktop) */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Customer & Service Summary Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Customer Card */}
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <User size={14} className="text-(--primary)" /> Customer Information
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-base font-bold text-gray-900">{booking.name || 'N/A'}</p>
                                    <a href={`tel:${booking.mobile}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-(--primary) rounded-lg hover:bg-blue-100 transition-colors text-[11px] font-black uppercase">
                                        <Phone size={12} /> Call
                                    </a>
                                </div>
                                <div className="pt-3 border-t border-gray-50">
                                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1.5">Service Address</p>
                                    <div className="flex items-start gap-2 text-xs font-semibold text-gray-600 leading-relaxed">
                                        <MapPin size={14} className="shrink-0 text-gray-300 mt-0.5" />
                                        <span>{booking.address}, {booking.city} {booking.landmark && <span className="text-gray-400 font-medium italic block mt-1">L: {booking.landmark}</span>}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary Snapshot */}
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <ReceiptText size={14} className="text-(--primary)" /> Order Summary
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-500 font-bold">Total Services</span>
                                    <span className="font-black text-gray-900">{serviceList.length} Items</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-500 font-bold">Materials/Parts</span>
                                    <span className="font-black text-gray-900">₹{(booking.requirements?.reduce((sum, r) => sum + parseFloat(r.total_price), 0) || 0).toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs pt-2 border-t border-gray-50">
                                    <span className="text-gray-500 font-bold uppercase tracking-widest text-[9px]">Grand Total</span>
                                    <span className="text-base font-black text-(--primary)">₹{(parseFloat(booking.total_amount) + (booking.requirements?.reduce((sum, r) => sum + parseFloat(r.total_price), 0) || 0)).toFixed(0)}</span>
                                </div>
                                <div className="pt-2 flex justify-between items-center">
                                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Payment Status</span>
                                    {booking.is_paid ? (
                                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-[9px] font-black uppercase">Paid</span>
                                    ) : (
                                        <span className="px-2 py-0.5 bg-rose-100 text-rose-700 rounded text-[9px] font-black uppercase">Unpaid</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Service & Materials Details List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Wrench size={14} className="text-(--primary)" /> Services & Materials
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {/* Services */}
                            {serviceList.map((service, i) => (
                                <div key={`svc-${i}`} className="flex items-center justify-between p-4 bg-white hover:bg-gray-50/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-(--primary) shrink-0">
                                            {service.category_image ? (
                                                <img src={service.category_image} alt="" className="w-full h-full object-cover rounded-lg" />
                                            ) : (
                                                <CheckCircle2 size={20} strokeWidth={1.5} />
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-bold text-gray-900 text-sm truncate">{service.title || service.name}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1">
                                                <Clock size={10} /> {service.duration || 'Standard'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-gray-900">₹{parseFloat(service.price).toFixed(0)}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Materials */}
                            {booking.requirements?.map((item, i) => (
                                <div key={`req-${i}`} className="flex items-center justify-between p-4 bg-orange-50/20 hover:bg-orange-50/40 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 shadow-sm">
                                            <Package size={20} strokeWidth={1.5} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-bold text-gray-900 text-sm truncate">{item.name}</p>
                                            <p className="text-[10px] text-orange-600/70 font-bold uppercase tracking-widest flex items-center gap-1">
                                                Qty: {item.qty} × ₹{parseFloat(item.price).toFixed(0)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-gray-900">₹{parseFloat(item.total_price).toFixed(0)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Admin Notes */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <StickyNote size={14} className="text-(--primary)" /> Internal Admin Notes
                        </h3>
                        <form onSubmit={handleNoteUpdate} className="space-y-3">
                            <textarea
                                value={noteForm.data.admin_note}
                                onChange={e => noteForm.setData('admin_note', e.target.value)}
                                className="w-full h-24 p-3 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-(--primary)/10 focus:border-(--primary) outline-none transition-all text-sm font-medium"
                                placeholder="Add private notes for staff..."
                            ></textarea>
                            <div className="flex justify-end">
                                <Button disabled={noteForm.processing} className="px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest bg-gray-900 text-white hover:bg-black transition-colors">
                                    {noteForm.processing ? <Loader2 className="animate-spin" size={14} /> : 'Save Note'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Sidebar Controls (4/12 on desktop) */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Management Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50 overflow-hidden">

                        {/* Status Update */}
                        <div className="p-5">
                            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Booking Status</h3>
                            <form onSubmit={handleStatusUpdate} className="flex gap-2">
                                <select
                                    value={statusForm.data.status}
                                    onChange={e => statusForm.setData('status', e.target.value)}
                                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg outline-none font-bold text-xs text-gray-900 focus:ring-2 focus:ring-blue-500/5 transition-all"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="assigned">Assigned</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                <Button disabled={statusForm.processing} className="px-3 bg-(--primary) hover:bg-blue-700 p-2 rounded-lg text-white">
                                    {statusForm.processing ? <Loader2 className="animate-spin" size={14} /> : <CheckCircle2 size={16} />}
                                </Button>
                            </form>
                        </div>

                        {/* Assignment */}
                        <div className="p-5">
                            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Assign Technician</h3>
                            <form onSubmit={handleAssign} className="space-y-3">
                                <div className="relative">
                                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                    <select
                                        value={assignForm.data.technician_id}
                                        onChange={e => assignForm.setData('technician_id', e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-lg outline-none font-bold text-xs text-gray-900 appearance-none focus:ring-2 focus:ring-blue-500/5 transition-all"
                                    >
                                        <option value="">Choose Staff...</option>
                                        {technicians.map(tech => (
                                            <option key={tech.id} value={tech.id}>{tech.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <Button disabled={assignForm.processing} className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 rounded-xl text-white">
                                    {assignForm.processing ? <Loader2 className="animate-spin" size={14} /> : (
                                        <> <ShieldCheck size={14} /> Assign & Notify </>
                                    )}
                                </Button>
                            </form>
                            {booking.assigned_to && (
                                <div className="mt-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100 flex items-center gap-2.5">
                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-(--primary) border border-blue-100 shrink-0">
                                        <ShieldCheck size={16} strokeWidth={2.5} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[8px] text-(--primary) font-black uppercase tracking-widest leading-none mb-1">Assigned To</p>
                                        <p className="text-[11px] font-bold text-gray-900 truncate leading-none">{booking.assigned_to.name}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Payment Tracking */}
                        <div className="p-5">
                            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Payment Info</h3>
                            <form onSubmit={handlePaymentUpdate} className="space-y-3">
                                <div className="relative">
                                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                    <input
                                        type="number"
                                        value={paymentForm.data.total_amount}
                                        onChange={e => paymentForm.setData('total_amount', e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-lg outline-none font-bold text-xs text-gray-900 focus:ring-2 focus:ring-blue-500/5 transition-all"
                                        placeholder="Amount"
                                    />
                                </div>
                                <select
                                    value={paymentForm.data.payment_method}
                                    onChange={e => paymentForm.setData('payment_method', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg outline-none font-bold text-xs text-gray-900 focus:ring-2 focus:ring-blue-500/5 transition-all"
                                >
                                    <option value="">Select Method...</option>
                                    <option value="cash">Cash</option>
                                    <option value="online">Online</option>
                                    <option value="wallet">Wallet</option>
                                </select>
                                <label className="flex items-center gap-2 cursor-pointer py-1">
                                    <input
                                        type="checkbox"
                                        checked={paymentForm.data.is_paid}
                                        onChange={e => paymentForm.setData('is_paid', e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 text-(--primary) focus:ring-(--primary)"
                                    />
                                    <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Mark as Paid</span>
                                </label>
                                <Button disabled={paymentForm.processing} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-xl text-white">
                                    {paymentForm.processing ? <Loader2 className="animate-spin mx-auto" size={14} /> : 'Update Billing'}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </VendorLayout>
    );
}
