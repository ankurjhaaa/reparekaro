import React from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { Head } from '@inertiajs/react';
import DataTable from '../../Components/Tables/DataTable';
import Button from '../../Components/Forms/Button';
import Badge from '../../Components/Badge';
import Input from '../../Components/Forms/Input';
import { Search, Filter } from 'lucide-react';

export default function Bookings() {
    const bookings = [
        { id: '#BK1024', customer: 'Alice Smith', service: 'AC Repair', status: 'Pending', date: 'Oct 24, 2023', amount: '$50.00' },
        { id: '#BK1023', customer: 'Bob Jones', service: 'Plumbing', status: 'Completed', date: 'Oct 22, 2023', amount: '$120.00' },
        { id: '#BK1022', customer: 'Charlie Brown', service: 'Electrical', status: 'In Progress', date: 'Oct 21, 2023', amount: '$85.00' },
        { id: '#BK1021', customer: 'Diana Prince', service: 'Carpenter', status: 'Cancelled', date: 'Oct 20, 2023', amount: '$0.00' },
        { id: '#BK1020', customer: 'Evan Wright', service: 'AC Repair', status: 'Completed', date: 'Oct 18, 2023', amount: '$60.00' },
    ];

    const columns = [
        { header: 'Booking ID', accessor: 'id' },
        { header: 'Customer', accessor: 'customer' },
        { header: 'Service', accessor: 'service' },
        { header: 'Date', accessor: 'date' },
        { header: 'Amount', accessor: 'amount' },
        {
            header: 'Status',
            render: (row) => (
                <Badge variant={
                    row.status === 'Completed' ? 'success' :
                        row.status === 'Pending' ? 'warning' :
                            row.status === 'Cancelled' ? 'danger' : 'primary'
                }>
                    {row.status}
                </Badge>
            )
        },
    ];

    return (
        <VendorLayout>
            <Head title="Bookings - Vendor Dashboard" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
                    <p className="text-gray-500">Manage your service requests</p>
                </div>
                <div className="flex gap-2">
                    <Button>+ Create Booking</Button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search bookings..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                        />
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="w-4 h-4" /> Filter
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <DataTable
                    columns={columns}
                    data={bookings}
                    actions={(row) => <Button size="sm" variant="ghost">Details</Button>}
                />
                {/* Pagination Placeholder */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <span className="text-sm text-gray-500">Showing 1 to 5 of 50 results</span>
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline">Previous</Button>
                        <Button size="sm" variant="outline">Next</Button>
                    </div>
                </div>
            </div>
        </VendorLayout>
    );
}
