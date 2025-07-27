
import styles from './page.module.css'

import { Suspense } from 'react';
import { getProducts } from '../components/ProductList';
import Homepage from '../components/Homepage';


export default async function Home() {
  const products = await getProducts()

  return <Homepage products={products}  />
}



