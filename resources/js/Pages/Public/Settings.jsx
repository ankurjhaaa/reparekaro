import React, { useState } from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, User, Lock, Bell, HelpCircle, FileText, Share2, LogOut, ChevronRight, Moon, Globe } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function Settings() {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    const sections = [
        {
            title: 'Account',
            items: [
                { icon: User, label: 'Edit Profile', href: '/edit-profile' },
                { icon: Lock, label: 'Change Password', href: '/change-password' },
                { icon: Globe, label: 'Language', value: 'English' },
            ]
        },
        {
            title: 'Preferences',
            items: [
                { icon: Bell, label: 'Push Notifications', type: 'toggle', value: notifications, onToggle: () => setNotifications(!notifications) },
                { icon: Moon, label: 'Dark Mode', type: 'toggle', value: darkMode, onToggle: () => setDarkMode(!darkMode) },
            ]
        },
        {
            title: 'Support',
            items: [
                { icon: HelpCircle, label: 'Help Center', href: '/help' },
                { icon: FileText, label: 'Terms & Conditions', href: '/terms' },
                { icon: Share2, label: 'Invite Friends', href: '#' },
            ]
        }
    ];

    return (
        <PublicLayout>
            <Head title="Settings" />

            <div className="bg-gray-50 min-h-screen py-6 max-w-2xl mx-auto px-4 pb-20 md:pb-6">
                <div className="flex items-center gap-3 mb-8">
                    <Link href="/profile" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
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
                                        className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${i !== section.items.length - 1 ? 'border-b border-gray-50' : ''}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 text-(--primary) flex items-center justify-center">
                                                <item.icon size={20} />
                                            </div>
                                            <span className="font-semibold text-gray-900 text-sm">{item.label}</span>
                                        </div>

                                        {item.type === 'toggle' ? (
                                            <button
                                                onClick={item.onToggle}
                                                className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${item.value ? 'bg-(--primary)' : 'bg-gray-200'}`}
                                            >
                                                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${item.value ? 'translate-x-6' : 'translate-x-0'}`} />
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-2 text-gray-400">
                                                {item.value && <span className="text-xs font-medium">{item.value}</span>}
                                                <ChevronRight size={18} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button className="w-full bg-white p-4 rounded-2xl shadow-sm border border-red-100 text-red-600 font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
                        <LogOut size={20} />
                        Log Out
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-8">App Version 1.0.0 (Build 2026.02.18)</p>
                </div>
            </div>
        </PublicLayout>
    );
}
