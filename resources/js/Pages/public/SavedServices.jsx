import React from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Trash2, Bookmark } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function SavedServices() {
    const savedServices = [
        { id: 'ac', title: 'AC Deep Service', price: '₹499', rating: 4.8, image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=200' },
        { id: 'paint', title: 'Room Painting', price: '₹2999', rating: 4.6, image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=200' },
    ];

    return (
        <PublicLayout>
            <Head title="Saved Services" />

            <div className="bg-gray-50 min-h-screen py-6 max-w-2xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Link href="/profile" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
                            <ChevronLeft size={20} className="text-gray-600" />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900">Saved Services</h1>
                    </div>
                </div>

                {savedServices.length > 0 ? (
                    <div className="space-y-4">
                        {savedServices.map((service) => (
                            <div key={service.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 items-center group hover:bg-blue-50/20 transition-colors">
                                <img src={service.image} alt={service.title} className="w-20 h-20 rounded-xl object-cover bg-gray-100" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-gray-900 text-lg">{service.title}</h3>
                                        <button className="text-gray-300 hover:text-red-500 transition-colors p-1">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                    <p className="text-sm font-semibold text-(--primary) mt-1">{service.price}</p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-xs text-yellow-500 font-bold">★ {service.rating}</span>
                                        <Link href="/book-now">
                                            <Button size="sm" className="px-5 py-2 text-xs font-bold rounded-full">Book Now</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 flex flex-col items-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-6">
                            <Bookmark size={40} />
                        </div>
                        <h3 className="text-gray-900 font-bold text-xl mb-2">No Saved Services</h3>
                        <p className="text-gray-400 max-w-xs mx-auto mb-6">Services you bookmark will appear here for easy access.</p>
                        <Link href="/services">
                            <Button>Explore Services</Button>
                        </Link>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
