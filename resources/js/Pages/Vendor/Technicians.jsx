import React, { useState } from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { Plus, Search, User, Phone, MapPin, MoreVertical, Star, Briefcase } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function Technicians() {
    const [technicians, setTechnicians] = useState([
        { id: 1, name: 'Rahul Sharma', status: 'Active', category: 'AC Repair', rating: 4.8, jobs: 142, image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60' },
        { id: 2, name: 'Vikram Singh', status: 'Offline', category: 'Plumber', rating: 4.5, jobs: 89, image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60' },
        { id: 3, name: 'Amit Kumar', status: 'Active', category: 'Electrician', rating: 4.9, jobs: 210, image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60' },
    ]);

    return (
        <VendorLayout title="Technicians">
            {/* Header / Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Technicians</h1>
                    <p className="text-sm text-gray-500">Manage your team and assignments</p>
                </div>
                <Button className="flex items-center gap-2 bg-(--primary) text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    <Plus size={18} />
                    Add Technician
                </Button>
            </div>

            {/* Search / Filter */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search technicians..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>
                <select className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 focus:outline-none">
                    <option>All Categories</option>
                    <option>AC Repair</option>
                    <option>Plumbing</option>
                    <option>Electrical</option>
                </select>
            </div>

            {/* Technicians Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {technicians.map((tech) => (
                    <div key={tech.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all duration-300">
                        <div className="p-6 relative">
                            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                                <MoreVertical size={20} />
                            </button>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full p-1 border-2 border-gray-100 mb-4 relative">
                                    <img src={tech.image} alt={tech.name} className="w-full h-full rounded-full object-cover" />
                                    <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${tech.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'
                                        }`}></span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900">{tech.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">{tech.category}</p>

                                <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-md text-xs font-bold mb-4">
                                    <Star size={12} className="fill-current" /> {tech.rating} Rating
                                </div>

                                <div className="w-full grid grid-cols-2 gap-2 border-t border-gray-100 pt-4 mt-2">
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-gray-900">{tech.jobs}</p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Jobs</p>
                                    </div>
                                    <div className="text-center border-l border-gray-100">
                                        <p className="text-lg font-bold text-green-600">98%</p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Success</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
                            <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${tech.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                                }`}>
                                {tech.status}
                            </span>
                            <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">View Profile</button>
                        </div>
                    </div>
                ))}
            </div>
        </VendorLayout>
    );
}
