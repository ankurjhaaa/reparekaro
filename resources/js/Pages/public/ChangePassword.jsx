import React, { useState } from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
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
        // Post logic he re
    };

    return (
        <PublicLayout>
            <Head title="Change Password" />

            <div className="bg-white min-h-screen py-6 max-w-2xl mx-auto px-4 pb-24 md:pb-6">
                <div className="flex items-center gap-3 mb-8">
                    <Link href="/settings" className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
                        <ChevronLeft size={24} className="text-gray-900" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Change Password</h1>
                </div>

                <div className="flex flex-col items-center mb-8 bg-blue-50/50 p-6 rounded-2xl border border-blue-50 text-center">
                    <Lock size={48} className="text-blue-500 mb-4 bg-white p-2 rounded-xl shadow-sm" />
                    <p className="text-sm text-gray-500 max-w-xs">
                        Create a strong password with at least 8 characters, a number, and a special character.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        icon={Lock}
                        label="Current Password"
                        type="password"
                        placeholder="Enter your current password"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        error={errors.current_password}
                    />

                    <Input
                        icon={Lock}
                        label="New Password"
                        type="password"
                        placeholder="Enter new password"
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
        </PublicLayout>
    );
}
