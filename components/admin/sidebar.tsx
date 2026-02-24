"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `block px-4 py-3 rounded-lg ${
      pathname === path
        ? "bg-purple-600 text-white"
        : "text-gray-700 hover:bg-purple-100"
    }`;

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6 text-purple-700">FT-World Admin</h2>

      <nav className="space-y-2">
        <Link href="/admin" className={linkClass("/admin")}>
          Dashboard
        </Link>

        <Link href="/admin/banners" className={linkClass("/admin/banners")}>
          Banners
        </Link>

        <Link
          href="/admin/categories"
          className={linkClass("/admin/categories")}
        >
          Categories
        </Link>
      </nav>
    </aside>
  );
}
