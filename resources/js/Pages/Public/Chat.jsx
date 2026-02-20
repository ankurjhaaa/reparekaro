import React, { useState } from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Send, Phone, MoreVertical, Paperclip, Image as ImageIcon } from 'lucide-react';

export default function Chat({ id }) {
    // Mock Technician Data
    const technician = {
        name: 'Rahul Sharma',
        status: 'Online',
        image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60'
    };

    // Mock Messages
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm Rahul, your technician for the AC Repair.", sender: 'other', time: '10:00 AM' },
        { id: 2, text: "Hi Rahul, when will you arrive?", sender: 'me', time: '10:02 AM' },
        { id: 3, text: "I'm on my way, reaching in 15 mins.", sender: 'other', time: '10:03 AM' },
        { id: 4, text: "Okay, thanks!", sender: 'me', time: '10:04 AM' },
    ]);

    const [newMessage, setNewMessage] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'me', time: 'Now' }]);
        setNewMessage('');
    };

    return (
        <PublicLayout>
            <Head title="Chat" />

            <div className="bg-gray-100 min-h-screen flex flex-col md:pb-0">
                {/* Chat Header */}
                <div className="bg-white px-4 py-3 shadow-sm flex items-center justify-between sticky top-0 z-50">
                    <div className="flex items-center gap-3">
                        <Link href={`/booking/${id || 'RK-88219'}`} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
                            <ChevronLeft size={24} className="text-gray-600" />
                        </Link>
                        <div className="relative">
                            <img src={technician.image} alt={technician.name} className="w-10 h-10 rounded-full object-cover" />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-sm">{technician.name}</h3>
                            <p className="text-xs text-green-600 font-medium">{technician.status}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-(--primary)">
                        <button><Phone size={22} /></button>
                        <button><MoreVertical size={22} className="text-gray-500" /></button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 pb-24 md:pb-24">
                    <div className="text-center text-xs text-gray-400 my-4">Today</div>
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm text-sm ${msg.sender === 'me'
                                    ? 'bg-(--primary) text-white rounded-tr-none'
                                    : 'bg-white text-gray-800 rounded-tl-none'
                                }`}>
                                <p>{msg.text}</p>
                                <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-400'}`}>
                                    {msg.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="bg-white p-3 border-t border-gray-200 fixed bottom-0 left-0 right-0 md:relative z-40">
                    <form onSubmit={handleSend} className="max-w-3xl mx-auto flex items-center gap-3">
                        <button type="button" className="text-gray-400 hover:text-gray-600">
                            <Paperclip size={22} />
                        </button>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2.5 text-sm focus:ring-1 focus:ring-(--primary) outline-none"
                        />
                        <button type="button" className="text-gray-400 hover:text-gray-600 md:hidden">
                            <ImageIcon size={22} />
                        </button>
                        <button
                            type="submit"
                            className={`p-2.5 rounded-full text-white transition-all ${newMessage.trim() ? 'bg-(--primary) shadow-md' : 'bg-gray-300'}`}
                            disabled={!newMessage.trim()}
                        >
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </PublicLayout>
    );
}
