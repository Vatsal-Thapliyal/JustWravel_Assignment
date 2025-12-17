"use client";

import { ProductsClientProps } from "@/types";
import Pagination from "@/components/pagination";
import ProductCard from "@/components/productCard";
import ProductCardSkeleton from "@/components/productcardskeleton";
import { useMemo, useState } from "react";
import ProductFilter from "@/components/productsfilter";
import Navbar from "@/components/navbar";
import SearchBar from "@/components/searchbar";
import { useSearchParams } from "next/navigation";

const PRODUCTS_PER_PAGE = 6;

export default function ProductsClient({
  products,
  currentPage,
  productCategories,
}: ProductsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState<
    "default" | "price-low-high" | "price-high-low"
  >("default");
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  
  const filteredAndSortedProducts = useMemo(() => {
    if (products.length) setIsLoading(false);

    let result = [...products];

    // Filter by search query (now directly from URL, already debounced)
    if (searchQuery) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchQuery) ||
        product.description?.toLowerCase().includes(searchQuery)
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort by price
    if (sortOption === "price-low-high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "price-high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, sortOption, searchQuery]);

  //pagination
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / PRODUCTS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  return (
    <>
      <Navbar />
      <SearchBar />
      
      <div className="max-w-7xl mx-auto px-4">
        <ProductFilter
          categories={productCategories}
          selectedCategory={selectedCategory}
          selectedSort={sortOption}
          onCategorySelect={setSelectedCategory}
          onSortChange={setSortOption}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-35 gap-y-7 mt-6 justify-items-center">
          {isLoading
            ? Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>

        {!isLoading && paginatedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your search.</p>
          </div>
        )}

        {!isLoading && totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </>
  );
}