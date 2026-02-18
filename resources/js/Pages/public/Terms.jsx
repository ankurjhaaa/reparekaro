import React, { useState } from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function Terms() {
    return (
        <PublicLayout>
            <Head title="Terms & Conditions" />
            <div className="bg-white min-h-screen py-6 max-w-4xl mx-auto px-4 pb-24 md:pb-6">
                <div className="flex items-center gap-3 mb-8">
                    <Link href="/settings" className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
                        <ChevronLeft size={24} className="text-gray-900" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Terms & Conditions</h1>
                </div>

                <div className="prose prose-blue max-w-none text-gray-600">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">1. Introduction</h2>
                    <p className="mb-6">
                        Welcome to RepairKaro. By accessing or using our website and services, you agree to be bound by these terms and conditions.
                    </p>

                    <h2 className="text-lg font-bold text-gray-900 mb-4">2. Services</h2>
                    <p className="mb-6">
                        We provide a platform connecting users with third-party service providers ("Technicians"). We are not responsible for the direct actions of Technicians, though we vet them thoroughly.
                    </p>

                    <h2 className="text-lg font-bold text-gray-900 mb-4">3. Bookings & Cancellations</h2>
                    <p className="mb-6">
                        Bookings can be cancelled up to 2 hours before the scheduled time for a full refund. Cancellations made within 2 hours may incur a fee.
                    </p>

                    <h2 className="text-lg font-bold text-gray-900 mb-4">4. Payment</h2>
                    <p className="mb-6">
                        Payments are processed securely via our partners. We do not store your full card details.
                    </p>

                    <h2 className="text-lg font-bold text-gray-900 mb-4">5. Liability</h2>
                    <p className="mb-6">
                        RepairKaro provides a warranty of service up to ₹10,000 for damages caused directly by our verified technicians during the service.
                    </p>

                    <h2 className="text-lg font-bold text-gray-900 mb-4">6. Updates</h2>
                    <p className="mb-6">
                        We may update these terms from time to time. Continued use of the platform constitutes acceptance of new terms.
                    </p>

                    <p className="text-sm text-gray-400 mt-12 mb-20 italic">Last updated: February 18, 2026</p>
                </div>
            </div>
        </PublicLayout>
    );
}
