import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Send, Phone, MoreVertical, Paperclip, Image as ImageIcon, MapPin, Clock } from 'lucide-react';

export default function Chat({ id }) {
    // Mock Customer Data
    const customer = {
        name: 'Anjali Gupta',
        status: 'Online',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60'
    };

    // Mock Messages
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm Rahul, your technician for the AC Repair.", sender: 'me', time: '10:00 AM' },
        { id: 2, text: "Hi Rahul, when will you arrive?", sender: 'other', time: '10:02 AM' },
    ]);

    const [newMessage, setNewMessage] = useState('');

    const quickResponses = [
        "I'm on my way!", "Running 10 mins late.", "Just reached the location.", "Please share OTP."
    ];

    const handleSend = (e) => {
        if (e) e.preventDefault();
        if (!newMessage.trim()) return;
        setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'me', time: 'Now' }]);
        setNewMessage('');
    };

    return (
        <TechnicianLayout showNavbar={false}>
            <Head title="Chat with Customer" />

            <div className="bg-gray-50 flex flex-col h-[calc(100vh-64px)] md:h-[calc(100vh-64px)] md:pb-0">
                {/* Chat Header */}
                <div className="bg-white px-4 py-3 shadow-sm border-b border-gray-200 flex items-center justify-between sticky top-0 z-50">
                    <div className="flex items-center gap-3">
                        <Link href={`/technician/job/${id || 'RK-8829'}`} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
                            <ChevronLeft size={24} className="text-gray-600" />
                        </Link>
                        <div className="relative">
                            <img src={customer.image} alt={customer.name} className="w-10 h-10 rounded-full object-cover" />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm">{customer.name}</h3>
                            <p className="text-xs text-green-600 font-medium">{customer.status}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-(--primary)">
                        <a href="tel:+919876543210" className="p-2 bg-green-50 text-green-600 rounded-full"><Phone size={20} /></a>
                        <button><MoreVertical size={20} className="text-gray-500" /></button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 pb-32 md:pb-32 bg-gray-50">
                    <div className="text-center text-[10px] uppercase font-bold text-gray-400 my-4 tracking-widest">Today</div>

                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm text-sm relative ${msg.sender === 'me'
                                ? 'bg-(--primary) text-white rounded-tr-none'
                                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                }`}>
                                <p>{msg.text}</p>
                                <p className={`text-[10px] mt-1 text-right font-medium ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-400'}`}>
                                    {msg.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Responses & Input */}
                <div className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 md:relative z-40 pb-safe md:pb-0">
                    {/* Horizontal Scroll for Quick Responses */}
                    <div className="flex gap-2 p-3 overflow-x-auto whitespace-nowrap scrollbar-hide border-b border-gray-50">
                        {quickResponses.map((res, i) => (
                            <button
                                key={i}
                                onClick={() => { setNewMessage(res); }}
                                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-xs font-semibold text-gray-700 transition-colors border border-gray-200"
                            >
                                {res}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSend} className="p-3 flex items-center gap-2 max-w-4xl mx-auto">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full transition-colors">
                            <Paperclip size={20} />
                        </button>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2.5 text-sm focus:ring-2 focus:ring-(--primary)/20 outline-none transition-all placeholder-gray-400"
                        />
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-full md:hidden transition-colors">
                            <ImageIcon size={20} />
                        </button>
                        <button
                            type="submit"
                            className={`p-2.5 rounded-full text-white transition-all shadow-md active:scale-95 ${newMessage.trim() ? 'bg-(--primary) hover:bg-blue-700' : 'bg-gray-300'}`}
                            disabled={!newMessage.trim()}
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </TechnicianLayout>
    );
}
