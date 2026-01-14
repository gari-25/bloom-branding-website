"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";

export default function AddTestimonialPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<{
        name: string;
        company: string;
        content: string;
        rating: number;
        videoUrl: string;
        type: "text" | "video";
        isActive: boolean;
    }>({
        name: "",
        company: "",
        content: "",
        rating: 5,
        videoUrl: "",
        type: "text",
        isActive: true,
    });

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addDoc(collection(db, "testimonials"), {
                ...formData,
                createdAt: new Date().toISOString(),
            });
            router.push("/admin/testimonials");
        } catch (error) {
            console.error("Error creating testimonial:", error);
            alert("Failed to create testimonial.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto animate-in align-top fade-in duration-500">
            <header className="mb-10">
                <Link href="/admin/testimonials" className="text-[#003DA5] hover:text-[#892F1A] font-medium mb-4 inline-flex items-center gap-2 transition-colors">
                    ← Back to Testimonials
                </Link>
                <h1 className="text-4xl font-extrabold text-[#3D2925]">Add Testimonial</h1>
                <p className="text-[#624A41] mt-2 text-lg">Add a new client review or video.</p>
            </header>

            <form onSubmit={handleCreate} className="space-y-8 bg-white p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#3D2925]/5">

                {/* Type Selection */}
                <div className="flex gap-4 p-2 bg-[#FBF7F4] rounded-xl">
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: "text" })}
                        className={`flex-1 py-3 rounded-lg font-bold transition-all ${formData.type === "text"
                                ? "bg-white text-[#003DA5] shadow-sm"
                                : "text-[#3D2925]/50 hover:text-[#3D2925]"
                            }`}
                    >
                        📝 Text Review
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: "video" })}
                        className={`flex-1 py-3 rounded-lg font-bold transition-all ${formData.type === "video"
                                ? "bg-white text-[#892F1A] shadow-sm"
                                : "text-[#3D2925]/50 hover:text-[#3D2925]"
                            }`}
                    >
                        🎥 Video Review
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">Client Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-[#FBF7F4] rounded-xl border-transparent focus:border-[#003DA5] focus:bg-white focus:ring-0 px-4 py-3 text-[#3D2925] font-bold transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">Company / Role</label>
                        <input
                            type="text"
                            className="w-full bg-[#FBF7F4] rounded-xl border-transparent focus:border-[#003DA5] focus:bg-white focus:ring-0 px-4 py-3 text-[#3D2925] font-medium transition-all"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">Review Content</label>
                    <textarea
                        rows={4}
                        required
                        className="w-full bg-[#FBF7F4] rounded-xl border-transparent focus:border-[#003DA5] focus:bg-white focus:ring-0 px-4 py-3 text-[#3D2925] transition-all resize-none"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="What did the client say?"
                    />
                </div>

                {formData.type === "video" && (
                    <div className="animate-in fade-in duration-300">
                        <label className="block text-xs font-bold text-[#892F1A]/80 uppercase tracking-wider mb-2 ml-1">Video URL</label>
                        <input
                            type="url"
                            className="w-full bg-[#892F1A]/5 rounded-xl border-transparent focus:border-[#892F1A] focus:bg-white focus:ring-0 px-4 py-3 text-[#892F1A] font-medium transition-all"
                            value={formData.videoUrl}
                            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                            placeholder="https://vimeo.com/..."
                        />
                    </div>
                )}

                <div>
                    <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">Rating (1-5)</label>
                    <div className="flex gap-4 items-center">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="w-full h-2 bg-[#FBF7F4] rounded-lg appearance-none cursor-pointer accent-[#003DA5]"
                            value={formData.rating}
                            onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                        />
                        <span className="text-2xl font-bold text-[#003DA5] w-8 text-center">{formData.rating}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-[#FBF7F4] p-4 rounded-xl">
                    <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="w-5 h-5 rounded text-[#003DA5] focus:ring-[#003DA5] border-gray-300"
                    />
                    <label htmlFor="isActive" className="text-sm font-bold text-[#3D2925]">Active (Visible on public site)</label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#892F1A] text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#6b2415] hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                >
                    {loading ? "Creating..." : "Create Testimonial"}
                </button>
            </form>
        </div>
    );
}
