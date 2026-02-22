import React, { useState } from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Droplet, Wrench, Zap, Speaker, Hammer, PenTool, Search, Star, Clock, ChevronRight, Paintbrush, Fan, Tv, WashingMachine, Refrigerator, Lightbulb, CheckCircle2 } from 'lucide-react';

export default function Services() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All' },
        { id: 'repair', name: 'Repair' },
        { id: 'install', name: 'Install' },
        { id: 'maintenance', name: 'Maintenance' },
    ];

    const { serviceRates } = usePage().props;
    const services = serviceRates || [];

    const filteredServices = services.filter(s => {
        const matchCategory = activeCategory === 'all'; // Simplifying for now unless you want category columns locally
        const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || (s.service?.name && s.service.name.toLowerCase().includes(search.toLowerCase()));
        return matchCategory && matchSearch;
    });

    return (
        <PublicLayout>
            <Head title="All Services" />

            <div className="bg-gray-50 min-h-screen pb-20">
                {/* Header */}
                <div className="bg-white px-4 pt-4 pb-3 sticky top-[64px] z-30 border-b border-gray-100">
                    {/* Search */}
                    <div className="relative mb-3">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search services..."
                            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Category Tabs */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${activeCategory === cat.id
                                    ? 'bg-[var(--primary)] text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Services List */}
                <div className="px-4 py-4 space-y-3 max-w-3xl mx-auto">
                    {filteredServices.length === 0 && (
                        <div className="text-center py-16">
                            <Search size={40} className="mx-auto text-gray-300 mb-3" />
                            <p className="text-gray-500 font-medium">No services found</p>
                            <p className="text-gray-400 text-sm">Try a different search term</p>
                        </div>
                    )}

                    {filteredServices.map((service) => (
                        <Link key={service.id} href="/book-now">
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow active:scale-[0.99]">
                                {/* Icon / Image */}
                                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 overflow-hidden relative">
                                    {service.service?.image_url ? (
                                        <img src={service.service.image_url} alt={service.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <CheckCircle2 size={22} className="text-(--primary)" />
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 text-sm">{service.title}</h3>
                                    <p className="text-xs text-gray-500 truncate">{service.service?.name || 'Handyman Service'}</p>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <span className="flex items-center gap-1 text-xs text-gray-500">
                                            <Star size={10} className="fill-yellow-400 text-yellow-400" />
                                            4.8
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-gray-400">
                                            <Clock size={10} />
                                            {service.duration || '45 min'}
                                        </span>
                                    </div>
                                </div>

                                {/* Price + Arrow */}
                                <div className="text-right shrink-0">
                                    <p className="font-bold text-[var(--primary)] text-sm">₹{Math.floor(service.price)}</p>
                                    <p className="text-[10px] text-gray-400">onwards</p>
                                </div>
                                <ChevronRight size={16} className="text-gray-300 shrink-0" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </PublicLayout>
    );
}
