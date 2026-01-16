"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";

export default function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
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

    const { id } = use(params);

    useEffect(() => {
        fetchTestimonial();
    }, [id]);

    const fetchTestimonial = async () => {
        try {
            const docRef = doc(db, "testimonials", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setFormData({
                    name: data.name || "",
                    company: data.company || "",
                    content: data.content || "",
                    rating: data.rating || 5,
                    videoUrl: data.videoUrl || "",
                    type: data.type || "text",
                    isActive: data.isActive ?? true,
                });
            } else {
                alert("Testimonial not found");
                router.push("/admin/testimonials");
            }
        } catch (error) {
            console.error("Error fetching testimonial:", error);
            alert("Failed to load testimonial data");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const docRef = doc(db, "testimonials", id);
            await updateDoc(docRef, {
                ...formData,
                updatedAt: new Date().toISOString(),
            });
            router.push("/admin/testimonials");
        } catch (error) {
            console.error("Error updating testimonial:", error);
            alert("Failed to update testimonial.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#E8DED1] flex items-center justify-center">
            <div className="text-center py-20 text-[#3D2925] text-lg font-medium">Loading...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#E8DED1] py-12 px-4">
            <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
                <header className="mb-10">
                    <Link 
                        href="/admin/testimonials" 
                        className="text-[#003DA5] hover:text-[#3D2925] font-bold mb-4 inline-flex items-center gap-2 transition-colors group"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> 
                        Back to Testimonials
                    </Link>
                    <div className="flex items-center justify-between mt-6">
                        <div>
                            <h1 className="text-5xl font-extrabold text-[#3D2925]">Edit Testimonial</h1>
                            <p className="text-[#3D2925]/70 mt-2 text-lg font-medium">Update review from {formData.name}</p>
                        </div>
                        <div className="text-white bg-[#003DA5] w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-3xl shadow-lg">
                            {formData.rating}
                        </div>
                    </div>
                </header>

                <form onSubmit={handleUpdate} className="space-y-8 bg-white p-10 rounded-3xl shadow-[0_20px_60px_rgba(61,41,37,0.12)] border-2 border-[#3D2925]/10">

                    {/* Type Selection */}
                    <div className="flex gap-4 p-2 bg-[#E8DED1] rounded-xl">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, type: "text" })}
                            className={`flex-1 py-4 rounded-lg font-bold transition-all ${
                                formData.type === "text"
                                    ? "bg-[#003DA5] text-white shadow-lg scale-105"
                                    : "bg-white text-[#3D2925]/60 hover:text-[#3D2925] hover:shadow-md"
                            }`}
                        >
                            📝 Text Review
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, type: "video" })}
                            className={`flex-1 py-4 rounded-lg font-bold transition-all ${
                                formData.type === "video"
                                    ? "bg-[#003DA5] text-white shadow-lg scale-105"
                                    : "bg-white text-[#3D2925]/60 hover:text-[#3D2925] hover:shadow-md"
                            }`}
                        >
                            🎥 Video Review
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-[#3D2925] uppercase tracking-wider mb-3 ml-1">
                                Client Name *
                            </label>
                            <input
                                type="text"
                                required
                                className="w-full bg-[#E8DED1] rounded-xl border-2 border-[#E8DED1] focus:border-[#003DA5] focus:bg-white focus:outline-none px-5 py-4 text-[#3D2925] font-bold text-lg transition-all shadow-sm"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#3D2925] uppercase tracking-wider mb-3 ml-1">
                                Company / Role
                            </label>
                            <input
                                type="text"
                                className="w-full bg-[#E8DED1] rounded-xl border-2 border-[#E8DED1] focus:border-[#003DA5] focus:bg-white focus:outline-none px-5 py-4 text-[#3D2925] font-semibold text-base transition-all shadow-sm"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-[#3D2925] uppercase tracking-wider mb-3 ml-1">
                            Review Content *
                        </label>
                        <textarea
                            rows={5}
                            required
                            className="w-full bg-[#E8DED1] rounded-xl border-2 border-[#E8DED1] focus:border-[#003DA5] focus:bg-white focus:outline-none px-5 py-4 text-[#3D2925] text-base transition-all resize-none shadow-sm leading-relaxed"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="What did the client say about working with Bloom Branding?"
                        />
                    </div>

                    {formData.type === "video" && (
                        <div className="animate-in fade-in duration-300">
                            <label className="block text-xs font-bold text-[#3D2925] uppercase tracking-wider mb-3 ml-1">
                                Video URL
                            </label>
                            <input
                                type="url"
                                className="w-full bg-[#F4EAA8] rounded-xl border-2 border-[#F4EAA8] focus:border-[#003DA5] focus:bg-white focus:outline-none px-5 py-4 text-[#3D2925] font-medium text-base transition-all shadow-sm"
                                value={formData.videoUrl}
                                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                                placeholder="https://youtube.com/..."
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-[#3D2925] uppercase tracking-wider mb-3 ml-1">
                            Rating (1-5 Stars)
                        </label>
                        <div className="flex gap-4 items-center bg-[#E8DED1] p-6 rounded-xl">
                            <input
                                type="range"
                                min="1"
                                max="5"
                                step="1"
                                className="flex-1 h-3 bg-white rounded-lg appearance-none cursor-pointer accent-[#003DA5] shadow-inner"
                                value={formData.rating}
                                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                            />
                            <div className="bg-[#003DA5] text-white w-14 h-14 rounded-xl flex items-center justify-center font-extrabold text-2xl shadow-lg">
                                {formData.rating}
                            </div>
                        </div>
                        <div className="flex justify-center gap-2 mt-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span 
                                    key={star}
                                    className={`text-3xl transition-all ${
                                        star <= formData.rating ? 'opacity-100 scale-110' : 'opacity-30 scale-90'
                                    }`}
                                >
                                    ⭐
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-[#E8DED1] p-5 rounded-xl transition-all hover:shadow-md">
                        <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            className="w-6 h-6 rounded-lg text-[#003DA5] focus:ring-[#003DA5] focus:ring-offset-0 border-2 border-[#3D2925]/20 cursor-pointer"
                        />
                        <label htmlFor="isActive" className="text-base font-bold text-[#3D2925] cursor-pointer flex-1">
                            Active (Visible on public site)
                        </label>
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                            formData.isActive 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-600'
                        }`}>
                            {formData.isActive ? '✓ Live' : '✕ Hidden'}
                        </span>
                    </div>

                    <div className="pt-6 border-t-2 border-[#E8DED1]">
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-[#003DA5] text-white font-bold text-lg py-5 rounded-full shadow-[0_10px_30px_rgba(0,61,165,0.3)] hover:shadow-[0_15px_40px_rgba(0,61,165,0.4)] hover:bg-[#002880] hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                        >
                            {saving ? "Saving Changes..." : "💾 Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}