import constants from "../../../consts"; // Import the entire module.exports object
const { BASE_URL, PRODUCTS_API } = constants;

type NameByLocation = {
  [key: string]: string;
};

type PriceByLocation = {
  [key: string]: number;
};

export type Product = {
  id: number;
  name: NameByLocation;
  price: PriceByLocation;
  stock: number;
};
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}${PRODUCTS_API}`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  return data.products || [];
}
