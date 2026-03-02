import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";
import AXIOS from "@/lib/axios";

/* ================= TYPES ================= */

interface AddToCartPayload {
  productId: string;
  variantSku?: string | null;
  quantity: number;
}

interface UpdateCartPayload {
  productId: string;
  variantSku?: string | null;
  quantity: number;
}

interface RemoveCartPayload {
  productId: string;
  variantSku?: string | null;
}

/* ================= GET CART ================= */

const getCart = async () => {
  const res = await AXIOS.get("/cart");
  return res.data.data;
};

export const useCartQuery = () => {
  const setCart = useCartStore((s) => s.setCart);

  const query = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  useEffect(() => {
    if (query.data) {
      setCart(query.data?.items || []);
    }
  }, [query.data, setCart]);

  return query;
};

/* ================= ADD TO CART ================= */

const addToCart = async (payload: AddToCartPayload) => {
  const res = await AXIOS.post("/cart/add", payload);
  return res.data;
};

export const useAddToCartMutation = () => {
  const queryClient = useQueryClient();
  const setCart = useCartStore((s) => s.setCart);

  return useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      if (data?.data?.items) {
        setCart(data.data.items);
      }
    },
  });
};

/* ================= UPDATE CART ================= */

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const setCart = useCartStore((s) => s.setCart);

  return useMutation({
    mutationFn: (data: UpdateCartPayload) => AXIOS.patch("/cart/update", data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      if (res?.data?.data?.items) {
        setCart(res.data.data.items);
      }
    },
  });
};

/* ================= REMOVE CART ITEM ================= */

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  const setCart = useCartStore((s) => s.setCart);

  return useMutation({
    mutationFn: (data: RemoveCartPayload) =>
      AXIOS.delete("/cart/remove", { data }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      if (res?.data?.data?.items) {
        setCart(res.data.data.items);
      }
    },
  });
};
