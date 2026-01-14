"use client";

import { useEffect, useState } from "react";
import { db, storage } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AboutContentPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        founderName: "Sarah Chen",
        founderRole: "Creative Director & Founder",
        bioParagraph1: "\"I've always believed that branding is more than aesthetics—it's about capturing the essence of a dream and giving it wings to fly.\"",
        bioParagraph2: "With over 15 years in the creative industry, I've had the privilege of working with startups finding their voice and established brands rediscovering their purpose.",
        bioParagraph3: "At Bloom Branding, we've created a space where creativity flourishes, where ideas are nurtured, and where every project is an opportunity to make something beautiful and meaningful.",
        imageUrl: "",
        statExperience: "15+",
        statBrands: "200+",
        statAwards: "50+",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const docRef = doc(db, "content", "about");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setFormData({
                    founderName: data.founderName || "Sarah Chen",
                    founderRole: data.founderRole || "Creative Director & Founder",
                    bioParagraph1: data.bioParagraph1 || "",
                    bioParagraph2: data.bioParagraph2 || "",
                    bioParagraph3: data.bioParagraph3 || "",
                    imageUrl: data.imageUrl || "",
                    statExperience: data.statExperience || "15+",
                    statBrands: data.statBrands || "200+",
                    statAwards: data.statAwards || "50+",
                });
            }
        } catch (error) {
            console.error("Error fetching about content:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDisplayImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            let imageUrl = formData.imageUrl;

            if (imageFile) {
                const storageRef = ref(storage, `founder/${Date.now()}-${imageFile.name}`);
                const snapshot = await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            await setDoc(doc(db, "content", "about"), {
                ...formData,
                imageUrl,
                updatedAt: new Date().toISOString(),
            });
            setFormData(prev => ({ ...prev, imageUrl }));
            setImageFile(null); // Reset file input
            alert("About page content updated successfully!");
        } catch (error) {
            console.error("Error saving about content:", error);
            alert("Failed to save changes.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-20 text-[#624A41]">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto animate-in align-top fade-in duration-500">
            <header className="mb-10">
                <h1 className="text-4xl font-extrabold text-[#3D2925]">Founder Story</h1>
                <p className="text-[#624A41] mt-2 text-lg">Manage detailed bio, image, and stats.</p>
            </header>

            <form onSubmit={handleSave} className="space-y-8 bg-white p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#3D2925]/5">
                {/* Founder Info */}
                <section className="space-y-6">
                    <h2 className="text-xl font-bold text-[#3D2925] flex items-center gap-2 border-b border-[#3D2925]/5 pb-4">
                        <span className="w-8 h-8 rounded-full bg-[#003DA5]/10 text-[#003DA5] flex items-center justify-center text-sm">1</span>
                        Founder Profile
                    </h2>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">Name</label>
                            <input
                                type="text"
                                className="w-full bg-[#FBF7F4] rounded-xl border-transparent focus:border-[#003DA5] focus:bg-white focus:ring-0 px-4 py-3 text-[#3D2925] font-medium transition-all"
                                value={formData.founderName}
                                onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">Role</label>
                            <input
                                type="text"
                                className="w-full bg-[#FBF7F4] rounded-xl border-transparent focus:border-[#003DA5] focus:bg-white focus:ring-0 px-4 py-3 text-[#3D2925] font-medium transition-all"
                                value={formData.founderRole}
                                onChange={(e) => setFormData({ ...formData, founderRole: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Founder Image */}
                    <div className="bg-[#FBF7F4] p-6 rounded-2xl border border-[#3D2925]/5">
                        <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-4">Founder Image</label>
                        <div className="flex items-center gap-6">
                            {formData.imageUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={formData.imageUrl} alt="Founder" className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md" />
                            ) : (
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#3D2925]/20 font-bold border-2 border-dashed border-[#3D2925]/10">No Img</div>
                            )}
                            <div className="flex-1">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleDisplayImage}
                                    className="block w-full text-sm text-[#624A41] file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#003DA5] file:text-white hover:file:bg-[#002d7a] transition-all cursor-pointer"
                                />
                                <p className="text-xs text-[#3D2925]/40 mt-2 font-medium">JPG, PNG or GIF. Max 5MB.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">Bio Paragraph 1 (Quote Style)</label>
                            <textarea
                                rows={3}
                                className="w-full bg-[#FBF7F4] rounded-xl border-transparent focus:border-[#003DA5] focus:bg-white focus:ring-0 px-4 py-3 text-[#3D2925] italic font-serif text-lg leading-relaxed transition-all"
                                value={formData.bioParagraph1}
                                onChange={(e) => setFormData({ ...formData, bioParagraph1: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">Bio Paragraph 2</label>
                            <textarea
                                rows={4}
                                className="w-full bg-[#FBF7F4] rounded-xl border-transparent focus:border-[#003DA5] focus:bg-white focus:ring-0 px-4 py-3 text-[#3D2925] transition-all"
                                value={formData.bioParagraph2}
                                onChange={(e) => setFormData({ ...formData, bioParagraph2: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">Bio Paragraph 3</label>
                            <textarea
                                rows={4}
                                className="w-full bg-[#FBF7F4] rounded-xl border-transparent focus:border-[#003DA5] focus:bg-white focus:ring-0 px-4 py-3 text-[#3D2925] transition-all"
                                value={formData.bioParagraph3}
                                onChange={(e) => setFormData({ ...formData, bioParagraph3: e.target.value })}
                            />
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="space-y-6 pt-6 border-t border-[#3D2925]/5">
                    <h2 className="text-xl font-bold text-[#3D2925] flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-[#003DA5]/10 text-[#003DA5] flex items-center justify-center text-sm">2</span>
                        Key Statistics
                    </h2>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-[#FBF7F4] p-4 rounded-xl text-center">
                            <label className="block text-xs font-bold text-[#3D2925]/50 uppercase tracking-wider mb-2">Years Exp.</label>
                            <input
                                type="text"
                                className="w-full bg-transparent text-center text-2xl font-black text-[#892F1A] focus:outline-none placeholder-[#892F1A]/20"
                                value={formData.statExperience}
                                onChange={(e) => setFormData({ ...formData, statExperience: e.target.value })}
                            />
                        </div>
                        <div className="bg-[#FBF7F4] p-4 rounded-xl text-center">
                            <label className="block text-xs font-bold text-[#3D2925]/50 uppercase tracking-wider mb-2">Brands</label>
                            <input
                                type="text"
                                className="w-full bg-transparent text-center text-2xl font-black text-[#892F1A] focus:outline-none placeholder-[#892F1A]/20"
                                value={formData.statBrands}
                                onChange={(e) => setFormData({ ...formData, statBrands: e.target.value })}
                            />
                        </div>
                        <div className="bg-[#FBF7F4] p-4 rounded-xl text-center">
                            <label className="block text-xs font-bold text-[#3D2925]/50 uppercase tracking-wider mb-2">Awards</label>
                            <input
                                type="text"
                                className="w-full bg-transparent text-center text-2xl font-black text-[#892F1A] focus:outline-none placeholder-[#892F1A]/20"
                                value={formData.statAwards}
                                onChange={(e) => setFormData({ ...formData, statAwards: e.target.value })}
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
