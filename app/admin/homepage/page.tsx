"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function HomepageContentPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        heroTitleLine1: "Blooming",
        heroTitleAccent: "Your Brand",
        heroTitleLine3: "Into Greatness",
        heroSubtitle: "Bringing synergy of aesthetics and expertise to help your brand bloom\nwe nurture your vision into a thriving brand that stands out and flourishes.",
        ctaText: "Start Your Journey",
    });

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const docRef = doc(db, "content", "homepage");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setFormData({
                    heroTitleLine1: data.heroTitleLine1 || "Blooming",
                    heroTitleAccent: data.heroTitleAccent || "Your Brand",
                    heroTitleLine3: data.heroTitleLine3 || "Into Greatness",
                    heroSubtitle: data.heroSubtitle || "Bringing synergy of aesthetics and expertise to help your brand bloom\nwe nurture your vision into a thriving brand that stands out and flourishes.",
                    ctaText: data.ctaText || "Start Your Journey",
                });
            }
        } catch (error) {
            console.error("Error fetching homepage content:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            await setDoc(doc(db, "content", "homepage"), {
                ...formData,
                updatedAt: new Date().toISOString(),
            });
            alert("Homepage content updated successfully!");
        } catch (error) {
            console.error("Error saving homepage content:", error);
            alert("Failed to save changes.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-20 text-[#624A41]">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto animate-in align-top fade-in duration-500">
            <header className="mb-10">
                <h1 className="text-4xl font-extrabold text-[#3D2925]">Homepage Content</h1>
                <p className="text-[#624A41] mt-2 text-lg">Manage text and banners for the home page.</p>
            </header>

            <form onSubmit={handleSave} className="space-y-8 bg-white p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#3D2925]/5">
                <section>
                    <h2 className="text-xl font-bold mb-6 text-[#3D2925] flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-[#003DA5]/10 text-[#003DA5] flex items-center justify-center text-sm">1</span>
                        Hero Section
                    </h2>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">Title Line 1</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#FBF7F4] rounded-xl border-transparent focus:border-[#003DA5] focus:bg-white focus:ring-0 px-4 py-3 text-[#3D2925] font-bold transition-all"
                                    value={formData.heroTitleLine1}
                                    onChange={(e) => setFormData({ ...formData, heroTitleLine1: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#892F1A]/80 uppercase tracking-wider mb-2 ml-1">Accent Text</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#892F1A]/5 rounded-xl border-transparent focus:border-[#892F1A] focus:bg-white focus:ring-0 px-4 py-3 text-[#892F1A] font-bold transition-all"
                                    value={formData.heroTitleAccent}
                                    onChange={(e) => setFormData({ ...formData, heroTitleAccent: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">Title Line 3</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#FBF7F4] rounded-xl border-transparent focus:border-[#003DA5] focus:bg-white focus:ring-0 px-4 py-3 text-[#3D2925] font-bold transition-all"
                                    value={formData.heroTitleLine3}
                                    onChange={(e) => setFormData({ ...formData, heroTitleLine3: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">Subtitle / Description</label>
                            <textarea
                                rows={3}
                                className="w-full bg-[#FBF7F4] rounded-xl border-transparent focus:border-[#003DA5] focus:bg-white focus:ring-0 px-4 py-3 text-[#3D2925] transition-all resize-none"
                                value={formData.heroSubtitle}
                                onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                                placeholder="Enter subtitle text..."
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">CTA Button Text</label>
                            <input
                                type="text"
                                className="w-full bg-[#FBF7F4] rounded-xl border-transparent focus:border-[#003DA5] focus:bg-white focus:ring-0 px-4 py-3 text-[#3D2925] font-medium transition-all"
                                value={formData.ctaText}
                                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                            />
                        </div>
                    </div>
                </section>

                <div className="pt-6 border-t border-[#3D2925]/5">
                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full bg-[#892F1A] text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#6b2415] hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                        {saving ? "Saving Changes..." : "Save Content"}
                    </button>
                </div>
            </form>
        </div>
    );
}
