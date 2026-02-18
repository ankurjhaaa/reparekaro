import React from 'react';
import SuperAdminLayout from '../../Layouts/SuperAdminLayout';
import { Head } from '@inertiajs/react';
import DataTable from '../../Components/Tables/DataTable';
import Button from '../../Components/Forms/Button';
import Badge from '../../Components/Badge';

export default function Vendors() {
    const vendors = [
        { id: 1, name: 'Cooling Masters', owner: 'John Doe', email: 'john@cooling.com', status: 'Active', plan: 'Professional' },
        { id: 2, name: 'FixIt All', owner: 'Jane Smith', email: 'jane@fixit.com', status: 'Pending', plan: 'Basic' },
        { id: 3, name: 'ElectroFix', owner: 'Bob Wilson', email: 'bob@electro.com', status: 'Suspended', plan: 'Enterprise' },
    ];

    const columns = [
        { header: 'Business Name', accessor: 'name' },
        { header: 'Owner', accessor: 'owner' },
        { header: 'Email', accessor: 'email' },
        { header: 'Plan', accessor: 'plan' },
        {
            header: 'Status',
            render: (row) => (
                <Badge variant={row.status === 'Active' ? 'success' : row.status === 'Pending' ? 'warning' : 'danger'}>
                    {row.status}
                </Badge>
            )
        },
    ];

    return (
        <SuperAdminLayout>
            <Head title="Manage Vendors" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Vendors</h1>
                    <p className="text-gray-500">Platform details</p>
                </div>
                <Button>+ Approve New Vendor</Button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <DataTable columns={columns} data={vendors} actions={() => <Button size="sm" variant="ghost">Manage</Button>} />
            </div>
        </SuperAdminLayout>
    );
}
