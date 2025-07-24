async function getMoreProducts(): Promise<[]> {
  try {
    const res = await fetch('<https://v0-api-endpoint-request.vercel.app/api/more-products>', {
    });

    if (!res.ok) {
      // It's good practice to handle errors
      throw new Error(`Failed to fetch additional products: ${res.statusText}`);
    }

    const data = await res.json();
    return data.products || []; // Assuming your API returns an object with a 'products' array
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array or handle the error gracefully
  }
}
