import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, usePage } from '@inertiajs/react';
import { Download, ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon, Calendar, IndianRupee, TrendingUp } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function Wallet() {
    const { earnings } = usePage().props;

    // Placeholder transactions since we haven't built a full transaction table yet
    const transactions = [
        { id: 1, type: 'credit', title: 'Platform Earnings', amount: `+ ₹${earnings || 0}`, date: 'Lifetime', status: 'Success' },
    ];

    return (
        <TechnicianLayout>
            <Head title="My Wallet" />

            <div className="pb-24 md:pb-6 max-w-4xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-1">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                            <WalletIcon size={24} className="text-(--primary)" /> Returns & Wallet
                        </h1>
                        <p className="text-xs text-gray-500 mt-0.5">Manage your earnings and payouts.</p>
                    </div>
                    <button className="text-xs font-bold bg-white border border-gray-200 shadow-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition-colors">
                        <Download size={14} className="text-gray-400" /> Export History
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Balance Card */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 rounded-2xl p-5 sm:p-6 text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.4)] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-[0.03] rounded-full translate-x-12 -translate-y-12 blur-2xl group-hover:opacity-10 transition-opacity duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 opacity-20 rounded-full -translate-x-8 translate-y-8 blur-xl"></div>

                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="flex items-center gap-1.5 mb-1.5 text-blue-100/80 font-medium text-xs sm:text-sm">
                                    <IndianRupee size={14} /> Total Lifetime Earnings
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-black tracking-tight">₹{earnings || '0.00'}</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
                                <div className="bg-white/10 rounded-xl p-3 sm:p-4 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors">
                                    <p className="text-blue-100/70 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5 sm:mb-1">Available for Payout</p>
                                    <p className="font-black text-lg sm:text-xl">₹{earnings || '0.00'}</p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 sm:p-4 backdrop-blur-md border border-white/5 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform"></div>
                                    <p className="text-blue-100/70 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5 sm:mb-1">Withdrawn</p>
                                    <p className="font-medium text-base sm:text-lg text-white/50">₹0.00</p>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <Button className="bg-white text-blue-700 font-black hover:bg-blue-50 w-full shadow-lg shadow-white/10 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl">
                                    Request Payout
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats Sidebar */}
                    <div className="space-y-4 sm:space-y-6">
                        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col items-center justify-center text-center h-full min-h-[160px] sm:min-h-[200px]">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-3 sm:mb-4">
                                <TrendingUp size={24} className="sm:w-8 sm:h-8" />
                            </div>
                            <h3 className="text-gray-900 font-bold text-base sm:text-lg">Great Work!</h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1.5 sm:mt-2 max-w-[200px]">You are in the top 15% of earners this month in your area.</p>
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-1.5 sm:gap-2">
                        <Calendar size={18} className="text-(--primary) sm:w-5 sm:h-5" /> Recent Transactions
                    </h3>
                    <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden divide-y divide-gray-50">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="p-4 sm:p-5 flex justify-between items-center hover:bg-gray-50/80 transition-colors group">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm border ${tx.type === 'credit' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                                        {tx.type === 'credit' ? <ArrowDownLeft size={20} className="sm:w-6 sm:h-6" /> : <ArrowUpRight size={20} className="sm:w-6 sm:h-6" />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm sm:text-base">{tx.title}</p>
                                        <p className="text-[10px] sm:text-xs font-semibold text-gray-400 mt-0.5">{tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-black text-base sm:text-lg tracking-tight ${tx.type === 'credit' ? 'text-emerald-600' : 'text-gray-900'}`}>{tx.amount}</p>
                                    <span className={`inline-block mt-0.5 sm:mt-1 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider rounded-md border ${tx.status === 'Success' ? 'bg-emerald-50 text-emerald-600 border-emerald-200/50' : 'bg-orange-50 text-orange-600 border-orange-200/50'}`}>{tx.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </TechnicianLayout>
    );
}
