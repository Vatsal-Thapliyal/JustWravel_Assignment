"use client";

import { ProductFilterProps } from "@/types";
import { ProductFilterSkeleton } from "./productfilterskeleton";

export default function ProductFilter({
  categories,
  onCategorySelect,
  onSortChange,
  selectedCategory,
  selectedSort,
}: ProductFilterProps) {
  if (!categories || categories.length === 0) {
    return <ProductFilterSkeleton />;
  }

  return (
    <div className="flex flex-wrap items-center gap-7 my-7">
      {/* Category Filter */}
      <div>
        <select
          value={selectedCategory}
          onChange={(e) => onCategorySelect(e.target.value)}
          className="rounded-lg border border-indigo-600 text-indigo-600 px-3 py-1 font-bold focus:outline-none focus:ring-2 focus:ring-black/20"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Filter */}
      <div>
        <select
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value as any)}
          className="rounded-lg border px-3 py-1 border-indigo-600 text-indigo-600 font-bold focus:outline-none focus:ring-2 focus:ring-black/20"
        >
          <option value="default">Default</option>
          <option value="price-low-high">Price (Low to High)</option>
          <option value="price-high-low">Price (High to Low)</option>
        </select>
      </div>
    </div>
  );
}
