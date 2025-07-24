
type NameByLocation = { 
  [key: string]: string;
} 

type PriceByLocation = {
 [key: string]: number;
} 


export type Product = {
  id: number, 
  name: NameByLocation, 
  price: PriceByLocation,
  stock: number
}
export async function getProducts(): Promise<Product[]> {
  // In a real application, you'd fetch from your API here
  // For now, we'll use itemData as a placeholder
  const res = await fetch('https://v0-api-endpoint-request.vercel.app/api/products',);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await res.json();
  return data.products || []; // Adjust based on your API response structure
}