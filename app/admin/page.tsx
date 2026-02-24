export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Banners</h3>
          <p className="text-2xl font-bold mt-2">12</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Categories</h3>
          <p className="text-2xl font-bold mt-2">8</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Products</h3>
          <p className="text-2xl font-bold mt-2">245</p>
        </div>
      </div>
    </div>
  );
}