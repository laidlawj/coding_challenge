import { render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom'
import { getProducts, Product } from '@/app/components/ProductList';
import Home from '@/app/[locale]/page';
import { CartProvider } from '@/app/context/CartContext';
import { useParams } from 'next/navigation';
import { useFetchAdditionalProducts } from '@/app/components/MoreProducts';
import Cart from '@/app/[locale]/checkout/page';

// Mock data matching the API structure
const mockProducts = [
    {
      id: 1,
      name: {
        us: "Product 1 US",
        uk: "Product 1 UK"
      },
      price: {
        usd: 29.99,
        gbp: 23.99
      },
      stock: 50
    },
    {
      id: 2,
      name: {
        us: "Product 2 US", 
        uk: "Product 2 UK"
      },
      price: {
        usd: 49.99,
        gbp: 39.99
      },
      stock: 35
    },
    {
      id: 3,
      name: {
        us: "Product 3 US",
        uk: "Product 3 UK"
      },
      price: {
        usd: 19.99,
        gbp: 15.99
      },
      stock: 75
    },
    {
      id: 4,
      name: {
        us: "Product 4 US",
        uk: "Product 4 UK"
      },
      price: {
        usd: 89.99,
        gbp: 69.99
      },
      stock: 20
    }
];

const mockAdditionalProducts = [
    {
      "id": 5,
      "name": {
        "us": "item 5",
        "uk": "item 5"
      },
      "price": {
        "usd": 49.99,
        "gbp": 38.5
      },
      "stock": 120
    },
    {
      "id": 6,
      "name": {
        "us": "item 6",
        "uk": "item 6"
      },
      "price": {
        "usd": 79.99,
        "gbp": 61.5
      },
      "stock": 32
    },
    {
      "id": 7,
      "name": {
        "us": "item 7",
        "uk": "item 7"
      },
      "price": {
        "usd": 199.99,
        "gbp": 154.99
      },
      "stock": 28
    }
];
  
function validateCart(expected: { [key: number]: number }): void {
    for (const itemId in expected) {
        const expectedCount = expected[itemId];
        const productName = mockProducts.find(p => p.id === parseInt(itemId))?.name.uk;

        if (productName) {
            const itemCountElement = screen.getByText(new RegExp(`${productName} count:`, 'i'));
            expect(itemCountElement).toHaveTextContent(new RegExp(`^${productName} count: ${expectedCount}$`));
        }
    }
}

// Mock all dependencies
jest.mock('@/app/components/ProductList');
jest.mock('next/navigation');
jest.mock('@/app/components/MoreProducts');
jest.mock("")

// Create mocked versions
const mockGetProducts = jest.mocked(getProducts);
const mockUseParams = jest.mocked(useParams);
const mockUseFetchAdditionalProducts = jest.mocked(useFetchAdditionalProducts);

describe('Home', () => {
    const renderHome = async () => {
        const HomeComponent = await Home();
        return render(
            <CartProvider>
                {HomeComponent}
            </CartProvider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    
        // Set default mock return values
        mockGetProducts.mockResolvedValue(mockProducts);
        mockUseParams.mockReturnValue({ locale: 'uk' });
        
        // Default mock for useFetchAdditionalProducts - no additional products
        mockUseFetchAdditionalProducts.mockReturnValue({
            moreProducts: null,
            error: null,
        });
    });

    it('loads initial products from api', async () => {
        await renderHome();
        
        mockProducts.forEach(function (product) {
            expect(screen.getByText(product.name.uk)).toBeInTheDocument();
        });
    });

    it("cart is empty before a user adds items", async () => {
        await renderHome();

        expect(screen.getByText('Basket: 0 items')).toBeInTheDocument();

        mockProducts.forEach(function (product) {
            expect(screen.getByText(`${product.name.uk} count: 0`)).toBeInTheDocument();
        });
    });
 
    it('renders a basket with 1 item', async () => {
        await renderHome();
        
        const product1Button = screen.getByRole('button', { name: `Add ${mockProducts[0].name.uk} to basket` });
        await product1Button.click();

        const basketButton = screen.getByRole('button', {
            name: /Basket:/i,
        });
        
        expect(basketButton).toHaveTextContent(/^Basket: 1 item$/);
        
        const cartExpectedValue = {
            1: 1,
            2: 0,
            3: 0,
            4: 0
        };
        validateCart(cartExpectedValue);
    });

    it('renders a basket with multiple items from different items', async () => {
        await renderHome();
        
        const product1Button = screen.getByRole('button', { name: `Add ${mockProducts[0].name.uk} to basket` });
        await product1Button.click();
        await product1Button.click();

        const product2Button = screen.getByRole('button', { name: `Add ${mockProducts[1].name.uk} to basket` });
        await product2Button.click();

        const basketButton = screen.getByRole('button', {
            name: /Basket:/i,
        });
        
        expect(basketButton).toHaveTextContent(/^Basket: 3 items$/);
        
        const cartExpectedValue = {
            1: 2,
            2: 1,
            3: 0,
            4: 0
        };
        validateCart(cartExpectedValue);
    });

    it('presents localised names when in us', async () => {
        mockUseParams.mockReturnValue({ locale: 'us' });
        await renderHome();
        
        mockProducts.forEach(function (product) {
            expect(screen.getByText(product.name.us)).toBeInTheDocument();
        });
    });

    it('presents localised prices when in us', async () => {
        mockUseParams.mockReturnValue({ locale: 'us' });
        await renderHome();
        
        mockProducts.forEach(function (product) {
            expect(screen.getByText(product.name.us)).toBeInTheDocument();
            expect(screen.queryByText(product.name.uk)).not.toBeInTheDocument();
        });

        mockProducts.forEach(function (product) {
            expect(screen.getByText(`$${product.price.usd}`)).toBeInTheDocument();
            expect(screen.queryByText(`£${product.price.gbp}`)).not.toBeInTheDocument();
        });
    });

    it('loads additional products when getMoreProducts returns data', async () => {
        // Override the mock for this specific test
        mockUseFetchAdditionalProducts.mockReturnValue({
            moreProducts: mockAdditionalProducts,
            error: null,
        });
        
        await renderHome();

        // Verify that initial products are still there
        mockProducts.forEach((product) => {
            expect(screen.getByText(product.name.uk)).toBeInTheDocument();
        });

        // Verify that additional products are also rendered
        mockAdditionalProducts.forEach((product) => {
            expect(screen.getByText(product.name.uk)).toBeInTheDocument();
        });
    });

    it('handles error state when fetching additional products fails', async () => {
        // Test error handling
        mockUseFetchAdditionalProducts.mockReturnValue({
            moreProducts: null,
            error: 'Failed to fetch more products',
        });
        
        await renderHome();

        // Verify that initial products are still there
        mockProducts.forEach((product) => {
            expect(screen.getByText(product.name.uk)).toBeInTheDocument();
        });

        // Verify that no additional products are rendered
        mockAdditionalProducts.forEach((product) => {
            expect(screen.queryByText(product.name.uk)).not.toBeInTheDocument();
        });
    });
});



describe('Checkout', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Set default mock return values
        mockUseParams.mockReturnValue({ locale: 'uk' });
        
    });

    it('empty checkout if no products', async () => {
        render(<CartProvider><Cart/></CartProvider>)
        expect(screen.getByText('Total items: 0')).toBeInTheDocument();
    });
    

    it('cart shows quanity ', async () => {
        const HomeComponent = await Home();
        render(
            <CartProvider>
                {HomeComponent}
                <Cart/>
            </CartProvider>
        );
        
        const product1Button = screen.getByRole('button', { name: `Add ${mockProducts[0].name.uk} to basket` });
        await product1Button.click();
        await product1Button.click();

        const product2Button = screen.getByRole('button', { name: `Add ${mockProducts[1].name.uk} to basket` });
        await product2Button.click();

        expect(screen.getByText('Total items: 3')).toBeInTheDocument();
        expect(screen.getByText(`${mockProducts[0].name.uk}: 2`)).toBeInTheDocument()
        expect(screen.getByText(`${mockProducts[1].name.uk}: 1`)).toBeInTheDocument()
    });

})