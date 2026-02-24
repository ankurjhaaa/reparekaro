import React, { useState } from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { Search, User, Phone, MapPin, SearchX } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function Customers({ customers = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCustomers = customers.filter(customer =>
        customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer?.phone?.includes(searchTerm)
    );

    return (
        <VendorLayout title="Customers">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Your Customers</h1>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">View and manage clients who booked your services</p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white/80 backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100/60 mb-4 sm:mb-6 flex gap-3 sticky top-4 z-20">
                <div className="relative flex-1">
                    <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                    <input
                        type="text"
                        placeholder="Search customers by name, email, or phone..."
                        className="w-full pl-9 sm:pl-12 pr-4 py-2 bg-gray-50 border-0 focus:ring-2 focus:ring-(--primary)/20 focus:bg-white transition-all text-[10px] sm:text-sm font-medium rounded-lg sm:rounded-xl"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Customers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredCustomers && filteredCustomers.length > 0 ? filteredCustomers.map((customer) => (
                    <div key={customer.id} className="bg-white rounded-xl sm:rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden group hover:shadow-[0_4px_15px_rgb(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 relative">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-(--primary)/5 to-transparent rounded-bl-full pointer-events-none"></div>
                        <div className="p-4 sm:p-5 flex flex-col items-center text-center relative z-10">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-100 to-(--primary)/20 text-(--primary) flex items-center justify-center font-black text-xl sm:text-2xl mb-3 sm:mb-4 shadow-inner ring-4 ring-white">
                                {customer.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 w-full truncate">{customer.name}</h3>
                            <p className="text-[10px] sm:text-xs text-gray-500 w-full truncate mb-3 sm:mb-4">{customer.email}</p>

                            {customer.phone && (
                                <div className="w-full bg-gray-50 rounded-lg sm:rounded-xl p-2 sm:p-3 flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm font-semibold text-gray-700 border border-gray-100">
                                    <Phone size={12} className="text-blue-500 sm:w-3.5 sm:h-3.5" /> {customer.phone}
                                </div>
                            )}
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-16 sm:py-20 text-center bg-white/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-dashed border-gray-200">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <SearchX size={24} className="text-gray-400 sm:w-8 sm:h-8" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">No Customers Found</h3>
                        <p className="text-[10px] sm:text-xs text-gray-500 max-w-sm mx-auto">We couldn't find any customers matching "{searchTerm}". Try adjusting your search.</p>
                    </div>
                )}
            </div>
        </VendorLayout>
    );
}
