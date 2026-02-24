"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import AXIOS from "@/lib/axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

interface Category {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<{
    name?: string;
    description?: string;
    imageUrl?: string;
    isActive?: boolean;
  }>({});

  const [editingId, setEditingId] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const fetchCategories = async () => {
    try {
      const res = await AXIOS.get("/categories");
      setCategories(res.data.data);
    } catch {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await AXIOS.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm({ ...form, imageUrl: res.data.url });
      toast.success("Image uploaded successfully");
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.name) {
      toast.error("Category name is required");
      return;
    }

    const payload = {
      name: form.name,
      description: form.description,
      imageUrl: form.imageUrl,
      isActive: form.isActive,
    };

    try {
      if (editingId) {
        await AXIOS.patch(`/categories/${editingId}`, payload);
        toast.success("Category updated successfully");
      } else {
        await AXIOS.post("/categories", payload);
        toast.success("Category created successfully");
      }

      setForm({});
      setEditingId(null);
      fetchCategories();
    } catch {
      toast.error("Error saving category");
    }
  };

  const handleEdit = (category: Category) => {
    setForm({
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl,
      isActive: category.isActive,
    });
    setEditingId(category._id);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Category?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#542452",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await AXIOS.delete(`/categories/${id}`);
      toast.success("Category deleted successfully");
      fetchCategories();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-10">
      <h2 className="text-3xl font-bold text-[#542452]">
        Categories Management
      </h2>

      {/* Form */}
      <div className="bg-white p-6 rounded-2xl shadow border">
        <h3 className="text-lg font-semibold mb-4">
          {editingId ? "Edit Category" : "Create Category"}
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Category Name"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 border rounded-xl focus:ring-2 focus:ring-[#542452]"
          />

          <input
            type="text"
            placeholder="Description"
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-3 border rounded-xl focus:ring-2 focus:ring-[#542452]"
          />

          <div>
            <input type="file" onChange={handleFileUpload} />
            {uploading && (
              <p className="text-sm text-gray-500 mt-1">Uploading...</p>
            )}
            {form.imageUrl && (
              <img src={form.imageUrl} className="w-32 mt-3 rounded-lg" />
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isActive || false}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            />
            <span>Active</span>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-5 bg-[#542452] text-white px-6 py-3 rounded-xl"
        >
          {editingId ? "Update" : "Create"}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : paginatedCategories.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center">
                  No categories found
                </td>
              </tr>
            ) : (
              paginatedCategories.map((category) => (
                <tr key={category._id} className="border-t">
                  <td className="p-4">
                    {category.imageUrl && (
                      <img
                        src={category.imageUrl}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                    )}
                  </td>

                  <td className="p-4 font-medium">{category.name}</td>

                  <td className="p-4 text-gray-500">
                    {category.description || "-"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        category.isActive
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {category.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="p-4 text-right space-x-3">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(category._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-3">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === i + 1 ? "bg-[#542452] text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
