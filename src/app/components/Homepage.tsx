"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import styles from "../page.module.css";
import Link from "next/link";
import { CartItemsMap, useCart } from "../context/CartContext";
import { Product } from "./ProductList";
import { AllProducts } from "./ProductCards";
import { useFetchAdditionalProducts } from "./MoreProducts";

// ItemCount component (for displaying item counts in basket summary if uncommented)
function ItemCount({ count, name }: { count: number; name: string }) {
  return (
    <div className={"basketItem"} key={name}>
      {name} count: {count}
    </div>
  );
}

// ProductItemList component (for displaying basket item counts)
function ProductItemList({
  products,
  items,
}: {
  products: Product[];
  items: CartItemsMap;
}) {
  const params = useParams();
  const locale = (params.locale as string) || "";

  return (
    <>
      {products.map(function (product) {
        const count = items.get(product.id)?.quantity || 0;
        return (
          <ItemCount
            key={product.name[locale]}
            name={product.name[locale]}
            count={count}
          />
        );
      })}
    </>
  );
}

export interface HomepageProps {
  products: Product[];
}

export default function Homepage({ products: initialProducts }: HomepageProps) {
  const { items, itemCount, addToCart } = useCart();
  const { moreProducts, error: additionalProductsError } =
    useFetchAdditionalProducts();
  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts);

  const params = useParams();
  const locale = (params.locale as string) || "uk";

  useEffect(() => {
    if (moreProducts !== null) {
      // Only update if moreProducts has been set (not initial null)
      setAllProducts((prevProducts) => [...prevProducts, ...moreProducts]);
    }
  }, [moreProducts]);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Michael&apos;s Amazing Web Store</p>
        <div>
          <button className={styles.basket}>
            <Link href={`/${locale}/checkout`}>
              Basket: {itemCount} item{itemCount === 1 ? "" : "s"}
            </Link>
          </button>
          {/*  UNCOMMENT for product list <ProductItemList products={allProducts} items={items} /> */}
        </div>
      </div>

      <AllProducts
        allProducts={allProducts}
        moreProducts={moreProducts}
        additionalProductsError={additionalProductsError}
        addToCart={addToCart}
      ></AllProducts>

      <button className={styles.card}>
        <Link href={`/${locale}/checkout`}>Checkout</Link>
      </button>
    </main>
  );
}
