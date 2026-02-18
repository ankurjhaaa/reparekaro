import React from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link } from '@inertiajs/react';
import { User, Settings, LogOut, HelpCircle, FileText, CheckCircle, Award, Star } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function Profile() {
    const user = {
        name: "Rahul Sharma",
        role: "Senior Technician",
        rating: 4.8,
        jobs: 142,
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60"
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

            <div className="pb-24 md:pb-6 max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center mb-8">
                    <div className="w-24 h-24 rounded-full p-1 border-2 border-green-500 mb-3 relative">
                        <img src={user.image} alt={user.name} className="w-full h-full rounded-full object-cover" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                            <CheckCircle size={14} />
                        </div>
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
                    <p className="text-sm text-gray-500">{user.role}</p>

                    <div className="flex gap-6 mt-6 w-full justify-center">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{user.rating}</p>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                                <Star size={10} className="fill-current text-yellow-400" /> Rating
                            </p>
                        </div>
                        <div className="w-px bg-gray-200"></div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{user.jobs}</p>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Jobs Done</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {sections.map((section, idx) => (
                        <div key={idx}>
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">{section.title}</h2>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                {section.items.map((item, i) => (
                                    <Link
                                        key={i}
                                        href={item.href}
                                        className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${i !== section.items.length - 1 ? 'border-b border-gray-50' : ''}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center">
                                                <item.icon size={20} />
                                            </div>
                                            <span className="font-semibold text-gray-900 text-sm">{item.label}</span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {item.badge && (
                                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-md flex items-center gap-1">
                                                    <CheckCircle size={10} /> {item.badge}
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}

                    <button className="w-full bg-white p-4 rounded-2xl shadow-sm border border-red-100 text-red-600 font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
                        <LogOut size={20} />
                        Log Out
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-8 mb-4">Partner App v1.0.0</p>
                </div>
            </div>
        </TechnicianLayout>
    );
}
