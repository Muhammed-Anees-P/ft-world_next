"use client";

import TableLoader from "@/components/admin/TableLoader";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProductSinglePage from "@/components/products/ProductSingle";
import { useProductByIdQuery } from "@/hooks/useProductQuery";
import { useProductSingleStore } from "@/store/productSingleStore";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const SingleProduct = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading } = useProductByIdQuery(id);

  const setProduct = useProductSingleStore((state) => state.setProduct);
  const product = useProductSingleStore((state) => state.product);

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data, setProduct]);

  // if (isLoading) {
  //   return <TableLoader colSpan={9} />;
  // }

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }
  return (
    <main>
      <Navbar />
      <ProductSinglePage product={product} />
      <Footer />
    </main>
  );
};

export default SingleProduct;
