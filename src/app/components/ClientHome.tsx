'use client';
import styles from '../page.module.css'
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { Product } from '../page';



function ItemCount({count, name}: {count: number, name: string}) {
  return <div key={name}>{name} count: {count}</div>
};

interface ClientHomeProps {
  products: Product[];
}


export default function ClientHome({ products }: ClientHomeProps) {
    const { items, itemCount, addToCart } = useCart();

    console.log("product is", products)

    return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Michael&apos;s Amazing Web Store
        </p>
        <div>
          <button className={styles.basket}>Basket: {itemCount} item{itemCount == 1? '' : 's'}</button>
          {products.map(({ name }) => (
          <ItemCount
            key={name.uk}
            name={name.uk}
            count={items.find(item => item.name === name.uk)?.quantity || 0}
          />
            ))}
        </div>
      </div>

      <div className={styles.grid}>
         {products.map(({ name, price }) => (
          <button
            key={name.uk}
            className={styles.card}
            onClick={() => addToCart(name.uk)}
            aria-label="Add to basket"
          >
            <h2>{name.uk} <span>-&gt;</span></h2>
            <p>£{String(price.gbp)}</p>
          </button>
        ))}
      </div>
      <button    className={styles.card}>  <Link href="/checkout">Go to checkout</Link></button>
    </main>
  )
}

