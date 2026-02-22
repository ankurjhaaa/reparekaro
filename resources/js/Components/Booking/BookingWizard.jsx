import React, { useState, useEffect } from 'react';
import { Check, Calendar, Clock, MapPin, ArrowLeft, Loader2, Trash2, ChevronRight, CheckCircle2, User, Phone, Map, Navigation, AlertCircle } from 'lucide-react';
import Button from '../Forms/Button';
import Input from '../Forms/Input';

export default function BookingWizard({ services: categories, onSubmit }) {
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
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-130px)] md:h-auto md:min-h-[500px] relative transition-all duration-300">
            {/* Header */}
            <div className="bg-white px-3 py-3 border-b border-gray-100 z-10 shrink-0 sticky top-0">
                <div className="flex items-center justify-between">
                    {step > 1 ? (
                        <button onClick={prevStep} className="p-1.5 -ml-1 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                    ) : <div className="w-8"></div>}

                    <h2 className="text-base font-bold text-gray-900">
                        {step === 1 && 'Select Category'}
                        {step === 2 && 'Date & Time'}
                        {step === 3 && 'Details'}
                        {step === 4 && 'Review Booking'}
                    </h2>

                    <div className="w-8"></div>
                </div>

                <div className="mt-2 w-full bg-gray-100 h-1 rounded-full overflow-hidden">
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
            <div className="flex-1 overflow-y-auto bg-gray-50 pb-28 md:pb-10 custom-scrollbar">

                {/* Step 1: Select Category */}
                {step === 1 && (
                    <div className="p-3 animate-fade-in-right">
                        {formData.selectedServices.length > 0 && (
                            <div className="mb-3 bg-blue-50 border border-blue-100 p-2.5 rounded-lg flex items-center justify-between shadow-sm">
                                <span className="text-xs font-semibold text-blue-900">{formData.selectedServices.length} items selected</span>
                                <span className="text-sm font-bold text-blue-900">₹{totalAmount}</span>
                            </div>
                        )}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                            {categories.map((category) => {
                                const isSelected = isCategorySelected(category.id);
                                return (
                                    <div
                                        key={category.id}
                                        className={`cursor-pointer rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm border transition-all active:scale-95 h-28 relative ${isSelected ? 'bg-blue-50/50 border-(--primary) ring-1 ring-(--primary)' : 'bg-white border-gray-200 hover:border-blue-300'}`}
                                        onClick={() => { setError(''); setActiveCategory(category); }}
                                    >
                                        {isSelected && (
                                            <div className="absolute top-2 right-2 w-5 h-5 bg-(--primary) text-white rounded-full flex items-center justify-center shadow-sm">
                                                <Check size={12} strokeWidth={3} />
                                            </div>
                                        )}
                                        <div className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center mb-2 ${isSelected ? 'bg-(--primary) text-white' : 'bg-blue-50 text-(--primary)'}`}>
                                            {category.image_url ? (
                                                <img src={category.image_url} alt={category.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <CheckCircle2 size={20} />
                                            )}
                                        </div>
                                        <h3 className={`font-semibold text-xs leading-tight px-1 ${isSelected ? 'text-(--primary)' : 'text-gray-900'}`}>{category.name}</h3>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                    <div className="p-3 animate-fade-in-right bg-white min-h-full">
                        <div className="mb-6">
                            <h3 className="text-gray-900 font-bold text-sm mb-3">When should we arrive?</h3>

                            <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
                                {availableDates.map((d) => {
                                    const isSelected = formData.date === d.fullDate;
                                    return (
                                        <button
                                            key={d.fullDate}
                                            onClick={() => handleDateSelect(d.fullDate)}
                                            className={`flex-1 min-w-[70px] flex flex-col items-center justify-center py-2 px-1 rounded-xl border transition-all ${isSelected
                                                ? 'bg-(--primary) text-white border-(--primary) shadow-sm relative'
                                                : 'bg-white border-gray-200 text-gray-700 hover:border-blue-200'
                                                }`}
                                        >
                                            <span className={`text-[10px] font-semibold mb-0.5 ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>{d.displayWord}</span>
                                            <span className="text-base font-bold leading-none">{d.dayNumber}</span>
                                            {isSelected && (
                                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-(--primary) rotate-45 rounded-sm"></div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-gray-900 font-bold text-sm mb-3">Select Time</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => handleTimeSelect(time)}
                                        className={`py-3 rounded-lg border text-xs font-semibold transition-all active:scale-95 flex items-center justify-center gap-1.5 ${!formData.date ? 'opacity-50 cursor-pointer bg-gray-50 text-gray-400 border-gray-200' :
                                            formData.time === time
                                                ? 'bg-blue-50 text-(--primary) border-(--primary)'
                                                : 'bg-white text-gray-700 border-gray-200 hover:border-(--primary)'
                                            }`}
                                    >
                                        <Clock size={14} className={formData.time === time ? 'text-(--primary)' : 'text-gray-400'} />
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Details */}
                {step === 3 && (
                    <div className="p-3 animate-fade-in-right">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

                            <Input
                                label="Service Address *"
                                icon={MapPin}
                                placeholder="House No, Street, Apartment..."
                                value={formData.address}
                                onChange={(e) => { setError(''); setFormData({ ...formData, address: e.target.value }) }}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                                    placeholder="Near Apollo"
                                    value={formData.landmark}
                                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Review */}
                {step === 4 && (
                    <div className="p-3 animate-fade-in-right space-y-3">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-gray-900 font-bold text-sm mb-3 flex items-center justify-between">
                                <span>Selected Items</span>
                                <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200">{formData.selectedServices.length}</span>
                            </h3>
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                                {formData.selectedServices.map(s => (
                                    <div key={s.id} className="flex flex-col gap-1 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                                        <div className="flex items-start justify-between">
                                            <div className="flex gap-2.5">
                                                <div className="w-8 h-8 rounded-lg overflow-hidden bg-white flex items-center justify-center text-(--primary) shrink-0 border border-gray-200">
                                                    {s.category_image ? (
                                                        <img src={s.category_image} alt={s.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <CheckCircle2 size={14} />
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="font-semibold text-gray-900 text-xs leading-tight block pr-1">{s.title}</span>
                                                    <span className="text-[10px] text-gray-500">{s.duration || 'Variable'}</span>
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0 flex flex-col items-end">
                                                <span className="text-xs text-gray-900 font-bold">₹{parseFloat(s.price).toFixed(0)}</span>
                                                <button onClick={() => handleServiceToggle(s)} className="text-red-400 hover:text-red-600 p-1 -mr-1 transition-colors">
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between font-bold text-gray-900 text-sm">
                                <span>Total Amount</span>
                                <span className="text-base text-(--primary)">₹{totalAmount.toFixed(0)}</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 space-y-2">
                            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors" onClick={() => setStep(2)}>
                                <div className="flex items-center gap-2.5">
                                    <Calendar size={16} className="text-gray-400" />
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Schedule</p>
                                        <p className="text-xs font-semibold text-gray-900">{formData.date} at {formData.time}</p>
                                    </div>
                                </div>
                                <ChevronRight size={14} className="text-gray-300" />
                            </div>

                            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors" onClick={() => setStep(3)}>
                                <div className="flex items-center gap-2.5">
                                    <MapPin size={16} className="text-gray-400" />
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Address</p>
                                        <p className="text-xs font-semibold text-gray-900 truncate max-w-[180px]">{formData.address}, {formData.city}</p>
                                    </div>
                                </div>
                                <ChevronRight size={14} className="text-gray-300" />
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

                        <div className="p-4 pb-10 bg-white border-t border-gray-100 sticky bottom-0 z-10 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]">
                            <Button className="w-full py-3 shadow-md font-bold text-base bg-(--primary) hover:bg-blue-700" onClick={() => setActiveCategory(null)}>
                                OK
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Fixed Bottom Footer Action Bar */}
            <div className="fixed bottom-[60px] left-0 right-0 p-3 bg-white border-t border-gray-200 md:absolute md:bottom-0 md:border-none z-30 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.08)] md:shadow-none">
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
