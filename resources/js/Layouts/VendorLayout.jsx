import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import Navbar from '../Components/Navbar/Navbar';
import { Head, usePage } from '@inertiajs/react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export default function VendorLayout({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { flash } = usePage().props;
    const [banner, setBanner] = useState({ show: false, message: '', type: 'success' });

    useEffect(() => {
        if (flash?.success) setBanner({ show: true, message: flash.success, type: 'success' });
        if (flash?.error) setBanner({ show: true, message: flash.error, type: 'error' });

        let timer;
        if (flash?.success || flash?.error) {
            timer = setTimeout(() => setBanner({ show: false, message: '', type: 'success' }), 3000);
        }
        return () => clearTimeout(timer);
    }, [flash]);

    return (
        <div className="min-h-screen bg-gray-50 flex relative">
            {/* Global Flash Banner */}
            {banner.show && (
                <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md animate-fade-in-down min-w-[320px] max-w-sm w-full ${banner.type === 'success'
                    ? 'bg-green-50/95 border-green-200 text-green-800'
                    : 'bg-red-50/95 border-red-200 text-red-800'
                    }`}>
                    {banner.type === 'success' ? <CheckCircle2 className="text-green-500 shrink-0" size={24} /> : <XCircle className="text-red-500 shrink-0" size={24} />}
                    <p className="font-semibold text-sm flex-1">{banner.message}</p>
                    <button onClick={() => setBanner({ show: false, message: '', type: 'success' })} className="p-1 hover:bg-black/5 rounded-full transition-colors shrink-0">
                        <X size={16} className="opacity-60" />
                    </button>
                </div>
            )}

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/50 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:translate-x-0 md:sticky md:top-0 md:flex md:flex-col h-screen bg-white ${sidebarOpen ? 'translate-x-0' : '-translate-x-full fixed md:sticky'
                }`}>
                <Sidebar userType="vendor" className="h-full border-r border-gray-200 shadow-xl md:shadow-none" />
            </div>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
                {/* Navbar */}
                <div className="sticky top-0 z-40 bg-gray-50/80 backdrop-blur-md">
                    <Navbar
                        userType="Vendor"
                        onMenuClick={() => setSidebarOpen(true)}
                        showMenuButton={true} // Visible on mobile
                    />
                </div>

                {/* Content */}
                <main className="flex-1 p-3 sm:p-4 lg:p-6 w-full">
                    {title && <Head title={title} />}
                    <div className="max-w-7xl mx-auto w-full relative">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
