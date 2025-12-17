import Link from "next/link";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { id, title, price, image } = product;

  return (
    <Link href={`/products/${id}`} className="group">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col w-80">

        {/* Image Wrapper (Fixed Size) */}
        <div className="relative w-full h-56 bg-gray-100 flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="max-w-full max-h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2 grow">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2">
            {title}
          </h3>

          <div className="mt-auto">
            <p className="text-lg font-bold text-indigo-600">
              ₹{price.toFixed(2)}
            </p>
          </div>
        </div>

      </div>
    </Link>
  );
}
