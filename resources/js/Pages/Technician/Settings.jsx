import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, User, Lock, CreditCard, Bell, Moon, HelpCircle, FileText, LogOut, MapPin } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function Settings() {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [availability, setAvailability] = useState(true);

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

            <div className="pb-24 md:pb-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <Link href="/technician/profile" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
                        <ChevronLeft size={20} className="text-gray-600" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Settings</h1>
                </div>

                <div className="space-y-6">
                    {sections.map((section, idx) => (
                        <div key={idx}>
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">{section.title}</h2>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                {section.items.map((item, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-center justify-between p-4 ${i !== section.items.length - 1 ? 'border-b border-gray-50' : ''}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 text-(--primary) flex items-center justify-center">
                                                <item.icon size={20} />
                                            </div>

                                            {item.href ? (
                                                <Link href={item.href} className="flex-1 font-semibold text-gray-900 text-sm hover:text-(--primary) transition-colors">
                                                    {item.label}
                                                </Link>
                                            ) : (
                                                <span className="font-semibold text-gray-900 text-sm">{item.label}</span>
                                            )}
                                        </div>

                                        {item.type === 'toggle' ? (
                                            <button
                                                onClick={item.onToggle}
                                                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${item.value ? 'bg-(--primary)' : 'bg-gray-300'}`}
                                            >
                                                <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${item.value ? 'translate-x-6' : 'translate-x-0'}`} />
                                            </button>
                                        ) : (
                                            item.href && <ChevronLeft size={16} className="rotate-180 text-gray-400" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="pt-4">
                        <button className="w-full bg-red-50 p-4 rounded-2xl border border-red-100 text-red-600 font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors">
                            <LogOut size={20} />
                            Log Out
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-4">App Version 2.4.0 (Build 2024)</p>
                    </div>
                </div>
            </div>
        </TechnicianLayout>
    );
}
