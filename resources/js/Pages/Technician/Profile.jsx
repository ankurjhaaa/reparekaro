import React from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    User, Settings, LogOut, HelpCircle, FileText, CheckCircle, Award, Star,
    ShieldCheck, Map, CreditCard, Lock, ChevronRight
} from 'lucide-react';

export default function Profile() {
    const { user, stats } = usePage().props;

    const profile = {
        name: user?.name || "Technician User",
        role: "Verified Professional",
        rating: stats?.rating || 4.8,
        jobs: stats?.jobs || 0,
        phone: user?.phone || "+91 0000000000",
        image: user?.image || `https://ui-avatars.com/api/?name=${user?.name || "Technician"}&background=random`
    };

    const sections = [
        {
            title: 'Account',
            items: [
                { icon: User, label: 'Personal Info', href: '/technician/edit-profile' },
                { icon: Map, label: 'Service Box & Area', href: '/technician/service-area' },
                { icon: Award, label: 'Skills & Expertise', href: '/technician/skills' },
            ]
        },
        {
            title: 'Verification & Finance',
            items: [
                { icon: FileText, label: 'Documents & KYC', href: '/technician/documents', badge: 'Verified' },
                { icon: CreditCard, label: 'Bank Details', href: '/technician/bank-details' },
            ]
        },
        {
            title: 'Settings',
            items: [
                { icon: Star, label: 'My Reviews', href: '/technician/reviews' },
                { icon: Lock, label: 'Password', href: '/technician/change-password' },
                { icon: Settings, label: 'Preferences', href: '/technician/settings' },
            ]
        },
        {
            title: 'Help',
            items: [
                { icon: HelpCircle, label: 'Support', href: '/technician/support' },
                { icon: ShieldCheck, label: 'Terms', href: '/technician/terms' },
            ]
        }
    ];

    return (
        <TechnicianLayout>
            <Head title="Profile" />

            <div className="pb-24 md:pb-6 max-w-lg mx-auto space-y-4">
                {/* Compact Header */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="relative shrink-0">
                        <div className="w-16 h-16 rounded-full border border-gray-200 overflow-hidden bg-gray-50">
                            <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-white" title="Verified">
                            <CheckCircle size={10} />
                        </div>
                    </div>

                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg font-bold text-gray-900 truncate">{profile.name}</h1>
                        <p className="text-xs text-gray-500 font-medium truncate">{profile.phone}</p>

                        <div className="flex items-center gap-3 mt-1.5">
                            <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                                <Star size={12} className="text-orange-500 fill-current" />
                                {profile.rating}
                            </div>
                            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
                            <div className="flex items-center gap-1 text-xs font-bold text-gray-700">
                                <Award size={12} className="text-blue-500" />
                                {profile.jobs} Jobs
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compact Menu Sections */}
                <div className="space-y-4">
                    {sections.map((section, idx) => (
                        <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-4 py-2.5 bg-gray-50/50 border-b border-gray-100">
                                <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{section.title}</h2>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {section.items.map((item, i) => (
                                    <Link
                                        key={i}
                                        href={item.href}
                                        className="flex items-center justify-between p-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 border border-gray-100">
                                                <item.icon size={16} strokeWidth={2.5} />
                                            </div>
                                            <span className="font-semibold text-gray-800 text-sm">{item.label}</span>
                                            {item.badge && (
                                                <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[9px] font-bold uppercase rounded flex items-center gap-0.5 ml-1">
                                                    <CheckCircle size={8} strokeWidth={3} /> {item.badge}
                                                </span>
                                            )}
                                        </div>
                                        <ChevronRight size={16} className="text-gray-400" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Logout Button */}
                <div className="pt-2 pb-6">
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="w-full bg-white p-3.5 rounded-2xl shadow-sm border border-red-100 text-red-600 text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-50 active:bg-red-100 transition-colors"
                    >
                        <LogOut size={16} />
                        Log Out
                    </Link>
                </div>
            </div>
        </TechnicianLayout>
    );
}
