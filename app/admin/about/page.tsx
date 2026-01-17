"use client";

import { useEffect, useState } from "react";
import { db, storage } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../../../styles/admin.css";

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

    if (loading) return <div className="loading-text">Loading...</div>;

    return (
        <div className="about-container">
            <header className="about-header">
                <h1 className="about-title">Founder Story</h1>
                <p className="about-subtitle">Manage detailed bio, image, and stats.</p>
            </header>

            <form onSubmit={handleSave} className="about-form">
                {/* Founder Info */}
                <section className="form-section">
                    <h2 className="section-title">
                        <span className="step-number">1</span>
                        Founder Profile
                    </h2>

                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.founderName}
                                onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Role</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.founderRole}
                                onChange={(e) => setFormData({ ...formData, founderRole: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Founder Image */}
                    <div className="image-upload-section">
                        <label className="form-label">Founder Image</label>
                        <div className="image-preview-container">
                            {formData.imageUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={formData.imageUrl} alt="Founder" className="founder-image" />
                            ) : (
                                <div className="no-image-placeholder">No Img</div>
                            )}
                            <div className="image-upload-controls">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleDisplayImage}
                                    className="file-input"
                                />
                                <p className="file-input-hint">JPG, PNG or GIF. Max 5MB.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bio-section">
                        <div className="form-group">
                            <label className="form-label">Bio Paragraph 1 (Quote Style)</label>
                            <textarea
                                rows={3}
                                className="form-input quote-textarea"
                                value={formData.bioParagraph1}
                                onChange={(e) => setFormData({ ...formData, bioParagraph1: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Bio Paragraph 2</label>
                            <textarea
                                rows={4}
                                className="form-input textarea"
                                value={formData.bioParagraph2}
                                onChange={(e) => setFormData({ ...formData, bioParagraph2: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Bio Paragraph 3</label>
                            <textarea
                                rows={4}
                                className="form-input textarea"
                                value={formData.bioParagraph3}
                                onChange={(e) => setFormData({ ...formData, bioParagraph3: e.target.value })}
                            />
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="form-section stats-section">
                    <h2 className="section-title">
                        <span className="step-number">2</span>
                        Key Statistics
                    </h2>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <label className="stat-label">Years Exp.</label>
                            <input
                                type="text"
                                className="stat-input"
                                value={formData.statExperience}
                                onChange={(e) => setFormData({ ...formData, statExperience: e.target.value })}
                            />
                        </div>
                        <div className="stat-item">
                            <label className="stat-label">Brands</label>
                            <input
                                type="text"
                                className="stat-input"
                                value={formData.statBrands}
                                onChange={(e) => setFormData({ ...formData, statBrands: e.target.value })}
                            />
                        </div>
                        <div className="stat-item">
                            <label className="stat-label">Awards</label>
                            <input
                                type="text"
                                className="stat-input"
                                value={formData.statAwards}
                                onChange={(e) => setFormData({ ...formData, statAwards: e.target.value })}
                            />
                        </div>
                    </div>
                </section>

                <div className="form-actions">
                    <button
                        type="submit"
                        disabled={saving}
                        className="save-btn"
                    >
                        {saving ? "Saving Changes..." : "Save Content"}
                    </button>
                </div>
            </form>
        </div>
    );
}
