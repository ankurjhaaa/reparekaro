import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Navbar({ onMenuClick, userType, showMenuButton = true }) {
    return (
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 h-16 flex items-center justify-between px-4 sticky top-0 z-50 w-full shadow-sm transition-all duration-300">
            <div className="flex items-center gap-3">
                {showMenuButton && userType !== 'Technician' && (
                    <button
                        onClick={onMenuClick}
                        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                )}

                {/* Brand Logo - Show on mobile alongside menu, hide on desktop if Menu button is requested (since sidebar has its own logo) */}
                <div className={`flex items-center gap-2 ${showMenuButton ? 'md:hidden' : ''}`}>
                    <div className="bg-[var(--primary)] text-white p-1.5 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[var(--primary)] to-blue-600">
                        RepairKaro
                    </span>
                </div>

                {/* Desktop Title if Menu is shown */}
                {showMenuButton && (
                    <h2 className="text-lg font-semibold text-gray-800 capitalize hidden md:block">
                        {userType} Portal
                    </h2>
                )}
            </div>

            <div className="flex items-center gap-4">
                {userType === 'Technician' ? (
                    <Link href="/technician/notifications" className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </Link>
                ) : (
                    <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                )}
            </div>
        </header>
    );
}
