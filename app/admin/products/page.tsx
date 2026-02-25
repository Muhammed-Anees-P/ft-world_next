"use client";

import { useEffect, useState } from "react";
import AXIOS from "@/lib/axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Pencil, Trash2, Plus, X } from "lucide-react";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  category: Category;
  images: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialForm = {
    name: "",
    slug: "",
    description: "",
    category: "",
    images: [] as string[],
    price: "",
    stock: "",
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await AXIOS.get("/products");
      setProducts(res.data.data);
    } catch {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await AXIOS.get("/categories");
      setCategories(res.data.data);
    } catch {
      toast.error("Failed to fetch categories");
    }
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingId(product._id);

      // Only allowed fields
      setForm({
        name: product.name,
        slug: product.slug,
        description: product.description || "",
        category: product.category?._id || "",
        images: product.images || [],
        price: product.price.toString(),
        stock: product.stock.toString(),
      });
    } else {
      setEditingId(null);
      setForm(initialForm);
    }

    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditingId(null);
    setForm(initialForm);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    try {
      setUploading(true);

      const uploaded: string[] = [];

      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);

        const res = await AXIOS.post("/upload", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        uploaded.push(res.data.url);
      }

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...uploaded],
      }));

      toast.success("Images uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.category) {
      toast.error("Required fields missing");
      return;
    }

    // Only DTO allowed fields
    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      category: form.category,
      images: form.images,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    try {
      if (editingId) {
        await AXIOS.patch(`/products/${editingId}`, payload);
        toast.success("Product updated");
      } else {
        await AXIOS.post("/products", payload);
        toast.success("Product created");
      }

      fetchProducts();
      closeModal();
    } catch {
      toast.error("Error saving product");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#542452",
    });

    if (!result.isConfirmed) return;

    try {
      await AXIOS.delete(`/products/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#542452]">Products</h2>

        <button
          onClick={() => openModal()}
          className="bg-[#542452] text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-4">
                    <img
                      src={p.images?.[0]}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-4">{p.name}</td>
                  <td className="p-4">{p.category?.name}</td>
                  <td className="p-4">${p.price}</td>
                  <td className="p-4">{p.stock}</td>
                  <td className="p-4 text-right space-x-3">
                    <button
                      onClick={() => openModal(p)}
                      className="text-blue-500"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-500"
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

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-2xl p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500"
            >
              <X />
            </button>

            <h3 className="text-xl font-semibold mb-6">
              {editingId ? "Edit Product" : "Add Product"}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                placeholder="Product Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="p-3 border rounded-xl"
              />

              <input
                placeholder="Slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="p-3 border rounded-xl"
              />

              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="p-3 border rounded-xl"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="p-3 border rounded-xl"
              />

              <input
                placeholder="Stock"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="p-3 border rounded-xl"
              />

              <input type="file" multiple onChange={handleFileUpload} />

              <div className="col-span-2 flex gap-3 flex-wrap">
                {form.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="mt-6 bg-[#542452] text-white px-6 py-3 rounded-xl"
            >
              {editingId ? "Update Product" : "Create Product"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
