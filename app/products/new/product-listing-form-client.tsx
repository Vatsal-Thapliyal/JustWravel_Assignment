// app/products/new/product-listing-form-client.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product } from '@/types';

/* ------------------ Zod Schema ------------------ */
const productSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters'),

  price: z
    .number({
      message: 'Price must be a number',
    })
    .positive('Price must be greater than 0'),

  description: z.string().optional(),

  category: z.string().min(1, 'Category is required'),

  image: z
    .string()
    .min(1, 'Image URL is required')
    .url('Please enter a valid image URL'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductListingFormClientProps {
  categories: string[];
}

export default function ProductListingFormClient({
  categories,
}: ProductListingFormClientProps) {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [savedProduct, setSavedProduct] = useState<Product | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      price: undefined,
      description: '',
      category: '',
      image: '',
    },
  });

  const imageUrl = watch('image');

  /* ------------------ Submit ------------------ */
  const onSubmit = async (data: ProductFormData) => {
    setSubmitSuccess(false);
    setSavedProduct(null);

    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      const newProduct = await response.json();
      setSavedProduct(newProduct);
      setSubmitSuccess(true);

      setTimeout(() => {
        reset();
        setSubmitSuccess(false);
        setSavedProduct(null);
      }, 3000);
    } catch (error) {
      console.error(error);
      alert('Failed to save product');
    }
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add New Product
          </h1>
          <p className="text-gray-600 mb-8">
            Fill in the details below to list your product
          </p>

          {submitSuccess && savedProduct && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">
                Product saved successfully! ID: {savedProduct.id}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Title
              </label>
              <input
                {...register('title')}
                className={`w-full px-4 py-3 border rounded-lg ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Price + Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('price', { valueAsNumber: true })}
                  className={`w-full px-4 py-3 border rounded-lg ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image URL
              </label>
              <input
                {...register('image')}
                className={`w-full px-4 py-3 border rounded-lg ${
                  errors.image ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.image.message}
                </p>
              )}

              {imageUrl && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Image Preview:</p>
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-h-48 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows={5}
                {...register('description')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Product'}
              </button>
              <button
                type="button"
                onClick={() => reset()}
                className="px-6 py-4 bg-gray-200 rounded-xl"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
