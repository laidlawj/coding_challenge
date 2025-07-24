import { useLocale } from '../context/LocalContext';
import styles from '../page.module.css';
import { getCurrencyLocaleConfig } from '../utils/CurrencyConfig';
import { Product } from './ProductList';
import Spinner from './Spinner';



interface AllProductsProps { 
    allProducts: Product[],
    moreProducts: Product[] | null,
    additionalProductsError: string | null, 
    addToCart: (itemName: string) => void;
}
// ProductCard component (for a single product display)
interface ProductCardProps {
  product: Product;
  addToCart: (itemName: string|undefined) => void;
}
function ProductCard({ product, addToCart }: ProductCardProps) {
    const { locale } = useLocale();
    console.log("locale is", locale)

    const currencyConfig = getCurrencyLocaleConfig(locale);
    console.log('currency config is', currencyConfig)
    const priceToDisplay = product.price[currencyConfig.priceKey]
    
    
    const formattedPrice = new Intl.NumberFormat(currencyConfig.localeFormat, {
        style: 'currency',
        currency: currencyConfig.currencyCode,
    }).format(priceToDisplay);  // Changed from Number to number


  return (
    <button
      key={String(product.id)}
      className={styles.card}
      onClick={() => addToCart(product.name[locale])}
      aria-label={`Add ${product.name[locale]}to basket`}
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