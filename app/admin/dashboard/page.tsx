import Link from "next/link";
import "../../../styles/admin.css";

export default function DashboardPage() {
    return (
        <>
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Welcome back, admin. Here is your overview.</p>
            </header>

            <div className="dashboard-grid">
                <DashboardCard
                    href="/admin/brands"
                    icon="🏢"
                    title="Brand Profiles"
                    description="Manage client brands, logos, and descriptions."
                />

                <DashboardCard
                    href="/admin/testimonials"
                    icon="💬"
                    title="Testimonials"
                    description="Curate client success stories and reviews."
                />

                <DashboardCard
                    href="/admin/enquiries"
                    icon="📬"
                    title="Enquiries"
                    description="View incoming messages from potential clients."
                />

                <DashboardCard
                    href="/admin/homepage"
                    icon="🏠"
                    title="Homepage Content"
                    description="Edit the hero section and core landing visuals."
                />
                <DashboardCard
                    href="/admin/about"
                    icon="✍️"
                    title="Founder Story"
                    description="Update bio, images, and key statistics."
                />
            </div>
        </>
    );
}

function DashboardCard({ href, icon, title, description }: { href: string; icon: string; title: string; description: string }) {
    return (
        <Link
            href={href}
            className="dashboard-card"
        >
            <div className="dashboard-card-icon">
                {icon}
            </div>
            <h3>{title}</h3>
            <p>{description}</p>

            <div className="dashboard-card-link">
                Manage {title} →
            </div>
        </Link>
    );
}
