import React from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { User, Settings, LogOut, HelpCircle, Bell, ChevronRight, Bookmark, Calendar, Shield } from 'lucide-react';

import { usePage } from '@inertiajs/react';

export default function Profile() {
    const { auth } = usePage().props;
    const user = auth?.user;
    const menuItems = [
        { name: 'My Bookings', icon: Calendar, href: '/my-bookings', desc: 'View past and upcoming jobs' },
        { name: 'Saved Services', icon: Bookmark, href: '/saved-services', desc: 'Your favorite services' },
        { name: 'Notifications', icon: Bell, href: '/notifications', desc: 'Updates and offers' },
        { name: 'Settings', icon: Settings, href: '/settings', desc: 'App preferences' },
        { name: 'Help & Support', icon: HelpCircle, href: '/help', desc: 'FAQs and customer care' },
    ];

    return (
        <PublicLayout>
            <Head title="Profile" />

            {/* Mobile View */}
            <div className="md:hidden min-h-screen bg-gray-50 pb-20">
                <div className="bg-(--primary) pb-20 pt-8 px-6 text-white text-center rounded-b-4xl shadow-lg">
                    <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <User size={40} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold">{user ? user.name : 'Guest User'}</h2>
                    <p className="text-blue-100 text-sm mt-1">{user ? user.email : 'Sign in to manage your bookings'}</p>
                    {!user && (
                        <Link
                            href="/login"
                            className="inline-block mt-6 px-8 py-3 bg-white text-(--primary) rounded-full font-bold text-sm shadow-xl hover:shadow-2xl transition-all active:scale-95"
                        >
                            Sign In / Register
                        </Link>
                    )}
                </div>

                <div className="px-4 -mt-12">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center text-(--primary) transition-colors">
                                        <item.icon size={22} />
                                    </div>
                                    <span className="font-semibold text-gray-800 text-base">{item.name}</span>
                                </div>
                                <ChevronRight size={20} className="text-gray-300 group-hover:text-(--primary) transition-colors" />
                            </Link>
                        ))}
                    </div>

                    {user && (
                        <div className="mt-6 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                            <Link href="/logout" method="post" as="button" className="w-full flex items-center justify-between p-5 hover:bg-red-50 text-red-500 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                                        <LogOut size={22} />
                                    </div>
                                    <span className="font-semibold text-base">Log Out</span>
                                </div>
                            </Link>
                        </div>
                    )}

                    <p className="text-center text-xs text-gray-400 mt-8 mb-4">App Version 1.0.0</p>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:block bg-gray-50 min-h-[calc(100vh-64px)] py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-12 gap-8">
                        {/* Sidebar / User Card */}
                        <div className="col-span-4">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center sticky top-24">
                                <div className="w-32 h-32 rounded-full bg-blue-50 border-4 border-white shadow-sm flex items-center justify-center mx-auto mb-6">
                                    <User size={64} className="text-(--primary)" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">{user ? user.name : 'Guest User'}</h2>
                                <p className="text-gray-500 text-sm mt-1 mb-6">{user ? user.email : 'Welcome to RepairKaro'}</p>
                                {!user && (
                                    <Link
                                        href="/login"
                                        className="block w-full py-3 bg-(--primary) text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:bg-blue-700 transition-all"
                                    >
                                        Sign In / Register
                                    </Link>
                                )}
                                {user && (
                                    <div className="mt-8 pt-8 border-t border-gray-100 text-left">
                                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Account</h3>
                                        <Link href="/logout" method="post" as="button" className="flex items-center gap-3 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg w-full transition-colors">
                                            <LogOut size={18} />
                                            <span className="font-medium">Log Out</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Main Settings Area */}
                        <div className="col-span-8">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-100">
                                    <h2 className="text-xl font-bold text-gray-900">Profile & Settings</h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
                                    {menuItems.map((item, index) => (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className="flex flex-col p-6 rounded-xl border border-gray-100 hover:border-(--primary) hover:shadow-md hover:bg-blue-50/50 transition-all group"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-(--primary) flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                <item.icon size={24} />
                                            </div>
                                            <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </Link>
                                    ))}
                                </div>

                                <div className="p-6 bg-gray-50 border-t border-gray-100">
                                    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                        <Shield className="text-(--primary) shrink-0" size={24} />
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">Secure Account</h4>
                                            <p className="text-xs text-gray-600 mt-1">Your data is safe with us. We use industry standard encryption to protect your personal information.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
