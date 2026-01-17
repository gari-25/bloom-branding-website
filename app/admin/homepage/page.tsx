"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "../../../styles/admin.css";

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

    if (loading) return <div className="loading-text">Loading...</div>;

    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <h1 className="homepage-title">Homepage Content</h1>
                <p className="homepage-subtitle">Manage text and banners for the home page.</p>
            </header>

            <form onSubmit={handleSave} className="homepage-form">
                <section className="form-section">
                    <h2 className="section-title">
                        <span className="step-number">1</span>
                        Hero Section
                    </h2>

                    <div className="form-grid">
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Title Line 1</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.heroTitleLine1}
                                    onChange={(e) => setFormData({ ...formData, heroTitleLine1: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label accent">Accent Text</label>
                                <input
                                    type="text"
                                    className="form-input accent"
                                    value={formData.heroTitleAccent}
                                    onChange={(e) => setFormData({ ...formData, heroTitleAccent: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Title Line 3</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.heroTitleLine3}
                                    onChange={(e) => setFormData({ ...formData, heroTitleLine3: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Subtitle / Description</label>
                            <textarea
                                rows={3}
                                className="form-input textarea"
                                value={formData.heroSubtitle}
                                onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                                placeholder="Enter subtitle text..."
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">CTA Button Text</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.ctaText}
                                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
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
