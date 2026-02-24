import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    ChevronLeft, Calendar, Clock, MapPin, User, Phone,
    MessageSquare, CreditCard, Shield, CheckCircle2,
    KeyRound, Wrench, ChevronRight, Navigation,
    Map, ExternalLink, AlertCircle, Plus, Package, X
} from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function JobDetails({ job }) {
    // Form for Job Completion (OTP)
    const { data: completionData, setData: setCompletionData, post: postCompletion, processing: completionProcessing, errors: completionErrors } = useForm({
        otp: ''
    });

    // Form for adding Requirements (Materials)
    const { data: materialData, setData: setMaterialData, post: postMaterial, processing: materialProcessing, errors: materialErrors, reset: resetMaterial } = useForm({
        name: '',
        qty: 1,
        price: ''
    });

    const [showMaterialForm, setShowMaterialForm] = useState(false);

    const services = job.service_ids ? JSON.parse(job.service_ids) : [];
    const mainService = services.length > 0 ? (services[0].title || services[0].name) : 'Service Task';

    const requirements = job.requirements || [];

    // Calculate Totals
    const serviceTotal = parseFloat(job.total_amount) || 0;
    const requirementsTotal = requirements.reduce((sum, item) => sum + parseFloat(item.total_price), 0);
    const grandTotal = serviceTotal + requirementsTotal;

    const statusColors = {
        assigned: 'bg-indigo-50 text-indigo-700 border-indigo-100',
        in_progress: 'bg-sky-50 text-sky-700 border-sky-100',
        completed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
        cancelled: 'bg-rose-50 text-rose-700 border-rose-100',
    };

    const statusLabel = job.status.charAt(0).toUpperCase() + job.status.slice(1).replace('_', ' ');

    const handleCompletionSubmit = (e) => {
        e.preventDefault();
        postCompletion(`/technician/job/${job.id}/complete`);
    };

    const handleMaterialSubmit = (e) => {
        e.preventDefault();
        postMaterial(`/technician/job/${job.id}/requirement`, {
            onSuccess: () => {
                resetMaterial();
                setShowMaterialForm(false);
            }
        });
    };

    const openGoogleMaps = () => {
        const query = encodeURIComponent(`${job.address}, ${job.city}`);
        window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    };

    return (
        <TechnicianLayout>
            <Head title={`Job #${job.booking_id}`} />

            <div className="bg-gray-50 min-h-screen pt-4 pb-24 px-4 max-w-xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                    <Link href="/technician/jobs" className="w-8 h-8 flex items-center justify-center bg-white rounded-lg border border-gray-100 text-gray-600 hover:text-gray-900 shadow-sm">
                        <ChevronLeft size={18} strokeWidth={2.5} />
                    </Link>
                    <h1 className="text-base font-black text-gray-900 tracking-tight">Job Assignment</h1>
                </div>

                {/* Status & ID Bar */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-4">
                    <div className="p-4 flex justify-between items-center bg-gray-900 text-white">
                        <div className="min-w-0" title={mainService}>
                            <h2 className="text-sm font-black tracking-tight truncate leading-none mb-1">{mainService}</h2>
                            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Job ID: {job.booking_id}</p>
                        </div>
                        <div className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${statusColors[job.status] || 'bg-gray-100 text-gray-700'}`}>
                            {statusLabel}
                        </div>
                    </div>

                    <div className="p-4 space-y-4">
                        {/* Customer Info Card */}
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 rounded-lg bg-gray-200 overflow-hidden shrink-0 border border-white">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${job.user.name}&background=random`}
                                    className="w-full h-full object-cover"
                                    alt=""
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xs font-black text-gray-900 truncate tracking-tight">{job.user.name}</h3>
                                <p className="text-[10px] font-bold text-gray-400">CUSTOMER</p>
                            </div>
                            <div className="flex gap-1.5">
                                <a href={`tel:${job.user.phone}`} className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center transition-all hover:bg-emerald-100">
                                    <Phone size={14} />
                                </a>
                                <Link href={`/technician/chat/${job.booking_id}`} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center transition-all hover:bg-blue-100">
                                    <MessageSquare size={14} />
                                </Link>
                            </div>
                        </div>

                        {/* Location Details */}
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border border-gray-100 shrink-0">
                                    <MapPin size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Physical Address</p>
                                    <p className="text-xs font-bold text-gray-700 leading-snug">
                                        {job.address}, {job.city} {job.landmark && <span className="text-gray-400 italic">({job.landmark})</span>}
                                    </p>
                                </div>
                                <button
                                    onClick={openGoogleMaps}
                                    className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-(--primary) bg-blue-50 px-2 py-1.5 rounded-md self-center"
                                >
                                    <Navigation size={10} /> Maps
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <Calendar size={10} className="text-(--primary)" />
                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Scheduled</span>
                                    </div>
                                    <p className="text-xs font-black text-gray-900">{job.date || 'TBD'}</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <Clock size={10} className="text-indigo-500" />
                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Time Slot</span>
                                    </div>
                                    <p className="text-xs font-black text-gray-900">{job.time || 'TBD'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Breakdown (Services) */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-4">
                    <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Service Charges</span>
                        <Wrench size={12} className="text-gray-400" />
                    </div>
                    <div className="p-1">
                        {services.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center px-4 py-3 group hover:bg-gray-50/50 rounded-lg transition-colors">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-(--primary)"></div>
                                    <span className="text-xs font-bold text-gray-700 truncate">{item.title || item.name}</span>
                                </div>
                                <span className="text-xs font-black text-gray-900">₹{item.price}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Added Requirements (Materials/Parts) */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-4">
                    <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Materials / Parts Used</span>
                        {['assigned', 'in_progress'].includes(job.status) && (
                            <button
                                onClick={() => setShowMaterialForm(!showMaterialForm)}
                                className="w-6 h-6 flex items-center justify-center bg-(--primary) text-white rounded-md hover:scale-110 transition-transform shadow-sm"
                            >
                                {showMaterialForm ? <X size={14} /> : <Plus size={14} />}
                            </button>
                        )}
                    </div>
                    <div className="p-1">
                        {requirements.length > 0 ? (
                            requirements.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center px-4 py-3 group hover:bg-gray-50/50 rounded-lg transition-colors">
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <Package size={12} className="text-orange-500" />
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-gray-700 truncate">{item.name}</p>
                                            <p className="text-[9px] font-bold text-gray-400">Qty: {item.qty} × ₹{item.price}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-gray-900">₹{parseFloat(item.total_price).toFixed(0)}</span>
                                </div>
                            ))
                        ) : (
                            !showMaterialForm && (
                                <div className="px-4 py-6 text-center">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">No materials recorded yet</p>
                                </div>
                            )
                        )}

                        {/* Add Material Form */}
                        {showMaterialForm && (
                            <div className="p-4 bg-gray-50 border-t border-gray-100">
                                <form onSubmit={handleMaterialSubmit} className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="col-span-2">
                                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Material Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={materialData.name}
                                                onChange={e => setMaterialData('name', e.target.value)}
                                                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-(--primary)/20"
                                                placeholder="e.g. Copper Pipe, Capacitor"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Qty</label>
                                            <input
                                                type="number"
                                                required
                                                min="1"
                                                value={materialData.qty}
                                                onChange={e => setMaterialData('qty', e.target.value)}
                                                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-(--primary)/20"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Unit Price</label>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                value={materialData.price}
                                                onChange={e => setMaterialData('price', e.target.value)}
                                                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-(--primary)/20"
                                                placeholder="₹"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={materialProcessing}
                                        className="w-full py-2 bg-gray-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md transition-all active:scale-95"
                                    >
                                        {materialProcessing ? 'Saving...' : 'Add Material'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>

                {/* Grand Total Bar */}
                <div className="bg-gray-900 rounded-xl p-4 shadow-lg mb-6 flex justify-between items-center border border-gray-800">
                    <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Grand Total Payable</p>
                        <div className="flex items-baseline gap-1.5 font-black text-white">
                            <span className="text-xl tracking-tighter">₹{grandTotal.toFixed(0)}</span>
                            {requirementsTotal > 0 && (
                                <span className="text-[10px] text-gray-400">(Includes ₹{requirementsTotal.toFixed(0)} materials)</span>
                            )}
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                        <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                            <Shield size={10} /> Secure Job
                        </div>
                    </div>
                </div>

                {/* Job Action / Completion - OTP Logic */}
                {['assigned', 'in_progress'].includes(job.status) && (
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 overflow-hidden relative">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-9 h-9 bg-blue-50 text-(--primary) rounded-lg flex items-center justify-center border border-blue-100">
                                <CheckCircle2 size={18} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h4 className="text-xs font-black text-gray-900 uppercase tracking-tighter">Complete this Job</h4>
                                <p className="text-[10px] font-bold text-gray-400">Customer must provide their 4-digit code</p>
                            </div>
                        </div>

                        <form onSubmit={handleCompletionSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Verification OTP</label>
                                <input
                                    type="text"
                                    maxLength="4"
                                    value={completionData.otp}
                                    onChange={e => setCompletionData('otp', e.target.value)}
                                    placeholder="Enter 4-digit OTP"
                                    className="w-full bg-gray-50 border-0 rounded-lg text-lg font-black tracking-[0.5em] text-center focus:ring-2 focus:ring-(--primary)/20 h-12"
                                />
                                {completionErrors.otp && (
                                    <div className="flex items-center gap-1 text-[9px] font-bold text-rose-500 uppercase px-1 mt-1">
                                        <AlertCircle size={10} /> {completionErrors.otp}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={completionProcessing || completionData.otp.length !== 4}
                                className="w-full py-3.5 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-gray-200 disabled:opacity-50 transition-all active:scale-[0.98]"
                            >
                                {completionProcessing ? 'Verifying...' : 'Finalize & Complete Job'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Completed State */}
                {job.status === 'completed' && (
                    <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 text-center">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-500 mx-auto mb-3 shadow-sm border border-emerald-100">
                            <CheckCircle2 size={24} strokeWidth={3} />
                        </div>
                        <h3 className="text-sm font-black text-emerald-900 uppercase tracking-widest mb-1">Job Completed</h3>
                        <p className="text-[10px] font-bold text-emerald-600/70 italic">Payment processed and credited to your wallet.</p>
                        <Link href="/technician/jobs" className="mt-5 inline-block text-[9px] font-black text-gray-500 uppercase tracking-widest border-b border-gray-300 pb-0.5">
                            Return to my jobs
                        </Link>
                    </div>
                )}
            </div>
        </TechnicianLayout>
    );
}
