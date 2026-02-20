import React, { useState } from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Bell, Gift, AlertCircle, Info, Calendar } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function Notifications() {
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'offer', title: '50% Off First Booking', desc: 'Use code WELCOME50', time: '2m ago', read: false },
        { id: 2, type: 'info', title: 'Technician Assigned', desc: 'Rahul Sharma will arrive at 10 AM', time: '1h ago', read: true },
        { id: 3, type: 'alert', title: 'Payment Reminder', desc: 'Pending payment for Order #RK-882', time: '1d ago', read: true },
        { id: 4, type: 'calendar', title: 'Booking Confirmed', desc: 'AC Repair scheduled for tomorrow', time: '2d ago', read: true },
    ]);

    const getIcon = (type) => {
        switch (type) {
            case 'offer': return <Gift size={20} className="text-purple-500" />;
            case 'alert': return <AlertCircle size={20} className="text-red-500" />;
            case 'calendar': return <Calendar size={20} className="text-blue-500" />;
            default: return <Info size={20} className="text-gray-500" />;
        }
    }

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    return (
        <PublicLayout>
            <Head title="Notifications" />

            <div className="bg-gray-50 min-h-screen py-6 max-w-2xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Link href="/profile" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
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
                                        <span className="inline-block w-2 h-2 rounded-full bg-red-500 mt-2"></span>
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
        </PublicLayout>
    );
}
