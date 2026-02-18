import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link } from '@inertiajs/react';
import { DollarSign, ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon, Calendar } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function Wallet() {
    const transactions = [
        { id: 1, type: 'credit', title: 'Job Payment #RK-8829', amount: '+ ₹450', date: 'Today, 11:30 AM', status: 'Success' },
        { id: 2, type: 'credit', title: 'Job Payment #RK-8801', amount: '+ ₹450', date: 'Yesterday, 04:00 PM', status: 'Success' },
        { id: 3, type: 'debit', title: 'Payout to Bank', amount: '- ₹2,500', date: 'Feb 15, 2026', status: 'Pending' },
    ];

    return (
        <TechnicianLayout>
            <Head title="My Wallet" />

            <div className="pb-24 md:pb-6 max-w-2xl mx-auto space-y-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <WalletIcon size={24} className="text-(--primary)" /> Returns Wallet
                    </h1>
                    <button className="text-sm font-semibold text-(--primary) hover:underline flex items-center gap-1">
                        <Calendar size={14} /> Month View
                    </button>
                </div>

                {/* Balance Card */}
                <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full translate-x-10 -translate-y-10 blur-xl"></div>
                    <div className="relative z-10">
                        <p className="text-blue-100 text-sm font-medium mb-1">Total Balance</p>
                        <h2 className="text-4xl font-bold">₹ 5,850.00</h2>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                                <p className="text-blue-200 text-xs">Today's Earnings</p>
                                <p className="font-bold text-lg">+ ₹900</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                                <p className="text-blue-200 text-xs">Pending Payout</p>
                                <p className="font-bold text-lg">₹ 2,500</p>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <Button className="bg-white text-blue-700 font-bold hover:bg-blue-50 w-full shadow-lg">
                                Withdraw Now
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Transaction History */}
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h3>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                        {tx.type === 'credit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm">{tx.title}</p>
                                        <p className="text-xs text-gray-400">{tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-bold ${tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>{tx.amount}</p>
                                    <p className={`text-[10px] font-bold uppercase ${tx.status === 'Success' ? 'text-green-500' : 'text-orange-500'}`}>{tx.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </TechnicianLayout>
    );
}
