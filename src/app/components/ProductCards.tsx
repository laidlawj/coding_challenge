
import { useParams } from 'next/navigation';
import styles from '../page.module.css';
import { getFormattedPrice } from '../utils/CurrencyConfig';
import { Product } from './ProductList';
import Spinner from './Spinner';



interface AllProductsProps { 
    allProducts: Product[],
    moreProducts: Product[] | null,
    additionalProductsError: string | null, 
    addToCart: (product: Product) => void;
}

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

function ProductCard({ product, addToCart }: ProductCardProps) {
    console.log("hi here")
    const params = useParams();
    const locale = params.locale as string;

    const formattedPrice = getFormattedPrice(product, locale)
  return (
    <button
      key={String(product.id)}
      className={styles.card}
      onClick={() => addToCart(product)}
      aria-label={`Add ${product.name[locale]} to basket`}
    >
      <h2>{product.name[locale]} <span>-&gt;</span></h2>
      <p>{formattedPrice}</p>
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
            
               <Spinner/> 
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