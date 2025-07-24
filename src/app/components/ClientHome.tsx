'use client';
import { useRouter } from 'next/navigation'; 
import React, { useState, useEffect, Suspense } from 'react';
import styles from '../page.module.css';
import Link from 'next/link';
import { CartItem, useCart } from '../context/CartContext';
import { Product } from './ProductList';
import { AllProducts } from './ProductCards';


// ItemCount component (for displaying item counts in basket summary)
function ItemCount({ count, name }: { count: number; name: string }) {
  return <div key={name}>{name} count: {count}</div>;
}

// ProductItemList component (for displaying basket item counts)
function ProductItemList({ products, items }: { products: Product[]; items: CartItem[] }) {
  return (
    <>
      {products.map(({ name }) => (
        <ItemCount
          key={name.uk}
          name={name.uk}
          count={items.find(item => item.name === name.uk)?.quantity || 0}
        />
      ))}
    </>
  );
}




// FetchAdditionalProducts custom hook (for client-side fetching)
function FetchAdditionalProducts() {
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

// --- Main ClientHome Component ---



/**
 * ClientHome component handles the main client-side UI and interactivity.
 * It displays initial products, fetches and integrates additional products,
 * manages cart state, and provides navigation.
 *
 * @param {ClientHomeProps} props - The component props.
 * @param {Product[]} props.products - The initial list of products.
 */
export interface ClientHomeProps {
  products: Product[]; // These are the initial products passed from the Server Component
}

export default function ClientHome({ products: initialProducts}: ClientHomeProps) {
  const { items, itemCount, addToCart } = useCart();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const { moreProducts, error: additionalProductsError } = FetchAdditionalProducts();


  // Effect to initialize allProducts with initialProducts
  useEffect(() => {
    setAllProducts(initialProducts);
  }, [initialProducts]);

  // Effect to append moreProducts once they are fetched
  useEffect(() => {
    if (moreProducts !== null) { // Only update if moreProducts has been set (not initial null)
      setAllProducts(prevProducts => [...prevProducts, ...moreProducts]);
    }
  }, [moreProducts]);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Michael&apos;s Amazing Web Store
        </p>
        <div>
          <button className={styles.basket}>Basket: {itemCount} item{itemCount === 1 ? '' : 's'}</button>
          <ProductItemList products={allProducts} items={items} />
        </div>
      </div>

      <AllProducts allProducts={allProducts} moreProducts={moreProducts} additionalProductsError={additionalProductsError} addToCart={addToCart} ></AllProducts>

      <button className={styles.card}>
        <Link href="/checkout">Go to checkout</Link>
      </button>
    </main>
  );
}
