import React from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import Button from '../../Components/Forms/Button';
import { Shield, Clock, PenTool, Star, ArrowRight, Check, Wrench, Speaker, Droplet, Zap, Hammer, ChevronRight, MapPin, Search as SearchIcon, Bell, Percent, Ticket } from 'lucide-react';
import Card from '../../Components/Cards/Card';

export default function Home() {
    const services = [
        { id: 'ac', title: 'AC Repair', icon: Droplet, desc: 'Cooling', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=500' },
        { id: 'plumbing', title: 'Plumbing', icon: Wrench, desc: 'Leaks', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&q=80&w=500' },
        { id: 'electrical', title: 'Electrical', icon: Zap, desc: 'Wiring', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=500' },
        { id: 'appliances', title: 'Appliances', icon: Speaker, desc: 'Fixes', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=500' },
        { id: 'carpenter', title: 'Carpenter', icon: Hammer, desc: 'Furniture', image: 'https://images.unsplash.com/photo-1622937000305-d8056bf9a347?auto=format&fit=crop&q=80&w=500' },
        { id: 'painting', title: 'Painting', icon: PenTool, desc: 'Colors', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500' },
    ];

    const testimonials = [
        { name: "Rahul S.", role: "Homeowner", text: "Amazing service! The AC technician arrived within an hour.", rating: 5 },
        { name: "Priya M.", role: "Tenant", text: "Very professional plumbing service. Transparent pricing.", rating: 5 },
        { name: "Amit K.", role: "Shop Owner", text: "I use RepairKaro for all my shop maintenance.", rating: 4 },
    ];

    return (
        <PublicLayout>
            <Head title="RepairKaro - Expert Repairs on Demand" />

            {/* MOBILE: App Header & Search */}
            <div className="md:hidden bg-(--primary) text-white pt-4 pb-8 px-4 rounded-b-4xl shadow-lg mb-6 sticky top-0 z-40">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-white/20 rounded-full backdrop-blur-sm">
                            <MapPin size={16} />
                        </div>
                        <div>
                            <p className="text-[10px] text-blue-100 uppercase font-semibold tracking-wider">Current Location</p>
                            <p className="text-sm font-bold flex items-center gap-1">Sector 62, Noida <ChevronRight size={14} /></p>
                        </div>
                    </div>
                    <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm relative">
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-(--primary)"></span>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-3 flex items-center gap-3">
                    <SearchIcon size={20} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for 'AC Repair'..."
                        className="w-full text-sm outline-none text-gray-700 placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* MOBILE: Promotional Banners (Scrollable) */}
            <div className="md:hidden overflow-x-auto no-scrollbar px-4 pb-6 flex gap-3 -mt-2">
                <div className="min-w-[85%] bg-linear-to-r from-violet-600 to-indigo-600 rounded-2xl p-4 text-white relative overflow-hidden shadow-md">
                    <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-2 translate-y-2">
                        <Percent size={80} />
                    </div>
                    <p className="text-xs font-semibold bg-white/20 inline-block px-2 py-0.5 rounded-lg mb-2">Limited Offer</p>
                    <h3 className="text-lg font-bold">50% OFF</h3>
                    <p className="text-xs text-indigo-100 mb-3">On your first AC Service booking</p>
                    <button className="bg-white text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-bold">Claim Now</button>
                </div>
                <div className="min-w-[85%] bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 text-white relative overflow-hidden shadow-md">
                    <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-2 translate-y-2">
                        <Ticket size={80} />
                    </div>
                    <p className="text-xs font-semibold bg-white/20 inline-block px-2 py-0.5 rounded-lg mb-2">Cleaning</p>
                    <h3 className="text-lg font-bold">Home Deep Clean</h3>
                    <p className="text-xs text-orange-100 mb-3">Starting at just ₹999</p>
                    <button className="bg-white text-orange-600 px-3 py-1.5 rounded-lg text-xs font-bold">Book Now</button>
                </div>
            </div>


            {/* DESKTOP: Hero Section */}
            <section className="hidden md:block relative overflow-hidden bg-white pt-16 lg:pt-24 pb-12 lg:pb-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-50 text-(--primary) mb-6">
                            <Star className="w-4 h-4 mr-2 fill-current" /> #1 Rated Home Service App
                        </div>
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
                            <span className="block">Your Home Deserves</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-(--primary) to-blue-600">
                                The Best Care
                            </span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-500 max-w-lg mb-8">
                            Instant access to verified professionals for cleaning, repairs, and maintenance. Experience hassle-free home services today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/book-now">
                                <Button size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-all">
                                    Book a Service <ChevronRight size={18} />
                                </Button>
                            </Link>
                            <Link href="/services">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center justify-center">
                                    View All Services
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-10 flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`, backgroundSize: 'cover' }}></div>
                                ))}
                            </div>
                            <span>Trusted by 50,000+ happy customers</span>
                        </div>
                    </div>

                    <div className="relative lg:h-[600px] hidden lg:block">
                        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-blue-100 rounded-[3rem] -z-10 transform rotate-3"></div>
                        <div className="absolute bottom-10 left-10 w-2/3 h-2/3 bg-purple-100 rounded-[3rem] -z-10 transform -rotate-2"></div>
                        <img
                            src="https://images.unsplash.com/photo-1581578731117-1045293d2f2d?auto=format&fit=crop&q=80&w=1000"
                            alt="Technician working"
                            className="relative rounded-2xl shadow-2xl object-cover w-full h-full transform transition-transform hover:scale-[1.01]"
                        />
                        <div className="absolute bottom-20 -left-10 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce-slow">
                            <div className="bg-green-100 p-2 rounded-full text-green-600"><Check size={20} /></div>
                            <div>
                                <p className="font-bold text-gray-900">Verified Expert</p>
                                <p className="text-xs text-gray-500">Background Checked</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid (Shared but adapted) */}
            <section className="py-6 md:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h2 className="hidden md:block text-(--primary) font-semibold tracking-wide uppercase">Our Services</h2>
                            <p className="text-xl md:text-3xl font-extrabold text-gray-900">
                                Categories
                            </p>
                        </div>
                        <Link href="/services" className="text-sm font-semibold text-(--primary) flex items-center gap-1">
                            See All <ChevronRight size={14} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
                        {services.map((service, idx) => (
                            <Link key={idx} href="/book-now" className="group block">
                                <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col items-center justify-center border border-transparent hover:border-blue-100 relative overflow-hidden aspect-square md:aspect-auto">
                                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-full md:rounded-2xl bg-blue-50 text-(--primary) flex items-center justify-center mb-2 md:mb-4 group-hover:bg-(--primary) group-hover:text-white transition-colors duration-300">
                                        <service.icon size={20} className="md:hidden" />
                                        <service.icon size={28} strokeWidth={1.5} className="hidden md:block" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 text-xs md:text-base mb-0 md:mb-1 leading-tight">{service.title}</h3>
                                    <p className="hidden md:block text-xs text-gray-500">{service.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* DESKTOP ONLY: Features / Stats / Testimonials / Big CTA */}
            <div className="hidden md:block">
                {/* Features */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 gap-16 items-center">
                            <div className="relative">
                                <div className="grid grid-cols-2 gap-4">
                                    <img src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=500" className="rounded-2xl shadow-lg mt-12" alt="Feature 1" />
                                    <img src="https://images.unsplash.com/photo-1505798577917-a651a5d40320?auto=format&fit=crop&q=80&w=500" className="rounded-2xl shadow-lg" alt="Feature 2" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Why trust RepairKaro?</h2>
                                <div className="space-y-4">
                                    <div className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-(--primary) shrink-0"><Shield size={24} /></div>
                                        <div><h3 className="font-bold">Verified Professionals</h3><p className="text-gray-500 text-sm">Background checked and trained experts.</p></div>
                                    </div>
                                    <div className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-(--primary) shrink-0"><Check size={24} /></div>
                                        <div><h3 className="font-bold">Service Guarantee</h3><p className="text-gray-500 text-sm">30-day warranty on all repairs.</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-(--primary) py-16 text-white relative">
                    <div className="max-w-7xl mx-auto px-4 grid grid-cols-4 text-center divide-x divide-white/20">
                        <div><div className="text-4xl font-extrabold">50K+</div><div className="text-blue-100">Customers</div></div>
                        <div><div className="text-4xl font-extrabold">2000+</div><div className="text-blue-100">Experts</div></div>
                        <div><div className="text-4xl font-extrabold">4.8</div><div className="text-blue-100">Rating</div></div>
                        <div><div className="text-4xl font-extrabold">15+</div><div className="text-blue-100">Cities</div></div>
                    </div>
                </section>

                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-12">Loved by Customers</h2>
                        <div className="grid grid-cols-3 gap-8">
                            {testimonials.map((t, i) => (
                                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-(--primary) text-left">
                                    <div className="flex text-yellow-400 mb-3"><Star fill="currentColor" size={16} /> <Star fill="currentColor" size={16} /> <Star fill="currentColor" size={16} /> <Star fill="currentColor" size={16} /> <Star fill="currentColor" size={16} /></div>
                                    <p className="text-gray-600 mb-4 italic">"{t.text}"</p>
                                    <div className="font-bold">{t.name}</div>
                                    <div className="text-xs text-gray-500">{t.role}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-white text-center">
                    <div className="max-w-4xl mx-auto bg-gray-900 rounded-3xl p-16 text-white overflow-hidden relative">
                        <h2 className="text-4xl font-bold mb-4 relative z-10">Ready to get started?</h2>
                        <p className="text-gray-400 mb-8 max-w-lg mx-auto relative z-10">Book a service in less than 60 seconds.</p>
                        <Link href="/book-now" className="relative z-10"><Button size="lg" className="bg-white text-black hover:bg-gray-100">Book Now</Button></Link>
                    </div>
                </section>
            </div>

            {/* MOBILE ONLY: Simple Bottom Padding for scrolling */}
            <div className="md:hidden h-20"></div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </PublicLayout>
    );
}
