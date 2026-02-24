import React, { useState } from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { User, Lock, Bell, CheckCircle, Shield, Briefcase, Key } from 'lucide-react';
import Button from '../../Components/Forms/Button';
import Input from '../../Components/Forms/Input';
import { useForm, usePage } from '@inertiajs/react';

export default function Settings() {
    const { user, flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('profile');

    const profileForm = useForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
    });

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updateProfile = (e) => {
        e.preventDefault();
        profileForm.post('/vendor/settings', { preserveScroll: true });
    };

    const updatePassword = (e) => {
        e.preventDefault();
        passwordForm.post('/vendor/settings/password', {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset()
        });
    };

    return (
        <VendorLayout title="Settings">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Account Settings</h1>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">Manage your profile, security, and preferences</p>
                </div>
            </div>

            {flash?.success && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center text-emerald-700">
                    <CheckCircle className="mr-3" size={20} />
                    {flash.success}
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 items-start">

                {/* Sidemenu Tabs */}
                <div className="w-full md:w-56 shrink-0 bg-white rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-row md:flex-col overflow-x-auto custom-scrollbar">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`p-3 sm:p-4 flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-bold text-left whitespace-nowrap transition-colors border-b md:border-b-0 md:border-l-2 md:border-b-gray-100 ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700 border-b-blue-600 md:border-l-blue-600' : 'text-gray-600 border-b-transparent md:border-l-transparent hover:bg-gray-50'}`}
                    >
                        <User size={16} className="sm:w-[18px] sm:h-[18px]" /> Personal Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`p-3 sm:p-4 flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-bold text-left whitespace-nowrap transition-colors border-b md:border-b-0 md:border-l-2 md:border-b-gray-100 ${activeTab === 'security' ? 'bg-blue-50 text-blue-700 border-b-blue-600 md:border-l-blue-600' : 'text-gray-600 border-b-transparent md:border-l-transparent hover:bg-gray-50'}`}
                    >
                        <Shield size={16} className="sm:w-[18px] sm:h-[18px]" /> Security
                    </button>
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`p-3 sm:p-4 flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-bold text-left whitespace-nowrap transition-colors border-b md:border-b-0 md:border-l-2 ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-700 border-b-blue-600 md:border-l-blue-600' : 'text-gray-600 border-b-transparent md:border-l-transparent hover:bg-gray-50'}`}
                    >
                        <Bell size={16} className="sm:w-[18px] sm:h-[18px]" /> Notifications
                    </button>
                </div>

                {/* Form Content */}
                <div className="flex-1 w-full bg-white rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100 p-4 sm:p-6 lg:p-8">
                    {activeTab === 'profile' && (
                        <div>
                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <div className="p-1.5 sm:p-2 bg-blue-100 text-blue-600 rounded-md sm:rounded-lg"><Briefcase size={16} className="sm:w-5 sm:h-5" /></div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Personal Data</h2>
                            </div>
                            <form onSubmit={updateProfile} className="space-y-4 sm:space-y-6 max-w-xl">
                                <div>
                                    <Input
                                        label="Full Name"
                                        value={profileForm.data.name}
                                        onChange={(e) => profileForm.setData('name', e.target.value)}
                                        error={profileForm.errors.name}
                                        required
                                    />
                                </div>
                                <div>
                                    <Input
                                        label="Email Address"
                                        type="email"
                                        value={profileForm.data.email}
                                        onChange={(e) => profileForm.setData('email', e.target.value)}
                                        error={profileForm.errors.email}
                                        required
                                    />
                                </div>
                                <div>
                                    <Input
                                        label="Phone Number"
                                        type="tel"
                                        value={profileForm.data.phone}
                                        onChange={(e) => profileForm.setData('phone', e.target.value)}
                                        error={profileForm.errors.phone}
                                    />
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <Button type="submit" className="w-full sm:w-auto" disabled={profileForm.processing}>
                                        {profileForm.processing ? 'Saving...' : 'Save Profile Changes'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div>
                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <div className="p-1.5 sm:p-2 bg-red-100 text-red-600 rounded-md sm:rounded-lg"><Key size={16} className="sm:w-5 sm:h-5" /></div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Update Password</h2>
                            </div>
                            <form onSubmit={updatePassword} className="space-y-4 sm:space-y-6 max-w-xl">
                                <div>
                                    <Input
                                        label="Current Password"
                                        type="password"
                                        value={passwordForm.data.current_password}
                                        onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                        error={passwordForm.errors.current_password}
                                        required
                                    />
                                </div>
                                <div>
                                    <Input
                                        label="New Password"
                                        type="password"
                                        value={passwordForm.data.password}
                                        onChange={(e) => passwordForm.setData('password', e.target.value)}
                                        error={passwordForm.errors.password}
                                        required
                                    />
                                </div>
                                <div>
                                    <Input
                                        label="Confirm New Password"
                                        type="password"
                                        value={passwordForm.data.password_confirmation}
                                        onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                        error={passwordForm.errors.password_confirmation}
                                        required
                                    />
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <Button type="submit" variant="primary" className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white" disabled={passwordForm.processing}>
                                        {passwordForm.processing ? 'Updating...' : 'Update Password'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div>
                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <div className="p-1.5 sm:p-2 bg-yellow-100 text-yellow-600 rounded-md sm:rounded-lg"><Bell size={16} className="sm:w-5 sm:h-5" /></div>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Notification Preferences</h2>
                            </div>
                            <div className="space-y-3 sm:space-y-4 max-w-xl text-[10px] sm:text-sm">
                                <label className="flex items-center justify-between p-3 sm:p-4 border border-gray-100 rounded-lg sm:rounded-xl bg-gray-50 cursor-pointer">
                                    <div>
                                        <p className="font-bold text-gray-900">New Booking Alerts</p>
                                        <p className="text-gray-500 mt-0.5">Receive an email when a new booking is assigned</p>
                                    </div>
                                    <input type="checkbox" defaultChecked className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                                </label>
                                <label className="flex items-center justify-between p-3 sm:p-4 border border-gray-100 rounded-lg sm:rounded-xl bg-gray-50 cursor-pointer">
                                    <div>
                                        <p className="font-bold text-gray-900">Marketing Updates</p>
                                        <p className="text-gray-500 mt-0.5">Receive platform news and updates</p>
                                    </div>
                                    <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                                </label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </VendorLayout>
    );
}
