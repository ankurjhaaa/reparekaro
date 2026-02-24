import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import { CheckCircle, Clock, MapPin, Phone, IndianRupee, Star, TrendingUp, Calendar, ArrowRight, User } from 'lucide-react';

export default function Dashboard() {
    const { stats, todayJobs } = usePage().props;
    const [isAvailable, setIsAvailable] = useState(true); // Can be linked to backend later

    // Mapping stat cards
    const statCards = [
        { label: 'Total Earnings', value: `₹${stats?.earnings || 0}`, icon: IndianRupee, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { label: 'Total Jobs', value: stats?.totalJobs || 0, icon: CheckCircle, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Pending Jobs', value: stats?.pendingJobs || 0, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50' },
        { label: 'Rating', value: `${stats?.rating || '5.0'}★`, icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    ];

    return (
        <TechnicianLayout>
            <Head title="Technician Dashboard" />

            {/* Header Section */}
            <div className="mb-4 sm:mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Welcome Back!</h1>
                    <p className="text-xs text-gray-500 mt-0.5">Here is the overview of your assigned jobs and earnings.</p>
                </div>

                <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md px-5 py-3 rounded-2xl shadow-sm border border-gray-100/60 sticky top-4 z-20">
                    <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${isAvailable ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-gray-400'}`}></div>
                        <span className="text-sm font-bold text-gray-700">Status:</span>
                    </div>
                    <button
                        onClick={() => setIsAvailable(!isAvailable)}
                        className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${isAvailable ? 'bg-emerald-500' : 'bg-gray-200'}`}
                    >
                        <span className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out ${isAvailable ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                    <span className={`text-sm font-bold uppercase tracking-wider ${isAvailable ? 'text-emerald-600' : 'text-gray-500'}`}>
                        {isAvailable ? 'Available' : 'Busy'}
                    </span>
                </div>
            </div>

            {/* Top Level Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                {statCards.map((card, i) => (
                    <div key={i} className="bg-white p-3.5 sm:p-4 rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 flex items-center justify-between group hover:-translate-y-0.5 transition-transform relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-gray-50 to-transparent rounded-bl-2xl pointer-events-none"></div>
                        <div className="relative z-10">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">{card.label}</p>
                            <h3 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">{card.value}</h3>
                        </div>
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center relative z-10 shadow-inner ${card.bg} ${card.color} group-hover:scale-105 transition-transform shrink-0`}>
                            <card.icon size={18} strokeWidth={2.5} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Main Content: Today's Jobs */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-1.5">
                            <Calendar size={18} className="text-(--primary)" /> Today's Assignments
                        </h2>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-white px-2 py-0.5 rounded-full shadow-sm border border-gray-100">{todayJobs?.length || 0} left</span>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                        {todayJobs && todayJobs.length > 0 ? todayJobs.map((job) => (
                            <div key={job.id} className="bg-white rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden relative group hover:shadow-[0_4px_15px_rgb(0,0,0,0.05)] transition-all">
                                <div className={`absolute top-0 left-0 w-1.5 h-full ${job.status === 'in_progress' ? 'bg-blue-500' : 'bg-orange-400'}`}></div>
                                <div className="p-4 sm:p-5">
                                    <div className="flex flex-col sm:flex-row justify-between mb-3.5 gap-2 sm:gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <h3 className="font-bold text-base text-gray-900 line-clamp-1">{job.service_name || 'Repair Service'}</h3>
                                                <span className={`text-[10px] whitespace-nowrap font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md ${job.status === 'in_progress' ? 'bg-blue-50 text-blue-700 border border-blue-200/50' : 'bg-orange-50 text-orange-700 border border-orange-200/50'}`}>
                                                    {job.status === 'in_progress' ? 'In Progress' : 'Pending'}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-semibold text-gray-600">
                                                <span className="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded-md border border-gray-100"><Clock size={14} className="text-gray-400" /> {new Date(job.booking_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'Scheduled'}</span>
                                                <span className="flex items-center gap-1"><MapPin size={14} className="text-gray-400" /> <span className="line-clamp-1">{job.address || 'Address provided'}</span></span>
                                            </div>
                                        </div>
                                        <div className="text-left sm:text-right flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider order-2 sm:order-1 sm:mb-0.5">Payment Due</p>
                                            <p className="text-base sm:text-lg font-black text-emerald-600 tracking-tight order-1 sm:order-2">₹{job.total_amount}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-dashed border-gray-100">
                                        <div className="flex items-center gap-2 w-full sm:w-auto">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-(--primary) border border-blue-100 shrink-0">
                                                <User size={14} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-bold text-gray-900 text-xs truncate">{job.user?.name || 'Customer'}</p>
                                                <p className="text-[10px] text-gray-500 font-medium flex items-center gap-1"><Phone size={10} /> {job.user?.phone || 'N/A'}</p>
                                            </div>
                                        </div>

                                        <div className="w-full sm:w-auto flex gap-2">
                                            {job.user?.phone && (
                                                <a href={`tel:${job.user.phone}`} className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-xs rounded-lg transition-colors border border-gray-200/60">
                                                    <Phone size={14} /> Call
                                                </a>
                                            )}
                                            <Link href={`/technician/jobs/${job.id}`} className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-1.5 bg-(--primary) hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-all shadow-[0_2px_8px_0_rgba(0,118,255,0.3)] hover:shadow-[0_4px_12px_rgba(0,118,255,0.2)]">
                                                Go To Job <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="bg-white/50 backdrop-blur-sm p-12 rounded-3xl border border-dashed border-gray-200 text-center">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                    <CheckCircle size={32} className="text-emerald-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">You're All Caught Up!</h3>
                                <p className="text-gray-500 text-sm max-w-sm mx-auto">You have no upcoming jobs assigned for today. Take a break or check upcoming schedules.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-4">
                    <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl p-4 text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                        <div className="flex items-center gap-2 mb-4 relative z-10">
                            <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                                <TrendingUp size={16} className="text-blue-200" />
                            </div>
                            <h3 className="font-bold text-sm text-white">Quick Performance</h3>
                        </div>
                        <div className="space-y-3 relative z-10">
                            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                                <span className="text-blue-100/80 text-xs font-medium">Completion Rate</span>
                                <span className="font-black text-white text-base">94%</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                                <span className="text-blue-100/80 text-xs font-medium">Customer Rating</span>
                                <span className="font-black text-white text-base">{stats?.rating || '5.0'}</span>
                            </div>
                            <div className="flex items-center justify-between pt-1">
                                <span className="text-blue-100/80 text-xs font-medium">Total Earned</span>
                                <span className="font-black text-emerald-400 text-lg">₹{stats?.earnings || 0}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 p-4">
                        <h3 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-1.5">
                            <Star size={14} className="text-yellow-500" /> Recent Feedback
                        </h3>
                        {stats?.rating > 0 ? (
                            <div className="text-center py-4">
                                <div className="flex justify-center mb-2">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} size={16} className="text-yellow-400 fill-current mx-0.5" />
                                    ))}
                                </div>
                                <p className="text-xs text-gray-600 font-medium leading-relaxed">"Great service! Very professional."</p>
                                <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-wider">- Verified Customer</p>
                            </div>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-xs text-gray-500">No recent feedback available.</p>
                            </div>
                        )}
                        <Link href="/technician/reviews" className="block w-full mt-2 py-1.5 text-center text-xs font-bold text-(--primary) bg-blue-50/50 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100/50">
                            See All
                        </Link>
                    </div>
                </div>
            </div>
        </TechnicianLayout>
    );
}
