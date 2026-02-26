import { ICategory } from "./ICategory";

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  discountPrice: number;
  originalPrice: number;
  stock: number;
  category: ICategory;
  images: string[];
  isActive: boolean;
  isSuggestedForHome?: boolean;
  isOffer?: boolean;
  offerDescription?: string;
}
