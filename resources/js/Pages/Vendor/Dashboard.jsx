import React from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { Head } from '@inertiajs/react';
import StatCard from '../../Components/Stats/StatCard';
import ChartPlaceholder from '../../Components/Charts/ChartPlaceholder';
import DataTable from '../../Components/Tables/DataTable';
import Button from '../../Components/Forms/Button';
import Badge from '../../Components/Badge';
import { Users, DollarSign, Calendar, TrendingUp } from 'lucide-react';

export default function Dashboard() {
    const bookings = [
        { id: '#BK001', customer: 'Alice Smith', service: 'AC Repair', status: 'Pending', amount: '$50', date: '2023-10-01' },
        { id: '#BK002', customer: 'Bob Jones', service: 'Plumbing', status: 'Completed', amount: '$80', date: '2023-09-28' },
        { id: '#BK003', customer: 'Charlie Brown', service: 'Electrical', status: 'In Progress', amount: '$45', date: '2023-10-02' },
    ];

    const columns = [
        { header: 'Booking ID', accessor: 'id' },
        { header: 'Customer', accessor: 'customer' },
        { header: 'Service', accessor: 'service' },
        {
            header: 'Status',
            render: (row) => (
                <Badge variant={
                    row.status === 'Completed' ? 'success' :
                        row.status === 'Pending' ? 'warning' : 'primary'
                }>
                    {row.status}
                </Badge>
            )
        },
        { header: 'Amount', accessor: 'amount' },
        { header: 'Date', accessor: 'date' },
    ];

    return (
        <VendorLayout>
            <Head title="Vendor Dashboard" />

            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500">Welcome back, Vendor Name</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Download Report</Button>
                    <Button>+ New Booking</Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Revenue" value="$12,500" icon={DollarSign} trend="+12.5%" trendUp={true} />
                <StatCard title="Total Bookings" value="156" icon={Calendar} trend="+5.2%" trendUp={true} />
                <StatCard title="Active Technicians" value="8" icon={Users} />
                <StatCard title="Today's Bookings" value="12" icon={TrendingUp} trend="+2" trendUp={true} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Main Chart Area */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Overview</h3>
                        <ChartPlaceholder type="area" title="Revenue Chart" />
                    </div>
                </div>

                {/* Recent Activity / Side Panel */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                    <ul className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <li key={i} className="flex gap-3">
                                <div className="w-2 h-2 mt-2 rounded-full bg-[var(--primary)] flex-shrink-0"></div>
                                <div>
                                    <p className="text-sm text-gray-800">New booking received from <span className="font-semibold">John Doe</span></p>
                                    <p className="text-xs text-gray-400">2 mins ago</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Recent Bookings Table */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Recent Bookings</h3>
                    <Button variant="ghost" size="sm">View All</Button>
                </div>
                <DataTable columns={columns} data={bookings} actions={() => <Button size="sm" variant="ghost">View</Button>} />
            </div>
        </VendorLayout>
    );
}
