"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

interface Brand {
    id: string;
    name: string;
    website: string;
    logoUrl: string;
    isActive: boolean;
}

export default function BrandsListPage() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "brands"));
            const brandsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Brand[];
            setBrands(brandsData);
        } catch (error) {
            console.error("Error fetching brands:", error);
            alert("Failed to load brands.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this brand?")) return;

        try {
            await deleteDoc(doc(db, "brands", id));
            setBrands(brands.filter(b => b.id !== id));
        } catch (error) {
            console.error("Error deleting brand:", error);
            alert("Failed to delete brand.");
        }
    };

    return (
        <>
            <style jsx>{`
                .brands-container {
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
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 2.5rem;
                }

                .header-content h1 {
                    font-size: 2.25rem;
                    font-weight: 800;
                    color: #3D2925;
                    margin: 0;
                }

                .header-content p {
                    color: #624A41;
                    margin-top: 0.5rem;
                    font-size: 1.125rem;
                }

                .add-brand-button {
                    background: #003DA5;
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 9999px;
                    font-weight: 700;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    text-decoration: none;
                }

                .add-brand-button:hover {
                    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
                    background: #002d7a;
                    transform: translateY(-2px);
                }

                .add-brand-button .icon {
                    font-size: 1.25rem;
                }

                .loading-state {
                    text-align: center;
                    padding: 5rem 0;
                }

                .loading-spinner {
                    animation: spin 1s linear infinite;
                    font-size: 2.25rem;
                    margin-bottom: 1rem;
                }

                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                .loading-text {
                    color: #624A41;
                }

                .empty-state {
                    text-align: center;
                    padding: 5rem 0;
                    background: white;
                    border-radius: 1.5rem;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                    border: 1px solid rgba(61, 41, 37, 0.05);
                }

                .empty-state-text {
                    color: #624A41;
                    margin-bottom: 1.5rem;
                    font-size: 1.25rem;
                }

                .empty-state-link {
                    color: #003DA5;
                    font-weight: 700;
                    text-decoration: underline;
                    transition: color 0.3s ease;
                }

                .empty-state-link:hover {
                    color: #892F1A;
                }

                .brands-grid {
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    gap: 2rem;
                }

                @media (min-width: 768px) {
                    .brands-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (min-width: 1024px) {
                    .brands-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }

                .brand-card {
                    background: white;
                    border-radius: 1rem;
                    overflow: hidden;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.03);
                    transition: all 0.3s ease;
                    border: 1px solid rgba(61, 41, 37, 0.05);
                }

                .brand-card:hover {
                    box-shadow: 0 15px 30px rgba(33, 26, 16, 0.08);
                }

                .brand-logo-container {
                    height: 192px;
                    background: #FBF7F4;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    transition: background-color 0.5s ease;
                }

                .brand-card:hover .brand-logo-container {
                    background: white;
                }

                .brand-logo {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    filter: brightness(1);
                    transition: transform 0.5s ease;
                }

                .brand-card:hover .brand-logo {
                    transform: scale(1.1);
                }

                .no-logo-text {
                    color: rgba(98, 74, 65, 0.5);
                    font-weight: 500;
                }

                .inactive-badge {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: #f3f4f6;
                    color: #6b7280;
                    font-size: 0.75rem;
                    font-weight: 700;
                    padding: 0.25rem 0.75rem;
                    border-radius: 9999px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .brand-info {
                    padding: 1.5rem;
                }

                .brand-name {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #3D2925;
                    margin-bottom: 0.5rem;
                    transition: color 0.3s ease;
                }

                .brand-card:hover .brand-name {
                    color: #892F1A;
                }

                .brand-website {
                    font-size: 0.875rem;
                    color: #003DA5;
                    font-weight: 500;
                    text-decoration: none;
                    display: block;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-bottom: 1.5rem;
                    transition: text-decoration 0.3s ease;
                }

                .brand-website:hover {
                    text-decoration: underline;
                }

                .brand-actions {
                    display: flex;
                    gap: 1rem;
                    opacity: 0.7;
                    transition: opacity 0.3s ease;
                }

                .brand-card:hover .brand-actions {
                    opacity: 1;
                }

                .edit-button {
                    flex: 1;
                    background: white;
                    border: 2px solid rgba(61, 41, 37, 0.1);
                    color: #3D2925;
                    text-align: center;
                    padding: 0.625rem;
                    border-radius: 0.75rem;
                    font-weight: 700;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: block;
                }

                .edit-button:hover {
                    border-color: #3D2925;
                    background: #3D2925;
                    color: white;
                }

                .delete-button {
                    padding: 0 1rem;
                    color: #fca5a5;
                    font-weight: 500;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    transition: color 0.3s ease;
                }

                .delete-button:hover {
                    color: #dc2626;
                }

                @media (max-width: 768px) {
                    .page-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 1rem;
                    }

                    .header-content h1 {
                        font-size: 1.875rem;
                    }

                    .header-content p {
                        font-size: 1rem;
                    }

                    .add-brand-button {
                        width: 100%;
                        justify-content: center;
                    }

                    .brand-logo-container {
                        height: 160px;
                        padding: 1.5rem;
                    }
                }

                @media (max-width: 640px) {
                    .header-content h1 {
                        font-size: 1.5rem;
                    }

                    .brands-container {
                        padding: 0 1rem;
                    }

                    .brand-actions {
                        flex-direction: column;
                        gap: 0.5rem;
                    }

                    .delete-button {
                        padding: 0.5rem;
                        text-align: center;
                    }
                }
            `}</style>

            <div className="brands-container">
                <header className="page-header">
                    <div className="header-content">
                        <h1>Brand Profiles</h1>
                        <p>Manage your client portfolio and logos.</p>
                    </div>
                    <Link href="/admin/brands/add" className="add-brand-button">
                        <span className="icon">+</span> Add Brand
                    </Link>
                </header>

                {loading ? (
                    <div className="loading-state">
                        <div className="loading-spinner">🌸</div>
                        <p className="loading-text">Loading brands...</p>
                    </div>
                ) : brands.length === 0 ? (
                    <div className="empty-state">
                        <p className="empty-state-text">No brands found.</p>
                        <Link href="/admin/brands/add" className="empty-state-link">
                            Create your first brand profile
                        </Link>
                    </div>
                ) : (
                    <div className="brands-grid">
                        {brands.map((brand) => (
                            <div key={brand.id} className="brand-card">
                                <div className="brand-logo-container">
                                    {brand.logoUrl ? (
                                        <img
                                            src={brand.logoUrl}
                                            alt={brand.name}
                                            className="brand-logo"
                                        />
                                    ) : (
                                        <div className="no-logo-text">No Logo</div>
                                    )}
                                    {!brand.isActive && (
                                        <div className="inactive-badge">Inactive</div>
                                    )}
                                </div>
                                <div className="brand-info">
                                    <h3 className="brand-name">{brand.name}</h3>
                                    <a
                                        href={brand.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="brand-website"
                                    >
                                        {brand.website}
                                    </a>

                                    <div className="brand-actions">
                                        <Link
                                            href={`/admin/brands/${brand.id}`}
                                            className="edit-button"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(brand.id)}
                                            className="delete-button"
                                            title="Delete Brand"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}