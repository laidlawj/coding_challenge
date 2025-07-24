import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import Home, { itemData } from '@/app/home';

function validateCart(expected): boolean { 
    for (var item in itemData) {
        // console.log(itemData[data])
        const itemCount = screen.getByText(new RegExp(`${item.name}count:`, 'i'));
        expect(itemCount).toHaveTextContent(new RegExp(`^${item.name} count: 0$`));
    }


}

function checkBasketUI(expectedCart: Record<string, number>) {
   for (const item of itemData) {
        const itemCount = screen.getByText(new RegExp(`${item.name} count:`, 'i'));

        expect(itemCount).toHaveTextContent(
            new RegExp(`^${item.name} count: ${expectedCart[item.name as keyof typeof expectedCart]}$`)
        );
    }
}


describe('Home', () => {
    it('renders an empty basket', () => {
        render(<Home />);

        const basketButton = screen.getByRole('button', {
            name: /Basket:/i,
        });

        const expectedCart = {
            "Item 1": 0,
            "Item 2": 0,
            "Item 3": 0,
            "Item 4": 0
        }


        checkBasketUI(expectedCart)

        // assert.equal(basketButton.textContent, 'Basket: 0 items')
        expect(basketButton).toHaveTextContent(/^Basket: 0 items$/);
    });

    it('renders a basket with 1 item', async () => {
        render(<Home />);

        const buttons = screen.getAllByRole('button', {
            name: /Add to basket/i,
        });

        await buttons[0].click();

        const basketButton = screen.getByRole('button', {
            name: /Basket:/i,
        });

        const expectedCart = {
            "Item 1": 1,
            "Item 2": 0,
            "Item 3": 0,
            "Item 4": 0
        }

        checkBasketUI(expectedCart)

        

        expect(basketButton).toHaveTextContent(/^Basket: 1 item$/);
    });

    it('renders a basket with 1 of item 1 and 2 of item 2', async () => {
        render(<Home />);

        const buttons = screen.getAllByRole('button', {
            name: /Add to basket/i,
        });

        await buttons[0].click();
        await buttons[1].click();
        await buttons[1].click();

        const expectedCart = {
            "Item 1": 1,
            "Item 2": 2,
            "Item 3": 0,
            "Item 4": 0
        }

        checkBasketUI(expectedCart)

        const basketButton = screen.getByRole('button', {
            name: /Basket:/i,
        });

        expect(basketButton).toHaveTextContent(/^Basket: 3 items$/);
    });
});


