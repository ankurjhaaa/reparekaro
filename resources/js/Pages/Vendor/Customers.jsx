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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                    <p className="text-sm text-gray-500">View clients who booked your services</p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search customers by name, email, or phone..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-(--primary)/20 focus:border-(--primary) transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Customers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCustomers && filteredCustomers.length > 0 ? filteredCustomers.map((customer) => (
                    <div key={customer.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all duration-300">
                        <div className="p-6 flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-blue-50 text-(--primary) flex items-center justify-center font-bold text-xl shrink-0">
                                {customer.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div className="min-w-0 pr-4">
                                <h3 className="text-lg font-bold text-gray-900 truncate">{customer.name}</h3>
                                <p className="text-sm text-gray-500 truncate mb-1">{customer.email}</p>
                                {customer.phone && (
                                    <div className="flex items-center gap-1 text-xs font-semibold text-gray-600 bg-gray-50 px-2 py-1 rounded inline-flex">
                                        <Phone size={12} /> {customer.phone}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-16 text-center bg-white rounded-xl shadow-sm border border-gray-100">
                        <SearchX size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">No Customers Found</h3>
                        <p className="text-gray-500 mt-1">You don't have any customers matching your search.</p>
                    </div>
                )}
            </div>
        </VendorLayout>
    );
}
