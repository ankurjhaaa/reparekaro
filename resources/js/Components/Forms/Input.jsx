import React from 'react';

export default function Input({ label, error, className, id, icon: Icon, ...props }) {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Icon size={16} />
                    </div>
                )}
                <input
                    id={id}
                    className={`w-full rounded-md border border-gray-300 ${Icon ? 'pl-9' : 'px-3'} pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent ${error ? 'border-red-500' : ''
                        } ${className || ''}`}
                    {...props}
                />
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}
