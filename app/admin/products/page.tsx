"use client";

import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useProductQuery } from "@/hooks/useProductQuery";
import { deleteProduct } from "@/services/productServices";
import Breadcrumb from "@/components/admin/Breadcrumb";
import { useProductStore } from "@/store/productStore";

export default function ProductsPage() {
  const queryClient = useQueryClient();
  const { isLoading } = useProductQuery();
  const products = useProductStore((state) => state.products);

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Product deleted");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

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
    <div className="space-y-6">
      <Breadcrumb
        items={[{ label: "Dashboard", href: "/admin" }, { label: "Products" }]}
      />

      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-[#542452]">Products</h2>

        <Link
          href="/admin/products/create"
          className="bg-[#542452] text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} /> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
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
                  <td className="p-4">₹{p.discountPrice}</td>
                  <td className="p-4">{p.stock}</td>

                  <td className="p-4">{p.isActive ? "Active" : "Inactive"}</td>

                  <td className="p-4 text-right space-x-3">
                    <Link
                      href={`/admin/products/${p._id}/edit`}
                      className="text-blue-500"
                    >
                      <Pencil size={18} />
                    </Link>

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
    </div>
  );
}
