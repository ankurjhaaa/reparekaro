import React from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { Head } from '@inertiajs/react';
import ChartPlaceholder from '../../Components/Charts/ChartPlaceholder';
import StatCard from '../../Components/Stats/StatCard';
import { DollarSign, TrendingUp, Users, Calendar } from 'lucide-react';

export default function Reports() {
    return (
        <VendorLayout>
            <Head title="Reports - Vendor Dashboard" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
                <p className="text-gray-500">Track your business performance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Earnings" value="$12,450" icon={DollarSign} trend="+12%" trendUp={true} />
                <StatCard title="Bookings Growth" value="18%" icon={TrendingUp} trend="+2%" trendUp={true} />
                <StatCard title="New Customers" value="45" icon={Users} trend="+5" trendUp={true} />
                <StatCard title="Completion Rate" value="98%" icon={Calendar} trend="-1%" trendUp={false} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Earnings Over Time</h3>
                    <ChartPlaceholder type="area" title="Earnings Chart" />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Bookings by Service</h3>
                    <ChartPlaceholder type="pie" title="Services Distribution" />
                </div>
            </div>
        </VendorLayout>
    );
}
