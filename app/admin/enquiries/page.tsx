"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import "../../../styles/admin.css";

interface Enquiry {
    id: string;
    name: string;
    email: string;
    phone: string;
    projectDetails: string;
    budget: string;
    startDate: string;
    createdAt: any; // Timestamp
}

export default function EnquiriesPage() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const fetchedEnquiries: Enquiry[] = [];
            querySnapshot.forEach((doc) => {
                fetchedEnquiries.push({ id: doc.id, ...doc.data() } as Enquiry);
            });
            setEnquiries(fetchedEnquiries);
        } catch (error) {
            console.error("Error fetching enquiries:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading-container"><div className="loading-spinner"></div></div>;

    return (
        <div className="enquiries-container">
            <header className="enquiries-header">
                <div>
                    <h1>Enquiries</h1>
                    <p>Inbox for potential client projects.</p>
                </div>
                <button
                    onClick={fetchEnquiries}
                    className="refresh-btn"
                >
                    ↻ Refresh List
                </button>
            </header>

            {enquiries.length === 0 ? (
                <div className="no-enquiries">
                    <p>No enquiries found yet.</p>
                </div>
            ) : (
                <div className="enquiries-list">
                    {enquiries.map((enquiry) => (
                        <div key={enquiry.id} className="enquiry-card">

                            <div className="enquiry-header">
                                <div className="enquiry-author">
                                    <div className="enquiry-avatar">
                                        {enquiry.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3>{enquiry.name}</h3>
                                        <div className="enquiry-contact">
                                            <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
                                            <span className="separator">•</span>
                                            <a href={`tel:${enquiry.phone}`}>{enquiry.phone}</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="enquiry-time">
                                    {enquiry.createdAt?.seconds ? new Date(enquiry.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                                    <span className="mx-1 opacity-50">at</span>
                                    {enquiry.createdAt?.seconds ? new Date(enquiry.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                </div>
                            </div>

                            <div className="enquiry-content">
                                <div className="project-details">
                                    <div className="project-details-label">Project Details</div>
                                    <p className="project-details-text">{enquiry.projectDetails}</p>
                                </div>

                                <div className="enquiry-meta">
                                    {enquiry.budget && (
                                        <div className="meta-badge">
                                            Budget: <span className="highlight">{enquiry.budget}</span>
                                        </div>
                                    )}
                                    {enquiry.startDate && (
                                        <div className="meta-badge">
                                            Start Date: <span className="highlight-start">{enquiry.startDate}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
