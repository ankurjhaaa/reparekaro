import React, { useState } from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronDown, Search, Phone, MessageCircle, HelpCircle, BookOpen, FileText, Shield } from 'lucide-react';

export default function Help() {
    const [openFaq, setOpenFaq] = useState(null);
    const [search, setSearch] = useState('');

    const quickLinks = [
        { icon: BookOpen, title: 'How to Book', desc: 'Step by step guide', href: '/book-now' },
        { icon: FileText, title: 'Pricing', desc: 'Transparent rates', href: '/services' },
        { icon: Shield, title: 'Warranty', desc: '30-day guarantee', href: '/about' },
    ];

    const faqs = [
        {
            category: 'Booking',
            questions: [
                { q: 'How do I book a service?', a: 'Go to "Book Now" from the home page, select the service you need, choose a date and time, enter your address, and confirm. It takes less than 60 seconds!' },
                { q: 'Can I book multiple services at once?', a: 'Yes! You can select multiple services during the booking process. Our technician will handle all selected services in a single visit.' },
                { q: 'How do I cancel a booking?', a: 'You can cancel your booking from the "My Bookings" section in your profile. Cancellations made 2+ hours before the appointment are free.' },
                { q: 'Can I reschedule my booking?', a: 'Yes, you can reschedule from "My Bookings" up to 1 hour before the scheduled time, subject to technician availability.' },
            ]
        },
        {
            category: 'Pricing & Payment',
            questions: [
                { q: 'How is the price calculated?', a: 'Each service has a base inspection charge. The final price is shared by the technician after diagnosis. You pay only after the work is done to your satisfaction.' },
                { q: 'What payment methods are accepted?', a: 'We accept Cash, UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, and Net Banking.' },
                { q: 'Are there any hidden charges?', a: 'Absolutely not. We believe in 100% transparent pricing. Any parts or materials needed will be quoted before work begins.' },
            ]
        },
        {
            category: 'Service & Warranty',
            questions: [
                { q: 'What if I\'m not satisfied with the service?', a: 'We offer a 100% satisfaction guarantee. If you\'re not happy, we\'ll send another technician to fix it at no extra cost.' },
                { q: 'Is there a warranty on repairs?', a: 'Yes, all repairs come with a 30-day service warranty. If the same issue reoccurs within 30 days, we\'ll fix it for free.' },
                { q: 'Are your technicians verified?', a: 'Every technician on our platform goes through a rigorous background check, skill verification, and training before being onboarded.' },
            ]
        },
    ];

    const filteredFaqs = faqs.map(section => ({
        ...section,
        questions: section.questions.filter(
            faq => faq.q.toLowerCase().includes(search.toLowerCase()) || faq.a.toLowerCase().includes(search.toLowerCase())
        )
    })).filter(section => section.questions.length > 0);

    return (
        <PublicLayout>
            <Head title="Help & FAQ" />

            <div className="bg-gray-50 min-h-screen pb-20">
                {/* Header */}
                <div className="bg-[var(--primary)] text-white px-4 py-10 text-center">
                    <HelpCircle size={32} className="mx-auto mb-3 text-blue-200" />
                    <h1 className="text-2xl font-extrabold mb-2">Help Center</h1>
                    <p className="text-blue-100 text-sm max-w-md mx-auto">
                        Find answers to common questions or reach out to us.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto px-4">
                    {/* Search */}
                    <div className="relative -mt-5 z-10">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search FAQ..."
                            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl shadow-md border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* Quick Links */}
                    <div className="mt-6 grid grid-cols-3 gap-3">
                        {quickLinks.map((link, i) => (
                            <Link
                                key={i}
                                href={link.href}
                                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow active:scale-[0.98]"
                            >
                                <link.icon size={20} className="mx-auto text-[var(--primary)] mb-2" />
                                <p className="font-semibold text-gray-900 text-xs">{link.title}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">{link.desc}</p>
                            </Link>
                        ))}
                    </div>

                    {/* FAQ Accordion */}
                    <div className="mt-6 space-y-6">
                        {filteredFaqs.length === 0 && (
                            <div className="text-center py-12">
                                <HelpCircle size={36} className="mx-auto text-gray-300 mb-3" />
                                <p className="text-gray-500 font-medium">No results found</p>
                                <p className="text-gray-400 text-sm">Try a different search term</p>
                            </div>
                        )}

                        {filteredFaqs.map((section, si) => (
                            <div key={si}>
                                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
                                    {section.category}
                                </h2>
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    {section.questions.map((faq, fi) => {
                                        const faqId = `${si}-${fi}`;
                                        const isOpen = openFaq === faqId;
                                        return (
                                            <div key={fi} className="border-b border-gray-100 last:border-b-0">
                                                <button
                                                    onClick={() => setOpenFaq(isOpen ? null : faqId)}
                                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                                                >
                                                    <span className="font-medium text-gray-900 text-sm pr-4">{faq.q}</span>
                                                    <ChevronDown
                                                        size={16}
                                                        className={`text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                                    />
                                                </button>
                                                {isOpen && (
                                                    <div className="px-4 pb-4">
                                                        <p className="text-sm text-gray-500 leading-relaxed bg-gray-50 p-3 rounded-lg">
                                                            {faq.a}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Still Need Help */}
                    <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                        <h3 className="font-bold text-gray-900 mb-1">Still need help?</h3>
                        <p className="text-sm text-gray-500 mb-4">Our support team is available 24/7</p>
                        <div className="flex gap-3 justify-center">
                            <a href="tel:+919876543210" className="flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                                <Phone size={14} />
                                Call Us
                            </a>
                            <a href="https://wa.me/919876543210" className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                                <MessageCircle size={14} />
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
