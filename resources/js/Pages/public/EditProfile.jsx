import React, { useState } from 'react';
import PublicLayout from '../../Layouts/PublicLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Camera, User, Mail, Phone, MapPin } from 'lucide-react';
import Button from '../../Components/Forms/Button';
import Input from '../../Components/Forms/Input';

export default function EditProfile() {
    const { data, setData, post, processing, errors } = useForm({
        name: 'Guest User',
        email: 'guest@example.com',
        phone: '+91 98765 43210',
        address: 'Sector 62, Noida, UP',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Post logic here
    };

    return (
        <PublicLayout>
            <Head title="Edit Profile" />

            <div className="bg-white min-h-screen py-6 max-w-2xl mx-auto px-4 pb-24 md:pb-6">
                <div className="flex items-center gap-3 mb-8">
                    <Link href="/settings" className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
                        <ChevronLeft size={24} className="text-gray-900" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Edit Profile</h1>
                </div>

                <div className="flex flex-col items-center mb-8">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                            {data.image ? (
                                <img src={URL.createObjectURL(data.image)} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User size={40} className="text-gray-400" />
                            )}
                        </div>
                        <label htmlFor="image-upload" className="absolute bottom-0 right-0 p-2 bg-(--primary) text-white rounded-full cursor-pointer shadow-md hover:bg-blue-700 transition-colors">
                            <Camera size={16} />
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files[0])}
                        />
                    </div>
                    <p className="text-sm text-gray-500 mt-3 font-medium">Change Profile Picture</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        icon={User}
                        label="Full Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                    />

                    <Input
                        icon={Mail}
                        label="Email Address"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        error={errors.email}
                    />

                    <Input
                        icon={Phone}
                        label="Phone Number"
                        type="tel"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        error={errors.phone}
                    />

                    <Input
                        icon={MapPin}
                        label="Address"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        error={errors.address}
                    />

                    <div className="pt-4">
                        <Button className="w-full py-3 text-base shadow-lg hover:shadow-xl transition-all" disabled={processing}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </PublicLayout>
    );
}
