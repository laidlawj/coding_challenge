'use client';

import Link from "next/link";
import { useCart } from "../context/CartContext";
import styles from '../page.module.css'

export default function Cart() {
    const { items, itemCount, addToCart } = useCart();

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
         <button   className={styles.card}> <Link href="/">Continue shopping</Link></button>
        
        </main>
        
    )

}