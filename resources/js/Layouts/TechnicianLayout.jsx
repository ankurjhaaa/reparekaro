import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import Navbar from '../Components/Navbar/Navbar';
import BottomNav from '../Components/Navigation/BottomNav';

export default function TechnicianLayout({ children, showNavbar = true }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex relative mb-16 md:mb-0">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/50 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Desktop and Mobile Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 transform transition-all duration-300 md:translate-x-0 md:sticky md:top-0 md:flex md:flex-col h-screen bg-white ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <Sidebar userType="technician" className="h-full border-r border-gray-200 shadow-xl md:shadow-none" />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 w-full">
                {showNavbar && (
                    <div className="sticky top-0 z-40 bg-gray-50/80 backdrop-blur-md">
                        <Navbar
                            userType="Technician"
                            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                            showMenuButton={true}
                        />
                    </div>
                )}

                <main className="flex-1 p-3 sm:p-4 lg:p-6 w-full max-w-7xl mx-auto">
                    {children}
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <BottomNav userType="technician" />
        </div>
    );
}
