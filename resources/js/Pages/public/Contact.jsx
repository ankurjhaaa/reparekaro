import React, { useState } from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Loader2 } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setSent(true);
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        }, 1500);
    };

    const contactInfo = [
        { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
        { icon: Mail, label: 'Email', value: 'support@repairkaro.com', href: 'mailto:support@repairkaro.com' },
        { icon: MapPin, label: 'Address', value: 'Sector 62, Noida, UP 201301' },
        { icon: Clock, label: 'Working Hours', value: 'Mon-Sat: 8 AM - 9 PM' },
    ];

    return (
        <PublicLayout>
            <Head title="Contact Us" />

            <div className="bg-gray-50 min-h-screen pb-20">
                {/* Header */}
                <div className="bg-[var(--primary)] text-white px-4 py-10 text-center">
                    <h1 className="text-2xl font-extrabold mb-2">Contact Us</h1>
                    <p className="text-blue-100 text-sm max-w-md mx-auto">
                        Have a question or need help? We're here for you 24/7.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto px-4">
                    {/* Quick Contact Cards */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 -mt-6 relative z-10 overflow-hidden">
                        {contactInfo.map((item, i) => (
                            <a
                                key={i}
                                href={item.href || '#'}
                                className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[var(--primary)] flex items-center justify-center shrink-0">
                                    <item.icon size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                                    <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <a href="tel:+919876543210" className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow active:scale-[0.98]">
                            <Phone size={22} className="mx-auto text-[var(--primary)] mb-2" />
                            <p className="font-semibold text-gray-900 text-sm">Call Us</p>
                            <p className="text-xs text-gray-500">Talk to support</p>
                        </a>
                        <a href="https://wa.me/919876543210" className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow active:scale-[0.98]">
                            <MessageCircle size={22} className="mx-auto text-green-600 mb-2" />
                            <p className="font-semibold text-gray-900 text-sm">WhatsApp</p>
                            <p className="text-xs text-gray-500">Chat with us</p>
                        </a>
                    </div>

                    {/* Contact Form */}
                    <div className="mt-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-3">Send a Message</h2>

                        {sent ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                    <Send size={22} className="text-green-600" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">Message Sent!</h3>
                                <p className="text-sm text-gray-500 mb-4">We'll get back to you within 24 hours.</p>
                                <button
                                    onClick={() => setSent(false)}
                                    className="text-sm font-semibold text-[var(--primary)] hover:underline"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                                            placeholder="+91 98765 43210"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                                        placeholder="How can we help?"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Message</label>
                                    <textarea
                                        required
                                        rows="4"
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent resize-none"
                                        placeholder="Describe your issue or question..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>
                                <Button type="submit" size="lg" className="w-full flex items-center justify-center gap-2" disabled={sending}>
                                    {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                    {sending ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
