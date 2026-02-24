import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Clock, MapPin, CheckCircle, AlertCircle, Phone, ArrowRight, Briefcase, IndianRupee } from 'lucide-react';

export default function Jobs() {
    const { jobs } = usePage().props;
    const [activeTab, setActiveTab] = useState('active');

    const tabs = [
        { id: 'active', label: 'Active (In Progress)', shortLabel: 'Active' },
        { id: 'pending', label: 'Pending (Assigned)', shortLabel: 'Pending' },
        { id: 'completed', label: 'Completed', shortLabel: 'Completed' },
    ];

    // Filter jobs based on status
    const filteredJobs = {
        active: jobs?.filter(job => job.status === 'in_progress') || [],
        pending: jobs?.filter(job => job.status === 'assigned') || [],
        completed: jobs?.filter(job => job.status === 'completed') || []
    };

    const currentJobs = filteredJobs[activeTab];

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200/50';
            case 'in_progress': return 'bg-blue-100 text-blue-700 border-blue-200/50';
            case 'assigned': return 'bg-orange-100 text-orange-700 border-orange-200/50';
            default: return 'bg-gray-100 text-gray-700 border-gray-200/50';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed': return 'Completed';
            case 'in_progress': return 'In Progress';
            case 'assigned': return 'Pending';
            default: return status;
        }
    };

    return (
        <TechnicianLayout>
            <Head title="My Jobs" />

            <div className="mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">My Jobs</h1>
                <p className="text-xs text-gray-500 mt-0.5">Manage your assigned and ongoing tasks.</p>
            </div>

            {/* Premium Tab Navigation */}
            <div className="bg-white/80 backdrop-blur-md p-1 sm:p-1.5 rounded-xl shadow-sm border border-gray-100 mb-6 flex w-full max-w-xl">
                <div className="flex w-full space-x-1 sm:space-x-1.5 overflow-x-auto hide-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 px-1 sm:px-3 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold rounded-lg transition-all duration-300 flex items-center justify-center whitespace-nowrap ${activeTab === tab.id
                                ? 'text-[var(--primary)] shadow-[0_2px_8px_0_rgba(0,118,255,0.08)] bg-blue-50/50 border border-blue-100/50'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 border border-transparent'
                                }`}
                        >
                            <span className="hidden sm:inline">{tab.label}</span>
                            <span className="sm:hidden">{tab.shortLabel}</span>
                            <span className={`ml-1 sm:ml-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] rounded-full shadow-sm border ${activeTab === tab.id ? 'bg-white border-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500 border-gray-100/60'}`}>
                                {filteredJobs[tab.id].length}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5 pb-20 md:pb-6">
                {currentJobs.length > 0 ? currentJobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_4px_15px_rgb(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden group flex flex-col h-full">
                        <div className={`absolute top-0 right-0 py-1 px-3 text-[10px] font-black uppercase tracking-wider rounded-bl-xl border-l border-b backdrop-blur-md ${getStatusColor(job.status)}`}>
                            {getStatusText(job.status)}
                        </div>

                        <div className="p-4 sm:p-5 flex-1">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 pr-20 line-clamp-1">{job.service_name || 'Service Request'}</h3>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-start gap-2.5 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                                    <div className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
                                        <Briefcase size={14} className="text-(--primary)" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-gray-900 truncate">{job.user?.name || 'Customer'}</p>
                                        <div className="flex items-center gap-1 mt-0.5 font-medium text-gray-500 text-[10px] truncate">
                                            <Phone size={10} /> {job.user?.phone || 'N/A'}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 bg-blue-50/50 p-2 rounded-lg border border-blue-50">
                                        <Clock size={14} className="text-blue-500 shrink-0" />
                                        <span className="truncate">{new Date(job.booking_date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 bg-emerald-50/50 p-2 rounded-lg border border-emerald-50">
                                        <IndianRupee size={14} className="text-emerald-500 shrink-0" />
                                        <span className="truncate text-emerald-700">₹{job.total_amount}</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-2 text-xs font-medium text-gray-600">
                                    <MapPin size={14} className="text-red-400 shrink-0 mx-0.5 mt-0.5" />
                                    <span className="line-clamp-2 leading-relaxed">{job.address}</span>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 sm:px-5 py-3 bg-gray-50/80 backdrop-blur-sm border-t border-gray-100 flex justify-between items-center mt-auto">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">ID: {job.booking_id || job.id}</span>
                            <Link href={`/technician/job/${job.id}`} className="group-hover:translate-x-1 flex items-center gap-1 text-[11px] font-bold text-(--primary) transition-transform">
                                Go To Job <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-16 px-4 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-gray-200 text-center flex flex-col items-center justify-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                            <AlertCircle size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">No {activeTab} jobs</h3>
                        <p className="text-gray-500 mt-1">There are no {activeTab} assignments at the moment.</p>
                    </div>
                )}
            </div>
        </TechnicianLayout>
    );
}
