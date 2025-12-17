// app/products/new/page.tsx
// SERVER COMPONENT

import Navbar from '@/components/navbar';
import ProductListingFormClient from './product-listing-form-client';

export const dynamic = 'force-dynamic';

async function getCategories() {
  try {
    const res = await fetch('https://fakestoreapi.com/products/categories', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function ProductListingPage() {
  const categories = await getCategories();

  return (
    <main>
    <Navbar />
      <ProductListingFormClient categories={categories} />
    </main>
  );
}