import { ICategory } from "./ICategory";

export interface IProductVariant {
  sku: string;
  color: string;
  storage: string;
  price: string;
  originalPrice: string;
  stock: string;
  images: string[];
}

export interface IProductAttribute {
  name: string;
  values: string[];
}

export interface IRatingBreakdown {
  performance: number;
  buildQuality: number;
  valueForMoney: number;
}

export interface IProduct {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  category: ICategory;
  discountPrice: string;
  originalPrice: string;
  stock: string;
  warranty: string;
  metaTitle: string;
  metaDescription: string;
  isActive: boolean;
  isFeatured: boolean;
  isSuggestedForHome: boolean;
  isOffer: boolean;
  offerDescription: string;
  images: string[];
  attributes: IProductAttribute[];
  variants: IProductVariant[];
  specifications: Record<string, string>;
  ratingBreakdown: IRatingBreakdown;
  totalReviews?: number;
  averageRating?: number;
}
