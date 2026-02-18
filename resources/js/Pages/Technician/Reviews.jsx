import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Star, User } from 'lucide-react';

export default function Reviews() {
    const reviews = [
        { id: 1, customer: 'Amit Kumar', rating: 5, comment: 'Excellent service! Very professional and polite.', date: 'Yesterday' },
        { id: 2, customer: 'Priya Singh', rating: 4, comment: 'Good job but arrived slightly late.', date: '2 days ago' },
        { id: 3, customer: 'Rahul Verma', rating: 5, comment: 'Fixed the issue quickly. Highly recommended.', date: 'Last Week' },
    ];

    return (
        <TechnicianLayout>
            <Head title="My Reviews" />

            <div className="pb-24 md:pb-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <Link href="/technician/profile" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
                        <ChevronLeft size={20} className="text-gray-600" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Customer Reviews</h1>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-900">4.8</h2>
                    <div className="flex justify-center gap-1 my-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={20} className="fill-current text-yellow-400" />
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 font-medium">Based on 142 Reviews</p>
                </div>

                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs uppercase">
                                        {review.customer.charAt(0)}
                                    </div>
                                    <span className="font-bold text-gray-900 text-sm">{review.customer}</span>
                                </div>
                                <span className="text-[10px] text-gray-400">{review.date}</span>
                            </div>

                            <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} className={i < review.rating ? "fill-current text-yellow-400" : "text-gray-300"} />
                                ))}
                            </div>

                            <p className="text-sm text-gray-600">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </TechnicianLayout>
    );
}
