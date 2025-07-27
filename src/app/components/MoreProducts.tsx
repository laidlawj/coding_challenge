'use client';
import { useEffect, useState } from "react";
import { Product } from "./ProductList";


export function useFetchAdditionalProducts() {
  const [moreProducts, setMoreProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Simulate a slow API call by adding a delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const res = await fetch('/api/external/more-products'); // Use your proxy
        if (!res.ok) {
          throw new Error(`Failed to fetch more products: ${res.statusText}`);
        }
        const data = await res.json();
        // Assuming your 'more-products' API returns { recommendations: [...] }
        setMoreProducts(data.recommendations || []);
      } catch (err: any) {
        console.error("Error fetching more products:", err);
        setError(err.message);
      }
    }
    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

  return { moreProducts, error };
}