"use client";

import { useCartStore } from "@/store/cartStore";

export default function CartSummary() {
  const cart = useCartStore((s) => s.cart);

  const mrp = cart.reduce(
    (acc, item) => acc + item.product.originalPrice * item.quantity,
    0,
  );

  const discountAmount = cart.reduce(
    (acc, item) =>
      acc +
      (item.product.originalPrice - item.product.discountPrice) * item.quantity,
    0,
  );

  const shipping = 100;
  const total = mrp - discountAmount + shipping;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "28px 24px",
        width: "100%",
        boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
        border: "1px solid #ebebeb",
        boxSizing: "border-box",
      }}
    >
      <h3
        style={{
          fontWeight: 600,
          fontSize: 18,
          marginBottom: 22,
          color: "#111",
          margin: 0,
        }}
      >
        Prize Details
      </h3>

      {/* Grey inner summary box */}
      <div
        style={{
          background: "#f2f2f2",
          borderRadius: 14,
          padding: "18px 20px",
          marginBottom: 22,
        }}
      >
        {/* MRP */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <span
            style={{
              color: "#444",
              fontSize: 14,
              textDecoration: "underline",
              textDecorationColor: "#888",
              textUnderlineOffset: 3,
            }}
          >
            MRP
          </span>
          <span style={{ fontWeight: 500, fontSize: 14, color: "#111" }}>
            ₹{mrp?.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Shipping fee */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <span
            style={{
              color: "#444",
              fontSize: 14,
              textDecoration: "underline",
              textDecorationColor: "#888",
              textUnderlineOffset: 3,
            }}
          >
            Shiping fee
          </span>
          <span style={{ fontWeight: 500, fontSize: 14, color: "#111" }}>
            ₹{shipping?.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Discount */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <span
            style={{
              color: "#444",
              fontSize: 14,
              textDecoration: "underline",
              textDecorationColor: "#888",
              textUnderlineOffset: 3,
            }}
          >
            Discount
          </span>
          <span style={{ fontWeight: 500, fontSize: 14, color: "#111" }}>
            -₹{discountAmount?.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Dashed separator */}
        <div
          style={{
            borderTop: "1.5px dashed #bbb",
            marginBottom: 16,
          }}
        />

        {/* Total */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>
            Total Amount
          </span>
          <span style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>
            ₹{total?.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        style={{
          width: "100%",
          background: "#542452",
          color: "#fff",
          border: "none",
          borderRadius: 12,
          padding: "16px 0",
          fontSize: 16,
          fontWeight: 600,
          cursor: "pointer",
          letterSpacing: 0.4,
        }}
      >
        Place order
      </button>
    </div>
  );
}
