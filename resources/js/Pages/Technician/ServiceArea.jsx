import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, MapPin, Plus, X } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function ServiceArea() {
    const [areas, setAreas] = useState([
        { id: 1, name: 'Sector 62, Noida', active: true },
        { id: 2, name: 'Indirapuram, Ghaziabad', active: true },
        { id: 3, name: 'Sector 18, Noida', active: false },
    ]);

    const [newArea, setNewArea] = useState('');

    const addArea = () => {
        if (!newArea.trim()) return;
        setAreas([...areas, { id: Date.now(), name: newArea, active: true }]);
        setNewArea('');
    };

    const toggleArea = (id) => {
        setAreas(areas.map(a => a.id === id ? { ...a, active: !a.active } : a));
    };

    const removeArea = (id) => {
        setAreas(areas.filter(a => a.id !== id));
    };

    return (
        <TechnicianLayout>
            <Head title="Service Area" />

            <div className="pb-24 md:pb-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <Link href="/technician/settings" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
                        <ChevronLeft size={20} className="text-gray-600" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Manage Service Area</h1>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6">
                    <div className="flex gap-3">
                        <div className="bg-white p-2 rounded-full h-fit text-blue-600">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-blue-900 text-sm">Maximize Your Earnings</h3>
                            <p className="text-xs text-blue-700 mt-1">
                                Add areas near you to get more job requests. Turn off areas you are currently not available in.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newArea}
                            onChange={(e) => setNewArea(e.target.value)}
                            placeholder="Enter locality or pincode"
                            className="flex-1 bg-gray-50 border-gray-200 rounded-xl text-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            onClick={addArea}
                            disabled={!newArea.trim()}
                            className="bg-(--primary) text-white p-3 rounded-xl disabled:opacity-50 hover:bg-blue-700 transition"
                        >
                            <Plus size={20} />
                        </button>
                    </div>
                </div>

                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">My Locations</h3>
                <div className="space-y-3">
                    {areas.map((area) => (
                        <div key={area.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <MapPin size={18} className={`shrink-0 ${area.active ? 'text-(--primary)' : 'text-gray-400'}`} />
                                <span className={`font-semibold ${area.active ? 'text-gray-900' : 'text-gray-400 line-through'}`}>
                                    {area.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => toggleArea(area.id)}
                                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${area.active
                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                        }`}
                                >
                                    {area.active ? 'Active' : 'Inactive'}
                                </button>
                                <button onClick={() => removeArea(area.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                    <X size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </TechnicianLayout>
    );
}
