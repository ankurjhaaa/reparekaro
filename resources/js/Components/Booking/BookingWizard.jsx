import React, { useState, useEffect } from 'react';
import { Check, Calendar, Clock, MapPin, ArrowLeft, Loader2, Trash2, ChevronRight } from 'lucide-react';
import Button from '../Forms/Button';
import Input from '../Forms/Input';

export default function BookingWizard({ services, onSubmit }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        selectedServices: [], // Array of services
        date: '',
        time: '',
        address: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [availableDates, setAvailableDates] = useState([]);

    useEffect(() => {
        // Generate next 14 days
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 14; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            dates.push({
                fullDate: d.toISOString().split('T')[0],
                dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
                dayNumber: d.getDate(),
                month: d.toLocaleDateString('en-US', { month: 'short' })
            });
        }
        setAvailableDates(dates);
    }, []);

    // Helpers to manage multiple service selection
    const handleServiceToggle = (service) => {
        setFormData(prev => {
            const exists = prev.selectedServices.find(s => s.id === service.id);
            if (exists) {
                // Remove
                return { ...prev, selectedServices: prev.selectedServices.filter(s => s.id !== service.id) };
            } else {
                // Add
                return { ...prev, selectedServices: [...prev.selectedServices, service] };
            }
        });
    };

    const isServiceSelected = (id) => formData.selectedServices.some(s => s.id === id);

    const handleDateSelect = (date) => {
        setFormData({ ...formData, date });
        // Optionally auto-advance or let user verify
        // setStep(3); 
    };

    const handleTimeSelect = (time) => {
        setFormData({ ...formData, time });
        setStep(4);
    };

    const handleDetailsSubmit = (e) => {
        if (e) e.preventDefault();
        setStep(5);
    };

    const handleFinalConfirm = async () => {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        onSubmit(formData);
        setIsSubmitting(false);
    };

    const nextStep = () => {
        if (step === 1 && formData.selectedServices.length === 0) return;
        setStep(step + 1);
    }
    const prevStep = () => setStep(step - 1);

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-130px)] md:h-auto md:min-h-[600px] relative transition-all duration-300">
            {/* Header */}
            <div className="bg-white px-4 py-4 border-b border-gray-100 z-10 shrink-0 sticky top-0">
                <div className="flex items-center justify-between">
                    {step > 1 ? (
                        <button onClick={prevStep} className="p-2 -ml-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100">
                            <ArrowLeft size={20} />
                        </button>
                    ) : <div className="w-9"></div>}

                    <h2 className="text-lg font-bold text-gray-900">
                        {step === 1 && 'Select Services'}
                        {step === 2 && 'Select Date'}
                        {step === 3 && 'Select Time'}
                        {step === 4 && 'Details'}
                        {step === 5 && 'Review'}
                    </h2>

                    <div className="w-9"></div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-(--primary) transition-all duration-500 ease-out rounded-full"
                        style={{ width: `${(step / 5) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50 pb-32 md:pb-10 custom-scrollbar">
                {/* Step 1: Select Multiple Services */}
                {step === 1 && (
                    <div className="p-4 animate-fade-in-right">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className={`cursor-pointer bg-white rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm border transition-all active:scale-95 relative h-32 ${isServiceSelected(service.id) ? 'border-(--primary) ring-1 ring-(--primary) bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                                    onClick={() => handleServiceToggle(service)}
                                >
                                    {isServiceSelected(service.id) && (
                                        <div className="absolute top-2 right-2 bg-(--primary) text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full animate-scale-in">
                                            <Check size={12} />
                                        </div>
                                    )}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-colors ${isServiceSelected(service.id) ? 'bg-(--primary) text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <service.icon size={20} />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight">{service.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Date (New Horizontal Picker) */}
                {step === 2 && (
                    <div className="p-4 animate-fade-in-right">
                        <p className="text-gray-500 text-sm mb-4 text-center">Select a date for service</p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                            {availableDates.map((d) => {
                                const isSelected = formData.date === d.fullDate;
                                return (
                                    <button
                                        key={d.fullDate}
                                        onClick={() => handleDateSelect(d.fullDate)}
                                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${isSelected
                                            ? 'bg-(--primary) text-white border-(--primary) shadow-md transform scale-105'
                                            : 'bg-white border-gray-200 text-gray-700 hover:border-(--primary)'
                                            }`}
                                    >
                                        <span className={`text-xs font-medium uppercase mb-1 ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>{d.dayName}</span>
                                        <span className="text-xl font-bold">{d.dayNumber}</span>
                                        <span className={`text-xs ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>{d.month}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Step 3: Time */}
                {step === 3 && (
                    <div className="p-4 animate-fade-in-right">
                        <p className="text-gray-500 text-sm mb-4 text-center">Select a time slot</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'].map((time) => (
                                <button
                                    key={time}
                                    onClick={() => handleTimeSelect(time)}
                                    className={`py-4 rounded-xl border text-sm font-semibold transition-all active:scale-95 ${formData.time === time
                                        ? 'bg-(--primary) text-white border-(--primary) shadow-md'
                                        : 'bg-white text-gray-700 border-gray-200 hover:border-(--primary)'
                                        }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 4: Address & Notes */}
                {step === 4 && (
                    <div className="p-4 animate-fade-in-right">
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 space-y-4">
                            <Input
                                label="Full Service Address"
                                icon={MapPin}
                                placeholder="House No, Street, City..."
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-(--primary) focus:ring-1 focus:ring-(--primary) text-sm bg-white"
                                    rows="3"
                                    placeholder="Any specific instructions?"
                                    value={formData.notes}
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 5: Review */}
                {step === 5 && (
                    <div className="p-4 animate-fade-in-right space-y-4">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-gray-900 font-bold mb-4 flex items-center justify-between">
                                <span>Selected Services</span>
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{formData.selectedServices.length} Items</span>
                            </h3>
                            <div className="space-y-3 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                                {formData.selectedServices.map(s => (
                                    <div key={s.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-(--primary) shadow-sm shrink-0">
                                                <s.icon size={16} />
                                            </div>
                                            <span className="font-medium text-gray-700 text-sm">{s.title}</span>
                                        </div>
                                        <button onClick={() => handleServiceToggle(s)} className="text-red-400 hover:text-red-500 p-1">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-4">
                            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors" onClick={() => setStep(2)}>
                                <div className="flex items-center gap-3">
                                    <Calendar size={18} className="text-gray-400" />
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium uppercase">Date</p>
                                        <p className="text-sm font-semibold text-gray-900">{formData.date || 'Not selected'}</p>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-gray-300" />
                            </div>

                            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors" onClick={() => setStep(3)}>
                                <div className="flex items-center gap-3">
                                    <Clock size={18} className="text-gray-400" />
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium uppercase">Time</p>
                                        <p className="text-sm font-semibold text-gray-900">{formData.time || 'Not selected'}</p>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-gray-300" />
                            </div>

                            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors" onClick={() => setStep(4)}>
                                <div className="flex items-center gap-3">
                                    <MapPin size={18} className="text-gray-400" />
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium uppercase">Address</p>
                                        <p className="text-sm font-semibold text-gray-900 truncate max-w-[200px]">{formData.address || 'Not entered'}</p>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-gray-300" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Fixed Bottom Footer Action Bar - Positioned above BottomNav */}
            <div className="fixed bottom-[60px] left-0 right-0 p-4 bg-white border-t border-gray-200 md:absolute md:bottom-0 md:border-none z-40">
                <div className="max-w-2xl mx-auto flex gap-3">
                    {step > 1 && (
                        <Button variant="outline" className="flex-1 py-3.5" onClick={prevStep}>
                            Back
                        </Button>
                    )}

                    {step < 5 ? (
                        <Button
                            className="flex-1 py-3.5 shadow-lg shadow-blue-500/30 font-bold tracking-wide"
                            onClick={step === 4 ? handleDetailsSubmit : nextStep}
                            disabled={step === 1 && formData.selectedServices.length === 0}
                        >
                            {step === 4 ? 'Review Order' : 'Next'}
                        </Button>
                    ) : (
                        <Button
                            className="flex-1 py-3.5 text-base shadow-xl shadow-green-500/30 bg-green-600 hover:bg-green-700 border-green-600 font-bold tracking-wide"
                            onClick={handleFinalConfirm}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Confirm Booking'}
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
                .animate-scale-in {
                    animation: scale-in 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
                }
                @keyframes scale-in {
                    from { transform: scale(0); }
                    to { transform: scale(1); }
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
