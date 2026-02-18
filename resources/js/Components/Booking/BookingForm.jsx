import React, { useState, useEffect } from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function BookingForm({ onSubmit, servicePreselected }) {
    const [formData, setFormData] = useState({
        service: servicePreselected || '',
        date: '',
        time: '',
        address: '',
        notes: ''
    });

    // Effect to update if prop changes
    useEffect(() => {
        if (servicePreselected) {
            setFormData(prev => ({ ...prev, service: servicePreselected }));
        }
    }, [servicePreselected]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Required</label>
                <select
                    id="service"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--primary)"
                    value={formData.service}
                    onChange={handleChange}
                >
                    <option value="">Select a service...</option>
                    <option value="repair">Device Repair</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="installation">Installation</option>
                    {/* Add more options as needed, or dynamically load */}
                    {servicePreselected && !['repair', 'maintenance', 'installation'].includes(servicePreselected) && (
                        <option value={servicePreselected}>{servicePreselected}</option>
                    )}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input
                    id="date"
                    type="date"
                    label="Preferred Date"
                    icon={Calendar}
                    value={formData.date}
                    onChange={handleChange}
                />
                <Input
                    id="time"
                    type="time"
                    label="Preferred Time"
                    icon={Clock}
                    value={formData.time}
                    onChange={handleChange}
                />
            </div>

            <Input
                id="address"
                label="Service Address"
                placeholder="Enter your full address"
                icon={MapPin}
                value={formData.address}
                onChange={handleChange}
            />

            <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea
                    id="notes"
                    rows={3}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--primary)"
                    placeholder="Describe the issue..."
                    value={formData.notes}
                    onChange={handleChange}
                />
            </div>

            <Button type="submit" className="w-full">
                Book Appointment
            </Button>
        </form>
    );
}
