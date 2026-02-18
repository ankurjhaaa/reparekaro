import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { User, Lock, ArrowRight, Loader2, Mail } from 'lucide-react';
import Button from '../../Components/Forms/Button';
import Input from '../../Components/Forms/Input';

export default function Signup() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        // post('/signup');
        console.log('Signup attempt with', data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Sign up" />

            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="bg-[var(--primary)] text-white p-1.5 rounded-lg">
                            <User className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">RepairKaro</span>
                    </Link>
                    <h2 className="text-3xl font-extrabold text-gray-900">Create an Account</h2>
                    <p className="mt-2 text-sm text-gray-500">Join thousands of happy homeowners</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <form onSubmit={submit} className="space-y-5">
                        <Input
                            label="Full Name"
                            icon={User}
                            type="text"
                            placeholder="Your full name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                        />

                        <Input
                            label="Email Address"
                            icon={Mail}
                            type="email"
                            placeholder="you@example.com"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={errors.email}
                        />

                        <Input
                            label="Password"
                            icon={Lock}
                            type="password"
                            placeholder="Min 8 characters"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={errors.password}
                        />

                        <Input
                            label="Confirm Password"
                            icon={Lock}
                            type="password"
                            placeholder="Repeat password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            error={errors.password_confirmation}
                        />

                        <div className="flex items-start">
                            <input id="terms" type="checkbox" className="mt-1 rounded border-gray-300 text-[var(--primary)] shadow-sm focus:ring-[var(--primary)]" />
                            <label htmlFor="terms" className="ml-2 text-sm text-gray-500">
                                I agree to the <a href="#" className="font-medium text-[var(--primary)]">Terms of Service</a> and <a href="#" className="font-medium text-[var(--primary)]">Privacy Policy</a>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full flex items-center justify-center gap-2"
                            disabled={processing}
                        >
                            {processing ? <Loader2 className="animate-spin" size={18} /> : 'Create Account'}
                            <ArrowRight size={18} />
                        </Button>
                    </form>
                </div>

                <p className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-[var(--primary)] hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
