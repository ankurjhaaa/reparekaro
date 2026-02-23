import React, { useState } from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { Plus, Edit2, Trash2, ChevronDown, ChevronUp, Tag, Clock, IndianRupee, X } from 'lucide-react';
import { usePage, router, useForm } from '@inertiajs/react';
import Button from '../../Components/Forms/Button';

export default function Services() {
    const { services } = usePage().props;
    const [expandedService, setExpandedService] = useState(null);

    // Modals State
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [isRateModalOpen, setIsRateModalOpen] = useState(false);

    // Forms
    const serviceForm = useForm({
        id: null,
        name: '',
        image_url: ''
    });

    const rateForm = useForm({
        id: null,
        service_id: null,
        title: '',
        duration: '',
        price: '',
        discount_price: '',
        includes: ['']
    });

    const toggleService = (id) => {
        setExpandedService(expandedService === id ? null : id);
    };

    // --- Service Handlers ---

    const openServiceModal = (service = null) => {
        if (service) {
            serviceForm.setData({ id: service.id, name: service.name, image_url: service.image_url || '' });
        } else {
            serviceForm.reset();
        }
        setIsServiceModalOpen(true);
    };

    const submitService = (e) => {
        e.preventDefault();
        if (serviceForm.data.id) {
            serviceForm.put(route('vendor.services.update', serviceForm.data.id), {
                onSuccess: () => setIsServiceModalOpen(false)
            });
        } else {
            serviceForm.post(route('vendor.services.store'), {
                onSuccess: () => setIsServiceModalOpen(false)
            });
        }
    };

    const deleteService = (id) => {
        if (confirm('Are you sure you want to delete this Service Category? All underlying rates will be wiped out.')) {
            router.delete(route('vendor.services.destroy', id), { preserveScroll: true });
        }
    };

    // --- Rate Handlers ---

    const openRateModal = (serviceId, rate = null) => {
        if (rate) {
            rateForm.setData({
                id: rate.id,
                service_id: serviceId,
                title: rate.title,
                duration: rate.duration || '',
                price: rate.price,
                discount_price: rate.discount_price || '',
                includes: rate.includes && rate.includes.length > 0 ? rate.includes : ['']
            });
        } else {
            rateForm.reset();
            rateForm.setData('service_id', serviceId);
        }
        setIsRateModalOpen(true);
    };

    const submitRate = (e) => {
        e.preventDefault();
        // Clean empty includes
        const cleanedIncludes = rateForm.data.includes.filter(i => i.trim() !== '');
        rateForm.transform((data) => ({ ...data, includes: cleanedIncludes }));

        if (rateForm.data.id) {
            rateForm.put(route('vendor.service-rates.update', rateForm.data.id), {
                onSuccess: () => setIsRateModalOpen(false)
            });
        } else {
            rateForm.post(route('vendor.service-rates.store'), {
                onSuccess: () => setIsRateModalOpen(false)
            });
        }
    };

    const deleteRate = (id) => {
        if (confirm('Delete this service rate?')) {
            router.delete(route('vendor.service-rates.destroy', id), { preserveScroll: true });
        }
    };

    const updateInclude = (index, value) => {
        const newIncludes = [...rateForm.data.includes];
        newIncludes[index] = value;
        rateForm.setData('includes', newIncludes);
    };

    const addIncludeField = () => {
        rateForm.setData('includes', [...rateForm.data.includes, '']);
    };

    const removeIncludeField = (index) => {
        const newIncludes = rateForm.data.includes.filter((_, i) => i !== index);
        rateForm.setData('includes', newIncludes.length ? newIncludes : ['']);
    };

    return (
        <VendorLayout title="My Services">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Services & Rates</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your service categories and their pricing packages.</p>
                </div>
                <Button onClick={() => openServiceModal(null)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl shadow-md font-bold transition-all hover:shadow-lg">
                    <Plus size={18} /> New Category
                </Button>
            </div>

            <div className="space-y-4">
                {services && services.length > 0 ? services.map((service) => (
                    <div key={service.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
                        {/* Service Header Row */}
                        <div
                            className={`flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors ${expandedService === service.id ? 'bg-blue-50/30 border-b border-gray-100' : ''}`}
                            onClick={() => toggleService(service.id)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-blue-100 text-(--primary) flex items-center justify-center shrink-0">
                                    {service.image_url ? <img src={service.image_url} alt="" className="h-full w-full object-cover rounded-xl" /> : <Tag size={24} />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">{service.name}</h3>
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded-md mt-1 inline-block">
                                        {service.rates?.length || 0} Pricing Plans
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                                    <button onClick={() => openServiceModal(service)} className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => deleteService(service.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="p-1 rounded-full bg-gray-100 text-gray-500">
                                    {expandedService === service.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                            </div>
                        </div>

                        {/* Service Rates Expandable Area */}
                        {expandedService === service.id && (
                            <div className="p-5 bg-gray-50/50 animate-fade-in-down">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="font-bold text-sm text-gray-700">Service Pricing Packages</h4>
                                    <button onClick={() => openRateModal(service.id, null)} className="text-xs font-bold text-(--primary) flex items-center gap-1 hover:bg-blue-100 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
                                        <Plus size={14} /> Add Pattern
                                    </button>
                                </div>

                                {service.rates && service.rates.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {service.rates.map(rate => (
                                            <div key={rate.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative group">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h5 className="font-bold text-gray-900 pr-12">{rate.title}</h5>
                                                    <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => openRateModal(service.id, rate)} className="p-1.5 bg-gray-50 text-gray-600 rounded hover:bg-gray-200">
                                                            <Edit2 size={14} />
                                                        </button>
                                                        <button onClick={() => deleteRate(rate.id)} className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 mb-3">
                                                    <div className="flex items-center gap-1 text-sm font-bold text-green-600">
                                                        <IndianRupee size={14} />
                                                        {rate.discount_price ? (
                                                            <span>{rate.discount_price} <span className="text-gray-400 line-through text-xs ml-1 font-normal">₹{rate.price}</span></span>
                                                        ) : (
                                                            <span>{rate.price}</span>
                                                        )}
                                                    </div>
                                                    {rate.duration && (
                                                        <div className="flex items-center gap-1 text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded flex-shrink-0">
                                                            <Clock size={12} /> {rate.duration}
                                                        </div>
                                                    )}
                                                </div>
                                                {rate.includes && rate.includes.length > 0 && (
                                                    <ul className="text-xs text-gray-500 space-y-1 mb-2">
                                                        {rate.includes.map((item, idx) => (
                                                            <li key={idx} className="flex items-start gap-1">
                                                                <span className="text-(--primary)">•</span> {item}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 bg-white rounded-xl border border-dashed border-gray-300">
                                        <p className="text-sm text-gray-500 font-medium">No pricing packages found for this category.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )) : (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <Tag size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900 mb-1">No Services Found</h3>
                        <p className="text-gray-500 text-sm mb-6">Get started by creating your first service category.</p>
                        <Button onClick={() => openServiceModal(null)} className="px-6 py-2.5 rounded-xl">Create Service</Button>
                    </div>
                )}
            </div>
            {/* Modal for Service (Category) */}
            {isServiceModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-slide-up">
                        <div className="flex justify-between items-center p-5 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">
                                {serviceForm.data.id ? 'Edit Category' : 'New Category'}
                            </h2>
                            <button onClick={() => setIsServiceModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={submitService} className="p-5 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Category Name *</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-(--primary)/20 focus:border-(--primary) outline-none transition-all"
                                    placeholder="e.g. AC Repair"
                                    value={serviceForm.data.name}
                                    onChange={e => serviceForm.setData('name', e.target.value)}
                                    required
                                />
                                {serviceForm.errors.name && <p className="text-red-500 text-xs mt-1">{serviceForm.errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL (Optional)</label>
                                <input
                                    type="url"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-(--primary)/20 focus:border-(--primary) outline-none transition-all"
                                    placeholder="https://example.com/icon.png"
                                    value={serviceForm.data.image_url}
                                    onChange={e => serviceForm.setData('image_url', e.target.value)}
                                />
                                {serviceForm.errors.image_url && <p className="text-red-500 text-xs mt-1">{serviceForm.errors.image_url}</p>}
                            </div>
                            <div className="flex gap-3 pt-2">
                                <Button type="button" onClick={() => setIsServiceModalOpen(false)} className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 justify-center py-2.5">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={serviceForm.processing} className="flex-1 justify-center py-2.5">
                                    {serviceForm.processing ? 'Saving...' : 'Save Category'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for Service Rate (Pricing Package) */}
            {isRateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh] animate-slide-up">
                        <div className="flex justify-between items-center p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-gray-900">
                                {rateForm.data.id ? 'Edit Pricing Package' : 'New Pricing Package'}
                            </h2>
                            <button onClick={() => setIsRateModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={submitRate} className="p-5 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Package Title *</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-(--primary)/20 focus:border-(--primary) outline-none transition-all"
                                    placeholder="e.g. Standard Deep Cleaning"
                                    value={rateForm.data.title}
                                    onChange={e => rateForm.setData('title', e.target.value)}
                                    required
                                />
                                {rateForm.errors.title && <p className="text-red-500 text-xs mt-1">{rateForm.errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Price (₹) *</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-(--primary)/20 focus:border-(--primary) outline-none transition-all"
                                        placeholder="0.00"
                                        value={rateForm.data.price}
                                        onChange={e => rateForm.setData('price', e.target.value)}
                                        required
                                    />
                                    {rateForm.errors.price && <p className="text-red-500 text-xs mt-1">{rateForm.errors.price}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Discount Price (₹)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-(--primary)/20 focus:border-(--primary) outline-none transition-all"
                                        placeholder="Optional"
                                        value={rateForm.data.discount_price}
                                        onChange={e => rateForm.setData('discount_price', e.target.value)}
                                    />
                                    {rateForm.errors.discount_price && <p className="text-red-500 text-xs mt-1">{rateForm.errors.discount_price}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Estimated Duration</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-(--primary)/20 focus:border-(--primary) outline-none transition-all"
                                    placeholder="e.g. 45 mins"
                                    value={rateForm.data.duration}
                                    onChange={e => rateForm.setData('duration', e.target.value)}
                                />
                                {rateForm.errors.duration && <p className="text-red-500 text-xs mt-1">{rateForm.errors.duration}</p>}
                            </div>

                            <div>
                                <label className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-2">
                                    <span>What's Included (Bullet Points)</span>
                                    <button type="button" onClick={addIncludeField} className="text-(--primary) text-xs flex items-center hover:underline">
                                        <Plus size={14} className="mr-0.5" /> Add Point
                                    </button>
                                </label>
                                <div className="space-y-2">
                                    {rateForm.data.includes.map((include, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-(--primary)/20 focus:border-(--primary) outline-none transition-all"
                                                placeholder="e.g. Filter cleaning"
                                                value={include}
                                                onChange={(e) => updateInclude(index, e.target.value)}
                                            />
                                            {rateForm.data.includes.length > 1 && (
                                                <button type="button" onClick={() => removeIncludeField(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg shrink-0">
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {rateForm.errors.includes && <p className="text-red-500 text-xs mt-1">{rateForm.errors.includes}</p>}
                            </div>

                            <div className="flex gap-3 pt-4 sticky bottom-0 bg-white pb-2">
                                <Button type="button" onClick={() => setIsRateModalOpen(false)} className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 justify-center py-2.5">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={rateForm.processing} className="flex-1 justify-center py-2.5">
                                    {rateForm.processing ? 'Saving...' : 'Save Package'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </VendorLayout>
    );
}
