"use client";

import { Product } from "@/types/shopify-graphql";
import React from "react";

const ProductPrice = ({ product }: { product: Product }) => {
  const variant = product?.variants?.edges?.[0]?.node;
  const current = variant?.price?.amount;
  const compareAt = variant?.compareAtPrice?.amount;
  const currency = variant?.price?.currencyCode;

  const formatPrice = (amount?: string) =>
    amount && currency
      ? new Intl.NumberFormat(undefined, {
          style: "currency",
          currency,
          currencyDisplay: "narrowSymbol",
        }).format(parseFloat(amount))
      : "";

  return (
    <div className="flex items-baseline gap-2 mt-1">
      {/* Current Price */}
      <p
        suppressHydrationWarning
        className="text-xl font-price font-semibold text-black tracking-wide"
      >
        {formatPrice(current)}
      </p>

      {/* Compare-at (original) Price */}
      {compareAt && parseFloat(compareAt) > parseFloat(current || "0") && (
        <p
          suppressHydrationWarning
          className="text-sm text-gold/80 line-through font-price relative -top-[1px]"
        >
          {formatPrice(compareAt)}
        </p>
      )}
    </div>
  );
};

export default ProductPrice;
