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
        <div className="animate-in fade-in duration-500">
            <header className="flex justify-between items-end mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-[#3D2925]">Brand Profiles</h1>
                    <p className="text-[#624A41] mt-2 text-lg">Manage your client portfolio and logos.</p>
                </div>
                <Link
                    href="/admin/brands/add"
                    className="bg-[#003DA5] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-[#002d7a] hover:-translate-y-1 transition-all flex items-center gap-2"
                >
                    <span className="text-xl">+</span> Add Brand
                </Link>
            </header>

            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin text-4xl mb-4">🌸</div>
                    <p className="text-[#624A41]">Loading brands...</p>
                </div>
            ) : brands.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-[#3D2925]/5">
                    <p className="text-[#624A41] mb-6 text-xl">No brands found.</p>
                    <Link
                        href="/admin/brands/add"
                        className="text-[#003DA5] font-bold underline hover:text-[#892F1A] transition-colors"
                    >
                        Create your first brand profile
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {brands.map((brand) => (
                        <div key={brand.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_30px_rgba(33,26,16,0.08)] transition-all duration-300 group ring-1 ring-[#3D2925]/5">
                            <div className="h-48 bg-[#FBF7F4] relative flex items-center justify-center p-8 group-hover:bg-white transition-colors duration-500">
                                {brand.logoUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={brand.logoUrl}
                                        alt={brand.name}
                                        className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="text-[#624A41]/50 font-medium">No Logo</div>
                                )}
                                {!brand.isActive && (
                                    <div className="absolute top-4 right-4 bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        Inactive
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-[#3D2925] mb-2 group-hover:text-[#892F1A] transition-colors">{brand.name}</h3>
                                <a
                                    href={brand.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-[#003DA5] font-medium hover:underline truncate block mb-6"
                                >
                                    {brand.website}
                                </a>

                                <div className="flex gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                    <Link
                                        href={`/admin/brands/${brand.id}`}
                                        className="flex-1 bg-white border-2 border-[#3D2925]/10 text-[#3D2925] text-center py-2.5 rounded-xl font-bold hover:border-[#3D2925] hover:bg-[#3D2925] hover:text-white transition-all"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(brand.id)}
                                        className="px-4 text-red-400 hover:text-red-600 font-medium transition-colors"
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
