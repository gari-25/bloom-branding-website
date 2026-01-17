"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "../../../styles/admin.css";

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
        <div className="brands-container">
            <div className="brands-header">
                <h1>Brand Profiles</h1>
                <Link href="/admin/brands/add" className="add-brand-btn">
                    + Add New Brand
                </Link>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading brands...</p>
                </div>
            ) : brands.length === 0 ? (
                <div className="no-enquiries">
                    <p className="mb-6">No brands found.</p>
                    <Link
                        href="/admin/brands/add"
                        className="add-brand-btn"
                    >
                        Create your first brand profile
                    </Link>
                </div>
            ) : (
                <div className="brands-grid">
                    {brands.map((brand) => (
                        <div key={brand.id} className="brand-card">
                            <div className="brand-logo-container">
                                {brand.logoUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={brand.logoUrl}
                                        alt={brand.name}
                                        className="brand-logo"
                                    />
                                ) : (
                                    <div className="no-logo">No Logo</div>
                                )}
                                {!brand.isActive && (
                                    <div className="brand-status inactive">Inactive</div>
                                )}
                            </div>
                            <div className="brand-info">
                                <h3>{brand.name}</h3>
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
                                        className="edit-btn"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(brand.id)}
                                        className="delete-btn"
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
    );
}
