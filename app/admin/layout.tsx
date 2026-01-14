"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAuthInstance } from "@/lib/firebase";
import Link from "next/link";
import { onAuthStateChanged, User } from "firebase/auth";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const auth = getAuthInstance();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user && pathname !== "/admin/login") {
                router.push("/admin/login");
            } else {
                setUser(user);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router, pathname]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    // If on login page, render children without sidebar
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    // If authenticated and not on login page, show dashboard layout
    if (!user) return null;

    return (
        <div className="min-h-screen flex bg-neutral-900 text-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-neutral-800 p-6 flex flex-col">
                <h2 className="text-xl font-bold mb-8 tracking-tight">Bloom Admin</h2>

                <nav className="flex-1 space-y-2">
                    <NavLink href="/admin/dashboard" label="Dashboard" active={pathname === "/admin/dashboard"} />
                    <NavLink href="/admin/brands" label="Brand Profiles" active={pathname.startsWith("/admin/brands")} />
                    <NavLink href="/admin/testimonials" label="Testimonials" active={pathname.startsWith("/admin/testimonials")} />
                    <NavLink href="/admin/homepage" label="Homepage Content" active={pathname.startsWith("/admin/homepage")} />
                    <NavLink href="/admin/about" label="About Page Content" active={pathname.startsWith("/admin/about")} />
                    <NavLink href="/admin/enquiries" label="Enquiries" active={pathname.startsWith("/admin/enquiries")} />
                    {/* Add more links here later */}
                </nav>

                <button
                    onClick={() => getAuthInstance().signOut()}
                    className="mt-auto flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
                >
                    <span>Sign Out</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
    return (
        <Link
            href={href}
            className={`block px-4 py-2 rounded-lg transition-colors ${active
                ? "bg-white text-black font-medium"
                : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                }`}
        >
            {label}
        </Link>
    );
}
