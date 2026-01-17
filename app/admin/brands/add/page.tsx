"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Link from "next/link";
import "../../../../styles/admin.css";

export default function AddBrandPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        website: "",
        description: "",
        isActive: true,
    });
    const [logoFile, setLogoFile] = useState<File | null>(null);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name) return alert("Name is required");

        setLoading(true);

        try {
            let logoUrl = "";

            // Upload Logo if exists
            if (logoFile) {
                const logoRef = ref(storage, `brands/${Date.now()}_${logoFile.name}`);
                const snapshot = await uploadBytes(logoRef, logoFile);
                logoUrl = await getDownloadURL(snapshot.ref);
            }

            await addDoc(collection(db, "brands"), {
                ...formData,
                logoUrl,
                createdAt: new Date().toISOString(),
            });

            router.push("/admin/brands");
        } catch (error) {
            console.error("Error creating brand:", error);
            alert("Failed to create brand.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-brand-container">
            <header className="add-brand-header">
                <Link href="/admin/brands" className="back-link">
                    ← Back to Brands
                </Link>
                <h1 className="add-brand-title">Add New Brand</h1>
                <p className="add-brand-subtitle">Create a new client profile for your portfolio.</p>
            </header>

            <form onSubmit={handleCreate} className="add-brand-form">
                <div className="form-group">
                    <label className="form-label">Brand Name</label>
                    <input
                        type="text"
                        required
                        className="form-input"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Acme Corp"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Website URL</label>
                    <input
                        type="url"
                        className="form-input"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://..."
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Logo</label>
                    <div className="file-upload-area">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                            className="file-input"
                        />
                        <p className="file-input-hint">SVG, PNG, JPG recommended. Max 2MB.</p>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        rows={4}
                        className="form-input textarea"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Brief description of the brand..."
                    />
                </div>

                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="checkbox-input"
                    />
                    <label htmlFor="isActive" className="checkbox-label">Active (Visible on public site)</label>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="save-btn"
                >
                    {loading ? "Creating..." : "Create Brand Profile"}
                </button>
            </form>
        </div>
    );
}
