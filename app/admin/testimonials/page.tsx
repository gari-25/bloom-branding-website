"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "../../../styles/admin.css";

interface Testimonial {
    id: string;
    name: string;
    company: string;
    content: string;
    rating: number;
    videoUrl?: string;
    type: "text" | "video";
    isActive: boolean;
}

export default function TestimonialsListPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "testimonials"));
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Testimonial[];
            setTestimonials(data);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
            alert("Failed to load testimonials.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            await deleteDoc(doc(db, "testimonials", id));
            setTestimonials(testimonials.filter(t => t.id !== id));
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            alert("Failed to delete testimonial.");
        }
    };

    return (
        <div className="testimonials-container">
            <header className="testimonials-header">
                <div>
                    <h1>Testimonials</h1>
                    <p>Curate client success stories.</p>
                </div>
                <Link
                    href="/admin/testimonials/add"
                    className="add-brand-btn"
                >
                    + Add Testimonial
                </Link>
            </header>

            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading testimonials...</p>
                </div>
            ) : testimonials.length === 0 ? (
                <div className="no-enquiries">
                    <p className="mb-6">No testimonials found.</p>
                    <Link
                        href="/admin/testimonials/add"
                        className="add-brand-btn"
                    >
                        Create your first testimonial
                    </Link>
                </div>
            ) : (
                <div className="testimonials-grid">
                    {testimonials.map((t) => (
                        <div key={t.id} className="testimonial-card">
                            {!t.isActive && (
                                <div className="brand-status inactive">Inactive</div>
                            )}
                            <div className="testimonial-content">
                                <h3>{t.name}</h3>
                                <p className="testimonial-company">{t.company}</p>
                                <p className="testimonial-text">{t.content}</p>
                                <div className="testimonial-rating">
                                    {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                                </div>
                                {t.type === 'video' && t.videoUrl && (
                                    <div className="testimonial-video">
                                        <a href={t.videoUrl} target="_blank" rel="noopener noreferrer">
                                            🎥 Watch Video
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div className="brand-actions">
                                <Link
                                    href={`/admin/testimonials/${t.id}`}
                                    className="edit-btn"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(t.id)}
                                    className="delete-btn"
                                    title="Delete Testimonial"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
