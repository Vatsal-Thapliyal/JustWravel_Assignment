"use client";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full flex flex-col w-80 animate-pulse">
      <div className="w-full h-56 bg-gray-200" />
      <div className="p-4 flex flex-col gap-3 grow">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mt-1" />

        <div className="mt-auto">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
}
