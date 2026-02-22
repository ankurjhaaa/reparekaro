import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Home, Calendar, User, Search, Briefcase, Wallet, LogIn } from 'lucide-react';

export default function BottomNav({ userType = 'public' }) {
    const { url } = usePage();

    const menus = {
        public: [
            { name: 'Home', icon: Home, href: '/' },
            { name: 'Services', icon: Search, href: '/services' },
            { name: 'Bookings', icon: Calendar, href: '/my-bookings' },
            { name: 'Profile', icon: User, href: '/profile' },
        ],
        technician: [
            { name: 'Home', icon: Home, href: '/technician/dashboard' },
            { name: 'Jobs', icon: Briefcase, href: '/technician/jobs' },
            { name: 'Wallet', icon: Wallet, href: '/technician/wallet' },
            { name: 'Profile', icon: User, href: '/technician/profile' },
        ]
    };

    const currentMenu = menus[userType] || menus.public;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 md:hidden pb-safe transition-all duration-300">
            <div className="flex justify-around items-center h-[64px]">
                {currentMenu.map((item) => {
                    // Check if active (exact match or sub-path match except for root '/')
                    const isActive = item.href === '/'
                        ? url === '/'
                        : url.startsWith(item.href);

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-colors duration-200 active:scale-95 ${isActive ? 'text-[var(--primary)]' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {/* No fill, just stroke manipulation for cleaner look */}
                            <item.icon
                                size={24}
                                strokeWidth={isActive ? 2.5 : 2}
                                className="transition-all duration-200"
                            />
                            <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
