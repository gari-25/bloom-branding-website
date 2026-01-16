"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email && password) {
        alert("Login successful!");
        setLoading(false);
      } else {
        setError("Invalid email or password");
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        .main-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: linear-gradient(135deg, #f5f5f4 0%, #fafaf9 50%, #fefce8 100%);
          position: relative;
          overflow: hidden;
        }

        .decorative-shape-1 {
          position: absolute;
          top: -15%;
          right: -8%;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(253, 224, 71, 0.15));
          filter: blur(140px);
          pointer-events: none;
        }

        .decorative-shape-2 {
          position: absolute;
          bottom: -12%;
          left: -6%;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(68, 64, 60, 0.08), rgba(37, 99, 235, 0.12));
          filter: blur(120px);
          pointer-events: none;
        }

        .login-card {
          width: 100%;
          max-width: 32rem;
          background: white;
          border-radius: 1.5rem;
          padding: 3rem;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.12);
          border: 2px solid #e7e5e4;
          position: relative;
          z-index: 10;
          transition: all 0.3s ease;
          animation: fadeIn 0.5s ease-out;
        }

        .login-card:hover {
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.15);
        }

        .header-section {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .icon-container {
          width: 6rem;
          height: 6rem;
          margin: 0 auto 1.5rem;
          background: linear-gradient(135deg, #fef08a, #fef9c3, #f5f5f4);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .icon-container:hover {
          transform: scale(1.05) rotate(3deg);
        }

        .icon-container span {
          font-size: 3.75rem;
        }

        .main-heading {
          font-size: 3rem;
          font-weight: 800;
          color: #292524;
          margin-bottom: 0.75rem;
          line-height: 1.2;
          letter-spacing: -0.025em;
        }

        .sub-heading {
          color: #57534e;
          font-size: 1.125rem;
          font-weight: 500;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 700;
          color: #57534e;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
          margin-left: 0.25rem;
        }

        .form-input {
          width: 100%;
          border-radius: 0.75rem;
          background: #fefce8;
          border: 2px solid #e7e5e4;
          padding: 1rem 1.25rem;
          color: #292524;
          font-size: 1rem;
          transition: all 0.3s ease;
          outline: none;
        }

        .form-input::placeholder {
          color: #a8a29e;
        }

        .form-input:focus {
          border-color: #2563eb;
          background: white;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .error-message {
          padding: 1rem;
          border-radius: 0.75rem;
          background: #fef2f2;
          border: 2px solid #fca5a5;
          color: #b91c1c;
          font-size: 1rem;
          text-align: center;
          font-weight: 700;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          animation: slideInFromTop 0.3s ease-out;
        }

        .error-icon {
          display: inline-block;
          margin-right: 0.5rem;
        }

        .submit-button {
          width: 100%;
          margin-top: 1rem;
          border-radius: 9999px;
          background: #2563eb;
          color: white;
          padding: 1.25rem;
          font-weight: 700;
          font-size: 1.125rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 12px 35px rgba(0, 61, 165, 0.35);
          transition: all 0.3s ease;
          transform: translateY(0);
        }

        .submit-button:hover:not(:disabled) {
          background: #1d4ed8;
          box-shadow: 0 16px 45px rgba(0, 61, 165, 0.45);
          transform: translateY(-4px);
        }

        .submit-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .footer-section {
          margin-top: 2.5rem;
          padding-top: 2rem;
          border-top: 2px solid #e7e5e4;
          text-align: center;
        }

        .footer-text {
          color: #78716c;
          font-size: 0.875rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .status-dot {
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          background: #2563eb;
          border-radius: 50%;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .spinner {
          width: 1.5rem;
          height: 1.5rem;
          animation: spin 1s linear infinite;
        }

        .spinner circle {
          opacity: 0.25;
        }

        .spinner path {
          opacity: 0.75;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInFromTop {
          from { 
            opacity: 0;
            transform: translateY(-8px); 
          }
          to { 
            opacity: 1;
            transform: translateY(0); 
          }
        }

        @media (max-width: 640px) {
          .login-card {
            padding: 2rem;
          }

          .main-heading {
            font-size: 2.25rem;
          }

          .icon-container {
            width: 5rem;
            height: 5rem;
          }

          .icon-container span {
            font-size: 3rem;
          }
        }
      `}</style>
      
      <main className="main-container">
        <div className="decorative-shape-1" />
        <div className="decorative-shape-2" />

        <div className="login-card">
          <div className="header-section">
            <div className="icon-container">
              <span>🌸</span>
            </div>
            <h1 className="main-heading">Welcome Back</h1>
            <p className="sub-heading">Sign in to manage Bloom Branding</p>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                placeholder="admin@bloom.com"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="submit-button"
            >
              {loading ? (
                <span className="button-content">
                  <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing in...</span>
                </span>
              ) : (
                <span className="button-content">
                  <span>Enter Dashboard</span>
                  <span style={{fontSize: '1.25rem'}}>→</span>
                </span>
              )}
            </button>
          </div>

          <div className="footer-section">
            <p className="footer-text">
              <span className="status-dot"></span>
              Protected by Bloom Branding
            </p>
          </div>
        </div>
      </main>
    </>
  );
}