import React, { useState } from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function Services() {
    const [services, setServices] = useState([
        { id: 1, name: 'AC Repair', price: '₹499', category: 'AC Repair', duration: '45 mins' },
        { id: 2, name: 'Gas Refill', price: '₹2499', category: 'AC Repair', duration: '60 mins' },
        { id: 3, name: 'Installation', price: '₹999', category: 'AC Repair', duration: '90 mins' },
        { id: 4, name: 'General Service', price: '₹399', category: 'Plumbing', duration: '30 mins' },
    ]);

    return (
        <VendorLayout title="Services">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Services</h1>
                <Button className="flex items-center gap-2 bg-(--primary) text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    <Plus size={18} /> Add Service
                </Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-xs border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Service Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-900">
                                    {service.name}
                                    <div className="text-xs font-normal text-gray-400 mt-0.5">{service.duration}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold uppercase">
                                        {service.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-bold text-green-600">
                                    {service.price}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </VendorLayout>
    );
}
