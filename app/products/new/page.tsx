// app/products/new/page.tsx
// SERVER COMPONENT

import Navbar from '@/components/navbar';
import ProductListingFormClient from './product-listing-form-client';
import axios from 'axios';

async function getCategories(): Promise<string[]> {
  try {
    const res = await axios.get<string[]>(
      'https://fakestoreapi.com/products/categories');

    return res.data;
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
