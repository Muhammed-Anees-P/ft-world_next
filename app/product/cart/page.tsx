"use client";

import Container from "@/components/Container";
import CartItemCard from "@/components/cart/CartItemCard";
import CartSummary from "@/components/cart/CartSummary";
import { useCartStore } from "@/store/cartStore";
import { useCartQuery } from "@/hooks/useCartService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function CartSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "14px 16px",
            height: 125,
            boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
            border: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center",
            gap: 16,
            animation: "pulse 1.5s infinite",
          }}
        >
          <div
            style={{
              width: 130,
              height: 90,
              background: "#e5e7eb",
              borderRadius: 10,
              flexShrink: 0,
            }}
          />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div
              style={{
                height: 14,
                background: "#e5e7eb",
                borderRadius: 6,
                width: "40%",
              }}
            />
            <div
              style={{
                height: 12,
                background: "#e5e7eb",
                borderRadius: 6,
                width: "55%",
              }}
            />
            <div
              style={{
                height: 12,
                background: "#e5e7eb",
                borderRadius: 6,
                width: "30%",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CartPage() {
  const { isLoading } = useCartQuery();
  const cart = useCartStore((s) => s.cart);

  return (
    <>
      <Navbar />
      <div
        style={{
          background: "#fff",
          minHeight: "100vh",
          paddingTop: 64,
          paddingBottom: 64,
        }}
      >
        <Container>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 48,
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {/* LEFT SIDE - Cart Items */}
            <div
              style={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                gap: 24,
              }}
            >
              <h2
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#111",
                  margin: 0,
                  marginBottom: 8,
                }}
              >
                Cart Details
              </h2>

              {isLoading ? (
                <CartSkeleton />
              ) : cart.length === 0 ? (
                <p style={{ color: "#888", fontSize: 15 }}>
                  Your cart is empty
                </p>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  {cart.map((item, index) => (
                    <CartItemCard key={index} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT SIDE - Summary */}
            {!isLoading && cart.length > 0 && (
              <div style={{ width: 370, flexShrink: 0 }}>
                <CartSummary />
              </div>
            )}
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
}
