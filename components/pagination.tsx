"use client";

import Link from "next/link";
import { PaginationProps } from "../types";


export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8 mb-20">
      {/* Previous */}
      <Link
        href={`?page=${currentPage - 1}`}
        className={`px-4 py-2 rounded-lg border text-sm ${
          currentPage === 1
            ? "pointer-events-none opacity-50"
            : "hover:bg-gray-100"
        }`}
      >
        Prev
      </Link>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`?page=${page}`}
          className={`px-4 py-2 rounded-lg border text-sm ${
            page === currentPage
              ? "bg-indigo-600 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Next */}
      <Link
        href={`?page=${currentPage + 1}`}
        className={`px-4 py-2 rounded-lg border text-sm ${
          currentPage === totalPages
            ? "pointer-events-none opacity-50"
            : "hover:bg-gray-100"
        }`}
      >
        Next
      </Link>
    </div>
  );
}
