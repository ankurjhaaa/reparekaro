import React from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Calendar, Clock, MapPin, User, Phone, MessageSquare, CreditCard, Shield, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function BookingDetails({ booking }) {
    if (!booking) return <div className="p-8 text-center text-gray-500">Booking not found</div>;

    const services = booking.service_ids ? JSON.parse(booking.service_ids) : [];
    const mainService = services.length > 0 ? services[0].title : 'Custom Service Request';

    // Auto-generate timeline based on DB fields
    const formattedTimeline = [
        { status: 'Booking Confirmed', time: booking.created_at ? new Date(booking.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : '-', completed: true },
        { status: 'Technician Assigned', time: booking.assigned_at ? new Date(booking.assigned_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : '-', completed: !!booking.assigned_at },
        { status: 'Service In Progress', time: booking.start_at ? new Date(booking.start_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : '-', completed: !!booking.start_at },
        { status: 'Completed', time: booking.completed_at ? new Date(booking.completed_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : '-', completed: !!booking.completed_at },
    ];

    const displayBooking = {
        id: booking.booking_id || `RK-${booking.id}`,
        service: mainService,
        status: booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace('_', ' '),
        date: booking.date ? new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Pending',
        time: booking.time || 'Pending',
        address: `${booking.address || ''}, ${booking.city || ''}`,
        amount: `₹${parseFloat(booking.total_amount).toFixed(0)}`,
        paymentStatus: booking.is_paid ? 'Paid' : 'Pending',
        technician: booking.assigned_to ? {
            name: booking.vendor?.name || 'Assigned Technician',
            rating: booking.vendor?.rating || 4.8,
            jobs: booking.vendor?.jobs || 142,
            image: booking.vendor?.avatar || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60',
            phone: booking.vendor?.phone || '-'
        } : null,
        timeline: formattedTimeline
    };

    return (
        <PublicLayout>
            <Head title={`Booking #${displayBooking.id}`} />

            <div className="bg-gray-50 min-h-screen py-6 pb-24 md:pb-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <Link href="/my-bookings" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
                            <ChevronLeft size={20} className="text-gray-600" />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900">Booking Details</h1>
                    </div>

                    {/* Status Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">{displayBooking.service}</h2>
                                <p className="text-sm text-gray-500">ID: {displayBooking.id}</p>
                            </div>
                            <span className="bg-blue-50 text-(--primary) px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-blue-100">
                                {displayBooking.status}
                            </span>
                        </div>

                        {/* Timeline */}
                        <div className="relative pl-4 border-l-2 border-gray-100 space-y-6 my-6">
                            {displayBooking.timeline.map((step, index) => (
                                <div key={index} className="relative">
                                    <div className={`absolute -left-[21px] top-0 w-4 h-4 rounded-full border-2 ${step.completed ? 'bg-(--primary) border-(--primary)' : 'bg-white border-gray-300'}`}></div>
                                    <p className={`text-sm font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>{step.status}</p>
                                    <p className="text-xs text-gray-400">{step.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Technician Card */}
                    {displayBooking.technician && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Technician Details</h3>
                            <div className="flex items-center gap-4">
                                <img src={displayBooking.technician.image} alt={displayBooking.technician.name} className="w-14 h-14 rounded-full object-cover border-2 border-gray-100" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900">{displayBooking.technician.name}</h4>
                                    <p className="text-sm text-gray-500">★ {displayBooking.technician.rating} • {displayBooking.technician.jobs} Jobs</p>
                                </div>
                                <div className="flex gap-2">
                                    <a href={`tel:${displayBooking.technician.phone}`} className="p-2.5 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors">
                                        <Phone size={20} />
                                    </a>
                                    <Link href={`/chat/${displayBooking.id}`} className="p-2.5 bg-blue-50 text-(--primary) rounded-full hover:bg-blue-100 transition-colors">
                                        <MessageSquare size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Booking Info */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4 space-y-4">
                        <div className="flex items-start gap-3">
                            <Calendar className="text-gray-400 mt-0.5" size={18} />
                            <div>
                                <p className="text-xs text-gray-400 font-medium uppercase">Date & Time</p>
                                <p className="text-sm font-semibold text-gray-900">{displayBooking.date} • {displayBooking.time}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="text-gray-400 mt-0.5" size={18} />
                            <div>
                                <p className="text-xs text-gray-400 font-medium uppercase">Service Address</p>
                                <p className="text-sm font-semibold text-gray-900">{displayBooking.address}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CreditCard className="text-gray-400 mt-0.5" size={18} />
                            <div>
                                <p className="text-xs text-gray-400 font-medium uppercase">Payment</p>
                                <p className="text-sm font-semibold text-gray-900">{displayBooking.amount} • <span className={`${displayBooking.paymentStatus === 'Paid' ? 'text-green-600' : 'text-orange-500'}`}>{displayBooking.paymentStatus}</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                        <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300">
                            Cancel Booking
                        </Button>
                        <Link href="/help">
                            <button className="w-full py-3 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
                                Need Help with this booking?
                            </button>
                        </Link>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400 bg-blue-50/50 p-4 rounded-xl border border-blue-50">
                        <Shield size={14} className="text-(--primary)" />
                        <span>Bookings are protected by RepairKaro Assurance</span>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
