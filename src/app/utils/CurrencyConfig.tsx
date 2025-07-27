import { Product } from "../components/ProductList";
import { ProductInfo } from "../context/CartContext";

interface CurrencyLocaleConfig {
  currencyCode: string; // The ISO 4217 currency code (e.g., 'GBP', 'USD', 'EUR')
  localeFormat: string; // The locale string for Intl.NumberFormat (e.g., 'en-GB', 'en-US')
  priceKey: string; // The corresponding key on your ProductPrice object (e.g., 'gbp', 'usd')
}

// Map your custom locale strings ('uk', 'us') to the currency configuration
type LocaleToCurrencyMap = {
  [key: string]: CurrencyLocaleConfig;
};

const localeCurrencyMap: LocaleToCurrencyMap = {
  uk: {
    currencyCode: "GBP",
    localeFormat: "en-GB", // English (United Kingdom) locale for formatting
    priceKey: "gbp",
  },
  us: {
    currencyCode: "USD",
    localeFormat: "en-US", // English (United States) locale for formatting
    priceKey: "usd",
  },
  // ADD NEW REGIONS/CURRENCIES HERE EASILY
  // e.g., 'ca': { currencyCode: 'CAD', localeFormat: 'en-CA', priceKey: 'cad' }
};

// Define a default fallback configuration in case a locale isn't mapped
const defaultCurrencyLocaleConfig = localeCurrencyMap.uk;
// Helper function to get the correct config for a given locale
export const getCurrencyLocaleConfig = (
  locale: string
): CurrencyLocaleConfig => {
  return localeCurrencyMap[locale] || defaultCurrencyLocaleConfig;
};

export function getFormattedPrice(product: Product, locale: string) {
  const currencyConfig = getCurrencyLocaleConfig(locale);
  const priceToDisplay = product.price[currencyConfig.priceKey];

  return Intl.NumberFormat(currencyConfig.localeFormat, {
    style: "currency",
    currency: currencyConfig.currencyCode,
  }).format(priceToDisplay); // Changed from Number to number
}

export function calculateTotal(product: ProductInfo, locale: string) {
  const currencyConfig = getCurrencyLocaleConfig(locale);
  const price = product.price[currencyConfig.priceKey];

  const total = product.quantity * price;

  return Intl.NumberFormat(currencyConfig.localeFormat, {
    style: "currency",
    currency: currencyConfig.currencyCode,
  }).format(total); // Changed from Number to number
}
