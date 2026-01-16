"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

interface Testimonial {
    id: string;
    name: string;
    company: string;
    content: string;
    rating: number;
    videoUrl?: string;
    type: "text" | "video";
    isActive: boolean;
}

export default function TestimonialsListPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "testimonials"));
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Testimonial[];
            setTestimonials(data);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
            alert("Failed to load testimonials.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            await deleteDoc(doc(db, "testimonials", id));
            setTestimonials(testimonials.filter(t => t.id !== id));
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            alert("Failed to delete testimonial.");
        }
    };

    return (
        <div className="animate-in fade-in duration-500">
            <header className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-[#3D2925]">Testimonials</h1>
                    <p className="text-[#624A41] mt-2 text-lg">Curate client success stories.</p>
                </div>
                <Link
                    href="/admin/testimonials/add"
                    className="bg-[#003DA5] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-[#002d7a] hover:-translate-y-1 transition-all flex items-center gap-2"
                >
                    <span className="text-xl">+</span> Add Testimonial
                </Link>
            </header>

            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin text-4xl mb-4">🌸</div>
                    <p className="text-[#624A41]">Loading testimonials...</p>
                </div>
            ) : testimonials.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-[#3D2925]/5">
                    <p className="text-[#624A41] mb-6 text-xl">No testimonials found.</p>
                    <Link
                        href="/admin/testimonials/add"
                        className="text-[#003DA5] font-bold underline hover:text-[#892F1A] transition-colors"
                    >
                        Create your first testimonial
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-white rounded-2xl p-8 flex flex-col relative overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_30px_rgba(33,26,16,0.08)] transition-all duration-300 group ring-1 ring-[#3D2925]/5 hover:-translate-y-1">
                            {!t.isActive && (
                                <div className="absolute top-4 right-4 bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    Inactive
                                </div>
                            )}

                            <div className="flex items-center justify-between mb-6">
                                <span className={`text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider ${t.type === 'video' ? 'bg-purple-100 text-purple-700' : 'bg-blue-50 text-[#003DA5]'}`}>
                                    {t.type}
                                </span>
                                <div className="text-yellow-400 text-sm tracking-widest">
                                    {"⭐".repeat(t.rating)}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-bold text-xl text-[#3D2925] mb-1">{t.name}</h3>
                                <p className="text-[#624A41] text-sm font-medium">{t.company}</p>
                            </div>

                            <div className="flex-1 mb-8 relative">
                                <span className="absolute -top-4 -left-2 text-6xl text-[#3D2925]/5 font-serif">“</span>
                                <p className="text-[#3D2925]/80 text-sm leading-relaxed italic relative z-10 pl-2">
                                    {t.content}
                                </p>
                                {t.type === 'video' && t.videoUrl && (
                                    <a href={t.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-[#003DA5] hover:text-[#892F1A] mt-4 transition-colors">
                                        ▶ Watch Video Review
                                    </a>
                                )}
                            </div>

                            <div className="flex gap-4 opacity-70 group-hover:opacity-100 transition-opacity mt-auto">
                                <Link
                                    href={`/admin/testimonials/${t.id}`}
                                    className="flex-1 bg-white border-2 border-[#3D2925]/10 text-[#3D2925] text-center py-2.5 rounded-xl font-bold hover:border-[#3D2925] hover:bg-[#3D2925] hover:text-white transition-all"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="px-4 text-red-400 hover:text-red-600 font-medium transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
