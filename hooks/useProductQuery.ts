import { queryOptions, useQuery } from "@tanstack/react-query";
import AXIOS from "@/lib/axios";
import { useProductStore } from "@/store/productStore";
import { useEffect } from "react";
import { listSuggestedProducts } from "@/services/productServices";

export const useProductQuery = () => {
  const setProducts = useProductStore((state) => state.setProducts);

  const query = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await AXIOS.get("/products");
      return res.data.data;
    },
  });

  useEffect(() => {
    if (query.data) {
      setProducts(query.data);
    }
  }, [query.data, setProducts]);

  return query;
};

export const useSuggestedProductListQuery = () =>
  queryOptions({
    queryKey: ["suggested-products"],
    queryFn: listSuggestedProducts,
  });
