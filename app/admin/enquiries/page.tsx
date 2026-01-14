"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

interface Enquiry {
    id: string;
    name: string;
    email: string;
    phone: string;
    projectDetails: string;
    budget: string;
    startDate: string;
    createdAt: any; // Timestamp
}

export default function EnquiriesPage() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const fetchedEnquiries: Enquiry[] = [];
            querySnapshot.forEach((doc) => {
                fetchedEnquiries.push({ id: doc.id, ...doc.data() } as Enquiry);
            });
            setEnquiries(fetchedEnquiries);
        } catch (error) {
            console.error("Error fetching enquiries:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-20 text-[#624A41]">Loading enquiries...</div>;

    return (
        <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
            <header className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-extrabold text-[#3D2925]">Enquiries</h1>
                    <p className="text-[#624A41] mt-2 text-lg">Inbox for potential client projects.</p>
                </div>
                <button
                    onClick={fetchEnquiries}
                    className="text-sm font-bold bg-white border border-[#3D2925]/10 hover:bg-[#FBF7F4] hover:text-[#003DA5] px-5 py-2.5 rounded-full transition-all shadow-sm"
                >
                    ↻ Refresh List
                </button>
            </header>

            {enquiries.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-[#3D2925]/5">
                    <p className="text-[#624A41] text-xl">No enquiries found yet.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {enquiries.map((enquiry) => (
                        <div key={enquiry.id} className="bg-white p-8 rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgba(33,26,16,0.06)] border border-[#3D2925]/5 transition-all duration-300 relative group">

                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#003DA5]/10 text-[#003DA5] rounded-full flex items-center justify-center font-bold text-xl">
                                        {enquiry.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#3D2925]">{enquiry.name}</h3>
                                        <div className="text-[#624A41] text-sm mt-0.5 flex gap-4">
                                            <a href={`mailto:${enquiry.email}`} className="hover:text-[#003DA5] transition-colors">{enquiry.email}</a>
                                            <span className="text-[#3D2925]/20">•</span>
                                            <a href={`tel:${enquiry.phone}`} className="hover:text-[#003DA5] transition-colors">{enquiry.phone}</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right text-xs font-medium text-[#3D2925]/40 bg-[#FBF7F4] px-3 py-1.5 rounded-lg">
                                    {enquiry.createdAt?.seconds ? new Date(enquiry.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                                    <span className="mx-1 opacity-50">at</span>
                                    {enquiry.createdAt?.seconds ? new Date(enquiry.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                </div>
                            </div>

                            <div className="space-y-4 pl-16">
                                <div className="bg-[#FBF7F4] p-5 rounded-xl border border-[#3D2925]/5 relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#892F1A] rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <p className="text-xs font-bold text-[#3D2925]/50 uppercase tracking-wider mb-2">Project Details</p>
                                    <p className="text-[#3D2925] whitespace-pre-wrap leading-relaxed">{enquiry.projectDetails}</p>
                                </div>

                                <div className="flex flex-wrap gap-3 text-sm">
                                    {enquiry.budget && (
                                        <div className="px-4 py-2 bg-white border border-[#3D2925]/10 rounded-full text-[#624A41]">
                                            Budget: <span className="text-[#003DA5] font-bold">{enquiry.budget}</span>
                                        </div>
                                    )}
                                    {enquiry.startDate && (
                                        <div className="px-4 py-2 bg-white border border-[#3D2925]/10 rounded-full text-[#624A41]">
                                            Start Date: <span className="text-[#892F1A] font-bold">{enquiry.startDate}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
