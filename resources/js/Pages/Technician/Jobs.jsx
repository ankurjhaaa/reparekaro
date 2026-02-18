import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link } from '@inertiajs/react';
import { Clock, MapPin, CheckCircle, AlertCircle, Phone, ArrowRight } from 'lucide-react';

export default function Jobs() {
    const [activeTab, setActiveTab] = useState('active');

    const tabs = [
        { id: 'active', label: 'Active' },
        { id: 'pending', label: 'Pending' },
        { id: 'completed', label: 'Completed' },
    ];

    const jobs = {
        active: [
            { id: 'RK-8829', title: 'AC Repair (Split AC)', customer: 'Anjali Gupta', address: 'B-201, Grand Arch, Sector 62', time: '10:30 AM', status: 'In Progress', color: 'blue' },
        ],
        pending: [
            { id: 'RK-8830', title: 'Plumbing Check', customer: 'Rahul Verma', address: 'Sector 18, Noida', time: '02:00 PM', status: 'New Request', color: 'orange' },
            { id: 'RK-8831', title: 'Fan Repair', customer: 'Priya Singh', address: 'Sector 50, Noida', time: '04:30 PM', status: 'New Request', color: 'orange' },
        ],
        completed: [
            { id: 'RK-8801', title: 'AC Service', customer: 'Amit Kumar', address: 'Sector 62', time: 'Yesterday', status: 'Done', color: 'green', amount: '₹499' },
            { id: 'RK-8799', title: 'Switch Replacement', customer: 'Sonia D.', address: 'Sector 62', time: 'Yesterday', status: 'Done', color: 'green', amount: '₹150' },
        ]
    };

    return (
        <TechnicianLayout>
            <Head title="My Jobs" />

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-bold text-gray-900">My Jobs</h1>
                <div className="bg-gray-100 p-1 rounded-lg flex space-x-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${activeTab === tab.id
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4 pb-20 md:pb-6">
                {(jobs[activeTab] || []).map((job) => (
                    <Link key={job.id} href={`/technician/job/${job.id}`} className="block">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
                            <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase rounded-bl-xl ${job.color === 'green' ? 'bg-green-100 text-green-700' :
                                    job.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                                        'bg-blue-100 text-blue-700'
                                }`}>
                                {job.status}
                            </div>

                            <div className="flex justify-between items-start mb-2 pr-12">
                                <h3 className="font-bold text-gray-900 line-clamp-1">{job.title}</h3>
                            </div>

                            <p className="text-sm font-semibold text-gray-600 mb-3">{job.customer}</p>

                            <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                                <Clock size={14} className="shrink-0" />
                                <span>{job.time}</span>
                            </div>
                            <div className="flex items-start gap-3 text-xs text-gray-500">
                                <MapPin size={14} className="shrink-0 mt-0.5" />
                                <span className="line-clamp-2">{job.address}</span>
                            </div>

                            {/* Action hint */}
                            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                                <span className="text-xs font-bold text-gray-400">ID: {job.id}</span>
                                <div className="flex items-center gap-1 text-xs font-bold text-(--primary)">
                                    View Details <ArrowRight size={14} />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                {(!jobs[activeTab] || jobs[activeTab].length === 0) && (
                    <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <p className="text-gray-400 text-sm">No jobs found in this section.</p>
                    </div>
                )}
            </div>

        </TechnicianLayout>
    );
}
