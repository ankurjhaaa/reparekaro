import React, { useState } from 'react';
import VendorLayout from '../../Layouts/VendorLayout';
import { Head } from '@inertiajs/react';
import Button from '../../Components/Forms/Button';
import Input from '../../Components/Forms/Input';
import Card from '../../Components/Cards/Card';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('general');
    const [colors, setColors] = useState({
        bg: '#f9fafb',
        primary: '#2563eb',
        button: '#2563eb',
        sidebar: '#ffffff',
        text: '#1f2937'
    });

    const handleColorChange = (e) => {
        setColors({ ...colors, [e.target.name]: e.target.value });
    };

    return (
        <VendorLayout>
            <Head title="Vendor Settings" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500">Manage your business profile and preferences</p>
            </div>

            <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {['General', 'Branding', 'Working Hours', 'Notifications'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase().replace(' ', ''))}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.toLowerCase().replace(' ', '')
                                    ? 'border-[var(--primary)] text-[var(--primary)]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="space-y-6">
                {activeTab === 'general' && (
                    <Card title="Business Information">
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Business Name" placeholder="My Repair Shop" />
                                <Input label="Contact Email" type="email" placeholder="contact@example.com" />
                                <Input label="Phone Number" type="tel" placeholder="+1234567890" />
                                <Input label="Website" placeholder="https://..." />
                            </div>
                            <Input label="Service Area (Cities/Zip Codes)" placeholder="New York, Brooklyn, 10001" />
                            <div className="flex justify-end">
                                <Button type="submit">Save Changes</Button>
                            </div>
                        </form>
                    </Card>
                )}

                {activeTab === 'branding' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card title="Logo & Assets">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="h-20 w-20 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                                        Logo
                                    </div>
                                    <Button variant="outline" size="sm">Upload New Logo</Button>
                                </div>
                            </div>
                        </Card>

                        <Card title="Theme Customization">
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                                        <div className="flex items-center gap-2">
                                            <input type="color" name="primary" value={colors.primary} onChange={handleColorChange} className="h-9 w-9 p-0 border-0 rounded cursor-pointer" />
                                            <span className="text-sm font-mono text-gray-500">{colors.primary}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Button Color</label>
                                        <div className="flex items-center gap-2">
                                            <input type="color" name="button" value={colors.button} onChange={handleColorChange} className="h-9 w-9 p-0 border-0 rounded cursor-pointer" />
                                            <span className="text-sm font-mono text-gray-500">{colors.button}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Sidebar Color</label>
                                        <div className="flex items-center gap-2">
                                            <input type="color" name="sidebar" value={colors.sidebar} onChange={handleColorChange} className="h-9 w-9 p-0 border-0 rounded cursor-pointer" />
                                            <span className="text-sm font-mono text-gray-500">{colors.sidebar}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                                        <div className="flex items-center gap-2">
                                            <input type="color" name="bg" value={colors.bg} onChange={handleColorChange} className="h-9 w-9 p-0 border-0 rounded cursor-pointer" />
                                            <span className="text-sm font-mono text-gray-500">{colors.bg}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Theme Preview */}
                                <div className="mt-6 p-4 rounded-lg border border-gray-200" style={{ backgroundColor: colors.bg }}>
                                    <p className="text-xs text-gray-500 mb-2 uppercase font-semibold">Live Preview</p>
                                    <div className="flex gap-4">
                                        <div className="w-16 h-20 rounded shadow-sm" style={{ backgroundColor: colors.sidebar }}></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-8 rounded bg-white shadow-sm w-full"></div>
                                            <button
                                                className="px-4 py-2 rounded text-white text-sm font-medium"
                                                style={{ backgroundColor: colors.button }}
                                            >
                                                Button
                                            </button>
                                            <p className="text-sm" style={{ color: colors.primary }}>Primary Text</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button type="button">Save Theme</Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                )}

                {/* Other tabs omitted for brevity but structure is there */}
                {['workinghours', 'notifications'].includes(activeTab) && (
                    <Card title={activeTab === 'workinghours' ? 'Working Hours' : 'Notification Preferences'}>
                        <p className="text-gray-500 italic">Settings for {activeTab} go here...</p>
                    </Card>
                )}
            </div>
        </VendorLayout>
    );
}
