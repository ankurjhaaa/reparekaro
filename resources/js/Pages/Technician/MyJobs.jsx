import React from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head } from '@inertiajs/react';
import Card from '../../Components/Cards/Card';
import Badge from '../../Components/Badge';
import Button from '../../Components/Forms/Button';
import { MapPin, Clock, Calendar, CheckCircle } from 'lucide-react';

export default function MyJobs() {
    const jobs = [
        { id: 'JB-101', customer: 'Alice Smith', type: 'AC Repair', status: 'Pending', date: '2023-10-25', time: '10:00 AM', address: '123 Main St, Apt 4B' },
        { id: 'JB-102', customer: 'Bob Jones', type: 'AC Service', status: 'In Progress', date: '2023-10-25', time: '02:00 PM', address: '456 Oak Avenue' },
        { id: 'JB-100', customer: 'Charlie Brown', type: 'Installation', status: 'Completed', date: '2023-10-24', time: '11:00 AM', address: '789 Pine Lane' },
    ];

    return (
        <TechnicianLayout>
            <Head title="My Jobs" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
                <p className="text-gray-500">Scheduled tasks for you</p>
            </div>

            <div className="space-y-4">
                {jobs.map((job) => (
                    <Card key={job.id} className="border-l-4 border-l-[var(--primary)]">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-gray-900">{job.type}</span>
                                    <Badge variant={job.status === 'Completed' ? 'success' : job.status === 'In Progress' ? 'warning' : 'primary'}>
                                        {job.status}
                                    </Badge>
                                </div>
                                <h3 className="text-sm font-medium text-gray-600">Customer: {job.customer}</h3>
                                <div className="flex flex-col sm:flex-row sm:gap-4 mt-2 text-sm text-gray-500">
                                    <div className="flex items-center gap-1"><Calendar size={14} /> {job.date}</div>
                                    <div className="flex items-center gap-1"><Clock size={14} /> {job.time}</div>
                                    <div className="flex items-center gap-1"><MapPin size={14} /> {job.address}</div>
                                </div>
                            </div>

                            <div className="flex gap-2 w-full sm:w-auto">
                                {job.status !== 'Completed' && (
                                    <Button size="sm" className="w-full sm:w-auto flex items-center justify-center gap-1">
                                        <CheckCircle size={16} /> Mark Done
                                    </Button>
                                )}
                                <Button variant="outline" size="sm" className="w-full sm:w-auto">Details</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </TechnicianLayout>
    );
}
