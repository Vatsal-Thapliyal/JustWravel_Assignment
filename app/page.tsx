import ProductsClient from "./productsclient";
import { Product, ProductListingPageProps } from "@/types";

export const dynamic = 'force-dynamic';

//fetch products
async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

//fetch categories
async function fetchProductCategories(): Promise<string[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories", {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Return default categories as fallback
    return ['electronics', 'jewelery', "men's clothing", "women's clothing"];
  }
}

export default async function ProductListingPage({
  searchParams,
}: ProductListingPageProps) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page ?? "1", 10);

  const products = await fetchProducts();
  const categories = await fetchProductCategories();

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