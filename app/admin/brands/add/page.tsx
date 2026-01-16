"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Link from "next/link";

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
        <>
            <style jsx>{`
                .add-brand-container {
                    max-width: 672px;
                    margin: 0 auto;
                    animation: fadeIn 0.5s ease-in;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .page-header {
                    margin-bottom: 2.5rem;
                }

                .back-link {
                    color: #003DA5;
                    font-weight: 500;
                    margin-bottom: 1rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    transition: color 0.3s ease;
                    text-decoration: none;
                }

                .back-link:hover {
                    color: #892F1A;
                }

                .page-title {
                    font-size: 2.25rem;
                    font-weight: 800;
                    color: #3D2925;
                    margin: 0;
                }

                .page-subtitle {
                    color: #624A41;
                    margin-top: 0.5rem;
                    font-size: 1.125rem;
                }

                .form-container {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 1.5rem;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
                    border: 1px solid rgba(61, 41, 37, 0.05);
                }

                .form-group {
                    margin-bottom: 2rem;
                }

                .form-label {
                    display: block;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: rgba(61, 41, 37, 0.7);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 0.5rem;
                    margin-left: 0.25rem;
                }

                .form-input {
                    width: 100%;
                    background: #FBF7F4;
                    border-radius: 0.75rem;
                    border: 2px solid transparent;
                    padding: 0.75rem 1rem;
                    color: #3D2925;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    font-size: 1rem;
                }

                .form-input:focus {
                    background: white;
                    border-color: #003DA5;
                    outline: none;
                }

                .form-input::placeholder {
                    color: rgba(61, 41, 37, 0.3);
                }

                .brand-name-input {
                    font-weight: 700;
                    font-size: 1.125rem;
                }

                .website-input {
                    color: #003DA5;
                }

                .form-textarea {
                    width: 100%;
                    background: #FBF7F4;
                    border-radius: 0.75rem;
                    border: 2px solid transparent;
                    padding: 0.75rem 1rem;
                    color: #3D2925;
                    transition: all 0.3s ease;
                    resize: none;
                    font-size: 1rem;
                    line-height: 1.5;
                }

                .form-textarea:focus {
                    background: white;
                    border-color: #003DA5;
                    outline: none;
                }

                .form-textarea::placeholder {
                    color: rgba(61, 41, 37, 0.3);
                }

                .logo-upload-area {
                    border: 2px dashed rgba(61, 41, 37, 0.1);
                    border-radius: 1rem;
                    padding: 2rem;
                    text-align: center;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                .logo-upload-area:hover {
                    background: #FBF7F4;
                    border-color: rgba(0, 61, 165, 0.3);
                }

                .file-input {
                    display: block;
                    width: 100%;
                    font-size: 0.875rem;
                    color: #624A41;
                    cursor: pointer;
                }

                .file-input::file-selector-button {
                    margin-right: 1rem;
                    padding: 0.625rem 1.5rem;
                    border-radius: 9999px;
                    border: none;
                    font-size: 0.875rem;
                    font-weight: 700;
                    background: #3D2925;
                    color: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .file-input::file-selector-button:hover {
                    background: #892F1A;
                }

                .file-hint {
                    font-size: 0.75rem;
                    color: rgba(61, 41, 37, 0.4);
                    margin-top: 0.75rem;
                    font-weight: 500;
                }

                .checkbox-group {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    background: #FBF7F4;
                    padding: 1rem;
                    border-radius: 0.75rem;
                    margin-bottom: 2rem;
                }

                .checkbox-input {
                    width: 1.25rem;
                    height: 1.25rem;
                    border-radius: 0.25rem;
                    color: #003DA5;
                    border: 2px solid #d1d5db;
                    cursor: pointer;
                    flex-shrink: 0;
                }

                .checkbox-input:focus {
                    outline: none;
                    box-shadow: 0 0 0 3px rgba(0, 61, 165, 0.1);
                }

                .checkbox-label {
                    font-size: 0.875rem;
                    font-weight: 700;
                    color: #3D2925;
                    cursor: pointer;
                }

                .submit-button {
                    width: 100%;
                    background: #892F1A;
                    color: white;
                    font-weight: 700;
                    padding: 1rem;
                    border-radius: 9999px;
                    border: none;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 1rem;
                }

                .submit-button:hover:not(:disabled) {
                    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
                    background: #6b2415;
                    transform: translateY(-2px);
                }

                .submit-button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                @media (max-width: 768px) {
                    .add-brand-container {
                        padding: 0 1rem;
                    }

                    .page-title {
                        font-size: 1.875rem;
                    }

                    .page-subtitle {
                        font-size: 1rem;
                    }

                    .form-container {
                        padding: 1.5rem;
                    }

                    .logo-upload-area {
                        padding: 1.5rem;
                    }
                }

                @media (max-width: 640px) {
                    .page-title {
                        font-size: 1.5rem;
                    }

                    .form-group {
                        margin-bottom: 1.5rem;
                    }

                    .logo-upload-area {
                        padding: 1rem;
                    }
                }
            `}</style>

            <div className="add-brand-container">
                <header className="page-header">
                    <Link href="/admin/brands" className="back-link">
                        ← Back to Brands
                    </Link>
                    <h1 className="page-title">Add New Brand</h1>
                    <p className="page-subtitle">Create a new client profile for your portfolio.</p>
                </header>

                <form onSubmit={handleCreate} className="form-container">
                    <div className="form-group">
                        <label className="form-label">Brand Name</label>
                        <input
                            type="text"
                            required
                            className="form-input brand-name-input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Acme Corp"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Website URL</label>
                        <input
                            type="url"
                            className="form-input website-input"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            placeholder="https://..."
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Logo</label>
                        <div className="logo-upload-area">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                                className="file-input"
                            />
                            <p className="file-hint">SVG, PNG, JPG recommended. Max 2MB.</p>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            rows={4}
                            className="form-textarea"
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
                        <label htmlFor="isActive" className="checkbox-label">
                            Active (Visible on public site)
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="submit-button"
                    >
                        {loading ? "Creating..." : "Create Brand Profile"}
                    </button>
                </form>
            </div>
        </>
    );
}