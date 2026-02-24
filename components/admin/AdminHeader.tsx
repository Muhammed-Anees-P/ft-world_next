"use client";

export default function AdminHeader() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Admin Panel</h1>

      <button
        onClick={() => {
          localStorage.removeItem("access_token");
          window.location.href = "/";
        }}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>
    </header>
  );
}
