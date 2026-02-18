import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Bell, Briefcase, Wallet, Star, Info } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function Notifications() {
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'job', title: 'New Job Assigned', desc: 'AC Repair at Sector 62. Accept now!', time: '5m ago', read: false },
        { id: 2, type: 'wallet', title: 'Payment Received', desc: '₹450 credited for Job #RK-8801', time: '2h ago', read: false },
        { id: 3, type: 'rating', title: 'New 5-Star Rating', desc: 'Amit Kumar rated you 5 stars.', time: '1d ago', read: true },
        { id: 4, type: 'system', title: 'System Maintenance', desc: 'App will be down for 30 mins tonight.', time: '2d ago', read: true },
    ]);

    const getIcon = (type) => {
        switch (type) {
            case 'job': return <Briefcase size={20} className="text-(--primary)" />;
            case 'wallet': return <Wallet size={20} className="text-green-500" />;
            case 'rating': return <Star size={20} className="text-yellow-500" />;
            default: return <Info size={20} className="text-gray-500" />;
        }
    }

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    return (
        <TechnicianLayout>
            <Head title="Notifications" />

            <div className="pb-24 md:pb-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Link href="/technician/dashboard" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
                            <ChevronLeft size={20} className="text-gray-600" />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
                    </div>
                    <button onClick={markAllRead} className="text-xs font-semibold text-(--primary) hover:text-blue-700">
                        Mark all as read
                    </button>
                </div>

                <div className="space-y-3">
                    {notifications.length > 0 ? (
                        notifications.map((n) => (
                            <div key={n.id} className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 ${n.read ? 'opacity-70 grayscale-0' : 'bg-blue-50/10'}`}>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${n.read ? 'bg-gray-100' : 'bg-white shadow-sm ring-1 ring-blue-100'}`}>
                                    {getIcon(n.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className={`text-sm font-semibold text-gray-900 ${!n.read && 'font-bold'}`}>{n.title}</h3>
                                        <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{n.time}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{n.desc}</p>
                                    {!n.read && (
                                        <div className="flex justify-between items-end mt-2">
                                            <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                                            {n.type === 'job' && <Link href="/technician/jobs"><span className="text-xs font-bold text-(--primary)">View Job</span></Link>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-24 text-gray-400">
                            <Bell size={48} className="mx-auto mb-4 opacity-20" />
                            <p>No new notifications</p>
                        </div>
                    )}
                </div>
            </div>
        </TechnicianLayout>
    );
}
