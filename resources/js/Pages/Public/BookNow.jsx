import React, { useState } from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head, usePage, router } from '@inertiajs/react';
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

    return (
        <PublicLayout noFooter={true} noScroll={true}>
            <Head title="Book a Service" />

            <div className={`h-full w-full bg-gray-50 flex ${bookingComplete ? 'items-center justify-center p-4' : 'items-start justify-center sm:p-6 sm:items-center'}`}>
                {!bookingComplete ? (
                    <div className="w-full h-full sm:h-auto sm:max-w-2xl mx-auto flex flex-col">
                        <BookingWizard services={services} addresses={userAddresses} onSubmit={handleBookingSubmit} />
                    </div>
                ) : (
                    <div className="text-center bg-white p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 max-w-lg w-full animate-fade-in-up relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                        <div className="mx-auto flex items-center justify-center h-28 w-28 rounded-full bg-green-50 mb-8 inset-0 shadow-inner">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-bounce-short">
                                <Check className="h-10 w-10" strokeWidth={3} />
                            </div>
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Booking Confirmed!</h2>
                        <p className="text-base text-gray-500 mb-8 leading-relaxed">
                            Your service request has been successfully placed. We'll send you an update shortly.
                            <br />
                            <span className="font-bold text-gray-900 mt-4 block p-3 bg-gray-50 rounded-xl border border-gray-100">Booking ID: <span className="text-(--primary)">#RK-{Math.floor(100000 + Math.random() * 900000)}</span></span>
                        </p>
                        <div className="space-y-4">
                            <Button onClick={() => setBookingComplete(false)} className="w-full justify-center py-4 rounded-xl text-md font-bold shadow-md hover:shadow-lg transition-all">
                                Book Another Service
                            </Button>
                            <a href="/" className="block text-gray-500 hover:text-(--primary) font-semibold transition-colors mt-2">
                                Return to Home
                            </a>
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
