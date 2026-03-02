"use client";

import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createProduct } from "@/services/productServices";
import { categoriesQuery } from "@/hooks/userCategoriesQuery";
import ProductForm from "@/components/admin/ProductForm";

export default function CreateProductPage() {
  const router = useRouter();

  const { data: categories = [] } = useQuery(categoriesQuery());

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created successfully");
      router.push("/admin/products");
    },
  });

  const handleSubmit = async (data: any) => {
    await createMutation.mutateAsync(data);
  };

  return (
    <ProductForm
      categories={categories}
      onSubmit={handleSubmit}
      isSubmitting={createMutation.isPending}
    />
  );
}
