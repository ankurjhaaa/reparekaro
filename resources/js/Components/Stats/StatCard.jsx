import React from 'react';
import Card from '../Cards/Card';

export default function StatCard({ title, value, icon: Icon, trend, trendUp }) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
                </div>
                {Icon && (
                    <div className="p-3 bg-[var(--primary)]/10 rounded-full">
                        <Icon className="w-6 h-6 text-[var(--primary)]" />
                    </div>
                )}
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span className={trendUp ? 'text-green-600' : 'text-red-600'}>
                        {trend}
                    </span>
                    <span className="text-gray-500 ml-2">from last month</span>
                </div>
            )}
        </Card>
    );
}
