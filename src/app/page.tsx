
import styles from './page.module.css'

import ClientHome from './components/ClientHome';


type ProductResponse = {
  success: boolean, 
  products: Product[]
}
type NameByLocation = { 
  us: string, 
  uk: string
} 

type PriceByLocation = {
  usd: Number, 
  gbp: Number
}

export type Product = {
  id: Number, 
  name: NameByLocation, 
  price: PriceByLocation,
  stock: Number
}

async function getProducts(): Promise<Product[]> {
  // In a real application, you'd fetch from your API here
  // For now, we'll use itemData as a placeholder
  const res = await fetch('https://v0-api-endpoint-request.vercel.app/api/products',);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await res.json();
  return data.products || []; // Adjust based on your API response structure
}

export default async function Home() {
  const products = await getProducts()
  // console.log("props are", products)
  return       <ClientHome products={products} />
}
