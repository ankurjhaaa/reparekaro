import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Building, CreditCard, PlusCircle, CheckCircle, Smartphone } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function BankDetails() {
    const [accounts, setAccounts] = useState([
        { id: 1, type: 'bank', name: 'State Bank of India', accountNo: 'XXXXXX4521', ifsc: 'SBIN0001234', default: true },
        { id: 2, type: 'upi', name: 'rahul@okhdfcbank', default: false },
    ]);

    return (
        <TechnicianLayout>
            <Head title="Bank & Payout" />

            <div className="pb-24 md:pb-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <Link href="/technician/settings" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
                        <ChevronLeft size={20} className="text-gray-600" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Payout Details</h1>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 relative overflow-hidden">
                    <p className="text-sm text-blue-800 font-medium relative z-10">
                        Payouts are processed daily at 8 PM for amounts above ₹500.
                    </p>
                    <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-200 rounded-full opacity-20"></div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Linked Accounts</h2>

                    {accounts.map((acc) => (
                        <div key={acc.id} className={`bg-white rounded-2xl p-4 shadow-sm border ${acc.default ? 'border-green-200 ring-1 ring-green-100' : 'border-gray-100'}`}>
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${acc.type === 'bank' ? 'bg-indigo-50 text-indigo-600' : 'bg-teal-50 text-teal-600'}`}>
                                        {acc.type === 'bank' ? <Building size={24} /> : <Smartphone size={24} />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{acc.type === 'bank' ? acc.name : 'UPI ID'}</h3>
                                        <p className="text-sm text-gray-600 font-medium mt-0.5">
                                            {acc.type === 'bank' ? acc.accountNo : acc.name}
                                        </p>
                                        {acc.type === 'bank' && <p className="text-xs text-gray-400 mt-1">IFSC: {acc.ifsc}</p>}
                                    </div>
                                </div>
                                {acc.default && (
                                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase flex items-center gap-1">
                                        <CheckCircle size={10} /> Primary
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}

                    <Button variant="outline" className="w-full py-4 border-dashed border-gray-300 text-gray-500 hover:bg-gray-50 gap-2 font-semibold">
                        <PlusCircle size={20} /> Add New Bank Account
                    </Button>
                    <Button variant="outline" className="w-full py-4 border-dashed border-gray-300 text-gray-500 hover:bg-gray-50 gap-2 font-semibold">
                        <PlusCircle size={20} /> Add New UPI ID
                    </Button>
                </div>
            </div>
        </TechnicianLayout>
    );
}
