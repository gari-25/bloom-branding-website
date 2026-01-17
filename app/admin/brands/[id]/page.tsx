"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Link from "next/link";
import "../../../../styles/admin.css";

export default function EditBrandPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        website: "",
        description: "",
        isActive: true,
    });
    const [currentLogoUrl, setCurrentLogoUrl] = useState("");
    const [logoFile, setLogoFile] = useState<File | null>(null);

    // Unwrap params using React.use()
    const { id } = use(params);

    useEffect(() => {
        fetchBrand();
    }, [id]);

    const fetchBrand = async () => {
        try {
            const docRef = doc(db, "brands", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setFormData({
                    name: data.name || "",
                    website: data.website || "",
                    description: data.description || "",
                    isActive: data.isActive ?? true,
                });
                setCurrentLogoUrl(data.logoUrl || "");
            } else {
                alert("Brand not found");
                router.push("/admin/brands");
            }
        } catch (error) {
            console.error("Error fetching brand:", error);
            alert("Failed to load brand data");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            let logoUrl = currentLogoUrl;

            if (logoFile) {
                const logoRef = ref(storage, `brands/${Date.now()}_${logoFile.name}`);
                const snapshot = await uploadBytes(logoRef, logoFile);
                logoUrl = await getDownloadURL(snapshot.ref);
            }

            const docRef = doc(db, "brands", id);
            await updateDoc(docRef, {
                ...formData,
                logoUrl,
                updatedAt: new Date().toISOString(),
            });

            router.push("/admin/brands");
        } catch (error) {
            console.error("Error updating brand:", error);
            alert("Failed to update brand.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-20 text-[#624A41]">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto animate-in align-top fade-in duration-500">
            <header className="mb-10">
                <Link href="/admin/brands" className="text-[#003DA5] hover:text-[#892F1A] font-medium mb-4 inline-flex items-center gap-2 transition-colors">
                    ← Back to Brands
                </Link>
                <div className="flex items-center gap-4">
                    {currentLogoUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={currentLogoUrl} alt={formData.name} className="w-16 h-16 object-contain bg-white rounded-lg p-2 shadow-sm border border-[#3D2925]/5" />
                    )}
                    <div>
                        <h1 className="text-4xl font-extrabold text-[#3D2925]">Edit Brand</h1>
                        <p className="text-[#624A41] mt-1 text-lg">Update profile for {formData.name}</p>
                    </div>
                </div>
            </header>

            <form onSubmit={handleUpdate} className="space-y-8 bg-white p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#3D2925]/5">
                <div>
                    <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">Brand Name</label>
                    <input
                        type="text"
                        required
                        className="w-full bg-[#FBF7F4] rounded-xl border-transparent focus:border-[#003DA5] focus:bg-white focus:ring-0 px-4 py-3 text-[#3D2925] font-bold text-lg transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">Website URL</label>
                    <input
                        type="url"
                        className="w-full bg-[#FBF7F4] rounded-xl border-transparent focus:border-[#003DA5] focus:bg-white focus:ring-0 px-4 py-3 text-[#003DA5] font-medium transition-all"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">Logo</label>
                    <div className="bg-[#FBF7F4] p-6 rounded-2xl border border-[#3D2925]/5 flex items-center gap-6">
                        <div className="flex-1">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                                className="block w-full text-sm text-[#624A41]
                  file:mr-4 file:py-2.5 file:px-6
                  file:rounded-full file:border-0
                  file:text-sm file:font-bold
                  file:bg-[#3D2925] file:text-white
                  hover:file:bg-[#892F1A]
                  cursor-pointer transition-all
                "
                            />
                            <p className="text-xs text-[#3D2925]/40 mt-3 font-medium">Upload new image to replace current logo.</p>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">Description</label>
                    <textarea
                        rows={4}
                        className="w-full bg-[#FBF7F4] rounded-xl border-transparent focus:border-[#003DA5] focus:bg-white focus:ring-0 px-4 py-3 text-[#3D2925] transition-all resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
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
                    {saving ? "Saving Changes..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
}
