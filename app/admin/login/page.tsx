"use client";

import { useState } from "react";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      alert("Logged in successfully ✅");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral-900 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-semibold mb-2 text-center">
          Admin Login
        </h1>
        <p className="text-neutral-400 text-sm mb-6 text-center">
          Bloom Branding CMS Access
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/20"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/20"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-2 rounded-lg bg-white text-black py-3 font-medium hover:bg-neutral-200 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </div>
    </main>
  );
}
