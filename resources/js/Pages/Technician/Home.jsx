import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link } from '@inertiajs/react';
import { DollarSign, Star, Briefcase, MapPin, Phone, Clock, Navigation } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function Home() {
    const [isOnline, setIsOnline] = useState(true);

    // Mock Data
    const stats = [
        { label: "Today's Earnings", value: "₹1,450", icon: DollarSign, color: "bg-green-100 text-green-600" },
        { label: "Jobs Completed", value: "3", icon: Briefcase, color: "bg-blue-100 text-(--primary)" },
        { label: "Rating", value: "4.8", icon: Star, color: "bg-yellow-100 text-yellow-600" },
    ];

    const currentJob = {
        id: "RK-8829",
        service: "AC Repair (Split AC)",
        customer: "Anjali Gupta",
        address: "B-201, Grand Arch, Sector 62, Noida",
        distance: "2.4 km",
        time: "10:30 AM (In 15 mins)",
        status: "Accepted",
        amount: "₹499"
    };

    return (
        <TechnicianLayout>
            <Head title="Technician Dashboard" />

            {/* Header / Duty Status */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Hello, Rahul 👋</h1>
                    <p className="text-sm text-gray-500">Ready for a new day?</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${isOnline ? 'text-green-600' : 'text-gray-400'}`}>
                        {isOnline ? 'ONLINE' : 'OFFLINE'}
                    </span>
                    <button
                        onClick={() => setIsOnline(!isOnline)}
                        className={`w-14 h-7 rounded-full p-1 transition-colors duration-300 ${isOnline ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                        <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${isOnline ? 'translate-x-7' : 'translate-x-0'}`} />
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-3 md:p-6 rounded-2xl shadow-sm border border-gray-100 text-center md:text-left">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-2 ${stat.color}`}>
                            <stat.icon size={20} />
                        </div>
                        <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                        <p className="text-lg md:text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Current / Next Job */}
            <h2 className="text-lg font-bold text-gray-900 mb-4">Current Job</h2>
            {!isOnline ? (
                <div className="bg-gray-50 rounded-2xl p-8 text-center border-2 border-dashed border-gray-200">
                    <p className="text-gray-400">You are offline. Go online to receive jobs.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-md border-l-4 border-l-(--primary) overflow-hidden mb-8">
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="inline-block px-2 py-1 rounded-md bg-blue-50 text-(--primary) text-[10px] font-bold uppercase tracking-wide mb-2">
                                    {currentJob.status}
                                </span>
                                <h3 className="text-lg font-bold text-gray-900">{currentJob.service}</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                    <Clock size={14} /> {currentJob.time}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-900">{currentJob.amount}</p>
                                <p className="text-xs text-gray-400">Via App</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-3 mb-4 flex items-start gap-3">
                            <MapPin className="text-gray-400 mt-1 shrink-0" size={18} />
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{currentJob.customer}</p>
                                <p className="text-xs text-gray-500 mb-1">{currentJob.address}</p>
                                <p className="text-xs font-bold text-(--primary) flex items-center gap-1">
                                    <Navigation size={12} /> {currentJob.distance} away
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="flex justify-center gap-2 border-green-200 text-green-600 hover:bg-green-50">
                                <Phone size={18} /> Call
                            </Button>
                            <Link href={`/technician/job/${currentJob.id}`} className="block w-full">
                                <Button className="w-full">View Details</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Upcoming Jobs Preview */}
            <div className="flex justify-between items-end mb-4">
                <h2 className="text-lg font-bold text-gray-900">Upcoming</h2>
                <Link href="/technician/jobs" className="text-sm font-semibold text-(--primary)">See All</Link>
            </div>
            <div className="space-y-3 pb-20 md:pb-0">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center opacity-70 grayscale">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 font-bold text-xs">
                                02:00<br />PM
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-sm">Plumbing Check</p>
                                <p className="text-xs text-gray-500">Sector 18 • ₹299</p>
                            </div>
                        </div>
                        <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 font-bold">LOCKED</span>
                    </div>
                ))}
            </div>

        </TechnicianLayout>
    );
}
