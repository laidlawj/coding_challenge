
import styles from './page.module.css'
import ClientHome from '../components/ClientHome';
import { Suspense } from 'react';
import { getProducts } from '../components/ProductList';
import { useRouter } from 'next/router';


export default async function Home()  {
  const products = await getProducts()

  return <ClientHome products={products}  />
}



