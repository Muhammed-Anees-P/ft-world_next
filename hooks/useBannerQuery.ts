import { useQuery } from "@tanstack/react-query";
import AXIOS from "@/lib/axios";
import { useBannerStore } from "@/store/bannerStore";
import { useEffect } from "react";

export const useBannerQuery = () => {
  const setBanners = useBannerStore((state) => state.setBanners);

  const query = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await AXIOS.get("/banner");
      return res.data.data || [];
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (query.data) {
      setBanners(query.data);
    }
  }, [query.data, setBanners]);

  return query;
};
