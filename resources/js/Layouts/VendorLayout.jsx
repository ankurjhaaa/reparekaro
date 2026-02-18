import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import Navbar from '../Components/Navbar/Navbar';
import { Head } from '@inertiajs/react';

export default function VendorLayout({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/50 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            {/* on Mobile: fixed, z-50, slide-in. on Desktop: static/sticky? Sidebar component handles 'fixed' internally on desktop. */}
            {/* Actually Sidebar component has `fixed left-0 top-0 hidden md:flex` logic built in.
                I need to override it for mobile to be VISIBLE when open.
            */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 md:translate-x-0 md:static md:inset-auto md:flex md:flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <Sidebar userType="vendor" mobile={true} className="h-full border-r border-gray-200" />
            </div>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                {/* Navbar */}
                <Navbar
                    userType="Vendor"
                    onMenuClick={() => setSidebarOpen(true)}
                    showMenuButton={true} // Visible on mobile
                />

                {/* Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    {title && <Head title={title} />}
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
