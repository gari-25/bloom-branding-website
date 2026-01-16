"use client";

import { useEffect, useState } from "react";

export default function HomepageContentPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    heroTitleLine1: "Blooming",
    heroTitleAccent: "Your Brand",
    heroTitleLine3: "Into Greatness",
    heroSubtitle:
      "Bringing synergy of aesthetics and expertise to help your brand bloom\nwe nurture your vision into a thriving brand that stands out and flourishes.",
    ctaText: "Start Your Journey",
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Homepage content updated successfully!");
    }, 1500);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fafaf9',
        fontSize: '16px',
        color: '#57534e'
      }}>
        Loading...
      </div>
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
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f5f4 0%, #fafaf9 50%, #fefce8 100%);
          padding: 48px 16px;
        }
        
        .content-wrapper {
          max-width: 1280px;
          margin: 0 auto;
        }
        
        .header-section {
          margin-bottom: 32px;
          animation: fadeIn 0.6s ease-out;
        }
        
        .page-title {
          font-size: 36px;
          font-weight: 700;
          color: #1c1917;
          margin-bottom: 8px;
        }
        
        .page-subtitle {
          font-size: 18px;
          color: #57534e;
        }
        
        .form-card {
          background: white;
          border: 2px solid #e7e5e4;
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 32px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          animation: fadeIn 0.6s ease-out 0.1s both;
        }
        
        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 24px;
          border-bottom: 2px solid #e7e5e4;
          margin-bottom: 32px;
        }
        
        .icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: transform 0.3s;
        }
        
        .icon-circle:hover {
          transform: scale(1.1) rotate(5deg);
        }
        
        .icon-blue {
          background-color: #dbeafe;
        }
        
        .icon-yellow {
          background-color: #fef3c7;
        }
        
        .section-title {
          font-size: 24px;
          font-weight: 700;
          color: #1c1917;
        }
        
        .form-group {
          margin-bottom: 24px;
        }
        
        .form-label {
          display: block;
          font-size: 12px;
          font-weight: 700;
          color: #57534e;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }
        
        .input-field {
          width: 100%;
          padding: 12px 16px;
          font-size: 16px;
          font-weight: 500;
          border-radius: 12px;
          border: 2px solid #e7e5e4;
          background-color: #fefce8;
          transition: all 0.3s;
          font-family: inherit;
        }
        
        .input-field:focus {
          outline: none;
          border-color: #2563eb;
          background-color: white;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        
        .input-accent {
          background-color: #eff6ff;
          border-color: #bfdbfe;
          color: #1d4ed8;
          font-weight: 700;
        }
        
        .input-accent:focus {
          border-color: #2563eb;
          background-color: white;
        }
        
        .textarea-field {
          width: 100%;
          padding: 12px 16px;
          font-size: 16px;
          line-height: 1.6;
          border-radius: 12px;
          border: 2px solid #e7e5e4;
          background-color: #fefce8;
          resize: none;
          transition: all 0.3s;
          font-family: inherit;
        }
        
        .textarea-field:focus {
          outline: none;
          border-color: #2563eb;
          background-color: white;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        
        .input-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }
        
        @media (min-width: 1024px) {
          .input-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .button-container {
          padding-top: 24px;
          border-top: 2px solid #e7e5e4;
        }
        
        .save-button {
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 9999px;
          background-color: #2563eb;
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .save-button:hover:not(:disabled) {
          background-color: #1d4ed8;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
          transform: scale(1.05);
        }
        
        .save-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .preview-card {
          background: white;
          border: 2px solid #e7e5e4;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          animation: fadeIn 0.6s ease-out 0.2s both;
        }
        
        .preview-content {
          background: linear-gradient(135deg, #f5f5f4 0%, #fefce8 50%, #f5f5f4 100%);
          border-radius: 16px;
          padding: 64px 32px;
          text-align: center;
          border: 2px solid #e7e5e4;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .preview-title {
          font-size: 48px;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.025em;
        }
        
        @media (min-width: 640px) {
          .preview-title {
            font-size: 60px;
          }
        }
        
        @media (min-width: 1024px) {
          .preview-title {
            font-size: 72px;
          }
        }
        
        .preview-title-line {
          display: block;
          margin-bottom: 8px;
        }
        
        .preview-title-normal {
          color: #1c1917;
        }
        
        .preview-title-accent {
          color: #2563eb;
          animation: pulse 2s ease-in-out infinite;
        }
        
        .preview-subtitle {
          margin-top: 32px;
          font-size: 18px;
          color: #57534e;
          white-space: pre-line;
          max-width: 768px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }
        
        @media (min-width: 640px) {
          .preview-subtitle {
            font-size: 20px;
          }
        }
        
        .preview-cta {
          margin-top: 40px;
          padding: 16px 40px;
          font-size: 18px;
          font-weight: 700;
          border-radius: 9999px;
          background-color: #2563eb;
          color: white;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s;
        }
        
        .preview-cta:hover {
          background-color: #1d4ed8;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);
          transform: scale(1.05);
        }
        
        @media (min-width: 640px) {
          .page-title {
            font-size: 42px;
          }
          
          .page-container {
            padding: 48px 24px;
          }
        }
        
        @media (min-width: 1024px) {
          .page-container {
            padding: 48px 32px;
          }
        }
      `}</style>
      
      <div className="page-container">
        <div className="content-wrapper">
          {/* Header */}
          <header className="header-section">
            <h1 className="page-title">Homepage Content</h1>
            <p className="page-subtitle">
              Manage your hero section content and preview changes in real-time
            </p>
          </header>

          {/* FORM */}
          <div className="form-card">
            <div className="section-header">
              <div className="icon-circle icon-blue">
                <span>✏️</span>
              </div>
              <h2 className="section-title">Hero Section Editor</h2>
            </div>

            {/* Titles */}
            <div className="input-grid">
              <div className="form-group">
                <label className="form-label">Title Line 1</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.heroTitleLine1}
                  onChange={(e) =>
                    setFormData({ ...formData, heroTitleLine1: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Accent Text (Highlighted)</label>
                <input
                  type="text"
                  className="input-field input-accent"
                  value={formData.heroTitleAccent}
                  onChange={(e) =>
                    setFormData({ ...formData, heroTitleAccent: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label className="form-label">Title Line 3</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.heroTitleLine3}
                  onChange={(e) =>
                    setFormData({ ...formData, heroTitleLine3: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Subtitle */}
            <div className="form-group">
              <label className="form-label">Subtitle / Description</label>
              <textarea
                rows={4}
                className="textarea-field"
                value={formData.heroSubtitle}
                onChange={(e) =>
                  setFormData({ ...formData, heroSubtitle: e.target.value })
                }
              />
            </div>

            {/* CTA */}
            <div className="form-group">
              <label className="form-label">Call-to-Action Button Text</label>
              <input
                type="text"
                className="input-field"
                value={formData.ctaText}
                onChange={(e) =>
                  setFormData({ ...formData, ctaText: e.target.value })
                }
              />
            </div>

            {/* Save */}
            <div className="button-container">
              <button
                onClick={handleSave}
                disabled={saving}
                className="save-button"
              >
                {saving ? "Saving Changes..." : "💾 Save Changes"}
              </button>
            </div>
          </div>

          {/* PREVIEW */}
          <div className="preview-card">
            <div className="section-header">
              <div className="icon-circle icon-yellow">
                <span>👁️</span>
              </div>
              <h3 className="section-title">Live Preview</h3>
            </div>

            <div className="preview-content">
              <h1 className="preview-title">
                <span className="preview-title-line preview-title-normal">
                  {formData.heroTitleLine1}
                </span>
                <span className="preview-title-line preview-title-accent">
                  {formData.heroTitleAccent}
                </span>
                <span className="preview-title-line preview-title-normal">
                  {formData.heroTitleLine3}
                </span>
              </h1>

              <p className="preview-subtitle">{formData.heroSubtitle}</p>

              <button className="preview-cta">{formData.ctaText}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}