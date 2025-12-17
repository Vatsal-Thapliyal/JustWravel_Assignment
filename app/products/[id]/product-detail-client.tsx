'use client';

export default function ProductDetailClient({ product }: { product: any }) {
  return (
    <div className="min-h-screen w-full bg-linear-to-br p-2 sm:p-4 lg:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Removed min-h full viewport */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Image Section */}
            <div className="flex items-center justify-center bg-linear-to-br from-gray-50 to-white p-6 sm:p-8 lg:p-10">
              <div className="w-full max-w-md">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-auto max-h-96 object-contain drop-shadow-xl"
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                {/* Category Badge */}
                <span className="inline-block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 rounded-full">
                  {product.category}
                </span>

                {/* Title */}
                <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  {product.title}
                </h2>

                {/* Price */}
                <div className="mt-4">
                  <span className="text-2xl sm:text-3xl font-bold text-green-600">
                    &#8377;{product.price.toFixed(2)}
                  </span>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
