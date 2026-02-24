import React, { useState } from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head, usePage, router, Link } from '@inertiajs/react';
import Button from '../../Components/Forms/Button';
import BookingWizard from '../../Components/Booking/BookingWizard';
import { Droplet, Wrench, Zap, Speaker, Hammer, PenTool, Check } from 'lucide-react';

export default function BookNow() {
    const [bookingComplete, setBookingComplete] = useState(false);

    const { categories, addresses, flash } = usePage().props;
    const services = categories || [];
    const userAddresses = addresses || [];

    const handleBookingSubmit = (data) => {
        router.post('/book-now', data, {
            onSuccess: () => {
                setBookingComplete(true);
                window.scrollTo(0, 0);
            },
            preserveScroll: true
        });
    };

    const bookingId = flash?.success?.split('ID: ')[1] || 'RK-' + Math.floor(100000 + Math.random() * 900000);

    return (
        <PublicLayout noFooter={true} noScroll={true}>
            <Head title="Book a Service" />

            <div className={`h-full w-full bg-gray-50 flex ${bookingComplete ? 'items-center justify-center p-4' : 'items-start justify-center sm:p-6 sm:items-center'}`}>
                {!bookingComplete ? (
                    <div className="w-full h-full sm:h-auto sm:max-w-2xl mx-auto flex flex-col">
                        <BookingWizard services={services} addresses={userAddresses} onSubmit={handleBookingSubmit} />
                    </div>
                ) : (
                    <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100 max-w-sm sm:max-w-md w-full animate-fade-in-up relative overflow-hidden flex flex-col items-center text-center">
                        {/* Soft Gradient Background Orbs */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-(--primary)/5 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

                        {/* Animated Icon */}
                        <div className="relative z-10 w-24 h-24 mb-6 mt-4">
                            <div className="absolute inset-0 bg-blue-50/80 rounded-full animate-pulse"></div>
                            <div className="absolute inset-2 bg-blue-100/50 rounded-full"></div>
                            <div className="absolute inset-4 bg-(--primary) text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                                <Check className="h-8 w-8" strokeWidth={3} />
                            </div>
                        </div>

                        {/* Heading & Text */}
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2 tracking-tight relative z-10">Booking Confirmed</h2>
                        <p className="text-[13px] sm:text-sm text-gray-500 mb-8 leading-relaxed max-w-xs relative z-10">
                            Your service request has been successfully placed. We'll assign a professional shortly.
                        </p>

                        {/* Booking Details Card */}
                        <div className="w-full bg-gray-50/80 px-4 py-3.5 rounded-2xl border border-gray-100 mb-8 relative z-10 flex items-center justify-between">
                            <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">Booking ID</span>
                            <span className="font-black text-gray-900 tracking-wide text-base sm:text-lg leading-none text-(--primary)">#{bookingId}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="w-full space-y-3 relative z-10">
                            <Button onClick={() => setBookingComplete(false)} className="w-full justify-center py-3.5 sm:py-4 rounded-xl text-sm font-bold tracking-wide transition-all shadow-md shadow-blue-500/20 active:scale-[0.98]">
                                Book Another Service
                            </Button>
                            <Link href="/" className="w-full flex items-center justify-center py-3.5 sm:py-4 rounded-xl text-sm font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors active:scale-[0.98]">
                                Return to Home
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes bounce-short {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
                .animate-bounce-short { animation: bounce-short 1s ease-in-out infinite; }
            `}</style>
        </PublicLayout>
    );
}
