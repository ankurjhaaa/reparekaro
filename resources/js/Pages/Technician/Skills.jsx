import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Check, Plus } from 'lucide-react';

export default function Skills() {
    const [skills, setSkills] = useState([
        { id: 'ac', name: 'AC Repair & Install', selected: true },
        { id: 'fridge', name: 'Refrigerator Repair', selected: false },
        { id: 'wm', name: 'Washing Machine', selected: true },
        { id: 'electrician', name: 'Electrician', selected: false },
    ]);

    const toggleSkill = (id) => {
        setSkills(skills.map(skill => skill.id === id ? { ...skill, selected: !skill.selected } : skill));
    };

    return (
        <TechnicianLayout>
            <Head title="My Skills" />

            <div className="pb-24 md:pb-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <Link href="/technician/profile" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
                        <ChevronLeft size={20} className="text-gray-600" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Manage Skills</h1>
                </div>

                <div className="space-y-4">
                    {skills.map((skill) => (
                        <div key={skill.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toggleSkill(skill.id)}>
                            <div className="flex items-center gap-3">
                                {skill.selected && <Check size={18} className="text-green-500" />}
                                <span className={`font-semibold text-gray-900 ${skill.selected ? 'font-bold' : 'text-gray-500'}`}>{skill.name}</span>
                            </div>
                            <button className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${skill.selected ? 'bg-(--primary) border-(--primary) text-white' : 'border-gray-300 bg-white text-gray-400'
                                }`}>
                                <Plus size={14} className={skill.selected ? 'rotate-45' : ''} />
                            </button>
                        </div>
                    ))}
                    <div className="pt-4 mt-6 border-t border-gray-200">
                        <button className="w-full bg-(--primary) text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">Save Changes</button>
                    </div>
                </div>
            </div>
        </TechnicianLayout>
    );
}
