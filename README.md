# Michael's NextJS Coding Challenge

## The Challenge:
Some newb has made a mess of this code. There are TODOs that need finishing off, broken and questionable tests and the code itself is inefficient.  
Please fix up whatever mess you find to get this piece of work working well.

### Extended tasks

- Our Product Manager wants a new 'checkout' page which should detail all of the items in the basket with their quantity and a total item quantity. Create this page.
- We've launched our new product API - <https://v0-api-endpoint-request.vercel.app/api/products> - can you please migrate the site to use the products from here - UK only for now. Our CTO is adamant that products should be available as soon as the page loads - no loading spinners.
- We've released a way of getting some more products. Its a bit slow so these can be displayed to the user after the initial products load please <https://v0-api-endpoint-request.vercel.app/api/more-products>
- We're launching in the states! When the user navigates to /us, prices should be displayed in dollars (USD) instead of GBP, and text should be localized for US users. Ensure the solution is scalable for future regions (e.g., Europe, Asia). Consider how you would handle currency formatting, locale-specific content, and dynamic routing.
- Run your applications tests when you push the branch to github
- Deploy your application when you push the branch to github

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, `npm install`, then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Run the testing and linting with `npm run test` and `npm run lint`.




## JADE THINGS TO NOTE:
Product ID Duplication: I've identified an issue with non-unique product IDs originating from the two API endpoints. This leads to duplicate component IDs in the rendered output. For a production environment, this must be addressed by either ensuring distinct IDs from the backend, implementing frontend logic to prevent displaying duplicates, or adding a unique prefix (e.g., for recommended items) to differentiate them.

Cart Display User Experience: The original persistent display of cart contents is distracting and deviates from standard e-commerce practices. I have commented out the ui, and preserved this functionality, the preferred approach is to display only a cart button, which can be easily reverted if needed.

Testing Strategy: Due to time constraints, I opted for integration testing to simulate the end-user experience. In a full production cycle, a comprehensive testing strategy would ideally incorporate both unit and integration tests.

Next Steps & Immediate Focus:

Inventory Management Policy: Define and implement a clear policy for handling product and stock levels. This includes preventing purchases of out-of-stock items and considering mechanisms for temporarily securing items in a user's cart (e.g., a 30-minute reservation).