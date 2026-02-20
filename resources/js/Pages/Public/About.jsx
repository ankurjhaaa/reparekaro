import React from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { Shield, Users, Award, MapPin, Clock, Star, Heart, Target } from 'lucide-react';

export default function About() {
    const stats = [
        { num: '50K+', label: 'Customers Served', icon: Users },
        { num: '2000+', label: 'Skilled Technicians', icon: Award },
        { num: '15+', label: 'Cities', icon: MapPin },
        { num: '4.8', label: 'App Rating', icon: Star },
    ];

    const values = [
        { icon: Shield, title: 'Trust & Safety', desc: 'Every technician is verified with background checks before joining our platform.' },
        { icon: Clock, title: 'Punctuality', desc: 'We respect your time. Service at your doorstep within the promised window.' },
        { icon: Heart, title: 'Customer First', desc: 'Your satisfaction is our top priority. We go the extra mile for you.' },
        { icon: Target, title: 'Quality Work', desc: '30-day warranty on every repair. We stand behind our work, always.' },
    ];

    const team = [
        { name: 'Ankur Jha', role: 'Founder & CEO', initials: 'AJ' },
        { name: 'Priya Sharma', role: 'Head of Operations', initials: 'PS' },
        { name: 'Rahul Verma', role: 'CTO', initials: 'RV' },
    ];

    return (
        <PublicLayout>
            <Head title="About Us" />

            <div className="bg-gray-50 min-h-screen pb-20">
                {/* Hero */}
                <div className="bg-[var(--primary)] text-white px-4 py-10 text-center">
                    <h1 className="text-2xl font-extrabold mb-2">About RepairKaro</h1>
                    <p className="text-blue-100 text-sm max-w-md mx-auto leading-relaxed">
                        India's fastest growing home services platform. Making quality repairs accessible to every household.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto px-4">
                    {/* Stats */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 -mt-6 relative z-10 grid grid-cols-2 divide-x divide-y divide-gray-100">
                        {stats.map((stat, i) => (
                            <div key={i} className="p-5 text-center">
                                <stat.icon size={20} className="mx-auto text-[var(--primary)] mb-2" />
                                <p className="text-xl font-extrabold text-gray-900">{stat.num}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Story */}
                    <div className="mt-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Our Story</h2>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                            <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                RepairKaro was born from a simple frustration — finding reliable repair professionals shouldn't be so hard.
                                Every homeowner deserves access to skilled, verified technicians at fair prices.
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                We started in 2024 with a mission to organize India's fragmented home services market. Today, we serve
                                50,000+ happy customers across 15+ cities with 2,000+ verified technicians on our platform.
                            </p>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="mt-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Our Values</h2>
                        <div className="space-y-3">
                            {values.map((item, i) => (
                                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[var(--primary)] flex items-center justify-center shrink-0">
                                        <item.icon size={18} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team */}
                    <div className="mt-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Our Team</h2>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {team.map((person, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-b-0">
                                    <div className="w-11 h-11 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm shrink-0">
                                        {person.initials}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 text-sm">{person.name}</p>
                                        <p className="text-xs text-gray-500">{person.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
