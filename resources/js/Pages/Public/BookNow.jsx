import React, { useState } from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head, usePage, router } from '@inertiajs/react';
import Button from '../../Components/Forms/Button';
import BookingWizard from '../../Components/Booking/BookingWizard';
import { Droplet, Wrench, Zap, Speaker, Hammer, PenTool, Check } from 'lucide-react';

export default function BookNow() {
    const [bookingComplete, setBookingComplete] = useState(false);

    const { categories, flash } = usePage().props;
    const services = categories || [];

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
        <PublicLayout>
            <Head title="Book a Service" />

            <div className={`min-h-[calc(100vh-64px)] bg-gray-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center ${bookingComplete ? 'items-center' : 'items-start'}`}>
                {!bookingComplete ? (
                    <div className="w-full">

                        <BookingWizard services={services} onSubmit={handleBookingSubmit} />
                    </div>
                ) : (
                    <div className="text-center bg-white p-12 rounded-2xl shadow-xl max-w-lg w-full animate-fade-in-up">
                        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8 animate-bounce-short">
                            <Check className="h-12 w-12 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Booking Confirmed!</h2>
                        <p className="text-lg text-gray-500 mb-8">
                            Your request has been officially received.
                            <br />
                            <span className="font-medium text-gray-900 mt-2 block">Booking ID: #RK-{Math.floor(100000 + Math.random() * 900000)}</span>
                        </p>
                        <div className="space-y-4">
                            <Button onClick={() => setBookingComplete(false)} className="w-full justify-center py-3">
                                Book Another Service
                            </Button>
                            <a href="/" className="block text-[var(--primary)] hover:underline font-medium">
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
