"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAuthInstance } from "@/lib/firebase";
import Link from "next/link";
import { onAuthStateChanged, User } from "firebase/auth";
import "../../styles/admin.css";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [sidebarVisible, setSidebarVisible] = useState(true);

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
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    // If on login page, render children without sidebar
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    // If authenticated and not on login page, show dashboard layout
    if (!user) return null;

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div className="admin-layout">
            {/* Navigation Toggle - Works on all screen sizes */}
            <button 
                className="mobile-nav-toggle"
                onClick={toggleSidebar}
                aria-label="Toggle navigation menu"
            >
                {sidebarVisible ? "☰" : "☰"}
            </button>

            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
                <h2>Bloom Admin</h2>

                <nav className="admin-nav">
                    <NavLink href="/admin/dashboard" label="Dashboard" active={pathname === "/admin/dashboard"} />
                    <NavLink href="/admin/brands" label="Brand Profiles" active={pathname.startsWith("/admin/brands")} />
                    <NavLink href="/admin/testimonials" label="Testimonials" active={pathname.startsWith("/admin/testimonials")} />
                    <NavLink href="/admin/homepage" label="Homepage Content" active={pathname.startsWith("/admin/homepage")} />
                    <NavLink href="/admin/about" label="About Page Content" active={pathname.startsWith("/admin/about")} />
                    <NavLink href="/admin/enquiries" label="Enquiries" active={pathname.startsWith("/admin/enquiries")} />
                </nav>

                <button
                    onClick={() => getAuthInstance().signOut()}
                    className="sign-out-btn"
                >
                    <span>Sign Out</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className={`admin-main ${sidebarVisible ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
                {children}
            </main>
        </div>
    );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
    return (
        <Link
            href={href}
            className={`nav-link ${active ? "active" : ""}`}
        >
            {label}
        </Link>
    );
}
