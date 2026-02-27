"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLoginMutation } from "@/hooks/useLoginMutation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const { mutate, isPending } = useLoginMutation();

  const [form, setForm] = useState({
    identifier: "", // email OR phone
    password: "",
  });

  const [errors, setErrors] = useState<any>({});

  // Detect email or phone
  const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isPhone = (value: string) => /^[0-9]{6,15}$/.test(value);

  const validate = () => {
    const newErrors: any = {};

    if (!form.identifier.trim()) {
      newErrors.identifier = "Email or phone is required";
    } else if (!isEmail(form.identifier) && !isPhone(form.identifier)) {
      newErrors.identifier = "Enter valid email or phone number";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev: any) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const payload: any = {
      password: form.password,
    };

    if (isEmail(form.identifier)) {
      payload.email = form.identifier;
    } else {
      payload.phone = form.identifier;
    }

    mutate(payload, {
      onSuccess: () => {
        toast.success("Login successful");
        router.push("/");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Login failed");
      },
    });
  };

  return (
    <main className="w-full min-h-screen bg-[white] flex items-center justify-center">
      <div
        className="w-[1000px] h-[715px] bg-white rounded-[20px] flex overflow-hidden"
        style={{ boxShadow: "0px 0px 4px 0px #00000040" }}
      >
        {/* ================= LEFT SIDE ================= */}
        <div className="relative w-[50%] h-full rounded-l-[20px] overflow-hidden">
          <Image src="/login.jpg" alt="login" fill className="object-cover" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          <div className="absolute bottom-36 left-10 right-10 text-white">
            <h2 className="text-[26px] font-semibold leading-snug">
              Get your all buying problems solved today
            </h2>

            <p className="text-sm mt-6 text-gray-300 text-center">
              You don't have account
            </p>

            <Link
              href="/register"
              className="mt-4 block w-full h-[48px] bg-[#542452] text-white rounded-[10px] text-sm font-medium flex items-center justify-center hover:opacity-90 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="w-[50%] h-full bg-[#FAFAFA] flex items-center justify-center">
          <div className="w-[400px]">
            <h2 className="text-[22px] font-semibold text-center mb-12">
              Log In
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                name="identifier"
                value={form.identifier}
                onChange={handleChange}
                placeholder="Enter your Email / Phone Number"
                className={`w-full border rounded-[8px] px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#542452] ${
                  errors.identifier ? "border-red-500" : "border-gray-300"
                }`}
              />

              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full border rounded-[8px] px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#542452] ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />

              <button
                type="submit"
                disabled={isPending}
                className="w-full h-[44px] bg-[#542452] text-white rounded-[8px] text-sm font-medium hover:opacity-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isPending ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
