"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useProductStore } from "@/store/productStore";
import { categoriesQuery } from "@/hooks/userCategoriesQuery";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/services/productServices";
import { uploadImage } from "@/services/bannerService";
import { useProductQuery } from "@/hooks/useProductQuery";
import { IProduct } from "@/types/IProducts;";
import { ICategory } from "@/types/ICategory";

export default function ProductsPage() {
  const queryClient = useQueryClient();
  const { isLoading } = useProductQuery();
  const products = useProductStore((state) => state.products);

  // ================= CATEGORIES QUERY =================

  const { data: categories = [] } = useQuery(categoriesQuery());

  const [uploading, setUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialForm = {
    name: "",
    slug: "",
    description: "",
    category: "",
    images: [] as string[],
    dicountPrice: "",
    originalPrice: "",
    stock: "",
    isActive: true,
    isSuggestedForHome: false,
    isOffer: false,
    offerDescription: "",
  };

  const [form, setForm] = useState(initialForm);

  // ================= MUTATIONS =================

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => updateProduct(id, data),
    onSuccess: () => {
      toast.success("Product updated");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // ================= MODAL =================

  const openModal = (product?: IProduct) => {
    if (product) {
      setEditingId(product._id);
      setForm({
        name: product.name,
        slug: product.slug,
        description: product.description || "",
        category: product.category?._id || "",
        images: product.images || [],
        dicountPrice: product.dicountPrice.toString(),
        originalPrice: product.originalPrice.toString(),
        stock: product.stock.toString(),
        isActive: product.isActive ?? true,
        isSuggestedForHome: product.isSuggestedForHome ?? false,
        isOffer: product.isOffer ?? false,
        offerDescription: product.offerDescription || "",
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

  // ================= FILE UPLOAD =================

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    try {
      setUploading(true);

      const uploaded: string[] = [];

      for (const file of files) {
        const url = await uploadImage(file);
        uploaded.push(url);
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

  // ================= SUBMIT =================

  const handleSubmit = () => {
    if (
      !form.name ||
      !form.dicountPrice ||
      !form.category ||
      !form.originalPrice
    ) {
      toast.error("Required fields missing");
      return;
    }

    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      category: form.category,
      images: form.images,
      discountPrice: Number(form.dicountPrice),
      originalPrice: Number(form.originalPrice),
      stock: Number(form.stock),
      isActive: form.isActive,
      isSuggestedForHome: form.isSuggestedForHome,
      isOffer: form.isOffer,
      offerDescription: form.offerDescription,
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#542452",
    });

    if (result.isConfirmed) {
      deleteMutation.mutate(id);
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
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center">
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
                  <td className="p-4">${p.dicountPrice}</td>
                  <td className="p-4">{p.stock}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        p.isActive
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {p.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
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
                {categories.map((cat: ICategory) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                placeholder="Price after discount"
                value={form.dicountPrice}
                onChange={(e) =>
                  setForm({ ...form, dicountPrice: e.target.value })
                }
                className="p-3 border rounded-xl"
              />

              <input
                placeholder="Price before discount (Original Price)"
                value={form.originalPrice}
                onChange={(e) =>
                  setForm({ ...form, originalPrice: e.target.value })
                }
                className="p-3 border rounded-xl"
              />

              <input
                placeholder="Stock"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="p-3 border rounded-xl"
              />

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({ ...form, isActive: e.target.checked })
                  }
                />
                <span>Active</span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.isSuggestedForHome}
                  onChange={(e) =>
                    setForm({ ...form, isSuggestedForHome: e.target.checked })
                  }
                />
                <span>Display on Home Page (Suggested section)</span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.isOffer}
                  onChange={(e) =>
                    setForm({ ...form, isOffer: e.target.checked })
                  }
                />
                <span>Offer Section(Home Page)</span>

                {form.isOffer && (
                  <div className="col-span-2">
                    <input
                      placeholder="Offer Description (Ex: Min 10% Off)"
                      value={form.offerDescription}
                      onChange={(e) =>
                        setForm({ ...form, offerDescription: e.target.value })
                      }
                      className="p-3 border rounded-xl w-full"
                    />
                  </div>
                )}
              </div>

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
