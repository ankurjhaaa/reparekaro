import React from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { Head } from '@inertiajs/react';
import Card from '../../Components/Cards/Card';
import Button from '../../Components/Forms/Button';
import Badge from '../../Components/Badge';
import { PenTool, Trash2, Plus, Edit } from 'lucide-react';

export default function Services() {
    const services = [
        { id: 1, name: 'AC Repair', price: '$50', duration: '1 hour', status: 'Active' },
        { id: 2, name: 'AC Installation', price: '$80', duration: '2 hours', status: 'Active' },
        { id: 3, name: 'Gas Refill', price: '$40', duration: '30 mins', status: 'Inactive' },
    ];

    return (
        <VendorLayout>
            <Head title="My Services - Vendor Dashboard" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Services</h1>
                    <p className="text-gray-500">Manage the services you offer</p>
                </div>
                <Button className="flex items-center gap-2">
                    <Plus size={16} /> Add New Service
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <Card key={service.id} className="relative group">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                            <button className="p-1.5 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                <PenTool size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">{service.name}</h3>
                                <Badge variant={service.status === 'Active' ? 'success' : 'gray'}>{service.status}</Badge>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                            <span>Price: <span className="font-semibold text-gray-900">{service.price}</span></span>
                            <span>Duration: <span className="font-semibold text-gray-900">{service.duration}</span></span>
                        </div>
                    </Card>
                ))}
            </div>
        </VendorLayout>
    );
}
