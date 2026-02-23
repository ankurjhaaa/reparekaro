import React, { useState } from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { Plus, Search, User, Phone, MapPin, MoreVertical, Star, Briefcase, X, Users } from 'lucide-react';
import { usePage, useForm, router } from '@inertiajs/react';
import Button from '../../Components/Forms/Button';

export default function Technicians() {
    const { technicians, filters } = usePage().props;
    const [searchTerm, setSearchTerm] = useState(filters?.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTech, setEditingTech] = useState(null);
    const [viewingTech, setViewingTech] = useState(null);

    const form = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    const openCreateModal = () => {
        setEditingTech(null);
        form.reset();
        setIsModalOpen(true);
    };

    const openEditModal = (tech) => {
        setEditingTech(tech);
        form.setData({
            name: tech.name,
            email: tech.email,
            phone: tech.phone || '',
            password: '', // Leave blank unless changing
        });
        setIsModalOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();

        if (editingTech) {
            form.put(`/vendor/technicians/${editingTech.id}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                }
            });
        } else {
            form.post('/vendor/technicians', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    form.reset();
                }
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to remove this technician?')) {
            form.delete(`/vendor/technicians/${id}`);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/vendor/technicians', { search: searchTerm }, { preserveState: true, replace: true });
    };

    return (
        <VendorLayout title="Technicians">
            {/* Header / Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Technicians</h1>
                    <p className="text-sm text-gray-500">Manage your team and assignments</p>
                </div>
                <Button onClick={openCreateModal} className="flex items-center gap-2 bg-(--primary) text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    <Plus size={18} />
                    Add Technician
                </Button>
            </div>

            {/* Search / Filter */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex gap-3">
                <form onSubmit={handleSearch} className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search technicians by name, email, or phone (Press Enter)..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>
            </div>

            {/* Technicians Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {technicians && technicians.length > 0 ? technicians.map((tech) => (
                    <div key={tech.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all duration-300">
                        <div className="p-6 relative group/actions">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover/actions:opacity-100 transition-opacity">
                                <button onClick={() => openEditModal(tech)} className="text-gray-400 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 p-1.5 rounded-md transition-colors">
                                    <span className="text-xs font-semibold">Edit</span>
                                </button>
                                <button onClick={() => handleDelete(tech.id)} className="text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 p-1.5 rounded-md transition-colors">
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full p-1 border-2 border-gray-100 mb-4 relative">
                                    <img src={tech.image || 'https://ui-avatars.com/api/?name=' + tech.name} alt={tech.name} className="w-full h-full rounded-full object-cover" />
                                    <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${tech.status === 'Active' ? 'bg-green-500' : 'bg-green-500'
                                        }`}></span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900">{tech.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">{tech.email}</p>

                                <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-md text-xs font-bold mb-4">
                                    <Star size={12} className="fill-current" /> {tech.rating} Rating
                                </div>

                                <div className="w-full grid grid-cols-2 gap-2 border-t border-gray-100 pt-4 mt-2">
                                    <div className="text-center">
                                        <p className="text-lg font-bold text-gray-900">{tech.jobs || 0}</p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Jobs</p>
                                    </div>
                                    <div className="text-center border-l border-gray-100">
                                        <p className="text-lg font-bold text-green-600">{tech.phone || 'N/A'}</p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Phone</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
                            <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${tech.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {tech.status || 'Active'}
                            </span>
                            <button onClick={() => setViewingTech(tech)} className="text-sm font-semibold text-blue-600 hover:text-blue-800">View Profile</button>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-16 text-center bg-white rounded-xl shadow-sm border border-gray-100">
                        <Users size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">No Technicians</h3>
                        <p className="text-gray-500 mt-1">Add your first technician to start assigning jobs.</p>
                    </div>
                )}
            </div>

            {/* Add Technician Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-slide-up">
                        <div className="flex justify-between items-center p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-gray-900">{editingTech ? 'Edit Technician' : 'Add Technician'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={submit} className="p-5 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-(--primary)/20 focus:border-(--primary) outline-none transition-all"
                                    placeholder="e.g. Rahul Sharma"
                                    value={form.data.name}
                                    onChange={e => form.setData('name', e.target.value)}
                                    required
                                />
                                {form.errors.name && <p className="text-red-500 text-xs mt-1">{form.errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address *</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-(--primary)/20 focus:border-(--primary) outline-none transition-all"
                                    placeholder="rahul@example.com"
                                    value={form.data.email}
                                    onChange={e => form.setData('email', e.target.value)}
                                    required
                                />
                                {form.errors.email && <p className="text-red-500 text-xs mt-1">{form.errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-(--primary)/20 focus:border-(--primary) outline-none transition-all"
                                    placeholder="e.g. 9876543210"
                                    value={form.data.phone}
                                    onChange={e => form.setData('phone', e.target.value)}
                                />
                                {form.errors.phone && <p className="text-red-500 text-xs mt-1">{form.errors.phone}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    Password {editingTech ? '(Leave blank to keep current)' : '*'}
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-(--primary)/20 focus:border-(--primary) outline-none transition-all"
                                    placeholder={editingTech ? "Enter new password" : "Create a password"}
                                    value={form.data.password}
                                    onChange={e => form.setData('password', e.target.value)}
                                    required={!editingTech}
                                />
                                {form.errors.password && <p className="text-red-500 text-xs mt-1">{form.errors.password}</p>}
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                <Button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 justify-center py-2.5">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={form.processing} className="flex-1 justify-center py-2.5">
                                    {form.processing ? 'Saving...' : editingTech ? 'Update Technician' : 'Add Technician'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Profile Modal */}
            {viewingTech && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-slide-up">
                        <div className="flex justify-between items-center p-5 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Technician Profile</h2>
                            <button onClick={() => setViewingTech(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-20 h-20 rounded-full bg-blue-50 border-2 border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                                    <img src={viewingTech.image || 'https://ui-avatars.com/api/?name=' + viewingTech.name} alt={viewingTech.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{viewingTech.name}</h3>
                                    <p className="text-gray-500 text-sm">{viewingTech.email}</p>
                                    <div className="mt-2 flex gap-2">
                                        <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${viewingTech.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {viewingTech.status || 'Active'}
                                        </span>
                                        <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded text-xs font-bold">
                                            <Star size={12} className="fill-current" /> {viewingTech.rating || 5.0}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <Briefcase className="text-(--primary)" size={20} />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">Assigned Jobs</p>
                                            <p className="text-xs text-gray-500">Total jobs assigned</p>
                                        </div>
                                    </div>
                                    <div className="text-lg font-bold text-gray-900">{viewingTech.jobs || 0}</div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <Phone className="text-green-600" size={20} />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">Phone Number</p>
                                            <p className="text-xs text-gray-500">Contact details</p>
                                        </div>
                                    </div>
                                    <div className="text-sm font-bold text-gray-900">{viewingTech.phone || 'Not provided'}</div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="text-red-500" size={20} />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">Service Area</p>
                                            <p className="text-xs text-gray-500">Preferred area</p>
                                        </div>
                                    </div>
                                    <div className="text-sm font-bold text-gray-500">Anywhere</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </VendorLayout>
    );
}
