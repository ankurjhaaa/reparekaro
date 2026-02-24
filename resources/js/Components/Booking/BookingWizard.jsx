import React, { useState, useEffect } from 'react';
import { Check, Calendar, Clock, MapPin, ArrowLeft, Loader2, Trash2, ChevronRight, CheckCircle2, User, Phone, Map, Navigation, AlertCircle, Plus, Home, Briefcase } from 'lucide-react';
import Button from '../Forms/Button';
import Input from '../Forms/Input';

export default function BookingWizard({ services: categories, addresses = [], onSubmit }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        selectedServices: [],
        date: '',
        time: '',
        name: '',
        mobile: '',
        address: '',
        city: '',
        landmark: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [availableDates, setAvailableDates] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [error, setError] = useState('');
    const [showNewAddressForm, setShowNewAddressForm] = useState(!addresses || addresses.length === 0);

    useEffect(() => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 4; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            dates.push({
                fullDate: d.toISOString().split('T')[0],
                dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
                dayNumber: d.getDate(),
                month: d.toLocaleDateString('en-US', { month: 'short' }),
                displayWord: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' })
            });
        }
        setAvailableDates(dates);
        setFormData(prev => ({ ...prev, date: dates[0].fullDate }));
    }, []);

    // Clear error on generic actions
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 4000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleAddressSelect = (addr) => {
        setFormData(prev => ({
            ...prev,
            name: addr.name || prev.name,
            mobile: addr.mobile || prev.mobile,
            address: addr.address || prev.address,
            city: addr.city || prev.city,
            landmark: addr.landmark || prev.landmark
        }));
        setError('');
        setShowNewAddressForm(false);
    };

    const handleServiceToggle = (rate) => {
        setError('');
        setFormData(prev => {
            const exists = prev.selectedServices.find(s => s.id === rate.id);
            if (exists) {
                return { ...prev, selectedServices: prev.selectedServices.filter(s => s.id !== rate.id) };
            } else {
                const rateWithMeta = { ...rate, category_id: activeCategory.id, category_image: activeCategory?.image_url };
                return { ...prev, selectedServices: [...prev.selectedServices, rateWithMeta] };
            }
        });
    };

    const isServiceSelected = (id) => formData.selectedServices.some(s => s.id === id);
    const isCategorySelected = (categoryId) => formData.selectedServices.some(s => s.category_id === categoryId);

    const handleDateSelect = (date) => {
        setError('');
        setFormData({ ...formData, date, time: '' });
    };

    const handleTimeSelect = (time) => {
        if (!formData.date) {
            setError("Please select a date first.");
            return;
        }
        setError('');
        setFormData({ ...formData, time });
    };

    const handleDetailsSubmit = (e) => {
        if (e) e.preventDefault();

        if (!formData.name || !formData.mobile || !formData.address || !formData.city) {
            setError('Please fill in Name, Mobile, Address, and City.');
            return;
        }

        setError('');
        setStep(4);
    };

    const handleFinalConfirm = async () => {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        onSubmit(formData);
        setIsSubmitting(false);
    };

    const nextStep = () => {
        setError('');
        if (step === 1 && formData.selectedServices.length === 0) {
            setError("Please select at least one service.");
            return;
        }
        if (step === 2) {
            if (!formData.date || !formData.time) {
                setError("Please select both a date and a time slot.");
                return;
            }
        }
        setStep(step + 1);
    }

    const prevStep = () => {
        setError('');
        setStep(step - 1);
    };

    const totalAmount = formData.selectedServices.reduce((sum, item) => sum + parseFloat(item.price), 0);

    return (
        <div className="w-full h-full sm:h-[85vh] sm:max-h-[750px] max-w-2xl mx-auto bg-white sm:rounded-xl shadow-sm sm:shadow-md border-0 sm:border border-gray-100 overflow-hidden flex flex-col relative transition-all duration-300">
            {/* Header */}
            <div className="bg-white/90 backdrop-blur-md px-4 py-4 border-b border-gray-100 z-10 shrink-0 sticky top-0">
                <div className="flex items-center justify-between">
                    {step > 1 ? (
                        <button onClick={prevStep} className="p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-all active:scale-95">
                            <ArrowLeft size={20} />
                        </button>
                    ) : <div className="w-9"></div>}

                    <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                        {step === 1 && 'Select Category'}
                        {step === 2 && 'Date & Time'}
                        {step === 3 && 'Service Details'}
                        {step === 4 && 'Review Booking'}
                    </h2>

                    <div className="w-9"></div>
                </div>

                <div className="mt-4 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-(--primary) transition-all duration-500 ease-out rounded-full"
                        style={{ width: `${(step / 4) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Global Error Banner */}
            {error && (
                <div className="absolute top-12 left-0 right-0 z-50 px-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="bg-red-500 border border-red-600 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-bold flex items-center gap-3">
                        <AlertCircle size={18} className="shrink-0 text-white" />
                        <span className="leading-snug">{error}</span>
                    </div>
                </div>
            )}

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50 pb-10 sm:pb-28 custom-scrollbar">

                {/* Step 1: Select Category */}
                {step === 1 && (
                    <div className="p-3 animate-fade-in-right">
                        {formData.selectedServices.length > 0 && (
                            <div className="mb-3 bg-blue-50 border border-blue-100 p-2.5 rounded-lg flex items-center justify-between shadow-sm">
                                <span className="text-xs font-semibold text-blue-900">{formData.selectedServices.length} items selected</span>
                                <span className="text-sm font-bold text-blue-900">₹{totalAmount}</span>
                            </div>
                        )}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2 px-1">
                            {categories.map((category) => {
                                const isSelected = isCategorySelected(category.id);
                                return (
                                    <div
                                        key={category.id}
                                        className={`cursor-pointer rounded-2xl flex flex-col items-center justify-center text-center p-4 bg-white shadow-[0_2px_8px_rgb(0,0,0,0.03)] border transition-all duration-300 hover:-translate-y-1 hover:shadow-md relative group h-32 ${isSelected ? 'border-(--primary) bg-blue-50/30' : 'border-gray-100/80 hover:border-blue-200'}`}
                                        onClick={() => { setError(''); setActiveCategory(category); }}
                                    >
                                        {/* Selection Checkmark */}
                                        {isSelected && (
                                            <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-(--primary) text-white rounded-full flex items-center justify-center shadow-sm animate-in zoom-in duration-200 z-10">
                                                <Check size={12} strokeWidth={3} />
                                            </div>
                                        )}

                                        {/* Smaller, Refined Image Container */}
                                        <div className={`w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center mb-3 border border-gray-100 transition-transform duration-300 shadow-sm ${isSelected ? 'scale-110 shadow-blue-200 bg-white' : 'bg-gray-50 text-gray-400 group-hover:scale-105 group-hover:bg-white'}`}>
                                            {category.image_url ? (
                                                <img
                                                    src={category.image_url}
                                                    alt={category.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Wrench size={24} className="opacity-50" />
                                            )}
                                        </div>

                                        {/* Minimalist Title */}
                                        <h3 className={`font-bold text-xs leading-tight transition-colors ${isSelected ? 'text-(--primary)' : 'text-gray-800 group-hover:text-blue-900'}`}>{category.name}</h3>

                                        {/* Active Bottom Border Line for Polish */}
                                        {isSelected && (
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-(--primary) rounded-t-full"></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                    <div className="p-4 animate-fade-in-right bg-white min-h-full">
                        <div className="mb-8">
                            <h3 className="text-gray-900 font-extrabold text-sm mb-4">When should we arrive?</h3>

                            <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-3 px-1">
                                {availableDates.map((d) => {
                                    const isSelected = formData.date === d.fullDate;
                                    return (
                                        <button
                                            key={d.fullDate}
                                            onClick={() => handleDateSelect(d.fullDate)}
                                            className={`flex-1 min-w-[76px] flex flex-col items-center justify-center py-3 px-2 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${isSelected
                                                ? 'bg-(--primary) text-white border-(--primary) shadow-md relative'
                                                : 'bg-white border-gray-100 text-gray-700 hover:border-blue-200 hover:shadow-sm'
                                                }`}
                                        >
                                            <span className={`text-[10px] uppercase tracking-wider font-bold mb-1 ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>{d.displayWord}</span>
                                            <span className="text-xl font-extrabold leading-none mb-1">{d.dayNumber}</span>
                                            <span className={`text-[10px] font-semibold ${isSelected ? 'text-blue-50' : 'text-gray-500'}`}>{d.month}</span>
                                            {isSelected && (
                                                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-(--primary) rotate-45 rounded-sm"></div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-gray-900 font-extrabold text-sm mb-4">Select Time Slot</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-1">
                                {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => handleTimeSelect(time)}
                                        className={`py-3.5 rounded-xl border text-xs font-bold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 ${!formData.date ? 'opacity-50 cursor-pointer bg-gray-50 text-gray-400 border-gray-100' :
                                            formData.time === time
                                                ? 'bg-(--primary) text-white border-(--primary) shadow-md'
                                                : 'bg-white text-gray-600 border-gray-100 hover:border-blue-200 hover:text-(--primary) hover:bg-blue-50/30'
                                            }`}
                                    >
                                        <Clock size={16} className={formData.time === time ? 'text-white' : 'text-gray-400'} />
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Details */}
                {step === 3 && (
                    <div className="p-4 animate-fade-in-right space-y-5 bg-white min-h-full">

                        {/* Saved Addresses Section - HIDE completely if adding new address */}
                        {addresses && addresses.length > 0 && !showNewAddressForm && (
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-gray-900 font-extrabold text-sm">Select Service Address</h3>
                                    <button
                                        onClick={() => {
                                            setShowNewAddressForm(true);
                                            setFormData(prev => ({ ...prev, name: '', mobile: '', address: '', city: '', landmark: '' }));
                                        }}
                                        className="text-xs font-bold text-(--primary) flex items-center gap-1.5 hover:text-blue-700 bg-blue-50/50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors"
                                    >
                                        <Plus size={14} /> Add New
                                    </button>
                                </div>
                                <div className="flex flex-col gap-3 py-1">
                                    {addresses.map(addr => {
                                        const isSelected = formData.address === addr.address && formData.city === addr.city;
                                        return (
                                            <button
                                                key={addr.id}
                                                onClick={() => handleAddressSelect(addr)}
                                                className={`w-full text-left bg-white border rounded-lg p-4 transition-all duration-200 focus:outline-none relative ${isSelected ? 'border-(--primary) shadow-[0_4px_12px_rgb(0,0,0,0.05)] ring-1 ring-(--primary) bg-blue-50/10' : 'border-gray-200 shadow-sm hover:border-blue-300 hover:shadow'}`}
                                            >
                                                {/* Header & Badges */}
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-(--primary) text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                            {addr.address_type === 'home' ? <Home size={16} /> : addr.address_type === 'office' ? <Briefcase size={16} /> : <MapPin size={16} />}
                                                        </div>
                                                        <div>
                                                            <span className={`font-bold text-sm block leading-tight ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>{addr.name}</span>
                                                            <div className="flex items-center gap-1 text-xs text-gray-500 font-medium mt-0.5">
                                                                <Phone size={10} /> {addr.mobile}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className={`text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shrink-0 shadow-sm ${isSelected ? 'bg-blue-100 text-blue-800 border border-blue-200/50' : 'bg-gray-100 text-gray-500 border border-gray-200/50'}`}>{addr.address_type}</span>
                                                </div>

                                                {/* Full Address */}
                                                <div className={`text-xs pl-10 pr-8 leading-relaxed mb-1 ${isSelected ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                                                    <p>{addr.address}</p>
                                                    <p className="mt-0.5">{addr.city}{addr.landmark ? `, Near ${addr.landmark}` : ''}</p>
                                                </div>

                                                {/* Selection Checkmark */}
                                                {isSelected && (
                                                    <div className="absolute top-1/2 -translate-y-1/2 right-4 w-6 h-6 bg-(--primary) rounded-full flex items-center justify-center shadow-sm">
                                                        <Check size={14} className="text-white" strokeWidth={3} />
                                                    </div>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* New Address Form */}
                        {showNewAddressForm && (
                            <div className="bg-gray-50/80 p-5 pb-10  space-y-5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-xl -mr-10 -mt-10 pointer-events-none"></div>
                                <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-2 relative z-10">
                                    <h3 className="text-gray-900 font-extrabold text-sm flex items-center gap-2">
                                        <MapPin size={16} className="text-(--primary)" /> New Address Details
                                    </h3>
                                    {addresses && addresses.length > 0 && (
                                        <button
                                            onClick={() => setShowNewAddressForm(false)}
                                            className="text-[11px] text-gray-500 hover:text-red-600 font-black uppercase tracking-wider px-3 py-1.5 rounded-lg hover:bg-red-50 hover:border-red-100 border border-transparent transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                                    <Input
                                        label="Full Name *"
                                        icon={User}
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => { setError(''); setFormData({ ...formData, name: e.target.value }) }}
                                    />
                                    <Input
                                        label="Mobile Number *"
                                        icon={Phone}
                                        placeholder="9876543210"
                                        value={formData.mobile}
                                        onChange={(e) => { setError(''); setFormData({ ...formData, mobile: e.target.value }) }}
                                    />
                                </div>

                                <div className="relative z-10">
                                    <Input
                                        label="Service Address / Flat No. *"
                                        icon={MapPin}
                                        placeholder="House No, Street, Apartment..."
                                        value={formData.address}
                                        onChange={(e) => { setError(''); setFormData({ ...formData, address: e.target.value }) }}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                                    <Input
                                        label="City *"
                                        icon={Map}
                                        placeholder="City Name"
                                        value={formData.city}
                                        onChange={(e) => { setError(''); setFormData({ ...formData, city: e.target.value }) }}
                                    />
                                    <Input
                                        label="Landmark (Optional)"
                                        icon={Navigation}
                                        placeholder="Near Apollo Hospital"
                                        value={formData.landmark}
                                        onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                                    />
                                </div>
                                <div className="text-[10px] text-gray-500 font-medium text-center relative z-10 mt-2">
                                    This address will be saved for future bookings.
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                    <div className="p-4 pb-10 animate-fade-in-right space-y-4 bg-gray-50/50">

                        {/* Order Summary Card */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-3 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
                                <h3 className="text-[11px] font-black text-gray-500 uppercase tracking-wider flex items-center gap-1.5"><CheckCircle2 size={12} className="text-(--primary)" /> Order Summary</h3>
                                <div className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide border border-blue-100/50">{formData.selectedServices.length} Items</div>
                            </div>

                            <div className="p-0 max-h-60 overflow-y-auto custom-scrollbar">
                                {formData.selectedServices.map((s, index) => (
                                    <div key={s.id} className={`flex items-start justify-between p-3.5 hover:bg-gray-50 transition-colors ${index !== formData.selectedServices.length - 1 ? 'border-b border-gray-50/80' : ''}`}>
                                        <div className="flex gap-3">
                                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0 flex items-center justify-center text-gray-400">
                                                {s.category_image ? (
                                                    <img src={s.category_image} alt={s.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <CheckCircle2 size={16} />
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-gray-900 leading-tight pr-2 mb-0.5">{s.title}</h4>
                                                <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1"><Clock size={10} /> {s.duration || 'Standard'}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end shrink-0 justify-between h-full">
                                            <span className="text-sm font-black text-gray-900">₹{parseFloat(s.price).toFixed(0)}</span>
                                            <button onClick={() => handleServiceToggle(s)} className="text-red-400 hover:text-red-600 p-1 -mr-1 mt-1 transition-colors rounded-md hover:bg-red-50">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Total Amount</span>
                                <span className="text-xl font-black text-(--primary)">₹{totalAmount.toFixed(0)}</span>
                            </div>
                        </div>

                        {/* Schedule & Address Card */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-50">
                            {/* Schedule */}
                            <div className="flex items-center justify-between p-4 hover:bg-gray-50/80 active:bg-gray-100 cursor-pointer transition-colors group" onClick={() => setStep(2)}>
                                <div className="flex items-center gap-3.5">
                                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-(--primary) border border-blue-100/50 group-hover:scale-105 transition-transform shrink-0">
                                        <Calendar size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Schedule</p>
                                        <p className="text-xs font-extrabold text-gray-900">{formData.date} <span className="text-gray-400 font-normal mx-0.5">at</span> {formData.time}</p>
                                    </div>
                                </div>
                                <div className="text-xs font-bold text-(--primary) bg-blue-50 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">Edit</div>
                            </div>

                            {/* Address */}
                            <div className="flex items-center justify-between p-4 hover:bg-gray-50/80 active:bg-gray-100 cursor-pointer transition-colors group" onClick={() => setStep(3)}>
                                <div className="flex items-center gap-3.5 min-w-0 pr-2">
                                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-(--primary) border border-blue-100/50 group-hover:scale-105 transition-transform shrink-0">
                                        <MapPin size={16} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Service Address</p>
                                        <p className="text-xs font-extrabold text-gray-900 truncate">{formData.address}</p>
                                        <p className="text-[10px] text-gray-500 truncate mt-0.5">{formData.city}</p>
                                    </div>
                                </div>
                                <div className="text-xs font-bold text-(--primary) bg-blue-50 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shrink-0">Edit</div>
                            </div>
                        </div>

                    </div>
                )}
            </div>

            {/* Bottom Sheet Modal for selecting Service Rates */}
            {activeCategory && (
                <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setActiveCategory(null)}>
                    <div
                        className="bg-white w-full max-w-2xl rounded-t-2xl overflow-hidden shadow-2xl flex flex-col max-h-[70vh] animate-in slide-in-from-bottom-full duration-300"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="px-5 py-3.5 border-b border-gray-100 sticky top-0 bg-white z-10 flex items-center justify-between">
                            <h3 className="font-bold text-base text-gray-900 flex-1 text-center">{activeCategory.name}</h3>
                        </div>

                        <div className="p-3 overflow-y-auto custom-scrollbar bg-gray-50 space-y-2">
                            {(() => {
                                const rates = activeCategory.rates ? [...activeCategory.rates] : [];

                                return rates.map(rate => {
                                    const selected = isServiceSelected(rate.id);
                                    return (
                                        <div
                                            key={rate.id}
                                            onClick={() => handleServiceToggle(rate)}
                                            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all active:scale-[0.98] ${selected ? 'border-(--primary) bg-blue-50/50 ring-[0.5px] ring-(--primary)' : 'border-gray-200 bg-white hover:border-blue-200'}`}
                                        >
                                            <div className="pr-3 flex-1">
                                                <h4 className="font-bold text-gray-900 text-xs mb-1 leading-tight">{rate.title}</h4>
                                                <div className="flex items-center gap-3 text-[10px]">
                                                    <span className="text-gray-500 flex items-center gap-1"><Clock size={10} /> {rate.duration || 'Standard'}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-bold text-sm text-(--primary)">₹{parseFloat(rate.price).toFixed(0)}</span>
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${selected ? 'bg-(--primary) border-(--primary) text-white' : 'border-gray-300 text-transparent'}`}>
                                                    <Check size={12} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            })()}
                        </div>

                        <div className="p-4 pb-20 md:pb-4 bg-white border-t border-gray-100 sticky bottom-0 z-10 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]">
                            <Button className="w-full py-3 shadow-md font-bold text-base bg-(--primary) hover:bg-blue-700" onClick={() => setActiveCategory(null)}>
                                OK
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Fixed Bottom Footer Action Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 z-30 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.08)]">
                <div className="max-w-2xl mx-auto flex gap-2.5">
                    {step > 1 && (
                        <Button variant="outline" className="flex-[0.4] py-3 text-sm border-gray-200 text-gray-700 hover:bg-gray-50" onClick={prevStep}>
                            Back
                        </Button>
                    )}

                    {step < 4 ? (
                        <Button
                            className={`flex-1 py-3 text-sm font-bold tracking-wide transition-all ${step === 1 && formData.selectedServices.length > 0 ? 'shadow-lg shadow-blue-500/30' : ''}`}
                            onClick={step === 3 ? handleDetailsSubmit : nextStep}
                        >
                            {step === 1 ? `Next (${formData.selectedServices.length} Selected)` : step === 3 ? 'Review Order' : 'Next'}
                        </Button>
                    ) : (
                        <Button
                            className="flex-1 py-3 text-sm shadow-lg shadow-blue-500/30 bg-(--primary) hover:bg-blue-700 border-(--primary) font-bold tracking-wide transition-all active:scale-[0.98]"
                            onClick={handleFinalConfirm}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={18} /> : `Confirm Booking`}
                        </Button>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes fade-in-right {
                    from { opacity: 0; transform: translateX(10px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fade-in-right {
                    animation: fade-in-right 0.3s ease-out forwards;
                }
                /* Hide Scrollbar */
                .custom-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .custom-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
