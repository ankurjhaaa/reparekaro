import React from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { User, Lock, Bell, HelpCircle } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function Settings() {
    return (
        <VendorLayout title="Settings">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100 max-w-2xl">
                <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                            <User size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Profile Settings</h3>
                            <p className="text-sm text-gray-500">Update company details</p>
                        </div>
                    </div>
                    <Button variant="outline" className="text-sm">Edit</Button>
                </div>

                <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="bg-yellow-50 p-2 rounded-lg text-yellow-600">
                            <Bell size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Notifications</h3>
                            <p className="text-sm text-gray-500">Manage alerts</p>
                        </div>
                    </div>
                    <div className="w-10 h-6 bg-green-500 rounded-full p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full shadow-md transform translate-x-4"></div>
                    </div>
                </div>

                <div className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className="bg-red-50 p-2 rounded-lg text-red-600">
                            <Lock size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Security</h3>
                            <p className="text-sm text-gray-500">Change password</p>
                        </div>
                    </div>
                </div>
            </div>
        </VendorLayout>
    );
}
