import ProductsClient from "./productsclient";
import { Product, ProductListingPageProps } from "@/types";

export const dynamic = 'force-dynamic';

//fetch products
async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

//fetch categories
async function fetchProductCategories(): Promise<string[]> {
  const res = await fetch("https://fakestoreapi.com/products/categories", {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
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
      <ProductsClient products={products} currentPage={page} productCategories={categories} />
    </>
  );
}
