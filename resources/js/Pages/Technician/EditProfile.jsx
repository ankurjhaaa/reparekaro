import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ChevronLeft, Camera, User, Mail, Phone, MapPin, Briefcase, Award } from 'lucide-react';
import Button from '../../Components/Forms/Button';
import Input from '../../Components/Forms/Input';

export default function EditProfile() {
    const { data, setData, post, processing, errors } = useForm({
        name: 'Rahul Sharma',
        email: 'rahul.s@reparekaro.com',
        phone: '+91 98765 43210',
        experience: '5 Years',
        category: 'AC Repair',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Post logic here
    };

    return (
        <TechnicianLayout>
            <Head title="Edit Profile" />

            <div className="pb-24 md:pb-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <Link href="/technician/settings" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
                        <ChevronLeft size={20} className="text-gray-600" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Edit Profile</h1>
                </div>

                <div className="flex flex-col items-center mb-8">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                            {data.image ? (
                                <img src={URL.createObjectURL(data.image)} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60" alt="Tech" className="w-full h-full object-cover" />
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
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2">Personal Info</h2>
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
                        disabled // Email usually locked for partners
                    />

                    <Input
                        icon={Phone}
                        label="Phone Number"
                        type="tel"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        error={errors.phone}
                    />

                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b pb-2 pt-4">Professional Details</h2>
                    <Input
                        icon={Briefcase}
                        label="Years of Experience"
                        value={data.experience}
                        onChange={(e) => setData('experience', e.target.value)}
                    />

                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Category</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <Award size={20} />
                            </div>
                            <input
                                type="text"
                                value={data.category}
                                disabled
                                className="pl-10 w-full rounded-lg border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed shadow-sm sm:text-sm"
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-xs text-gray-400">
                                Contact Support to Change
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 pb-20 md:pb-0">
                        <Button className="w-full py-3 text-base shadow-lg hover:shadow-xl transition-all" disabled={processing}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </TechnicianLayout>
    );
}
