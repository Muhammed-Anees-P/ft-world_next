"use client";

import { useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  uploadImage,
} from "@/services/bannerService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useBannerUIStore } from "@/zustand/useBannerUIStore";

interface Banner {
  _id: string;
  title?: string;
  imageUrl: string;
  description?: string;
  isActive?: boolean;
}

export default function BannerPage() {
  const queryClient = useQueryClient();
  const { isOpen, editingId, openModal, closeModal } = useBannerUIStore();

  const [uploading, setUploading] = useState(false);

  const initialForm = {
    title: "",
    imageUrl: "",
    description: "",
    isActive: true,
  };

  const [form, setForm] = useState(initialForm);

  /* ================= FETCH ================= */

  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
  });

  /* ================= MUTATIONS ================= */

  const createMutation = useMutation({
    mutationFn: createBanner,
    onSuccess: () => {
      toast.success("Banner created successfully");
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => updateBanner(id, data),
    onSuccess: () => {
      toast.success("Banner updated successfully");
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBanner,
    onSuccess: () => {
      toast.success("Banner deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
  });

  /* ================= HANDLERS ================= */

  const handleSubmit = () => {
    if (!form.imageUrl) {
      toast.error("Please upload an image");
      return;
    }

    if (editingId) {
      updateMutation.mutate({
        id: editingId,
        data: form,
      });
    } else {
      createMutation.mutate(form);
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete Banner?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#542452",
    });

    if (!result.isConfirmed) return;

    deleteMutation.mutate(id);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    try {
      setUploading(true);
      const url = await uploadImage(e.target.files[0]);
      setForm((prev) => ({ ...prev, imageUrl: url }));
      toast.success("Image uploaded successfully");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#542452]">Banner Management</h2>

        <button
          onClick={() => {
            setForm(initialForm);
            openModal();
          }}
          className="bg-[#542452] text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} /> Add Banner
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : banners.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center">
                  No banners found
                </td>
              </tr>
            ) : (
              banners.map((banner: Banner) => (
                <tr key={banner._id} className="border-t">
                  <td className="p-4">
                    <img
                      src={banner.imageUrl}
                      className="w-16 h-12 object-cover rounded-lg"
                    />
                  </td>

                  <td className="p-4 font-medium">
                    {banner.title || "Untitled"}
                  </td>

                  <td className="p-4 text-gray-500">
                    {banner.description || "-"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        banner.isActive
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {banner.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="p-4 text-right space-x-3">
                    <button
                      onClick={() => {
                        setForm({
                          title: banner.title ?? "",
                          imageUrl: banner.imageUrl ?? "",
                          description: banner.description ?? "",
                          isActive: banner.isActive ?? true,
                        });
                        openModal(banner._id);
                      }}
                      className="text-blue-500"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(banner._id)}
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
          <div className="bg-white w-full max-w-xl rounded-2xl p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500"
            >
              <X />
            </button>

            <h3 className="text-xl font-semibold mb-6">
              {editingId ? "Edit Banner" : "Add Banner"}
            </h3>

            <div className="space-y-4">
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-3 border rounded-xl"
              />

              <input
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full p-3 border rounded-xl"
              />

              <input type="file" onChange={handleFileUpload} />
              {uploading && <p>Uploading...</p>}

              {form.imageUrl && (
                <img src={form.imageUrl} className="w-32 mt-3 rounded-lg" />
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isActive: e.target.checked,
                    })
                  }
                />
                <span>Active</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="mt-6 bg-[#542452] text-white px-6 py-3 rounded-xl"
            >
              {editingId ? "Update Banner" : "Create Banner"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
