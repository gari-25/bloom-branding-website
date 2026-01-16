"use client";
import { useState } from "react";

export default function DashboardPage() {
    return (
        <>
            <style>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes shimmer {
                    0% { background-position: -1000px 0; }
                    100% { background-position: 1000px 0; }
                }
                
                @keyframes countUp {
                    from { opacity: 0; transform: scale(0.5); }
                    to { opacity: 1; transform: scale(1); }
                }
                
                .container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #f5f5f4 0%, #fafaf9 50%, #fefce8 100%);
                    padding: 64px 24px;
                }
                
                .content-wrapper {
                    max-width: 1280px;
                    margin: 0 auto;
                }
                
                .header-section {
                    margin-bottom: 48px;
                    animation: fadeInUp 0.6s ease-out forwards;
                }
                
                .main-title {
                    font-size: 48px;
                    font-weight: 800;
                    color: #1c1917;
                    letter-spacing: -0.025em;
                    margin-bottom: 12px;
                    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .subtitle {
                    font-size: 20px;
                    color: #57534e;
                    font-weight: 500;
                }
                
                .cards-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 32px;
                    margin-bottom: 64px;
                }
                
                @media (min-width: 768px) {
                    .cards-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
                
                @media (min-width: 1024px) {
                    .cards-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }
                
                .dashboard-card {
                    display: block;
                    text-decoration: none;
                    height: 100%;
                    animation: fadeInUp 0.6s ease-out forwards;
                }
                
                .card-inner {
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    border: 2px solid #e7e5e4;
                    padding: 32px;
                    height: 100%;
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    overflow: hidden;
                }
                
                .card-inner::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    transition: left 0.5s;
                }
                
                .dashboard-card:hover .card-inner {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
                    border-color: #93c5fd;
                }
                
                .dashboard-card:hover .card-inner::before {
                    left: 100%;
                }
                
                .icon-box {
                    width: 64px;
                    height: 64px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 32px;
                    margin-bottom: 24px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                
                .dashboard-card:hover .icon-box {
                    transform: scale(1.1) rotate(6deg);
                }
                
                .icon-blue {
                    background-color: #2563eb;
                    color: white;
                }
                
                .dashboard-card:hover .icon-blue {
                    background-color: #1d4ed8;
                }
                
                .icon-yellow {
                    background-color: #fde047;
                    color: #1c1917;
                }
                
                .dashboard-card:hover .icon-yellow {
                    background-color: #facc15;
                }
                
                .icon-brown {
                    background-color: #44403c;
                    color: white;
                }
                
                .dashboard-card:hover .icon-brown {
                    background-color: #292524;
                }
                
                .card-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: #1c1917;
                    margin-bottom: 12px;
                    transition: color 0.3s;
                }
                
                .dashboard-card:hover .card-title {
                    color: #2563eb;
                }
                
                .card-description {
                    color: #57534e;
                    font-size: 16px;
                    line-height: 1.6;
                    margin-bottom: 24px;
                    flex-grow: 1;
                }
                
                .card-link {
                    display: flex;
                    align-items: center;
                    color: #2563eb;
                    font-weight: 700;
                    font-size: 16px;
                    transition: gap 0.3s;
                }
                
                .dashboard-card:hover .card-link {
                    gap: 8px;
                }
                
                .arrow {
                    display: inline-block;
                    margin-left: 4px;
                    font-size: 20px;
                    transition: transform 0.3s;
                }
                
                .dashboard-card:hover .arrow {
                    transform: translateX(8px);
                }
                
                .stats-section {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
                
                .stats-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 16px;
                }
                
                .stats-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: #dbeafe;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    transition: all 0.3s;
                }
                
                .stats-icon:hover {
                    animation: float 0.6s ease-in-out;
                }
                
                .stats-title {
                    font-size: 24px;
                    font-weight: 700;
                    color: #1c1917;
                }
                
                .stats-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 32px;
                }
                
                @media (min-width: 768px) {
                    .stats-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
                
                .stat-card {
                    background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
                    border-radius: 16px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    border: 2px solid #e7e5e4;
                    padding: 32px;
                    transition: all 0.3s;
                    position: relative;
                    overflow: hidden;
                }
                
                .stat-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    transition: left 0.5s;
                }
                
                .stat-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
                    border-color: #93c5fd;
                }
                
                .stat-card:hover::before {
                    left: 100%;
                }
                
                .stat-label {
                    font-size: 12px;
                    font-weight: 700;
                    color: #57534e;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 16px;
                }
                
                .stat-content {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                }
                
                .stat-value {
                    font-size: 48px;
                    font-weight: 800;
                    color: #1c1917;
                    transition: color 0.3s;
                    animation: countUp 0.5s ease-out;
                }
                
                .stat-card:hover .stat-value {
                    color: #2563eb;
                }
                
                .stat-change {
                    font-size: 14px;
                    font-weight: 700;
                    padding: 8px 12px;
                    border-radius: 12px;
                    transition: all 0.3s;
                }
                
                .stat-change-positive {
                    background-color: #dcfce7;
                    color: #15803d;
                    border: 2px solid #bbf7d0;
                }
                
                .stat-card:hover .stat-change-positive {
                    background-color: #bbf7d0;
                }
                
                .stat-change-negative {
                    background-color: #fee2e2;
                    color: #b91c1c;
                    border: 2px solid #fecaca;
                }
                
                .stat-card:hover .stat-change-negative {
                    background-color: #fecaca;
                }
            `}</style>
            
            <div className="container">
                <div className="content-wrapper">
                    
                    {/* Header Section */}
                    <div className="header-section">
                        <h1 className="main-title">Dashboard</h1>
                        <p className="subtitle">Welcome back, admin. Here's your overview.</p>
                    </div>

                    {/* Main Cards Grid */}
                    <div className="cards-grid">
                        <DashboardCard 
                            href="/admin/homepage-content" 
                            icon="🏠" 
                            title="Homepage" 
                            description="Manage homepage content and hero section"
                            color="blue"
                        />
                        
                        <DashboardCard 
                            href="/admin/services" 
                            icon="✨" 
                            title="Services" 
                            description="Edit service offerings and descriptions"
                            color="yellow"
                        />
                        
                        <DashboardCard 
                            href="/admin/portfolio" 
                            icon="🎨" 
                            title="Portfolio" 
                            description="Showcase your best branding projects"
                            color="brown"
                        />
                        
                        <DashboardCard 
                            href="/admin/contact" 
                            icon="📧" 
                            title="Contact" 
                            description="Manage inquiries and contact information"
                            color="blue"
                        />
                    </div>

                    {/* Quick Stats Section */}
                    <div className="stats-section">
                        <div className="stats-header">
                            <div className="stats-icon">
                                <span>📊</span>
                            </div>
                            <h2 className="stats-title">Quick Statistics</h2>
                        </div>
                        
                        <div className="stats-grid">
                            <StatCard 
                                label="Total Views" 
                                value="12,345" 
                                change="+12.5%" 
                                isPositive={true}
                            />
                            <StatCard 
                                label="Active Projects" 
                                value="8" 
                                change="+2" 
                                isPositive={true}
                            />
                            <StatCard 
                                label="Inquiries" 
                                value="23" 
                                change="+5" 
                                isPositive={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function DashboardCard({ 
    href, 
    icon, 
    title, 
    description,
    color = "blue"
}: { 
    href: string; 
    icon: string; 
    title: string; 
    description: string;
    color?: "blue" | "yellow" | "brown";
}) {
    const iconClass = color === "blue" ? "icon-blue" : color === "yellow" ? "icon-yellow" : "icon-brown";

    return (
        <a href={href} className="dashboard-card">
            <div className="card-inner">
                <div className={`icon-box ${iconClass}`}>
                    {icon}
                </div>
                
                <h2 className="card-title">
                    {title}
                </h2>
                
                <p className="card-description">
                    {description}
                </p>

                <div className="card-link">
                    Manage {title}
                    <span className="arrow">→</span>
                </div>
            </div>
        </a>
    );
}

function StatCard({
    label,
    value,
    change,
    isPositive
}: {
    label: string;
    value: string;
    change: string;
    isPositive: boolean;
}) {
    return (
        <div className="stat-card">
            <p className="stat-label">
                {label}
            </p>
            <div className="stat-content">
                <p className="stat-value">
                    {value}
                </p>
                <span className={isPositive ? "stat-change stat-change-positive" : "stat-change stat-change-negative"}>
                    {change}
                </span>
            </div>
        </div>
    );
}