import { getCategories } from "@/services/categoryService";
import { queryOptions } from "@tanstack/react-query";

export const categoriesQuery = () =>
  queryOptions({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
