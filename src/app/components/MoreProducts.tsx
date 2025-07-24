"use client";
import { useEffect, useState } from "react";
import { Product } from "./ProductList";
import { MORE_PRODUCTS_API } from "../../../consts";

export function useFetchAdditionalProducts() {
  const [moreProducts, setMoreProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Simulate a slow API call by adding a delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const res = await fetch(MORE_PRODUCTS_API);
        if (!res.ok) {
          throw new Error(`Failed to fetch more products: ${res.statusText}`);
        }
        const data = await res.json();
        setMoreProducts(data.recommendations || []);
      } catch (err: any) {
        console.error("Error fetching more products:", err);
        setError(err.message);
      }
    }
    fetchProducts();
  }, []);
  return { moreProducts, error };
}
