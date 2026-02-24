import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Check, Sparkles, Wrench, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Skills() {
    const [skills, setSkills] = useState([
        { id: 'ac', name: 'AC Repair & Install', category: 'HVAC', selected: true },
        { id: 'fridge', name: 'Refrigerator Repair', category: 'Appliance', selected: false },
        { id: 'wm', name: 'Washing Machine', category: 'Appliance', selected: true },
        { id: 'electrician', name: 'Electrician', category: 'General', selected: false },
        { id: 'plumber', name: 'Plumber', category: 'General', selected: false },
        { id: 'carpenter', name: 'Carpenter Work', category: 'General', selected: true },
        { id: 'tv', name: 'TV Installation', category: 'Electronics', selected: false },
    ]);

    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const toggleSkill = (id) => {
        setSkills(skills.map(skill => skill.id === id ? { ...skill, selected: !skill.selected } : skill));
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1000);
    };

    // Group skills by category for better display
    const categories = [...new Set(skills.map(skill => skill.category))];

    return (
        <TechnicianLayout>
            <Head title="My Skills & Expertise" />

            <div className="pb-24 md:pb-6 max-w-3xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 relative overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--primary)]/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-2">
                            <Link href="/technician/profile" className="p-2.5 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/60 shadow-sm hover:bg-white hover:shadow-md transition-all group">
                                <ChevronLeft size={20} className="text-gray-600 group-hover:-translate-x-0.5 transition-transform" />
                            </Link>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                                    My Expertise
                                </h1>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm sm:text-base font-medium ml-14 max-w-md">
                            Select the services you offer. This helps us match you with the right customer bookings.
                        </p>
                    </div>
                </div>

                {/* Skills Grid Section */}
                <div className="space-y-8">
                    {categories.map((category) => (
                        <div key={category} className="space-y-4">
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider pl-2 flex items-center gap-2">
                                {category === 'HVAC' || category === 'Appliance' ? <ShieldCheck size={16} /> : <Wrench size={16} />}
                                {category} Services
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {skills.filter(s => s.category === category).map((skill) => (
                                    <label
                                        key={skill.id}
                                        className={`group relative flex items-center p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2 overflow-hidden ${skill.selected
                                                ? 'bg-blue-50/50 border-[var(--primary)] shadow-[0_4px_15px_rgba(0,118,255,0.1)]'
                                                : 'bg-white border-transparent shadow-sm hover:border-gray-200 hover:shadow-md'
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            className="sr-only"
                                            checked={skill.selected}
                                            onChange={() => toggleSkill(skill.id)}
                                        />

                                        <div className={`relative flex items-center justify-center w-6 h-6 rounded-md mr-4 shrink-0 transition-all duration-300 border-2 ${skill.selected
                                                ? 'bg-[var(--primary)] border-[var(--primary)] shadow-sm'
                                                : 'bg-gray-50 border-gray-300 group-hover:border-[var(--primary)]/50'
                                            }`}>
                                            <Check size={14} className={`text-white transition-transform duration-300 ${skill.selected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} strokeWidth={3} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <span className={`block font-bold text-sm sm:text-base transition-colors ${skill.selected ? 'text-gray-900' : 'text-gray-600'
                                                }`}>
                                                {skill.name}
                                            </span>
                                        </div>

                                        {/* Premium Glow effect when selected */}
                                        {skill.selected && (
                                            <div className="absolute top-0 right-0 -m-4 w-12 h-12 bg-gradient-to-br from-[var(--primary)]/20 to-transparent blur-md rounded-full pointer-events-none"></div>
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Fixed Bottom Action Bar */}
                <div className="fixed bottom-0 md:sticky md:bottom-auto md:top-auto left-0 right-0 p-4 bg-white/90 backdrop-blur-md md:bg-transparent md:backdrop-blur-none border-t border-gray-100 md:border-none z-30 pb-safe sm:pb-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`w-full max-w-3xl mx-auto flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider text-white transition-all shadow-xl disabled:opacity-80
                            ${showSuccess
                                ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30'
                                : 'bg-[var(--primary)] hover:bg-blue-600 shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5'
                            }
                        `}
                    >
                        {isSaving ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : showSuccess ? (
                            <>
                                <CheckCircle2 size={20} strokeWidth={2.5} />
                                Saved Successfully
                            </>
                        ) : (
                            <>
                                <Sparkles size={18} />
                                Save Expertise
                            </>
                        )}
                    </button>
                </div>
            </div>
        </TechnicianLayout>
    );
}
