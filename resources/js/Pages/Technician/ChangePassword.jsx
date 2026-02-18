import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Lock } from 'lucide-react';
import Button from '../../Components/Forms/Button';
import Input from '../../Components/Forms/Input';

export default function ChangePassword() {
    const { data, setData, post, processing, errors } = useForm({
        current_password: '',
        new_password: '',
        confirm_password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Post logic here
    };

    return (
        <TechnicianLayout>
            <Head title="Change Password" />

            <div className="pb-24 md:pb-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <Link href="/technician/settings" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
                        <ChevronLeft size={20} className="text-gray-600" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Security</h1>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <h3 className="font-bold text-yellow-800 text-sm flex items-center gap-2">
                        <Lock size={16} /> Secure Your Account
                    </h3>
                    <p className="text-xs text-yellow-700 mt-1">
                        We recommend changing your password every 3 months to keep your earnings safe.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        icon={Lock}
                        label="Current Password"
                        type="password"
                        placeholder="••••••••"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        error={errors.current_password}
                    />

                    <Input
                        icon={Lock}
                        label="New Password"
                        type="password"
                        placeholder="New strong password"
                        value={data.new_password}
                        onChange={(e) => setData('new_password', e.target.value)}
                        error={errors.new_password}
                    />

                    <Input
                        icon={Lock}
                        label="Confirm New Password"
                        type="password"
                        placeholder="Re-enter new password"
                        value={data.confirm_password}
                        onChange={(e) => setData('confirm_password', e.target.value)}
                        error={errors.confirm_password}
                    />

                    <div className="pt-4">
                        <Button className="w-full py-3 text-base shadow-lg hover:shadow-xl transition-all bg-(--primary)" disabled={processing}>
                            Update Password
                        </Button>
                    </div>
                </form>
            </div>
        </TechnicianLayout>
    );
}
