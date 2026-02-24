"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import AdminHeader from "@/components/admin/AdminHeader";
import Sidebar from "@/components/admin/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (pathname === "/admin/login") {
      setChecking(false);
      return;
    }

    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);

      if (!decoded.roles?.includes("superadmin")) {
        router.push("/");
      } else {
        setChecking(false);
      }
    } catch {
      localStorage.removeItem("access_token");
      router.push("/admin/login");
    }
  }, [pathname]);

  if (checking) return null;

  // Do not show sidebar/header on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}