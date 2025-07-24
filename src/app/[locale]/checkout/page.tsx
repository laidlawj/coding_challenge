'use client';

import Link from "next/link";
import { useCart } from "../../context/CartContext";
import styles from  '../../page.module.css'
import { useParams } from "next/navigation";

export default function Cart() {
    const { items, itemCount} = useCart();

    const params = useParams();
    const locale = params.locale || ''; // fallback to 'uk'

    return (
        <main className={styles.main}>
        <h1>Your Cart</h1>

        {items.map(({ name, quantity }) => (
            quantity > 0 ? (
                <div key={name}>
                <p>{name}: {quantity}</p>
                </div>
            ) : null
        ))}
         <p>Total items: {itemCount}</p>
         <button   className={styles.card}>   <Link href={`/${locale}`}>Continue shopping</Link></button>
        
        </main>
        
    )

}