import React from 'react';
import SuperAdminLayout from '../../Layouts/SuperAdminLayout';
import { Head } from '@inertiajs/react';
import StatCard from '../../Components/Stats/StatCard';
import ChartPlaceholder from '../../Components/Charts/ChartPlaceholder';
import DataTable from '../../Components/Tables/DataTable';
import Badge from '../../Components/Badge';
import { Users, DollarSign, Briefcase, Activity } from 'lucide-react';

export default function Dashboard() {
    const vendors = [
        { id: 1, name: 'FixIt Bros', plan: 'Premium', status: 'Active', revenue: '$1,200', joined: '2023-01-15' },
        { id: 2, name: 'QuickRepair', plan: 'Basic', status: 'Active', revenue: '$450', joined: '2023-03-20' },
        { id: 3, name: 'HomeServices', plan: 'Enterprise', status: 'Inactive', revenue: '$0', joined: '2023-05-10' },
    ];

    const columns = [
        { header: 'Vendor Name', accessor: 'name' },
        {
            header: 'Plan',
            render: (row) => <Badge variant="primary">{row.plan}</Badge>
        },
        {
            header: 'Status',
            render: (row) => <Badge variant={row.status === 'Active' ? 'success' : 'gray'}>{row.status}</Badge>
        },
        { header: 'Monthly Revenue', accessor: 'revenue' },
        { header: 'Joined Date', accessor: 'joined' },
    ];

    return (
        <SuperAdminLayout>
            <Head title="SuperAdmin Dashboard" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>
                <p className="text-gray-500">SuperAdmin Control Panel</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Vendors" value="45" icon={Briefcase} trend="+3" trendUp={true} />
                <StatCard title="Total Revenue" value="$45,200" icon={DollarSign} trend="+8%" trendUp={true} />
                <StatCard title="Active Subscriptions" value="38" icon={Activity} />
                <StatCard title="Platform Visits" value="12k" icon={Users} trend="-2%" trendUp={false} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Platform Growth (Vendors)</h3>
                    <ChartPlaceholder type="bar" title="Vendor Growth" />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Distribution</h3>
                    <ChartPlaceholder type="pie" title="Plan Distribution" />
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Vendors</h3>
                <DataTable columns={columns} data={vendors} />
            </div>
        </SuperAdminLayout>
    );
}
