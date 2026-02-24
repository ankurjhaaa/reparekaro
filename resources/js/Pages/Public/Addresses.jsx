import React, { useState } from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { MapPin, Plus, Edit2, Trash2, Home, Briefcase, ChevronLeft, Map, AlertCircle, CheckCircle2, MoreVertical, X, Shield } from 'lucide-react';
import Button from '../../Components/Forms/Button';
import Input from '../../Components/Forms/Input';

export default function Addresses() {
    const { addresses } = usePage().props;
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        name: '',
        mobile: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        landmark: '',
        address_type: 'home',
        is_default: false
    });

    const handleOpenForm = (address = null) => {
        clearErrors();
        if (address) {
            setEditingId(address.id);
            setData({
                name: address.name,
                mobile: address.mobile,
                address: address.address,
                city: address.city,
                state: address.state || '',
                pincode: address.pincode || '',
                landmark: address.landmark || '',
                address_type: address.address_type,
                is_default: address.is_default
            });
        } else {
            setEditingId(null);
            reset();
        }
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingId(null);
        reset();
        clearErrors();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            put(`/addresses/${editingId}`, {
                onSuccess: () => handleCloseForm(),
            });
        } else {
            post('/addresses', {
                onSuccess: () => handleCloseForm(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to remove this address?')) {
            destroy(`/addresses/${id}`);
        }
    };

    return (
        <PublicLayout>
            <Head title="My Addresses" />

            <div className="bg-gray-50/50 min-h-screen pt-4 pb-24 md:pb-12 px-4 max-w-xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Link href="/profile" className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-gray-100 text-gray-600 hover:text-gray-900 transition-all active:scale-95 shadow-sm">
                            <ChevronLeft size={18} strokeWidth={2.5} />
                        </Link>
                        <h1 className="text-base font-black text-gray-900 tracking-tight">Saved Addresses</h1>
                    </div>
                    {!isFormOpen && (
                        <button
                            onClick={() => handleOpenForm()}
                            className="text-(--primary) text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all flex items-center gap-1.5"
                        >
                            <Plus size={12} strokeWidth={3} /> Add New
                        </button>
                    )}
                </div>

                {/* List View */}
                {!isFormOpen && (
                    <div className="space-y-4">
                        {addresses.length === 0 ? (
                            <div className="bg-white rounded-xl p-10 text-center border border-gray-100 shadow-sm">
                                <MapPin size={32} className="mx-auto text-gray-200 mb-3" />
                                <h3 className="text-sm font-black text-gray-900 mb-1">No Saved Locations</h3>
                                <p className="text-xs text-gray-400 font-bold mb-5 italic">Add your first address to start booking</p>
                                <button
                                    onClick={() => handleOpenForm()}
                                    className="px-6 py-2.5 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg"
                                >
                                    Add New Address
                                </button>
                            </div>
                        ) : (
                            addresses.map(addr => (
                                <div key={addr.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden relative group transition-all">
                                    <div className="p-4 flex gap-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border shrink-0 ${addr.address_type === 'home' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                            addr.address_type === 'office' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                                'bg-gray-50 text-gray-500 border-gray-100'
                                            }`}>
                                            {addr.address_type === 'home' ? <Home size={18} /> : addr.address_type === 'office' ? <Briefcase size={18} /> : <MapPin size={18} />}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-black text-gray-900 text-sm tracking-tight capitalize">{addr.name}</h3>
                                                    {addr.is_default && (
                                                        <span className="bg-emerald-100 text-emerald-700 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest">Default</span>
                                                    )}
                                                </div>
                                                <div className="flex gap-1">
                                                    <button onClick={() => handleOpenForm(addr)} className="p-1.5 text-gray-400 hover:text-(--primary) transition-colors">
                                                        <Edit2 size={14} />
                                                    </button>
                                                    <button onClick={() => handleDelete(addr.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <p className="text-[10px] font-bold text-gray-400 tracking-wider">CELL: {addr.mobile}</p>
                                                <p className="text-xs font-bold text-gray-600 leading-relaxed truncate-2-lines">
                                                    {addr.address}, {addr.city} {addr.landmark && <span className="text-gray-400 italic"> - {addr.landmark}</span>}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Form View - App-First Style */}
                {isFormOpen && (
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-4 bg-gray-900 text-white flex items-center justify-between">
                            <h2 className="text-xs font-black uppercase tracking-widest">{editingId ? 'Edit Address' : 'New Location'}</h2>
                            <button onClick={handleCloseForm} className="p-1 hover:bg-white/10 rounded-md transition-all">
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-5 space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Receiver Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full bg-gray-50 border-0 rounded-lg text-xs font-bold focus:ring-2 focus:ring-(--primary)/20 h-10 px-3"
                                        placeholder="Full Name"
                                    />
                                    {errors.name && <p className="text-[9px] text-red-500 font-bold uppercase">{errors.name}</p>}
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Contact No</label>
                                    <input
                                        type="text"
                                        value={data.mobile}
                                        onChange={e => setData('mobile', e.target.value)}
                                        className="w-full bg-gray-50 border-0 rounded-lg text-xs font-bold focus:ring-2 focus:ring-(--primary)/20 h-10 px-3"
                                        placeholder="Mobile"
                                    />
                                    {errors.mobile && <p className="text-[9px] text-red-500 font-bold uppercase">{errors.mobile}</p>}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Street / House Address</label>
                                <textarea
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                    className="w-full bg-gray-50 border-0 rounded-lg text-xs font-bold focus:ring-2 focus:ring-(--primary)/20 p-3 min-h-[80px]"
                                    placeholder="Complete address details..."
                                />
                                {errors.address && <p className="text-[9px] text-red-500 font-bold uppercase">{errors.address}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">City</label>
                                    <input
                                        type="text"
                                        value={data.city}
                                        onChange={e => setData('city', e.target.value)}
                                        className="w-full bg-gray-50 border-0 rounded-lg text-xs font-bold focus:ring-2 focus:ring-(--primary)/20 h-10 px-3"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Landmark</label>
                                    <input
                                        type="text"
                                        value={data.landmark}
                                        onChange={e => setData('landmark', e.target.value)}
                                        className="w-full bg-gray-50 border-0 rounded-lg text-xs font-bold focus:ring-2 focus:ring-(--primary)/20 h-10 px-3"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">State</label>
                                    <input
                                        type="text"
                                        value={data.state}
                                        onChange={e => setData('state', e.target.value)}
                                        className="w-full bg-gray-50 border-0 rounded-lg text-xs font-bold focus:ring-2 focus:ring-(--primary)/20 h-10 px-3"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Pincode</label>
                                    <input
                                        type="text"
                                        value={data.pincode}
                                        onChange={e => setData('pincode', e.target.value)}
                                        className="w-full bg-gray-50 border-0 rounded-lg text-xs font-bold focus:ring-2 focus:ring-(--primary)/20 h-10 px-3"
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 mb-2 block">Location Type</label>
                                <div className="flex gap-2">
                                    {['home', 'office', 'other'].map(type => (
                                        <button
                                            type="button"
                                            key={type}
                                            onClick={() => setData('address_type', type)}
                                            className={`flex-1 py-2.5 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all ${data.address_type === type
                                                ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                                                : 'bg-white text-gray-400 border-gray-100'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <label className="flex items-center gap-2.5 cursor-pointer pt-2 group">
                                <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${data.is_default ? 'bg-(--primary) border-(--primary)' : 'bg-gray-50 border-gray-200group-hover:border-blue-300'}`}>
                                    {data.is_default && <CheckCircle2 size={14} className="text-white" />}
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={data.is_default}
                                        onChange={e => setData('is_default', e.target.checked)}
                                    />
                                </div>
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Set as default address</span>
                            </label>

                            <div className="pt-4 flex gap-2">
                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-[2] py-3 text-[10px] font-black uppercase tracking-widest text-white bg-(--primary) rounded-lg shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Processing...' : (editingId ? 'Update Location' : 'Save Location')}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Assurance Hint */}
                {!isFormOpen && (
                    <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-300 bg-white p-4 rounded-xl border border-gray-100">
                        <Shield size={14} />
                        <span className="font-bold uppercase tracking-tighter italic">Secured Service Locations</span>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
