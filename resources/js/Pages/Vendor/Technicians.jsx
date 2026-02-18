import React from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { Head } from '@inertiajs/react';
import Card from '../../Components/Cards/Card';
import Button from '../../Components/Forms/Button';
import Badge from '../../Components/Badge';
import { User, Phone, Star, MoreVertical } from 'lucide-react';

export default function Technicians() {
    const technicians = [
        { id: 1, name: 'Mike Ross', role: 'Senior Technician', status: 'Active', rating: 4.8, jobs: 124 },
        { id: 2, name: 'Harvey Specter', role: 'Specialist', status: 'Busy', rating: 4.9, jobs: 200 },
        { id: 3, name: 'Louis Litt', role: 'Junior Technician', status: 'Offline', rating: 4.2, jobs: 45 },
    ];

    return (
        <VendorLayout>
            <Head title="Technicians - Vendor Dashboard" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Technicians</h1>
                    <p className="text-gray-500">Manage your field team</p>
                </div>
                <Button>+ Add Technician</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {technicians.map((tech) => (
                    <Card key={tech.id} className="text-center relative">
                        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                            <MoreVertical size={20} />
                        </button>

                        <div className="mx-auto h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <User size={32} className="text-gray-500" />
                        </div>

                        <h3 className="text-lg font-bold text-gray-900">{tech.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{tech.role}</p>

                        <div className="flex justify-center gap-2 mb-4">
                            <Badge variant={tech.status === 'Active' ? 'success' : tech.status === 'Busy' ? 'warning' : 'gray'}>
                                {tech.status}
                            </Badge>
                        </div>

                        <div className="grid grid-cols-2 border-t pt-4">
                            <div>
                                <p className="text-xs text-gray-500">Rating</p>
                                <p className="font-bold text-gray-900 flex items-center justify-center gap-1">
                                    {tech.rating} <Star size={12} className="text-yellow-400 fill-current" />
                                </p>
                            </div>
                            <div className="border-l">
                                <p className="text-xs text-gray-500">Jobs</p>
                                <p className="font-bold text-gray-900">{tech.jobs}</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Button variant="outline" size="sm" className="w-full">View Profile</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </VendorLayout>
    );
}
