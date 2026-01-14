import Link from "next/link";

export default function DashboardPage() {
    return (
        <>
            <header className="mb-10">
                <h1 className="text-4xl font-extrabold text-[#3D2925]">Dashboard</h1>
                <p className="text-[#624A41] mt-2 text-lg">Welcome back, admin. Here is your overview.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            className="group bg-white p-8 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-transparent hover:border-[#003DA5]/10 transition-all duration-300 hover:-translate-y-2 flex flex-col items-start"
        >
            <div className="w-16 h-16 bg-[#FBF7F4] rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-[#003DA5]/5 transition-all duration-300">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-[#3D2925] mb-3 group-hover:text-[#003DA5] transition-colors">{title}</h3>
            <p className="text-[#624A41] leading-relaxed">{description}</p>

            <div className="mt-8 text-[#003DA5] font-bold text-sm uppercase tracking-wider opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Manage {title} →
            </div>
        </Link>
    );
}
