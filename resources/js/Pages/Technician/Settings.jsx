import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronLeft, User, Lock, CreditCard, Bell, Moon, HelpCircle, FileText, LogOut, MapPin, CheckCircle } from 'lucide-react';

export default function Settings() {
    const { user } = usePage().props;
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const sections = [
        {
            title: 'Account',
            items: [
                { icon: User, label: 'Edit Profile', href: '/technician/edit-profile' },
                { icon: CreditCard, label: 'Bank & Payout Details', href: '/technician/bank-details' },
                { icon: Lock, label: 'Change Password', href: '/technician/change-password' },
                { icon: MapPin, label: 'Service Area', href: '/technician/service-area' },
            ]
        },
        {
            title: 'Preferences',
            items: [
                {
                    icon: Bell,
                    label: 'Job Notifications',
                    type: 'toggle',
                    value: notifications,
                    onToggle: () => setNotifications(!notifications)
                },
                {
                    icon: Moon,
                    label: 'Dark Mode',
                    type: 'toggle',
                    value: darkMode,
                    onToggle: () => setDarkMode(!darkMode)
                },
            ]
        },
        {
            title: 'Legal & Support',
            items: [
                { icon: FileText, label: 'Partner Agreement', href: '/technician/terms' },
                { icon: HelpCircle, label: 'Help Center', href: '/technician/support' },
            ]
        }
    ];

    return (
        <TechnicianLayout>
            <Head title="Settings" />

            <div className="pb-24 md:pb-6 max-w-2xl mx-auto space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <Link href="/technician/profile" className="p-2 sm:p-2.5 bg-white rounded-lg sm:rounded-xl shadow-[0_2px_10px_0_rgba(0,0,0,0.03)] border border-gray-100 hover:bg-gray-50 transition-all hover:-translate-x-1">
                            <ChevronLeft size={18} className="text-gray-900 sm:w-5 sm:h-5" />
                        </Link>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Settings</h1>
                            <p className="text-[10px] sm:text-xs text-gray-500 font-medium mt-0.5">Manage your preferences.</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    {sections.map((section, idx) => (
                        <div key={idx}>
                            <h2 className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-2">{section.title}</h2>
                            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                {section.items.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-center justify-between p-3 sm:p-4 ${i !== section.items.length - 1 ? 'border-b border-gray-50' : ''}`}
                                    >
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-50 text-(--primary) flex items-center justify-center">
                                                <item.icon size={16} className="sm:w-5 sm:h-5" />
                                            </div>

                                            {item.href ? (
                                                <Link href={item.href} className="flex-1 font-semibold text-gray-900 text-xs sm:text-sm hover:text-(--primary) transition-colors">
                                                    {item.label}
                                                </Link>
                                            ) : (
                                                <span className="font-semibold text-gray-900 text-xs sm:text-sm">{item.label}</span>
                                            )}
                                        </div>

                                        {item.type === 'toggle' ? (
                                            <button
                                                onClick={item.onToggle}
                                                className={`w-10 sm:w-12 h-5 sm:h-6 rounded-full p-0.5 sm:p-1 transition-colors duration-300 ${item.value ? 'bg-(--primary)' : 'bg-gray-300'}`}
                                            >
                                                <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${item.value ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0'}`} />
                                            </button>
                                        ) : (
                                            item.href && <ChevronLeft size={14} className="rotate-180 text-gray-400 sm:w-4 sm:h-4" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="pt-2 sm:pt-4">
                        <button className="w-full bg-red-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-red-100 text-red-600 text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
                            <LogOut size={16} className="sm:w-5 sm:h-5" />
                            Log Out
                        </button>
                        <p className="text-center text-[10px] sm:text-xs text-gray-400 mt-4">App Version 2.4.0 (Build 2024)</p>
                    </div>
                </div>
            </div>
        </TechnicianLayout>
    );
}
