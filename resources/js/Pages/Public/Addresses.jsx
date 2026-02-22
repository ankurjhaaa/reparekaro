import React, { useState } from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { MapPin, Plus, Edit2, Trash2, Home, Briefcase, ChevronLeft, Map, AlertCircle } from 'lucide-react';
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

            <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-6 md:py-12">
                <div className="max-w-2xl mx-auto px-4 sm:px-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8">
                        <Link href="/profile" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
                            <ChevronLeft size={20} className="text-gray-600" />
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900">My Addresses</h1>
                        <div className="ml-auto">
                            {!isFormOpen && (
                                <button
                                    onClick={() => handleOpenForm()}
                                    className="flex items-center gap-2 text-sm font-bold bg-(--primary) text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-700 transition-colors"
                                >
                                    <Plus size={16} /> <span>Add New</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Address Loop */}
                    {!isFormOpen && (
                        <div className="space-y-4">
                            {addresses.length === 0 ? (
                                <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm">
                                    <div className="w-20 h-20 bg-blue-50 text-(--primary) rounded-full flex items-center justify-center mx-auto mb-4">
                                        <MapPin size={32} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">No Saved Addresses</h3>
                                    <p className="text-gray-500 text-sm mb-6">You haven't added any delivery locations yet. Add one now to speed up your booking process.</p>
                                    <Button onClick={() => handleOpenForm()} className="mx-auto flex items-center gap-2">
                                        <Plus size={18} /> Add New Address
                                    </Button>
                                </div>
                            ) : (
                                addresses.map(addr => (
                                    <div key={addr.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative group overflow-hidden">
                                        {addr.is_default && (
                                            <div className="absolute top-0 right-0 bg-(--primary) text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                                                DEFAULT
                                            </div>
                                        )}
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-(--primary) flex items-center justify-center shrink-0">
                                                {addr.address_type === 'home' ? <Home size={24} /> : addr.address_type === 'office' ? <Briefcase size={24} /> : <MapPin size={24} />}
                                            </div>
                                            <div className="flex-1 pr-6">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-bold text-gray-900 text-base">{addr.name}</h3>
                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize font-medium">{addr.address_type}</span>
                                                </div>
                                                <p className="text-sm text-gray-500 mb-1">{addr.mobile}</p>
                                                <p className="text-sm text-gray-700 leading-snug">{addr.address}, {addr.landmark && `Near ${addr.landmark},`} {addr.city}</p>
                                                {(addr.state || addr.pincode) && (
                                                    <p className="text-sm text-gray-700 mt-0.5">{addr.state} {addr.pincode}</p>
                                                )}

                                                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-50">
                                                    <button onClick={() => handleOpenForm(addr)} className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors">
                                                        <Edit2 size={14} /> Edit
                                                    </button>
                                                    <button onClick={() => handleDelete(addr.id)} className="text-sm font-semibold text-red-500 hover:text-red-700 flex items-center gap-1.5 transition-colors">
                                                        <Trash2 size={14} /> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Form Component */}
                    {isFormOpen && (
                        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                                <h2 className="text-lg font-bold text-gray-900">{editingId ? 'Edit Address' : 'Add New Address'}</h2>
                                <button onClick={handleCloseForm} className="p-2 bg-gray-50 text-gray-500 hover:text-gray-900 rounded-full transition-colors">
                                    <ChevronLeft size={20} className="rotate-180" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="Contact Name *"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        error={errors.name}
                                        placeholder="John Doe"
                                    />
                                    <Input
                                        label="Mobile Number *"
                                        value={data.mobile}
                                        onChange={e => setData('mobile', e.target.value)}
                                        error={errors.mobile}
                                        placeholder="9876543210"
                                    />
                                </div>

                                <Input
                                    label="Street Address / House No. *"
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                    error={errors.address}
                                    placeholder="Enter full address"
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="City *"
                                        value={data.city}
                                        onChange={e => setData('city', e.target.value)}
                                        error={errors.city}
                                        placeholder="e.g. New Delhi"
                                    />
                                    <Input
                                        label="Landmark (Optional)"
                                        value={data.landmark}
                                        onChange={e => setData('landmark', e.target.value)}
                                        error={errors.landmark}
                                        placeholder="e.g. Near Apollo Hospital"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="State"
                                        value={data.state}
                                        onChange={e => setData('state', e.target.value)}
                                        error={errors.state}
                                    />
                                    <Input
                                        label="Pincode"
                                        value={data.pincode}
                                        onChange={e => setData('pincode', e.target.value)}
                                        error={errors.pincode}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Save Address As</label>
                                    <div className="flex gap-3">
                                        {['home', 'office', 'other'].map(type => (
                                            <button
                                                type="button"
                                                key={type}
                                                onClick={() => setData('address_type', type)}
                                                className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${data.address_type === type ? 'border-(--primary) bg-blue-50 text-(--primary) ring-1 ring-(--primary)' : 'border-gray-200 text-gray-500 hover:border-blue-200'}`}
                                            >
                                                {type === 'home' ? <Home size={20} className="mb-1" /> : type === 'office' ? <Briefcase size={20} className="mb-1" /> : <Map size={20} className="mb-1" />}
                                                <span className="text-xs font-bold capitalize">{type}</span>
                                            </button>
                                        ))}
                                    </div>
                                    {errors.address_type && <p className="text-red-500 text-xs mt-1 font-medium">{errors.address_type}</p>}
                                </div>

                                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-gray-300 text-(--primary) focus:ring-(--primary)"
                                        checked={data.is_default}
                                        onChange={e => setData('is_default', e.target.checked)}
                                    />
                                    <span className="text-sm font-semibold text-gray-700">Make this my default address</span>
                                </label>

                                <div className="pt-4 flex gap-3">
                                    <Button type="button" variant="outline" onClick={handleCloseForm} className="flex-[0.4] py-3">Cancel</Button>
                                    <Button type="submit" disabled={processing} className="flex-1 py-3 text-base font-bold shadow-lg shadow-blue-500/30">
                                        {processing ? 'Saving...' : 'Save Address'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
