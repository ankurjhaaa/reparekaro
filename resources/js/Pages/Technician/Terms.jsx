import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';

export default function Terms() {
    return (
        <TechnicianLayout>
            <Head title="Partner Terms" />

            <div className="pb-24 md:pb-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <Link href="/technician/settings" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
                        <ChevronLeft size={20} className="text-gray-600" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Partner Agreement</h1>
                </div>

                <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
                    <p className="font-bold text-gray-900">1. Service Standards</p>
                    <p>Partners must maintain a minimum rating of 4.0. Failure to do so may result in account suspension.</p>

                    <p className="font-bold text-gray-900">2. Payouts</p>
                    <p>Payouts are processed daily. A platform fee of 15% is deducted from every completed job.</p>

                    <p className="font-bold text-gray-900">3. Cancellations</p>
                    <p>Frequent cancellations by the partner will attract a penalty up to ₹500.</p>

                    <p className="font-bold text-gray-900">4. Code of Conduct</p>
                    <p>Partners must verify their identity and wear the company uniform/ID card at all times during service.</p>
                </div>
            </div>
        </TechnicianLayout>
    );
}
