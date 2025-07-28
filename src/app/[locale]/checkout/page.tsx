"use client";

import Link from "next/link";
import { ProductInfo, useCart } from "../../context/CartContext";
import styles from "../../page.module.css";
import { useParams } from "next/navigation";
import { calculateTotal, getFormattedPrice } from "@/app/utils/CurrencyConfig";

function CheckoutLine({ product }: { product: ProductInfo }){
  const params = useParams();
  const locale = (params.locale as string) || "uk";

  const formattedPrice = getFormattedPrice(product, locale);
  const subtotal = calculateTotal(product, locale);

  return (
    <div className={styles.checkoutLine}>
      <div className={styles.productDetails}>
        <h3 className={styles.productName}>{product.name[locale]}</h3>
        <p className={styles.unitPrice}>
          <span className={styles.label}>Price:</span> {formattedPrice}
        </p>

        <div className={styles.quantityDisplay}>
          <span className={styles.label}>Quantity:</span> {product.quantity}
        </div>
      </div>

      <div className={styles.priceSection}>
        <p className={styles.subtotal}>
          <span className={styles.label}>Subtotal:</span>
          <strong>{subtotal}</strong>
        </p>
      </div>
    </div>
  );
}

export default function Cart() {
  const { items, itemCount } = useCart();
  const params = useParams();
  const locale = params.locale == "uk" ? "" : (params.locale as string); // fallback to 'uk'

  return (
    <main className={styles.main}>
      <h1>Your Cart</h1>

      {Array.from(items.values())
        .filter((product) => product.quantity > 0)
        .map((product) => (
          <CheckoutLine key={product.id} product={product} />
        ))}
      <p>Total items: {itemCount}</p>
      <button className={styles.card}>
        <Link href={`/${locale}`}>Continue shopping</Link>
      </button>
    </main>
  );
}
