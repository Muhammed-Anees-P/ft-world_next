import { ICategory } from "./ICategory";

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  category: ICategory;
  images: string[];
  isActive: boolean;
  isSuggestedForHome?: boolean;
}
