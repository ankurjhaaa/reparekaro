import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import Navbar from '../Components/Navbar/Navbar';
import BottomNav from '../Components/Navigation/BottomNav';

export default function TechnicianLayout({ children, showNavbar = true }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[var(--bg)] flex mb-16 md:mb-0">
            {/* Desktop Sidebar - Only visible on md+ */}
            <div className="hidden md:block w-64 shrink-0 transition-all duration-300">
                <Sidebar userType="technician" />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {showNavbar && (
                    <Navbar
                        userType="Technician"
                        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                        showMenuButton={false}
                    />
                )}

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <BottomNav userType="technician" />
        </div>
    );
}
