import AXIOS from "@/lib/axios";

export const getCategories = async () => {
  const res = await AXIOS.get("/categories");
  return res.data.data;
};

export const createCategory = async (data: any) => {
  const res = await AXIOS.post("/categories", data);
  return res.data;
};

export const updateCategory = async (id: string, data: any) => {
  const res = await AXIOS.patch(`/categories/${id}`, data);
  return res.data;
};

export const deleteCategory = async (id: string) => {
  const res = await AXIOS.delete(`/categories/${id}`);
  return res.data;
};
