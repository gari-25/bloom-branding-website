"use client";
import { useEffect, useState } from "react";

export default function AboutContentPage() {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        founderName: "Sarah Chen",
        founderRole: "Creative Director & Founder",
        bioParagraph1: "\"I've always believed that branding is more than aesthetics—it's about capturing the essence of a dream and giving it wings to fly.\"",
        bioParagraph2: "With over 15 years in the creative industry, I've had the privilege of working with startups finding their voice and established brands rediscovering their purpose.",
        bioParagraph3: "At Bloom Branding, we've created a space where creativity flourishes, where ideas are nurtured, and where every project is an opportunity to make something beautiful and meaningful.",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        statExperience: "15+",
        statBrands: "200+",
        statAwards: "50+",
    });

    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleDisplayImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            alert("About page content updated successfully!");
        }, 1500);
    };

    if (loading) return <div className="loading-state">Loading...</div>;

    return (
        <>
            <style jsx>{`
                .loading-state {
                    text-align: center;
                    padding: 5rem 0;
                    color: #4D4038;
                    font-size: 1.125rem;
                }

                .about-container {
                    max-width: 768px;
                    margin: 0 auto;
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
                    margin-bottom: 2.5rem;
                }

                .page-title {
                    font-size: 2.25rem;
                    font-weight: 800;
                    color: #4D4038;
                    margin: 0;
                }

                .page-subtitle {
                    color: #78695D;
                    font-size: 1.125rem;
                    margin-top: 0.5rem;
                }

                .form-container {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 1.5rem;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
                    border: 1px solid #E8DED5;
                }

                .form-section {
                    margin-bottom: 2rem;
                }

                .section-header {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #4D4038;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #E8DED5;
                    margin-bottom: 1.5rem;
                }

                .section-number {
                    width: 2rem;
                    height: 2rem;
                    border-radius: 50%;
                    background: rgba(0, 61, 165, 0.1);
                    color: #003DA5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.875rem;
                    flex-shrink: 0;
                    font-weight: 700;
                }

                .input-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .input-group {
                    display: flex;
                    flex-direction: column;
                }

                .form-label {
                    display: block;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #78695D;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 0.5rem;
                    margin-left: 0.25rem;
                }

                .form-input {
                    width: 100%;
                    background: #FFF9E6;
                    border-radius: 0.75rem;
                    border: 2px solid transparent;
                    padding: 0.75rem 1rem;
                    color: #4D4038;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    font-size: 1rem;
                }

                .form-input:focus {
                    background: white;
                    border-color: #003DA5;
                    outline: none;
                }

                .image-upload-box {
                    background: #FFF9E6;
                    padding: 1.5rem;
                    border-radius: 1rem;
                    border: 1px solid #E8DED5;
                    margin-bottom: 1.5rem;
                }

                .image-preview-row {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .founder-image {
                    width: 96px;
                    height: 96px;
                    object-fit: cover;
                    border-radius: 50%;
                    border: 4px solid white;
                    box-shadow: 0 4px 12px rgba(0, 61, 165, 0.15);
                    flex-shrink: 0;
                }

                .image-placeholder {
                    width: 96px;
                    height: 96px;
                    background: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #C4B5A8;
                    font-weight: 700;
                    border: 2px dashed #E8DED5;
                    font-size: 0.75rem;
                    flex-shrink: 0;
                }

                .file-input-wrapper {
                    flex: 1;
                }

                .file-input {
                    display: block;
                    width: 100%;
                    font-size: 0.875rem;
                    color: #78695D;
                    cursor: pointer;
                }

                .file-input::file-selector-button {
                    margin-right: 1rem;
                    padding: 0.625rem 1.5rem;
                    border-radius: 9999px;
                    border: none;
                    font-size: 0.875rem;
                    font-weight: 700;
                    background: #003DA5;
                    color: white;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .file-input::file-selector-button:hover {
                    background: #002d7a;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 8px rgba(0, 61, 165, 0.2);
                }

                .file-hint {
                    font-size: 0.75rem;
                    color: #A89786;
                    margin-top: 0.5rem;
                    font-weight: 500;
                }

                .textarea-group {
                    margin-bottom: 1rem;
                }

                .form-textarea {
                    width: 100%;
                    background: #FFF9E6;
                    border-radius: 0.75rem;
                    border: 2px solid transparent;
                    padding: 0.75rem 1rem;
                    color: #4D4038;
                    transition: all 0.3s ease;
                    resize: vertical;
                    font-size: 1rem;
                    line-height: 1.5;
                }

                .form-textarea:focus {
                    background: white;
                    border-color: #003DA5;
                    outline: none;
                }

                .quote-textarea {
                    font-family: Georgia, serif;
                    font-style: italic;
                    font-size: 1.125rem;
                    line-height: 1.75;
                }

                .stats-section {
                    padding-top: 1.5rem;
                    border-top: 1px solid #E8DED5;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                }

                .stat-card {
                    background: #FFF9E6;
                    padding: 1rem;
                    border-radius: 0.75rem;
                    text-align: center;
                    border: 1px solid #E8DED5;
                    transition: all 0.3s ease;
                }

                .stat-card:hover {
                    background: white;
                    border-color: #003DA5;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 61, 165, 0.1);
                }

                .stat-label {
                    display: block;
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #78695D;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 0.5rem;
                }

                .stat-input {
                    width: 100%;
                    background: transparent;
                    text-align: center;
                    font-size: 1.5rem;
                    font-weight: 900;
                    color: #003DA5;
                    border: none;
                    outline: none;
                }

                .stat-input::placeholder {
                    color: #C4B5A8;
                }

                .button-section {
                    padding-top: 1.5rem;
                    border-top: 1px solid #E8DED5;
                }

                .submit-button {
                    width: 100%;
                    background: #003DA5;
                    color: white;
                    font-weight: 700;
                    padding: 1rem;
                    border-radius: 9999px;
                    border: none;
                    box-shadow: 0 4px 12px rgba(0, 61, 165, 0.2);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 1rem;
                }

                .submit-button:hover:not(:disabled) {
                    box-shadow: 0 8px 20px rgba(0, 61, 165, 0.3);
                    background: #002d7a;
                    transform: translateY(-2px);
                }

                .submit-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                @media (max-width: 768px) {
                    .input-grid,
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .page-title {
                        font-size: 1.875rem;
                    }

                    .form-container {
                        padding: 1.5rem;
                    }

                    .image-preview-row {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .about-container {
                        padding: 0 1rem;
                    }
                }

                @media (max-width: 640px) {
                    .page-title {
                        font-size: 1.5rem;
                    }

                    .section-header {
                        font-size: 1.125rem;
                    }

                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>

            <div className="about-container">
                <header className="page-header">
                    <h1 className="page-title">Founder Story</h1>
                    <p className="page-subtitle">Manage detailed bio, image, and stats.</p>
                </header>

                <div className="form-container">
                    {/* Founder Info */}
                    <section className="form-section">
                        <h2 className="section-header">
                            <span className="section-number">1</span>
                            Founder Profile
                        </h2>

                        <div className="input-grid">
                            <div className="input-group">
                                <label className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.founderName}
                                    onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                                />
                            </div>
                            <div className="input-group">
                                <label className="form-label">Role</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.founderRole}
                                    onChange={(e) => setFormData({ ...formData, founderRole: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Founder Image */}
                        <div className="image-upload-box">
                            <label className="form-label">Founder Image</label>
                            <div className="image-preview-row">
                                {formData.imageUrl ? (
                                    <img src={formData.imageUrl} alt="Founder" className="founder-image" />
                                ) : (
                                    <div className="image-placeholder">No Img</div>
                                )}
                                <div className="file-input-wrapper">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleDisplayImage}
                                        className="file-input"
                                    />
                                    <p className="file-hint">JPG, PNG or GIF. Max 5MB.</p>
                                </div>
                            </div>
                        </div>

                        <div className="textarea-group">
                            <label className="form-label">Bio Paragraph 1 (Quote Style)</label>
                            <textarea
                                rows={3}
                                className="form-textarea quote-textarea"
                                value={formData.bioParagraph1}
                                onChange={(e) => setFormData({ ...formData, bioParagraph1: e.target.value })}
                            />
                        </div>
                        <div className="textarea-group">
                            <label className="form-label">Bio Paragraph 2</label>
                            <textarea
                                rows={4}
                                className="form-textarea"
                                value={formData.bioParagraph2}
                                onChange={(e) => setFormData({ ...formData, bioParagraph2: e.target.value })}
                            />
                        </div>
                        <div className="textarea-group">
                            <label className="form-label">Bio Paragraph 3</label>
                            <textarea
                                rows={4}
                                className="form-textarea"
                                value={formData.bioParagraph3}
                                onChange={(e) => setFormData({ ...formData, bioParagraph3: e.target.value })}
                            />
                        </div>
                    </section>

                    {/* Stats */}
                    <section className="stats-section">
                        <h2 className="section-header">
                            <span className="section-number">2</span>
                            Key Statistics
                        </h2>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <label className="stat-label">Years Exp.</label>
                                <input
                                    type="text"
                                    className="stat-input"
                                    value={formData.statExperience}
                                    onChange={(e) => setFormData({ ...formData, statExperience: e.target.value })}
                                />
                            </div>
                            <div className="stat-card">
                                <label className="stat-label">Brands</label>
                                <input
                                    type="text"
                                    className="stat-input"
                                    value={formData.statBrands}
                                    onChange={(e) => setFormData({ ...formData, statBrands: e.target.value })}
                                />
                            </div>
                            <div className="stat-card">
                                <label className="stat-label">Awards</label>
                                <input
                                    type="text"
                                    className="stat-input"
                                    value={formData.statAwards}
                                    onChange={(e) => setFormData({ ...formData, statAwards: e.target.value })}
                                />
                            </div>
                        </div>
                    </section>

                    <div className="button-section">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="submit-button"
                        >
                            {saving ? "Saving Changes..." : "Save Content"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}