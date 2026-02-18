import React from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { Head } from '@inertiajs/react';
import DataTable from '../../Components/Tables/DataTable';
import Button from '../../Components/Forms/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Customers() {
    const customers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 234 567 890', address: '123 Main St', total_bookings: 5 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 987 654 321', address: '456 Oak Ave', total_bookings: 2 },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '+1 111 222 333', address: '789 Pine Ln', total_bookings: 8 },
    ];

    const columns = [
        { header: 'Name', accessor: 'name' },
        {
            header: 'Contact',
            render: (row) => (
                <div className="text-sm">
                    <div className="flex items-center gap-1 text-gray-900"><Mail size={12} /> {row.email}</div>
                    <div className="flex items-center gap-1 text-gray-500"><Phone size={12} /> {row.phone}</div>
                </div>
            )
        },
        { header: 'Address', accessor: 'address' },
        { header: 'Total Bookings', accessor: 'total_bookings' },
    ];

    return (
        <VendorLayout>
            <Head title="Customers - Vendor Dashboard" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                    <p className="text-gray-500">View your customer base</p>
                </div>
                <Button variant="outline">Export List</Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <DataTable columns={columns} data={customers} actions={() => <Button size="sm" variant="ghost">History</Button>} />
            </div>
        </VendorLayout>
    );
}
