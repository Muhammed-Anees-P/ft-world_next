import AXIOS from "@/lib/axios";

export const getBanners = async () => {
  const res = await AXIOS.get("/banner");
  return res.data.data;
};

export const createBanner = async (data: any) => {
  const res = await AXIOS.post("/banner", data);
  return res.data;
};

export const updateBanner = async (id: string, data: any) => {
  const res = await AXIOS.patch(`/banner/${id}`, data);
  return res.data;
};

export const deleteBanner = async (id: string) => {
  const res = await AXIOS.delete(`/banner/${id}`);
  return res.data;
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await AXIOS.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.url;
};
