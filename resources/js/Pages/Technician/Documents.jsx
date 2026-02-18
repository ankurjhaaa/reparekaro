import React, { useState } from 'react';
import TechnicianLayout from '../../Layouts/TechnicianLayout';
import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, FileText, CheckCircle, Upload, AlertCircle } from 'lucide-react';
import Button from '../../Components/Forms/Button';

export default function Documents() {
    const [documents, setDocuments] = useState([
        { id: 'aadhar', name: 'Aadhar Card', status: 'Approved', file: 'aadhar.pdf' },
        { id: 'pan', name: 'PAN Card', status: 'Pending', file: null },
        { id: 'dl', name: 'Driving License', status: 'Required', file: null },
        { id: 'selfie', name: 'Selfie Verification', status: 'Required', file: null },
    ]);

    const handleUpload = (id) => {
        // Mock upload
        setDocuments(documents.map(d => d.id === id ? { ...d, status: 'Reviewing', file: 'file.pdf' } : d));
    };

    return (
        <TechnicianLayout>
            <Head title="Documents" />

            <div className="pb-24 md:pb-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <Link href="/technician/profile" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
                        <ChevronLeft size={20} className="text-gray-600" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Partner Verification</h1>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6 flex gap-3">
                    <AlertCircle className="text-yellow-600 shrink-0 mt-0.5" size={20} />
                    <p className="text-sm text-yellow-800">
                        Please upload clear photos or PDFs. Your verification status will be updated within 24 hours.
                    </p>
                </div>

                <div className="space-y-4">
                    {documents.map((doc) => (
                        <div key={doc.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div className="flex gap-4 items-center">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${doc.status === 'Approved' ? 'bg-green-50 text-green-600' :
                                        doc.status === 'Reviewing' ? 'bg-blue-50 text-blue-600' :
                                            'bg-gray-100 text-gray-400'
                                    }`}>
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">{doc.name}</h3>
                                    <p className={`text-xs font-semibold mt-0.5 ${doc.status === 'Approved' ? 'text-green-600' :
                                            doc.status === 'Reviewing' ? 'text-blue-600' :
                                                doc.status === 'Pending' ? 'text-orange-500' :
                                                    'text-red-500'
                                        }`}>
                                        {doc.status}
                                    </p>
                                </div>
                            </div>

                            {doc.status === 'Approved' ? (
                                <span className="bg-green-100 text-green-700 p-2 rounded-full">
                                    <CheckCircle size={16} />
                                </span>
                            ) : (
                                <button
                                    onClick={() => handleUpload(doc.id)}
                                    className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-100 flex items-center gap-2 transition-colors border border-gray-200"
                                >
                                    <Upload size={14} /> Upload
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Button variant="outline" className="w-full text-gray-600 border-dashed border-gray-300">
                        Contact Support for Help
                    </Button>
                </div>
            </div>
        </TechnicianLayout>
    );
}
