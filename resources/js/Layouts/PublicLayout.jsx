import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import BottomNav from '../Components/Navigation/BottomNav';
import { Rocket, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ExternalLink } from 'lucide-react';
import Button from '../Components/Forms/Button';

export default function PublicLayout({ children }) {
    const { url } = usePage();

    const { auth } = usePage().props;

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Help & FAQ', href: '/help' },
    ];

    if (auth?.user) {
        navigation.push({ name: 'My Bookings', href: '/my-bookings' });
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            {/* Desktop Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="bg-(--primary) text-white p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
                                    <Rocket className="h-5 w-5" />
                                </div>
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-(--primary) to-blue-600">
                                    RepairKaro
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200 ${url === item.href || (url.startsWith(item.href) && item.href !== '/')
                                        ? 'border-(--primary) text-gray-900'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            {auth?.user ? (
                                <div className="flex items-center gap-4">
                                    <Link href="/profile" className="text-sm font-medium text-gray-700 hover:text-(--primary)">
                                        Hi, {auth.user.name.split(' ')[0]}
                                    </Link>
                                    <Link href="/logout" method="post" as="button" className="text-sm font-medium text-red-500 hover:text-red-700">
                                        Logout
                                    </Link>
                                </div>
                            ) : (
                                <Link href="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900">
                                    Sign in
                                </Link>
                            )}
                            <Link href="/book-now">
                                <Button size="sm" className="shadow-md hover:shadow-lg transition-shadow">
                                    Book Now
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Header visual (Just Logo and maybe a notification - kept simple) */}
                        <div className="flex md:hidden w-full justify-end">
                            {/* Placeholder for future mobile header actions if needed */}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 pb-16 md:pb-0 relative">
                {children}
            </main>

            {/* Desktop Footer (Hidden on Mobile for 'App' feel, or maybe simplified) */}
            <footer className="bg-white border-t border-gray-200 mt-auto hidden md:block">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Brand */}
                        <div className="col-span-1 md:col-span-1">
                            <Link href="/" className="flex items-center gap-2 mb-4">
                                <div className="bg-(--primary) text-white p-1.5 rounded-lg">
                                    <Rocket className="h-5 w-5" />
                                </div>
                                <span className="text-xl font-bold text-gray-900">RepairKaro</span>
                            </Link>
                            <p className="text-sm text-gray-500 mb-4 block">
                                Expert home services at your doorstep. Reliable, fast, and affordable.
                            </p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-(--primary)"><Facebook size={20} /></a>
                                <a href="#" className="text-gray-400 hover:text-(--primary)"><Twitter size={20} /></a>
                                <a href="#" className="text-gray-400 hover:text-(--primary)"><Instagram size={20} /></a>
                                <a href="#" className="text-gray-400 hover:text-(--primary)"><Linkedin size={20} /></a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Platform</h3>
                            <ul className="space-y-3">
                                <li><Link href="/" className="text-base text-gray-500 hover:text-gray-900">Home</Link></li>
                                <li><Link href="/services" className="text-base text-gray-500 hover:text-gray-900">Services</Link></li>
                                <li><Link href="/book-now" className="text-base text-gray-500 hover:text-gray-900">Book Service</Link></li>
                                <li><Link href="/my-bookings" className="text-base text-gray-500 hover:text-gray-900">My Bookings</Link></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Company</h3>
                            <ul className="space-y-3">
                                <li><Link href="/about" className="text-base text-gray-500 hover:text-gray-900">About Us</Link></li>
                                <li><Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">Contact</Link></li>
                                <li><Link href="/help" className="text-base text-gray-500 hover:text-gray-900">Help & FAQ</Link></li>
                                <li><Link href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Contact</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <MapPin className="h-5 w-5 text-gray-400 mr-2 shrink-0" />
                                    <span className="text-base text-gray-500">Sector 62, Noida, UP 201301</span>
                                </li>
                                <li className="flex items-center">
                                    <Phone className="h-5 w-5 text-gray-400 mr-2 shrink-0" />
                                    <span className="text-base text-gray-500">+91 98765 43210</span>
                                </li>
                                <li className="flex items-center">
                                    <Mail className="h-5 w-5 text-gray-400 mr-2 shrink-0" />
                                    <span className="text-base text-gray-500">support@repairkaro.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-base text-gray-400">&copy; 2026 RepairKaro Inc. All rights reserved.</p>
                        <p className="text-sm text-gray-400 mt-2 md:mt-0 flex items-center gap-1">
                            Made with <span className="text-red-500">♥</span> in India
                        </p>
                    </div>
                </div>
            </footer>

            {/* Mobile Bottom Navigation */}
            <BottomNav userType="public" />
        </div>
    );
}
