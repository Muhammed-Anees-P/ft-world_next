"use client";

import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { updateProduct } from "@/services/productServices";
import { categoriesQuery } from "@/hooks/userCategoriesQuery";
import AXIOS from "@/lib/axios";
import TableLoader from "@/components/admin/TableLoader";
import ProductForm from "@/components/admin/ProductForm";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: categories = [] } = useQuery(categoriesQuery());

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await AXIOS.get(`/products/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => updateProduct(id as string, data),
    onSuccess: () => {
      toast.success("Product updated successfully");
      router.push("/admin/products");
    },
  });

  const handleSubmit = async (data: any) => {
    await updateMutation.mutateAsync(data);
  };

  if (isLoading) {
    return <TableLoader colSpan={7} />;
  }

  return (
    <ProductForm
      initialData={product}
      categories={categories}
      onSubmit={handleSubmit}
      isSubmitting={updateMutation.isPending}
    />
  );
}
