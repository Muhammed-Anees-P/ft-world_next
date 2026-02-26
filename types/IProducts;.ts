import { ICategory } from "./ICategory";

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  dicountPrice: number;
  originalPrice: number;
  stock: number;
  category: ICategory;
  images: string[];
  isActive: boolean;
  isSuggestedForHome?: boolean;
  isOffer?: boolean;
}
