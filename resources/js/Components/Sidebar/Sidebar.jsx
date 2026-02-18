import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Calendar,
    Users,
    Settings,
    FileText,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Wrench,
    Briefcase
} from 'lucide-react';

export default function Sidebar({ userType = 'vendor', mobile = false, className = '' }) {
    const { url } = usePage();
    const [collapsed, setCollapsed] = useState(false);

    const menus = {
        vendor: [
            { name: 'Dashboard', icon: LayoutDashboard, href: '/vendor/dashboard' },
            { name: 'Bookings', icon: Calendar, href: '/vendor/bookings' },
            { name: 'Technicians', icon: Users, href: '/vendor/technicians' },
            { name: 'Services', icon: Wrench, href: '/vendor/services' },
            { name: 'Customers', icon: Users, href: '/vendor/customers' },
            { name: 'Reports', icon: FileText, href: '/vendor/reports' },
            { name: 'Settings', icon: Settings, href: '/vendor/settings' },
        ],
        superadmin: [
            { name: 'Dashboard', icon: LayoutDashboard, href: '/superadmin/dashboard' },
            { name: 'Vendors', icon: Users, href: '/superadmin/vendors' },
            { name: 'Subscriptions', icon: FileText, href: '/superadmin/subscriptions' },
            { name: 'Plans', icon: FileText, href: '/superadmin/plans' },
            { name: 'Settings', icon: Settings, href: '/superadmin/platform-settings' },
        ],
        technician: [
            { name: 'Dashboard', icon: LayoutDashboard, href: '/technician/dashboard' },
            { name: 'My Jobs', icon: Briefcase, href: '/technician/jobs' },
            { name: 'Profile', icon: Users, href: '/technician/profile' },
        ]
    };

    const currentMenu = menus[userType] || [];

    return (
        <div
            className={`bg-[var(--sidebar)] border-r border-gray-200 h-screen transition-all duration-300 z-30 flex flex-col ${mobile ? 'relative w-full flex' : `fixed left-0 top-0 hidden md:flex ${collapsed ? 'w-20' : 'w-64'}`
                } ${className}`}
        >
            {/* Logo Area */}
            <div className="h-16 flex items-center justify-center border-b border-gray-100">
                <h1 className={`font-bold text-xl text-[var(--primary)] transition-all ${collapsed ? 'scale-0 w-0' : 'scale-100'}`}>
                    RepairKaro
                </h1>
                {collapsed && <span className="font-bold text-xl text-[var(--primary)]">RK</span>}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-3">
                    {currentMenu.map((item) => {
                        const isActive = url.startsWith(item.href);
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative ${isActive
                                        ? 'bg-[var(--primary)] text-white'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                                    <span className={`font-medium transition-all ${collapsed ? 'hidden' : 'block'}`}>
                                        {item.name}
                                    </span>

                                    {/* Tooltip for collapsed state */}
                                    {collapsed && (
                                        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                            {item.name}
                                        </div>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer / User Profile */}
            <div className="p-4 border-t border-gray-100">
                <button className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                        {collapsed ? 'U' : 'User'}
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                            <p className="text-xs text-gray-500 truncate">{userType}</p>
                        </div>
                    )}
                    {!collapsed && <LogOut className="w-4 h-4 text-gray-400" />}
                </button>
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 shadow-sm text-gray-500 hover:text-gray-900"
            >
                {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
        </div>
    );
}
