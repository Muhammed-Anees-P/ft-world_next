"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useRemoveCartItem, useUpdateCart } from "@/hooks/useCartService";
import { IProduct } from "@/types/IProducts;";

interface Props {
  item: any;
}

export default function CartItemCard({ item }: Props) {
  const updateMutation = useUpdateCart();
  const removeMutation = useRemoveCartItem();

  const product: IProduct = item.product;
  const price = parseInt(product.discountPrice);
  const original = parseInt(product.originalPrice);

  const discount =
    original > price ? Math.round(((original - price) / original) * 100) : 0;

  const matchedVariant = product.variants?.find(
    (v: any) => v.sku === item.variantSku,
  );

  // Get color from matched variant, fallback to first variant's color, then "Color"
  const colorVariant =
    matchedVariant?.color || product.variants?.[0]?.color || "Color";

  return (
    <div
      style={{
        background: "#fff",
        display: "flex",
        alignItems: "center",
        width: "100%",
        minHeight: 125,
        borderRadius: 20,
        padding: "14px 18px",
        gap: 16,
        boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
        border: "1px solid #ebebeb",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* Delete Button - top right */}
      <button
        style={{
          position: "absolute",
          top: 14,
          right: 16,
          color: "#d9534f",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
        }}
        onClick={() =>
          removeMutation.mutate({
            productId: product._id!,
            variantSku: item.variantSku,
          })
        }
      >
        <Trash2 size={18} />
      </button>

      {/* Product Images - stacked */}
      <div
        style={{
          width: 160,
          height: 95,
          position: "relative",
          flexShrink: 0,
        }}
      >
        {product.images?.slice(0, 3).map((img: string, i: number) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 65,
              height: 85,
              left: i * 40,
              top: 0,
              zIndex: i + 1,
            }}
          >
            <Image
              src={img}
              alt={product.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        ))}

        {/* Rating badge */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: 7,
            padding: "2px 7px",
            display: "flex",
            alignItems: "center",
            gap: 3,
            fontSize: 12,
            fontWeight: 600,
            zIndex: 10,
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }}
        >
          <span>{product.averageRating ?? "4.1"}</span>
          <span style={{ color: "#4caf50", fontSize: 13, lineHeight: 1 }}>
            ★
          </span>
        </div>
      </div>

      {/* Details */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingRight: 28,
        }}
      >
        <h3
          style={{
            fontWeight: 700,
            fontSize: 17,
            color: "#111",
            margin: 0,
            marginBottom: 10,
          }}
        >
          {product.name}
        </h3>

        {/* Color tag + Price row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Color pill */}
          <span
            style={{
              display: "inline-block",
              border: "1px solid #ccc",
              borderRadius: 20,
              padding: "3px 16px",
              fontSize: 13,
              color: "#444",
              background: "#fff",
            }}
          >
            {colorVariant}
          </span>

          {/* Price section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ color: "#388e3c", fontWeight: 500, fontSize: 13 }}>
              {discount}%↓
            </span>
            <span
              style={{
                textDecoration: "line-through",
                color: "#999",
                fontSize: 13,
              }}
            >
              ₹{original?.toLocaleString("en-IN")}
            </span>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>
              ₹{price?.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
