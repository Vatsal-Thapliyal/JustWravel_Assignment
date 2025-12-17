import ProductsClient from "./productsclient";
import { Product, ProductListingPageProps } from "@/types";

export const dynamic = 'force-dynamic';

// Fetch products with retry logic
async function fetchProducts(): Promise<Product[]> {
  const maxRetries = 3;
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch("https://fakestoreapi.com/products", {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      return res.json();
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${i + 1} failed:`, error);
      
      // Wait before retrying (exponential backoff)
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }

  console.error("Failed to fetch products after retries:", lastError);
  return []; // Return empty array as fallback
}

// Fetch categories with retry logic
async function fetchProductCategories(): Promise<string[]> {
  const maxRetries = 3;
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch("https://fakestoreapi.com/products/categories", {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      return res.json();
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${i + 1} failed:`, error);
      
      // Wait before retrying (exponential backoff)
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }

  console.error("Failed to fetch categories after retries:", lastError);
  return []; // Return empty array as fallback
}

export default async function ProductListingPage({
  searchParams,
}: ProductListingPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page ?? "1", 10);

  // Fetch both in parallel
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchProductCategories(),
  ]);

  return (
    <>
      <ProductsClient 
        products={products} 
        currentPage={page} 
        productCategories={categories} 
      />
    </>
  );
}