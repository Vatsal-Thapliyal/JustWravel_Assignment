import ProductsClient from "./productsclient";
import { Product, ProductListingPageProps } from "@/types";
import axios from "axios";

//fetch products
async function fetchProducts(): Promise<Product[]> {
  const res = await axios.get<Product[]>("https://fakestoreapi.com/products");

  if (!res) {
    throw new Error("Failed to fetch products");
  }

  return res.data;
}

//fetch categories
async function fetchProductCategories(): Promise<string[]> {
  const res = await axios.get<string[]>("https://fakestoreapi.com/products/categories");

  if (!res) {
    throw new Error("Failed to fetch categories");
  }

  return res.data;
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
