import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, MessageCircle, Phone, FileText, HelpCircle } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function Support() {
    return (
        <TechnicianLayout>
            <Head title="Technician Support" />

            <div className="pb-24 md:pb-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <Link href="/technician/profile" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
                        <ChevronLeft size={20} className="text-gray-600" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Help & Support</h1>
                </div>

                <div className="grid gap-4">
                    <div className="bg-blue-50 p-6 rounded-2xl flex items-center justify-between shadow-sm border border-blue-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Partner Helpline</h3>
                                <p className="text-xs text-gray-500">Available 9 AM - 9 PM</p>
                            </div>
                        </div>
                        <a href="tel:+18001234567" className="bg-(--primary) text-white hover:bg-blue-700 shadow-lg px-6 py-2.5 rounded-xl font-bold text-sm transition-colors text-center">
                            Call Now
                        </a>
                    </div>

                    <div className="bg-green-50 p-6 rounded-2xl flex items-center justify-between shadow-sm border border-green-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm">
                                <MessageCircle size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Chat Support</h3>
                                <p className="text-xs text-gray-500">Instant resolution</p>
                            </div>
                        </div>
                        <Link href="/technician/chat/support" className="bg-green-600 text-white hover:bg-green-700 shadow-lg px-6 py-2.5 rounded-xl font-bold text-sm transition-colors text-center">
                            Start Chat
                        </Link>
                    </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mt-8 mb-4">Frequently Asked Questions</h3>
                <div className="space-y-3">
                    {[
                        "How to update bank details?",
                        "What to do if customer cancels?",
                        "How ratings affect my earnings?",
                        "Issue with app login?"
                    ].map((q, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:bg-gray-50 cursor-pointer transition-colors">
                            <span className="text-sm font-semibold text-gray-700">{q}</span>
                            <ChevronLeft size={16} className="rotate-180 text-gray-400" />
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Link href="/terms" className="text-xs text-gray-400 underline">Terms of Service</Link>
                </div>
            </div>
        </TechnicianLayout>
    );
}
