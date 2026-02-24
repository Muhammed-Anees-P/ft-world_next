"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import AXIOS from "@/lib/axios";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        if (decoded.roles?.includes("superadmin")) {
          router.push("/admin");
        }
      } catch {
        localStorage.removeItem("access_token");
      }
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await AXIOS.post("/auth/login", {
        username,
        password,
      });

      const token = res.data.access_token;
      localStorage.setItem("access_token", token);

      const decoded: any = jwtDecode(token);

      if (!decoded.roles?.includes("superadmin")) {
        setError("You are not authorized as admin");
        localStorage.removeItem("access_token");
        return;
      }

      router.push("/admin");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE - CREATIVE SECTION */}
      <div className="hidden lg:flex w-1/2 bg-[#542452] text-white relative overflow-hidden items-center justify-center p-16">
        {/* Decorative Blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-400 opacity-20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Manage Your <br />
            E-Commerce Empire
          </h1>

          <p className="text-purple-200 mb-8">
            Access your dashboard to control banners, categories, products and
            everything powering FT-World.
          </p>

          <div className="space-y-3 text-sm text-purple-200">
            <p>✔ Secure Superadmin Access</p>
            <p>✔ Real-time Management</p>
            <p>✔ Powerful Control Panel</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#542452]">
              FT-World Admin
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Sign in to your dashboard
            </p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="mt-2 w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#542452] focus:outline-none transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#542452] focus:outline-none transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#542452] hover:opacity-90 transition text-white p-3 rounded-xl font-semibold"
            >
              {loading ? "Signing In..." : "Login to Dashboard"}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-8">
            FT-World © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
