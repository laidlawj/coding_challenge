'use client';

import Link from "next/link";
import { useCart } from "../../context/CartContext";
import styles from  '../../page.module.css'
import { useParams } from "next/navigation";

export default function Cart() {
    const { items, itemCount} = useCart();
    const params = useParams();
    const locale = params.locale == 'uk' ? "" : params.locale  as string// fallback to 'uk'

    return (
        <main className={styles.main}>
        <h1>Your Cart</h1>

        {
            Array.from(items.values())
            .filter(product => product.quantity > 0)
            .map((product) => (
                <div key={product.name[locale || 'uk']}>
                    <p>{product.name[locale || 'uk']}: {product.quantity}</p>
                </div>
            ))
        
        }
         <p>Total items: {itemCount}</p>
         <button   className={styles.card}>   <Link href={`/${locale}`}>Continue shopping</Link></button>
        </main>
        
    )

}