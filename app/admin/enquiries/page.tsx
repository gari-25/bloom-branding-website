"use client";

import { useEffect, useState } from "react";

interface Enquiry {
    id: string;
    name: string;
    email: string;
    phone: string;
    projectDetails: string;
    budget: string;
    startDate: string;
    createdAt: any;
}

export default function EnquiriesPage() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([
        {
            id: "1",
            name: "Sarah Johnson",
            email: "sarah.j@example.com",
            phone: "+1 (555) 123-4567",
            projectDetails: "Looking to build a modern e-commerce platform with inventory management and customer analytics. Need integration with payment gateways and shipping providers.",
            budget: "$15,000 - $25,000",
            startDate: "March 2026",
            createdAt: { seconds: 1737000000 }
        },
        {
            id: "2",
            name: "Michael Chen",
            email: "m.chen@techcorp.com",
            phone: "+1 (555) 987-6543",
            projectDetails: "Corporate website redesign for tech startup. Modern, minimalist design with focus on user experience and mobile responsiveness.",
            budget: "$8,000 - $12,000",
            startDate: "February 2026",
            createdAt: { seconds: 1736900000 }
        }
    ]);
    const [loading, setLoading] = useState(false);

    const fetchEnquiries = async () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    };

    if (loading) {
        return (
            <>
                <style>{`
                    .loading-page {
                        min-height: 100vh;
                        background: linear-gradient(135deg, #f5f5f4 0%, #fafaf9 50%, #fefce8 100%);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .loading-content {
                        text-align: center;
                    }

                    .loading-spinner {
                        display: inline-block;
                        width: 3rem;
                        height: 3rem;
                        border-radius: 50%;
                        border: 4px solid #fef08a;
                        border-top-color: #2563eb;
                        animation: spin 1s linear infinite;
                        margin-bottom: 1rem;
                    }

                    .loading-text {
                        font-size: 1.125rem;
                        font-weight: 500;
                        color: #292524;
                    }

                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                `}</style>
                <div className="loading-page">
                    <div className="loading-content">
                        <div className="loading-spinner"></div>
                        <p className="loading-text">Loading enquiries...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                }

                .enquiries-page {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f5f5f4 0%, #fafaf9 50%, #fefce8 100%);
                    padding: 3rem 1rem;
                }

                .page-container {
                    max-width: 75rem;
                    margin: 0 auto;
                }

                .page-header {
                    margin-bottom: 3rem;
                }

                .header-flex {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    align-items: flex-start;
                }

                .header-content {
                    flex: 1;
                }

                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: #fef9c3;
                    color: #292524;
                    border-radius: 9999px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                    margin-bottom: 1rem;
                }

                .pulse-dot {
                    width: 0.5rem;
                    height: 0.5rem;
                    background: #2563eb;
                    border-radius: 50%;
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                .page-title {
                    font-size: 3rem;
                    font-weight: 700;
                    background: linear-gradient(to right, #292524, #1e40af, #44403c);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    margin-bottom: 0.75rem;
                }

                .page-subtitle {
                    font-size: 1.25rem;
                    color: #57534e;
                }

                .refresh-button {
                    position: relative;
                    overflow: hidden;
                    background: white;
                    color: #292524;
                    font-weight: 700;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.75rem;
                    border: 2px solid #bfdbfe;
                    cursor: pointer;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }

                .refresh-button:hover {
                    background: #2563eb;
                    color: white;
                    border-color: #2563eb;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                }

                .refresh-icon {
                    display: inline-block;
                    transition: transform 0.5s ease;
                }

                .refresh-button:hover .refresh-icon {
                    transform: rotate(180deg);
                }

                .button-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    position: relative;
                    z-index: 10;
                }

                .empty-state {
                    text-align: center;
                    padding: 5rem 2rem;
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(10px);
                    border-radius: 1.5rem;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    border: 2px solid #fef9c3;
                }

                .empty-icon {
                    width: 6rem;
                    height: 6rem;
                    background: linear-gradient(135deg, #fef9c3, #fef08a);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                }

                .empty-icon span {
                    font-size: 3rem;
                }

                .empty-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #292524;
                    margin-bottom: 0.5rem;
                }

                .empty-text {
                    color: #57534e;
                    font-size: 1.125rem;
                }

                .enquiries-grid {
                    display: grid;
                    gap: 1.5rem;
                }

                .enquiry-card {
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(10px);
                    padding: 2rem;
                    border-radius: 1.5rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    border: 2px solid #e7e5e4;
                    transition: all 0.5s ease;
                    position: relative;
                    overflow: hidden;
                }

                .enquiry-card:hover {
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    border-color: #60a5fa;
                }

                .card-gradient {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 16rem;
                    height: 16rem;
                    background: linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(253, 224, 71, 0.1));
                    filter: blur(60px);
                    opacity: 0;
                    transition: opacity 0.5s ease;
                    border-radius: 50%;
                }

                .enquiry-card:hover .card-gradient {
                    opacity: 1;
                }

                .accent-border {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 0.5rem;
                    height: 100%;
                    background: linear-gradient(to bottom, #2563eb, #1e40af);
                    border-radius: 1.5rem 0 0 1.5rem;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .enquiry-card:hover .accent-border {
                    opacity: 1;
                }

                .card-header {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    margin-bottom: 2rem;
                    position: relative;
                    z-index: 10;
                }

                .header-main {
                    display: flex;
                    align-items: flex-start;
                    gap: 1.25rem;
                    flex: 1;
                }

                .avatar-container {
                    position: relative;
                }

                .avatar {
                    width: 4rem;
                    height: 4rem;
                    background: linear-gradient(135deg, #2563eb, #1e40af);
                    color: white;
                    border-radius: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 1.5rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }

                .enquiry-card:hover .avatar {
                    transform: scale(1.1) rotate(6deg);
                }

                .avatar-badge {
                    position: absolute;
                    bottom: -0.25rem;
                    right: -0.25rem;
                    width: 1.25rem;
                    height: 1.25rem;
                    background: #facc15;
                    border-radius: 50%;
                    border: 2px solid white;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                }

                .client-info {
                    flex: 1;
                }

                .client-name {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #292524;
                    margin-bottom: 0.5rem;
                    transition: color 0.3s ease;
                }

                .enquiry-card:hover .client-name {
                    color: #1d4ed8;
                }

                .contact-info {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    font-size: 0.875rem;
                }

                .contact-link {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #57534e;
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.3s ease;
                }

                .contact-link:hover {
                    color: #2563eb;
                }

                .contact-icon {
                    font-size: 1.125rem;
                    transition: transform 0.3s ease;
                }

                .contact-link:hover .contact-icon {
                    transform: scale(1.1);
                }

                .timestamp-box {
                    background: linear-gradient(135deg, #fefce8, #fef9c3);
                    padding: 0.75rem 1rem;
                    border-radius: 0.75rem;
                    border: 1px solid #fde68a;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                }

                .timestamp-label {
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #57534e;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 0.25rem;
                }

                .timestamp-date {
                    font-size: 0.875rem;
                    font-weight: 700;
                    color: #292524;
                }

                .timestamp-time {
                    font-size: 0.75rem;
                    color: #57534e;
                    margin-top: 0.25rem;
                }

                .card-body {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                    position: relative;
                    z-index: 10;
                }

                .project-details-box {
                    background: linear-gradient(135deg, #fefce8, #fafaf9);
                    padding: 1.5rem;
                    border-radius: 1rem;
                    border: 2px solid #e7e5e4;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                    position: relative;
                    overflow: hidden;
                }

                .details-accent {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 0.25rem;
                    background: linear-gradient(to right, #2563eb, #1e40af);
                    transform: scaleX(0);
                    transition: transform 0.5s ease;
                    transform-origin: left;
                }

                .project-details-box:hover .details-accent {
                    transform: scaleX(1);
                }

                .details-header {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.75rem;
                }

                .details-icon {
                    font-size: 1.25rem;
                }

                .details-label {
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #57534e;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .details-text {
                    color: #292524;
                    white-space: pre-wrap;
                    line-height: 1.6;
                    font-size: 1rem;
                }

                .tags-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;
                }

                .tag {
                    position: relative;
                    overflow: hidden;
                    background: white;
                    padding: 0.75rem 1.25rem;
                    border-radius: 0.75rem;
                    border: 2px solid #bfdbfe;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                    cursor: default;
                }

                .tag:hover {
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                }

                .tag.budget-tag:hover {
                    background: #2563eb;
                    border-color: #2563eb;
                }

                .tag.date-tag:hover {
                    background: #44403c;
                    border-color: #44403c;
                }

                .tag-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    position: relative;
                    z-index: 10;
                }

                .tag-icon {
                    font-size: 1.125rem;
                    transition: transform 0.3s ease;
                }

                .tag:hover .tag-icon {
                    transform: scale(1.1);
                }

                .tag-label {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #57534e;
                    transition: color 0.3s ease;
                }

                .tag:hover .tag-label {
                    color: white;
                }

                .tag-value {
                    font-size: 0.875rem;
                    font-weight: 700;
                    transition: color 0.3s ease;
                }

                .tag.budget-tag .tag-value {
                    color: #1d4ed8;
                }

                .tag.date-tag .tag-value {
                    color: #44403c;
                }

                .tag:hover .tag-value {
                    color: white;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }

                @media (min-width: 640px) {
                    .header-flex {
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: flex-end;
                    }

                    .contact-info {
                        flex-direction: row;
                    }

                    .contact-separator {
                        display: inline;
                        color: #d6d3d1;
                    }
                }

                @media (min-width: 1024px) {
                    .card-header {
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: flex-start;
                    }

                    .card-body {
                        padding-left: 5rem;
                    }
                }

                @media (max-width: 639px) {
                    .contact-separator {
                        display: none;
                    }
                }
            `}</style>
            <div className="enquiries-page">
                <div className="page-container">
                    <header className="page-header">
                        <div className="header-flex">
                            <div className="header-content">
                                <div className="badge">
                                    <span className="pulse-dot"></span>
                                    Client Inbox
                                </div>
                                <h1 className="page-title">Enquiries</h1>
                                <p className="page-subtitle">
                                    {enquiries.length} {enquiries.length === 1 ? 'enquiry' : 'enquiries'} from potential clients
                                </p>
                            </div>
                            <button onClick={fetchEnquiries} className="refresh-button">
                                <span className="button-content">
                                    <span className="refresh-icon">↻</span>
                                    Refresh List
                                </span>
                            </button>
                        </div>
                    </header>

                    {enquiries.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">
                                <span>📬</span>
                            </div>
                            <h3 className="empty-title">No enquiries yet</h3>
                            <p className="empty-text">New client enquiries will appear here</p>
                        </div>
                    ) : (
                        <div className="enquiries-grid">
                            {enquiries.map((enquiry) => (
                                <div key={enquiry.id} className="enquiry-card">
                                    <div className="card-gradient"></div>
                                    <div className="accent-border"></div>

                                    <div className="card-header">
                                        <div className="header-main">
                                            <div className="avatar-container">
                                                <div className="avatar">
                                                    {enquiry.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="avatar-badge"></div>
                                            </div>
                                            <div className="client-info">
                                                <h3 className="client-name">{enquiry.name}</h3>
                                                <div className="contact-info">
                                                    <a href={`mailto:${enquiry.email}`} className="contact-link">
                                                        <span className="contact-icon">✉️</span>
                                                        {enquiry.email}
                                                    </a>
                                                    <span className="contact-separator">•</span>
                                                    <a href={`tel:${enquiry.phone}`} className="contact-link">
                                                        <span className="contact-icon">📞</span>
                                                        {enquiry.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="timestamp-box">
                                            <div className="timestamp-label">Received</div>
                                            <div className="timestamp-date">
                                                {enquiry.createdAt?.seconds ? new Date(enquiry.createdAt.seconds * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                                            </div>
                                            <div className="timestamp-time">
                                                {enquiry.createdAt?.seconds ? new Date(enquiry.createdAt.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-body">
                                        <div className="project-details-box">
                                            <div className="details-accent"></div>
                                            <div className="details-header">
                                                <span className="details-icon">📋</span>
                                                <p className="details-label">Project Details</p>
                                            </div>
                                            <p className="details-text">{enquiry.projectDetails}</p>
                                        </div>

                                        <div className="tags-container">
                                            {enquiry.budget && (
                                                <div className="tag budget-tag">
                                                    <div className="tag-content">
                                                        <span className="tag-icon">💰</span>
                                                        <span className="tag-label">Budget:</span>
                                                        <span className="tag-value">{enquiry.budget}</span>
                                                    </div>
                                                </div>
                                            )}
                                            {enquiry.startDate && (
                                                <div className="tag date-tag">
                                                    <div className="tag-content">
                                                        <span className="tag-icon">📅</span>
                                                        <span className="tag-label">Start Date:</span>
                                                        <span className="tag-value">{enquiry.startDate}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}