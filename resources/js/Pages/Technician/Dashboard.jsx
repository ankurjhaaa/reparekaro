import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head } from '@inertiajs/react';
import StatCard from '../../Components/Stats/StatCard';
import Card from '../../Components/Cards/Card';
import Badge from '../../Components/Badge';
import Button from '../../Components/Forms/Button';
import { CheckCircle, Clock, MapPin, Phone } from 'lucide-react';

export default function Dashboard() {
    const [isAvailable, setIsAvailable] = useState(true);

    const upcomingJobs = [
        { id: 1, customer: 'John Doe', address: '123 Main St, Apt 4B', service: 'AC Repair', time: '10:00 AM', status: 'Scheduled' },
        { id: 2, customer: 'Jane Smith', address: '456 Oak Ave', service: 'Plumbing', time: '02:00 PM', status: 'Pending' },
    ];

    return (
        <TechnicianLayout>
            <Head title="Technician Dashboard" />

            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Schedule</h1>
                    <p className="text-gray-500">Manage your assigned jobs</p>
                </div>

                <div className="flex items-center gap-4 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Status:</span>
                    <button
                        onClick={() => setIsAvailable(!isAvailable)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isAvailable ? 'bg-green-500' : 'bg-gray-200'}`}
                    >
                        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAvailable ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                    <span className={`text-sm font-medium ${isAvailable ? 'text-green-600' : 'text-gray-500'}`}>
                        {isAvailable ? 'Available' : 'Busy'}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Jobs Today" value="04" icon={CheckCircle} />
                <StatCard title="Completed This Week" value="18" icon={CheckCircle} />
                <StatCard title="Pending" value="02" icon={Clock} />
            </div>

            <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Today's Jobs</h2>
                {upcomingJobs.map((job) => (
                    <Card key={job.id} className="border-l-4 border-l-[var(--primary)]">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-lg text-gray-900">{job.service}</h3>
                                    <Badge variant={job.status === 'Scheduled' ? 'primary' : 'warning'}>{job.status}</Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span className="flex items-center gap-1"><Clock size={16} /> {job.time}</span>
                                    <span className="flex items-center gap-1"><MapPin size={16} /> {job.address}</span>
                                </div>
                                <p className="mt-2 text-gray-800 font-medium">{job.customer}</p>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                    <Phone size={16} /> Call
                                </Button>
                                <Button size="sm">Start Job</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </TechnicianLayout>
    );
}
