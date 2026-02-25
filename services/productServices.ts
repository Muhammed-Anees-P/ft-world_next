import AXIOS from "@/lib/axios";

export const getProducts = async () => {
  const res = await AXIOS.get("/products");
  return res.data.data;
};

export const createProduct = async (data: any) => {
  const res = await AXIOS.post("/products", data);
  return res.data;
};

export const updateProduct = async (id: string, data: any) => {
  const res = await AXIOS.patch(`/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await AXIOS.delete(`/products/${id}`);
  return res.data;
};
