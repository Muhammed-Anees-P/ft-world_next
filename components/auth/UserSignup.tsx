"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRegisterMutation } from "@/hooks/useRegisterMutation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Signup() {
  const [type, setType] = useState<"person" | "company">("person");
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    // address: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<any>({});

  const { mutate, isPending } = useRegisterMutation();

  const validate = () => {
    const newErrors: any = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    // if (!form.address.trim()) newErrors.address = "Address is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Remove error while typing
    setErrors((prev: any) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    mutate(
      {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        email: form.email,
        // address: form.address,
        password: form.password,
      },
      {
        onSuccess: () => {
          toast.success("Registered & Logged in successfully");
          router.push("/");
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Registration failed");
        },
      },
    );
  };

  return (
    <main className="w-full min-h-screen bg-[white] flex items-center justify-center">
      <div
        className="w-[1145px] h-[715px] bg-white rounded-[20px] flex overflow-hidden"
        style={{ boxShadow: "0px 0px 4px 0px #00000040" }}
      >
        {/* ================= LEFT SIDE ================= */}
        <div className="w-1/2 bg-[#FAFAFA] flex items-center justify-center">
          <div className="w-[450px]">
            <h2 className="text-[28px] font-semibold text-center">Sign Up</h2>

            <div className="flex justify-center gap-2 mt-2 text-sm">
              <button
                onClick={() => setType("person")}
                className={
                  type === "person" ? "text-black font-medium" : "text-gray-400"
                }
              >
                Person
              </button>
              <span className="text-gray-400">/</span>
              <button
                onClick={() => setType("company")}
                className={
                  type === "company"
                    ? "text-black font-medium"
                    : "text-gray-400"
                }
              >
                Company
              </button>
            </div>

            {/* ================= PERSON FORM ================= */}
            {type === "person" && (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="flex gap-4">
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className={`w-1/2 inputStyle ${
                      errors.firstName ? "border-red-500" : ""
                    }`}
                  />

                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Second name"
                    className={`w-1/2 inputStyle ${
                      errors.lastName ? "border-red-500" : ""
                    }`}
                  />
                </div>

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone no."
                  className={`w-full inputStyle ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />

                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  className={`w-full inputStyle ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />

                {/* <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Enter your Address"
                  className={`w-full inputStyle ${
                    errors.address ? "border-red-500" : ""
                  }`}
                /> */}

                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full inputStyle ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />

                <input
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className={`w-full inputStyle ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />

                <button
                  type="submit"
                  disabled={isPending}
                  className="submitBtn"
                >
                  {isPending ? "Creating..." : "Create Account"}
                </button>
              </form>
            )}
            {/* ================= COMPANY FORM ================= */}
            {type === "company" && (
              <form className="mt-8 space-y-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter your company name"
                    className="flex-1 inputStyle"
                  />

                  <div className="w-[120px] h-[120px] border border-gray-300 rounded-[12px] flex flex-col items-center justify-center text-gray-500 text-sm cursor-pointer hover:border-[#542452] transition">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl mb-2">
                      +
                    </div>
                    Add logo
                  </div>
                </div>

                <textarea
                  rows={2}
                  placeholder="Enter your Address"
                  className="w-full inputStyle"
                />

                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter your phone no."
                    className="w-1/2 inputStyle"
                  />
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    className="w-1/2 inputStyle"
                  />
                </div>

                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Country"
                    className="w-1/3 inputStyle"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="w-1/3 inputStyle"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="w-1/3 inputStyle"
                  />
                </div>

                <input
                  type="text"
                  placeholder="TRN no."
                  className="w-full inputStyle"
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full inputStyle"
                />

                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full inputStyle"
                />

                <button className="submitBtn">Create Account</button>
              </form>
            )}
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="relative w-1/2 rounded-r-[20px] overflow-hidden">
          <Image src="/login.jpg" alt="signup" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          <div className="absolute bottom-16 left-10 right-10 text-white">
            <h2 className="text-[26px] font-semibold leading-snug">
              Get your all buying problems solved today
            </h2>

            <p className="text-sm mt-6 text-gray-300">Already have account</p>

            <Link
              href="/login"
              className="mt-4 block w-full h-[48px] bg-[#542452] text-white rounded-[10px] text-sm font-medium flex items-center justify-center hover:opacity-90 transition"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .inputStyle {
          border: 1px solid #d1d5db;
          border-radius: 10px;
          padding: 10px 16px;
          font-size: 14px;
          outline: none;
          width: 100%;
        }

        .inputStyle:focus {
          border-color: #542452;
        }

        .submitBtn {
          width: 100%;
          height: 48px;
          background: #542452;
          color: white;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          transition: 0.3s;
        }

        .submitBtn:hover {
          opacity: 0.95;
        }

        .submitBtn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </main>
  );
}
