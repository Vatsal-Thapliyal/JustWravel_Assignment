// app/products/new/page.tsx
import Navbar from '@/components/navbar';
import ProductListingFormClient from './product-listing-form-client';

export const dynamic = 'force-dynamic';

async function getCategories(): Promise<string[]> {
  try {
    const res = await fetch('https://fakestoreapi.com/products/categories', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      console.error(`Failed to fetch categories: ${res.status}`);
      return [];
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