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

    if (loading) return <div className="text-center py-20 text-[#624A41]">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto animate-in align-top fade-in duration-500">
            <header className="mb-10">
                <Link href="/admin/testimonials" className="text-[#003DA5] hover:text-[#892F1A] font-medium mb-4 inline-flex items-center gap-2 transition-colors">
                    ← Back to Testimonials
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold text-[#3D2925]">Edit Testimonial</h1>
                        <p className="text-[#624A41] mt-2 text-lg">Update review from {formData.name}</p>
                    </div>
                    <div className="text-white bg-[#003DA5] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                        {formData.rating}
                    </div>
                </div>
            </header>

            <form onSubmit={handleUpdate} className="space-y-8 bg-white p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#3D2925]/5">

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
                        />
                    </div>
                )}

                <div>
                    <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">Rating</label>
                    <div className="flex gap-2 items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setFormData({ ...formData, rating: star })}
                                className={`text-4xl transition-all hover:scale-110 focus:outline-none ${star <= formData.rating ? "grayscale-0" : "grayscale opacity-20"
                                    }`}
                            >
                                ⭐
                            </button>
                        ))}
                        <span className="ml-3 text-lg font-bold text-[#003DA5] bg-[#003DA5]/5 px-3 py-1 rounded-lg">
                            {formData.rating}.0
                        </span>
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
                    disabled={saving}
                    className="w-full bg-[#892F1A] text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#6b2415] hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
}
