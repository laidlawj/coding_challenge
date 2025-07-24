
import styles from './page.module.css'
import ClientHome from './components/ClientHome';
import { Suspense } from 'react';
import { getProducts } from './components/ProductList';

export default async function Home() {
  const products = await getProducts()
  // console.log("props are", products)
  return (
    <>
      <ClientHome products={products} />
    </>
  )
}
