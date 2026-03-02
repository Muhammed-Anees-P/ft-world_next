"use client";

import Image from "next/image";
import Container from "@/components/Container";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IProduct } from "@/types/IProducts;";
import { useAddToCartMutation } from "@/hooks/useCartService";
import { useAuthStore } from "@/store/useAuthStore";
import toast from "react-hot-toast";

interface ProductSingleProps {
  product: IProduct;
}

export default function ProductSinglePage({ product }: ProductSingleProps) {
  const router = useRouter();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  const { mutate: addToCart, isPending } = useAddToCartMutation();
  const { accessToken } = useAuthStore();

  const variants = product?.variants || [];
  const selectedVariant = variants[selectedVariantIndex];

  const displayImages =
    selectedVariant?.images?.length > 0
      ? selectedVariant.images
      : product?.images;

  const price =
    parseInt(selectedVariant?.price) ?? parseInt(product.discountPrice);

  const originalPrice =
    parseInt(selectedVariant?.originalPrice) ??
    parseInt(product?.originalPrice);

  const stock = selectedVariant?.stock ?? product.stock;

  const discountPercent =
    originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const handleAddToCart = () => {
    if (!accessToken) {
      router.push(`/login?redirect=/product/${product.slug}/${product._id}`);
      return;
    }

    addToCart({
      productId: product._id!,
      variantSku: selectedVariant?.sku || null,
      quantity: 1,
    });
    toast.success("Product added to cart");
  };

  const handleBuyNow = () => {
    if (!accessToken) {
      router.push(`/login?redirect=/product/${product.slug}/${product._id}`);
      return;
    }

    addToCart(
      {
        productId: product._id!,
        variantSku: selectedVariant?.sku || null,
        quantity: 1,
      },
      {
        onSuccess: () => {
          router.push("/cart");
        },
      },
    );
  };

  const relatedProducts = [
    {
      id: 1,
      title: "Develop ineo 224e...",
      image: "/printer1.png",
      price: "1,54,900",
      oldPrice: "1,53,900",
      reviews: 123,
    },
    {
      id: 2,
      title: "Develop ineo 224e...",
      image: "/printer2.png",
      price: "1,54,900",
      oldPrice: "1,53,900",
      reviews: 123,
    },
    {
      id: 3,
      title: "Develop ineo 224e...",
      image: "/printer1.png",
      price: "1,54,900",
      oldPrice: "1,53,900",
      reviews: 123,
    },
    {
      id: 4,
      title: "Develop ineo 224e...",
      image: "/printer2.png",
      price: "1,54,900",
      oldPrice: "1,53,900",
      reviews: 123,
    },
    {
      id: 5,
      title: "Develop ineo 224e...",
      image: "/printer1.png",
      price: "1,54,900",
      oldPrice: "1,53,900",
      reviews: 123,
    },
    {
      id: 6,
      title: "Develop ineo 224e...",
      image: "/printer2.png",
      price: "1,54,900",
      oldPrice: "1,53,900",
      reviews: 123,
    },
  ];

  return (
    <section className="w-full bg-[#FFFFFF] py-16">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* ================= LEFT SIDE ================= */}
          <div>
            <div className="relative bg-white border rounded-2xl p-6 flex items-center justify-center">
              <div className="relative w-full max-w-[450px] h-[450px]">
                <Image
                  src={displayImages?.[0]}
                  alt={product?.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 450px"
                />
              </div>

              <button className="absolute bottom-6 right-6 w-10 h-10 bg-white border rounded-lg flex items-center justify-center shadow-sm">
                <Heart size={18} />
              </button>
            </div>

            {displayImages?.length > 1 && (
              <div className="flex gap-6 mt-6 flex-wrap">
                {displayImages.map((img: string, i: number) => (
                  <div
                    key={i}
                    className="w-[120px] h-[120px] border rounded-xl p-3 bg-white flex items-center justify-center"
                  >
                    <div className="relative w-[80px] h-[80px]">
                      <Image
                        src={img}
                        alt="variant"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div>
            <h1 className="text-2xl font-semibold text-black">
              {product?.name}
            </h1>

            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {product?.description}
            </p>

            <hr className="my-6" />

            {variants?.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-3">Variants:</p>

                <div className="flex gap-3 flex-wrap">
                  {variants.map((variant: any, index: number) => (
                    <button
                      key={variant.sku}
                      onClick={() => setSelectedVariantIndex(index)}
                      className={`px-4 py-2 rounded-lg border text-sm ${
                        selectedVariantIndex === index
                          ? "border-black bg-gray-100"
                          : "border-gray-300"
                      }`}
                    >
                      {variant?.color} {variant?.storage}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <hr className="my-6" />

            {/* Price Section */}
            <div className="flex items-center gap-4">
              {discountPercent > 0 && (
                <span className="text-green-600 font-medium text-sm">
                  {discountPercent}% ↓
                </span>
              )}

              {originalPrice > price && (
                <span className="text-gray-400 line-through text-lg">
                  ₹{originalPrice}
                </span>
              )}

              <span className="text-2xl font-semibold text-black">
                ₹{price}
              </span>
            </div>

            <p className="text-sm mt-2 text-gray-600">
              {parseInt(stock) > 0 ? `In Stock (${stock})` : "Out of Stock"}
            </p>

            <hr className="my-6" />

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={parseInt(stock) === 0}
                className="flex-1 border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50"
              >
                <ShoppingCart size={16} />
                {isPending ? "Adding..." : "Add To Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={parseInt(stock) === 0 || isPending}
                className="flex-1 bg-[#542452] text-white rounded-lg py-3 text-sm font-medium hover:opacity-95 transition disabled:opacity-50"
              >
                Buy Now
              </button>
            </div>

            <hr className="my-6" />

            {/* Warranty */}
            {product?.warranty && (
              <>
                <p className="text-sm font-medium mb-3">Warranty</p>
                <div className="bg-gray-100 rounded-lg py-3 text-center text-sm text-gray-700">
                  {product.warranty} Year Warranty
                </div>
              </>
            )}

            {/* ================= SPECIFICATIONS ================= */}
            {product?.specifications &&
              Object.keys(product.specifications).length > 0 && (
                <>
                  <hr className="my-6" />

                  <div>
                    <p className="text-sm font-medium mb-4">Specifications</p>

                    {(() => {
                      const specs = Object.entries(product.specifications);

                      const visibleSpecs = showAllSpecs
                        ? specs
                        : specs.slice(0, 6);

                      return (
                        <>
                          <div className="space-y-4">
                            {visibleSpecs.map(([key, value], index) => (
                              <div key={index}>
                                <p className="text-sm font-semibold text-black">
                                  ▪️ {key}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  {value}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Show More / Show Less Button */}
                          {specs.length > 6 && (
                            <button
                              onClick={() => setShowAllSpecs(!showAllSpecs)}
                              className="mt-4 text-sm font-medium text-[#542452] hover:underline transition"
                            >
                              {showAllSpecs
                                ? "Show Less"
                                : `Show More (${specs.length - 6} more)`}
                            </button>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </>
              )}
            <hr className="my-6" />

            {/* Rating Section */}
            <div>
              <p className="text-sm font-medium mb-3">Rating and reviews</p>

              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="text-sm text-gray-600">
                  {product?.averageRating} ({product?.totalReviews} reviews)
                </span>
              </div>

              <div className="flex gap-3 flex-wrap">
                {Object.entries(product?.ratingBreakdown || {}).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center gap-1.5 bg-[#f3f3f3] px-4 py-2 rounded-full text-xs font-medium capitalize"
                    >
                      <span>
                        {key === "buildQuality"
                          ? "Build Quality"
                          : key === "valueForMoney"
                            ? "Value for Money"
                            : key}
                      </span>

                      <Star
                        size={12}
                        className="fill-green-500 text-green-500"
                      />

                      <span>{value}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
        {/* ================= RELATED PRODUCTS ================= */}
        <div className="mt-20 bg-[white] py-12 px-6 rounded-2xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-10">
            Related Products
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-2xl p-5 flex flex-col"
              >
                {/* Image */}
                <div className="h-[140px] flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>

                {/* Title */}
                <h4 className="text-sm font-medium text-gray-800 mt-4 truncate">
                  {item.title}
                </h4>

                {/* Price */}
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <span className="font-semibold text-black">
                    ₹{item.price}
                  </span>
                  <span className="text-gray-400 line-through">
                    ₹{item.oldPrice}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2 text-xs">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-gray-500">
                    ({item.reviews} reviews)
                  </span>
                </div>

                {/* Button */}
                <button className="mt-auto w-full bg-[#542452] text-white py-2 rounded-[24px] text-sm font-medium hover:opacity-90 transition mt-4">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
