import React from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { User, Settings, LogOut, HelpCircle, FileText, CheckCircle, Award, Star, Mail, Phone, MapPin } from 'lucide-react';

export default function Profile() {
    const { user, stats } = usePage().props;

    // Use actual user data or fallbacks
    const profile = {
        name: user?.name || "Technician",
        role: "Verified Professional",
        rating: stats?.rating || 5.0,
        jobs: stats?.jobs || 0,
        email: user?.email || "",
        phone: user?.phone || "+91 0000000000",
        image: user?.image || `https://ui-avatars.com/api/?name=${user?.name || "Technician"}&background=random`
    };

    const sections = [
        {
            title: 'Account',
            items: [
                { icon: User, label: 'Personal Information', href: '/technician/edit-profile' },
                { icon: FileText, label: 'Documents & Verification', href: '/technician/documents', badge: 'Verified' },
                { icon: Award, label: 'Skills & Certifications', href: '/technician/skills' },
                { icon: Star, label: 'My Reviews', href: '/technician/reviews' },
            ]
        },
        {
            title: 'App Settings',
            items: [
                { icon: Settings, label: 'Preferences', href: '/technician/settings' },
                { icon: HelpCircle, label: 'Support & Help', href: '/technician/support' },
            ]
        }
    ];

    return (
        <TechnicianLayout>
            <Head title="My Profile" />

            <div className="pb-24 md:pb-6 max-w-2xl mx-auto space-y-4 sm:space-y-6">
                {/* Profile Header Card */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full translate-x-12 -translate-y-12 blur-xl group-hover:bg-blue-100 transition-colors duration-500"></div>

                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 relative z-10 w-full">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1.5 bg-gradient-to-br from-(--primary) to-purple-500 shadow-xl shrink-0">
                            <div className="w-full h-full rounded-full border-4 border-white overflow-hidden relative bg-white">
                                <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-white shadow-sm" title="Verified Professional">
                                <CheckCircle size={12} />
                            </div>
                        </div>

                        <div className="flex-1 text-center sm:text-left mt-1 sm:mt-2">
                            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">{profile.name}</h1>
                            <p className="text-xs font-bold text-(--primary) uppercase tracking-wider mt-0.5">{profile.role}</p>

                            <div className="flex flex-col sm:flex-row gap-3 mt-4 pt-4 border-t border-dashed border-gray-200 justify-center sm:justify-start">
                                <div className="flex items-center gap-2 justify-center sm:justify-start">
                                    <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 border border-orange-100">
                                        <Star size={16} className="fill-current" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-black text-gray-900 leading-tight">{profile.rating}</p>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Rating</p>
                                    </div>
                                </div>
                                <div className="hidden sm:block w-px h-8 bg-gray-200"></div>
                                <div className="flex items-center gap-2 justify-center sm:justify-start">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100">
                                        <Award size={16} />
                                    </div>
                                    <div>
                                        <p className="text-lg font-black text-gray-900 leading-tight">{profile.jobs}</p>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Jobs Done</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0">
                            <Mail size={16} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Email</p>
                            <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{profile.email || 'Not provided'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0">
                            <Phone size={16} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</p>
                            <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">{profile.phone || 'Not provided'}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    {sections.map((section, idx) => (
                        <div key={idx}>
                            <h2 className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-2">{section.title}</h2>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                {section.items.map((item, i) => (
                                    <Link
                                        key={i}
                                        href={item.href}
                                        className={`flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 transition-colors ${i !== section.items.length - 1 ? 'border-b border-gray-50' : ''}`}
                                    >
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center">
                                                <item.icon size={18} className="sm:w-5 sm:h-5" />
                                            </div>
                                            <span className="font-semibold text-gray-900 text-xs sm:text-sm">{item.label}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {item.badge && (
                                                <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[9px] sm:text-[10px] font-bold uppercase rounded-md flex items-center gap-1">
                                                    <CheckCircle size={10} /> {item.badge}
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button className="w-full bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-red-100 text-red-600 text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
                        <LogOut size={18} />
                        Log Out
                    </button>

                    <p className="text-center text-[10px] sm:text-xs text-gray-400 mt-6 mb-4">Partner App v1.0.0</p>
                </div>
            </div>
        </TechnicianLayout>
    );
}
