import React from 'react';
import SuperAdminLayout from '../../Layouts/SuperAdminLayout';
import { Head } from '@inertiajs/react';
import Card from '../../Components/Cards/Card';
import Button from '../../Components/Forms/Button';
import { Check } from 'lucide-react';

export default function Plans() {
    const plans = [
        {
            name: 'Basic',
            price: '$29',
            period: '/month',
            features: ['Up to 5 Technicians', '50 Bookings/month', 'Basic Reports', 'Email Support'],
            recommended: false
        },
        {
            name: 'Professional',
            price: '$79',
            period: '/month',
            features: ['Up to 15 Technicians', 'Unlimited Bookings', 'Advanced Reports', 'Priority Support', 'Custom Branding'],
            recommended: true
        },
        {
            name: 'Enterprise',
            price: '$199',
            period: '/month',
            features: ['Unlimited Technicians', 'Unlimited Bookings', 'API Access', 'Dedicated Account Manager', 'White Labeling'],
            recommended: false
        }
    ];

    return (
        <SuperAdminLayout>
            <Head title="Subscription Plans" />

            <div className="text-center mb-10 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900">Subscription Plans</h1>
                <p className="text-gray-500 mt-2">Manage pricing tiers for vendors</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan) => (
                    <Card key={plan.name} className={`relative flex flex-col ${plan.recommended ? 'border-2 border-[var(--primary)] ring-4 ring-[var(--primary)]/10' : ''}`}>
                        {plan.recommended && (
                            <div className="absolute top-0 right-0 -mr-1 -mt-1 bg-[var(--primary)] text-white text-xs font-bold px-2 py-1 rounded-bl-lg uppercase shadow-sm">
                                Recommended
                            </div>
                        )}
                        <div className="p-6 flex-1 text-center">
                            <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                            <div className="mt-4 flex items-baseline justify-center">
                                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                                <span className="text-gray-500 ml-1">{plan.period}</span>
                            </div>
                            <ul className="mt-6 space-y-4 text-left">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                                        <span className="ml-3 text-sm text-gray-500">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-b-lg">
                            <Button variant={plan.recommended ? 'primary' : 'outline'} className="w-full">
                                Edit Plan
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </SuperAdminLayout>
    );
}
