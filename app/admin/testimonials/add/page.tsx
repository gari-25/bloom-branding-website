"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";
import "../../../../styles/admin.css";

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
        <div className="add-testimonial-container">
            <header className="add-testimonial-header">
                <Link href="/admin/testimonials" className="back-link">
                    ← Back to Testimonials
                </Link>
                <h1 className="add-testimonial-title">Add Testimonial</h1>
                <p className="add-testimonial-subtitle">Add a new client review or video.</p>
            </header>

            <form onSubmit={handleCreate} className="add-testimonial-form">

                {/* Type Selection */}
                <div className="type-selector">
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: "text" })}
                        className={`type-btn ${formData.type === "text" ? "active" : ""}`}
                    >
                        📝 Text Review
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: "video" })}
                        className={`type-btn ${formData.type === "video" ? "active" : ""}`}
                    >
                        🎥 Video Review
                    </button>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Client Name</label>
                        <input
                            type="text"
                            required
                            className="form-input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Company / Role</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Review Content</label>
                    <textarea
                        rows={4}
                        required
                        className="form-input textarea"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="What did the client say?"
                    />
                </div>

                {formData.type === "video" && (
                    <div className="video-section">
                        <label className="form-label accent">Video URL</label>
                        <input
                            type="url"
                            className="form-input accent"
                            value={formData.videoUrl}
                            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                            placeholder="https://vimeo.com/..."
                        />
                    </div>
                )}

                <div className="form-group">
                    <label className="form-label">Rating (1-5)</label>
                    <div className="rating-container">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            className="rating-slider"
                            value={formData.rating}
                            onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                        />
                        <span className="rating-value">{formData.rating}</span>
                    </div>
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
                    {loading ? "Creating..." : "Create Testimonial"}
                </button>
            </form>
        </div>
    );
}
