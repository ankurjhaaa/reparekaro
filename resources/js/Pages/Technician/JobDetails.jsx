import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link } from '@inertiajs/react';
import { Clock, MapPin, Phone, MessageSquare, Navigation, CheckCircle, ChevronLeft, CreditCard, Shield, Camera, MessageCircle } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function JobDetails({ id }) {
    // Mock Data
    const job = {
        id: id || "RK-8829",
        service: "AC Repair (Split AC)",
        customer: "Anjali Gupta",
        phone: "+91 98765 43210",
        address: "B-201, Grand Arch, Sector 62, Noida, UP - 201301",
        time: "10:30 AM",
        date: "Today, Feb 18",
        amount: "₹499",
        paymentStatus: "cod", // 'paid' or 'cod'
        status: "accepted", // 'accepted', 'started', 'completed'
        items: [
            "AC Cleaning x1",
            "Gas Refill x1"
        ]
    };

    const [status, setStatus] = useState(job.status);

    const handleAction = () => {
        if (status === 'accepted') setStatus('started');
        else if (status === 'started') setStatus('completed');
    };

    return (
        <TechnicianLayout>
            <Head title={`Job #${job.id}`} />

            <div className="pb-24 md:pb-6 max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <Link href="/technician/jobs" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
                        <ChevronLeft size={20} className="text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Job Details</h1>
                        <p className="text-xs text-gray-500">ID: {job.id}</p>
                    </div>
                    <div className="ml-auto">
                        <span className={`px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full`}>
                            {status}
                        </span>
                    </div>
                </div>

                {/* Customer Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">{job.customer}</h2>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                <MapPin size={14} /> {job.address}
                            </p>
                        </div>
                        <a
                            href={`https://maps.google.com/?q=${job.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-blue-50 text-(--primary) rounded-xl hover:bg-blue-100 transition-colors flex flex-col items-center justify-center w-12 h-12"
                        >
                            <Navigation size={20} />
                            <span className="text-[8px] font-bold mt-0.5">Map</span>
                        </a>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-50">
                        <a href={`tel:${job.phone}`} className="flex items-center justify-center gap-2 py-2.5 bg-green-50 text-green-600 rounded-xl font-semibold text-sm hover:bg-green-100 transition-colors">
                            <Phone size={16} /> Call Customer
                        </a>
                        <Link href={`/technician/chat/${job.id}`} className="flex-1 bg-green-50 text-green-700 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold hover:bg-green-100 transition-colors">
                            <MessageCircle size={20} />
                            <span>Chat</span>
                        </Link>
                    </div>
                </div>

                {/* Job Info */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Service Details</h3>

                    <div className="flex justify-between items-center mb-4">
                        <div className="text-lg font-bold text-gray-900">{job.service}</div>
                        <div className="text-sm font-semibold text-gray-600">{job.time}</div>
                    </div>

                    <ul className="space-y-2 mb-6 text-sm text-gray-600">
                        {job.items.map((item, i) => (
                            <li key={i} className="flex gap-2 items-center">
                                <CheckCircle size={14} className="text-green-500" /> {item}
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-2 text-gray-600 font-medium">
                            <CreditCard size={18} /> Total Amount
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-lg font-bold text-gray-900">{job.amount}</span>
                            <span className={`text-[10px] font-bold uppercase ${job.paymentStatus === 'paid' ? 'text-green-600' : 'text-orange-500'}`}>
                                {job.paymentStatus === 'paid' ? 'Paid Online' : 'Collect Cash'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Workflow Actions */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg md:relative md:bg-transparent md:border-0 md:shadow-none z-50">
                    <div className="max-w-2xl mx-auto flex gap-3">
                        {status === 'accepted' && (
                            <Button
                                onClick={handleAction}
                                className="w-full py-3.5 text-lg font-bold bg-(--primary) hover:bg-blue-700 shadow-xl shadow-blue-200"
                            >
                                Start Job
                            </Button>
                        )}

                        {status === 'started' && (
                            <>
                                <button className="p-3.5 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200">
                                    <Camera size={24} />
                                </button>
                                <Button
                                    onClick={handleAction}
                                    className="w-full py-3.5 text-lg font-bold bg-green-600 hover:bg-green-700 shadow-xl shadow-green-200"
                                >
                                    Complete Job
                                </Button>
                            </>
                        )}

                        {status === 'completed' && (
                            <div className="w-full py-3 bg-green-50 text-green-700 text-center font-bold rounded-xl border border-green-200 flex items-center justify-center gap-2">
                                <CheckCircle size={20} /> Job Completed Successfully
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </TechnicianLayout>
    );
}
