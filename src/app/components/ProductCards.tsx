import styles from '../page.module.css';
import { Product } from './ProductList';

interface AllProductsProps { 
    allProducts: Product[],
    moreProducts: Product[] | null,
    additionalProductsError: string | null, 
    addToCart: (itemName: string) => void;
}
// ProductCard component (for a single product display)
interface ProductCardProps {
  product: Product;
  addToCart: (itemName: string) => void;
}

interface ClientHomeProps {
  products: Product[]; // These are the initial products passed from the Server Component
}

function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <button
      key={product.name.uk}
      className={styles.card}
      onClick={() => addToCart(product.name.uk)}
      aria-label={`Add ${product.name.uk} to basket`}
    >
      <h2>{product.name.uk} <span>-&gt;</span></h2>
      <p>£{String(product.price.gbp)}</p>
    </button>
  );
}

export function AllProducts({allProducts, moreProducts, additionalProductsError, addToCart}: AllProductsProps){ 
    return (
        <div className={styles.grid}>
            
            {/* Render all products in a single grid */}
            {allProducts.map((product) => (
            <ProductCard key={product.name.uk} product={product} addToCart={addToCart} />
            ))}

            {/* Conditional rendering for additional products loading/error state */}
            {moreProducts === null && (
            <div className={styles.loadingMore}>
                <h2>Loading more amazing products...</h2>
                {/* You can add a spinner here */}
            </div>
            )}

            {additionalProductsError && (
            <div className={styles.error}>
                Error loading additional products: {additionalProductsError}
            </div>
            )}

            {moreProducts !== null && moreProducts.length === 0 && !additionalProductsError && (
            <div className={styles.noMoreProducts}>
                <p>No more additional products available.</p>
            </div>
            )}
        </div>
    )
}