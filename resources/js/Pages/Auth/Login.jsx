import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Lock, ArrowRight, Loader2, Mail } from 'lucide-react';
import Button from '../../Components/Forms/Button';
import Input from '../../Components/Forms/Input';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        // post('/login');
        console.log('Login attempt with', data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Log in" />

            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <div className="bg-[var(--primary)] text-white p-1.5 rounded-lg">
                            <Lock className="h-5 w-5" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">RepairKaro</span>
                    </Link>
                    <h2 className="text-3xl font-extrabold text-gray-900">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-500">Sign in to your account to continue</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <form onSubmit={submit} className="space-y-6">
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
                            placeholder="••••••••"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={errors.password}
                        />

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="rounded border-gray-300 text-[var(--primary)] shadow-sm focus:ring-[var(--primary)]"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-medium text-[var(--primary)] hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full flex items-center justify-center gap-2"
                            disabled={processing}
                        >
                            {processing ? <Loader2 className="animate-spin" size={18} /> : 'Sign in'}
                            <ArrowRight size={18} />
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">or continue with</span>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5 mr-2" alt="Google" />
                                <span className="text-sm font-medium text-gray-700">Google</span>
                            </button>
                            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
                                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="h-5 w-5 mr-2" alt="Facebook" />
                                <span className="text-sm font-medium text-gray-700">Facebook</span>
                            </button>
                        </div>
                    </div>
                </div>

                <p className="text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link href="/signup" className="font-semibold text-[var(--primary)] hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
