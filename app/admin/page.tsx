"use client";

import { ShoppingBag, LayoutGrid, Image } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-[#542452]">
          Dashboard Overview
        </h2>
        <p className="text-gray-500 mt-2">
          Welcome back! Here’s what’s happening in your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Banners Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">
                Total Banners
              </h3>
              <p className="text-3xl font-bold mt-2 text-gray-800">12</p>
            </div>
            <div className="bg-[#542452]/10 p-3 rounded-xl">
              <Image className="text-[#542452]" size={24} />
            </div>
          </div>
        </div>

        {/* Categories Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">
                Total Categories
              </h3>
              <p className="text-3xl font-bold mt-2 text-gray-800">8</p>
            </div>
            <div className="bg-[#542452]/10 p-3 rounded-xl">
              <LayoutGrid className="text-[#542452]" size={24} />
            </div>
          </div>
        </div>

        {/* Products Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 text-sm font-medium">
                Total Products
              </h3>
              <p className="text-3xl font-bold mt-2 text-gray-800">245</p>
            </div>
            <div className="bg-[#542452]/10 p-3 rounded-xl">
              <ShoppingBag className="text-[#542452]" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Recent Activity
        </h3>

        <div className="space-y-4 text-sm text-gray-600">
          <div className="flex justify-between border-b pb-2">
            <span>New banner added</span>
            <span className="text-gray-400">2 hours ago</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>Category updated</span>
            <span className="text-gray-400">Yesterday</span>
          </div>

          <div className="flex justify-between">
            <span>Product stock modified</span>
            <span className="text-gray-400">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
