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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Services & Rates</h1>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Manage your service categories and their pricing packages.</p>
                </div>
                <Button onClick={() => openServiceModal(null)} className="flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl shadow-[0_4px_15px_rgb(0,0,0,0.08)] font-bold transition-all text-[10px] sm:text-xs hover:scale-105">
                    <Plus size={16} strokeWidth={3} className="sm:w-[18px] sm:h-[18px]" /> New Category
                </Button>
            </div>

            <div className="space-y-4 sm:space-y-6">
                {services && services.length > 0 ? services.map((service) => (
                    <div key={service.id} className="bg-white rounded-xl sm:rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden transition-all duration-300">
                        {/* Service Header Row */}
                        <div
                            className={`flex items-center justify-between p-4 sm:p-5 flex-wrap gap-4 cursor-pointer hover:bg-gray-50/80 transition-colors ${expandedService === service.id ? 'bg-blue-50/40 border-b border-gray-100/60' : ''}`}
                            onClick={() => toggleService(service.id)}
                        >
                            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-[200px]">
                                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-blue-100 to-(--primary)/20 text-(--primary) flex items-center justify-center shrink-0 shadow-inner">
                                    {service.image_url ? <img src={service.image_url} alt="" className="h-full w-full object-cover rounded-xl" /> : <Tag size={20} className="sm:w-6 sm:h-6" />}
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-base sm:text-lg text-gray-900 tracking-tight truncate">{service.name}</h3>
                                    <span className="text-[9px] sm:text-[10px] font-black text-gray-500 uppercase tracking-wider bg-gray-100/80 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md mt-0.5 sm:mt-1 inline-block border border-gray-200/50">
                                        {service.rates?.length || 0} Pricing Plans
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                                <div className="flex gap-1.5 sm:gap-2" onClick={(e) => e.stopPropagation()}>
                                    <button onClick={() => openServiceModal(service)} className="p-1.5 sm:p-2 bg-white shadow-sm border border-gray-100 text-gray-600 rounded-lg sm:rounded-xl hover:bg-gray-50 hover:text-(--primary) transition-all">
                                        <Edit2 size={14} className="sm:w-4 sm:h-4" strokeWidth={2.5} />
                                    </button>
                                    <button onClick={() => deleteService(service.id)} className="p-1.5 sm:p-2 bg-white shadow-sm border border-red-50 text-red-500 rounded-lg sm:rounded-xl hover:bg-red-50 hover:text-red-700 transition-all">
                                        <Trash2 size={14} className="sm:w-4 sm:h-4" strokeWidth={2.5} />
                                    </button>
                                </div>
                                <div className={`p-1 sm:p-1.5 rounded-full transition-all duration-300 ${expandedService === service.id ? 'bg-(--primary) text-white rotate-180' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                                    <ChevronDown size={16} className="sm:w-5 sm:h-5" strokeWidth={3} />
                                </div>
                            </div>
                        </div>

                        {/* Service Rates Expandable Area */}
                        {expandedService === service.id && (
                            <div className="p-4 sm:p-5 bg-gray-50/50 animate-fade-in-down border-t border-gray-100/50">
                                <div className="flex items-center justify-between mb-4 sm:mb-5">
                                    <h4 className="font-bold text-[10px] sm:text-xs text-gray-700 uppercase tracking-wider">Available Packages</h4>
                                    <button onClick={() => openRateModal(service.id, null)} className="text-[9px] sm:text-[10px] font-bold text-(--primary) flex items-center gap-1 sm:gap-1.5 hover:bg-blue-100 bg-blue-50 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-md transition-colors border border-blue-200/50 shadow-sm">
                                        <Plus size={12} className="sm:w-3.5 sm:h-3.5" strokeWidth={3} /> Add Package
                                    </button>
                                </div>

                                {service.rates && service.rates.length > 0 ? (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                                        {service.rates.map(rate => (
                                            <div key={rate.id} className="bg-white p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm relative group hover:shadow-[0_4px_15px_rgb(0,0,0,0.04)] hover:-translate-y-0.5 transition-all">
                                                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-gray-50 to-transparent rounded-bl-2xl pointer-events-none"></div>
                                                <div className="flex justify-between items-start mb-2.5 sm:mb-3 relative z-10">
                                                    <h5 className="font-bold text-sm sm:text-base text-gray-900 pr-12 leading-tight">{rate.title}</h5>
                                                    <div className="absolute -top-1 right-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => openRateModal(service.id, rate)} className="p-1.5 sm:p-2 bg-gray-50 text-gray-600 rounded-md hover:bg-blue-50 hover:text-(--primary) transition-colors border border-gray-100">
                                                            <Edit2 size={12} className="sm:w-3.5 sm:h-3.5" strokeWidth={2.5} />
                                                        </button>
                                                        <button onClick={() => deleteRate(rate.id)} className="p-1.5 sm:p-2 bg-red-50 text-red-500 rounded-md hover:bg-red-100 hover:text-red-700 transition-colors border border-red-100/50">
                                                            <Trash2 size={12} className="sm:w-3.5 sm:h-3.5" strokeWidth={2.5} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                                                    <div className="flex items-center gap-1 sm:gap-1.5 text-base sm:text-lg font-black text-emerald-600 tracking-tight">
                                                        <IndianRupee size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={3} />
                                                        {rate.discount_price ? (
                                                            <span>{rate.discount_price} <span className="text-gray-400 line-through text-[10px] sm:text-xs ml-1 sm:ml-1.5 font-semibold">₹{rate.price}</span></span>
                                                        ) : (
                                                            <span>{rate.price}</span>
                                                        )}
                                                    </div>
                                                    {rate.duration && (
                                                        <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded flex-shrink-0">
                                                            <Clock size={12} /> {rate.duration}
                                                        </div>
                                                    )}
                                                </div>

                                                {rate.includes && rate.includes.length > 0 && (
                                                    <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-100/50">
                                                        <ul className="text-xs sm:text-sm text-gray-600 space-y-1.5 sm:space-y-2">
                                                            {rate.includes.map((item, idx) => (
                                                                <li key={idx} className="flex items-start gap-2 sm:gap-2.5">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-(--primary) mt-1 shrink-0"></div>
                                                                    <span className="font-medium">{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 sm:py-8 bg-white rounded-xl sm:rounded-2xl border border-dashed border-gray-200">
                                        <Tag className="mx-auto text-gray-300 mb-2" size={24} />
                                        <p className="text-[10px] sm:text-xs text-gray-500 font-semibold">No pricing packages found. Add one to start selling this service.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )) : (
                    <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-gray-200">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
                            <Tag size={40} className="text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Services Found</h3>
                        <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">Get started by creating your first service category and organizing your offerings.</p>
                        <Button onClick={() => openServiceModal(null)} className="px-8 py-3 rounded-xl shadow-md font-bold text-base hover:scale-105 transition-transform">Create Service</Button>
                    </div>
                )}
            </div>

            {/* Modal for Service (Category) */}
            {isServiceModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform scale-95 sm:scale-100 animate-slide-up relative">
                        {/* Decorative Background */}
                        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-600 to-indigo-700 pointer-events-none z-0"></div>

                        <div className="flex justify-between items-center p-6 relative z-10 text-white">
                            <h2 className="text-2xl font-black">
                                {serviceForm.data.id ? 'Edit Category' : 'New Category'}
                            </h2>
                            <button onClick={() => setIsServiceModalOpen(false)} className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm">
                                <X size={24} strokeWidth={3} />
                            </button>
                        </div>

                        <form onSubmit={submitService} className="p-6 space-y-5 relative z-10 bg-white rounded-t-3xl -mt-4 shadow-[0_-8px_30px_rgb(0,0,0,0.12)]">
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-fade-in">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-y-auto max-h-[90vh] animate-slide-up relative custom-scrollbar">
                        {/* Decorative Background */}
                        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-600 to-indigo-700 pointer-events-none z-0"></div>

                        <div className="flex justify-between items-center p-6 relative z-10 text-white sticky top-0 bg-transparent">
                            <h2 className="text-2xl font-black">
                                {rateForm.data.id ? 'Edit Package' : 'New Package'}
                            </h2>
                            <button onClick={() => setIsRateModalOpen(false)} className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm">
                                <X size={24} strokeWidth={3} />
                            </button>
                        </div>

                        <form onSubmit={submitRate} className="p-6 space-y-6 relative z-10 bg-white rounded-t-3xl -mt-4 shadow-[0_-8px_30px_rgb(0,0,0,0.12)]">
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
