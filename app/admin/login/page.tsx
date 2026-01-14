"use client";

import { useState } from "react";
import { login } from "@/lib/auth";
import { useRouter } from "next/navigation";

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
    <main className="min-h-screen flex items-center justify-center px-4 bg-[#FBF7F4] relative overflow-hidden">
      {/* Decorative Shapes */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#003DA5]/20 to-[#BDAF62]/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#892F1A]/10 to-[#003DA5]/10 blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 relative z-10 transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block">🌸</span>
          <h1 className="text-3xl font-bold text-[#3D2925] mb-2 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-[#624A41] text-sm font-medium">
            Sign in to manage Bloom Branding
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">Email</label>
            <input
              type="email"
              placeholder="admin@bloom.com"
              className="w-full rounded-xl bg-white border border-[#3D2925]/10 px-5 py-3 text-[#3D2925] placeholder-[#3D2925]/30 focus:outline-none focus:ring-2 focus:ring-[#003DA5]/20 focus:border-[#003DA5] transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#3D2925]/70 uppercase tracking-wider mb-2 ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl bg-white border border-[#3D2925]/10 px-5 py-3 text-[#3D2925] placeholder-[#3D2925]/30 focus:outline-none focus:ring-2 focus:ring-[#003DA5]/20 focus:border-[#003DA5] transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm text-center font-medium animate-pulse">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-2 rounded-full bg-[#892F1A] text-white py-4 font-bold text-lg hover:bg-[#6b2415] hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {loading ? "Signing in..." : "Enter Dashboard →"}
          </button>
        </div>
      </div>
    </main>
  );
}
