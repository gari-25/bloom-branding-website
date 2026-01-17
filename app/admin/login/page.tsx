"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";
import "../../../styles/admin.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      // Success is handled by auth state observer in layout, but we push just in case
      router.push("/admin/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-container">
      {/* Decorative Shapes */}
      <div className="login-bg-shape-1"></div>
      <div className="login-bg-shape-2"></div>

      <div className="login-form-container">
        <div className="login-header">
          <span className="login-emoji">🌸</span>
          <h1>
            Welcome Back
          </h1>
          <p>
            Sign in to manage Bloom Branding
          </p>
        </div>

        <div className="form-group">
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="admin@bloom.com"
              className="form-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="•••••••"
              className="form-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="login-btn"
          >
            {loading ? "Signing in..." : "Enter Dashboard →"}
          </button>
        </div>
      </div>
    </main>
  );
}
