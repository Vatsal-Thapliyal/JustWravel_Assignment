import Navbar from '@/components/navbar';
import ProductDetailClient from './product-detail-client';

async function getProduct(id: string) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  return res.json();
}

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  // Await params before accessing properties
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 px-6 py-10">
        <ProductDetailClient product={product} />
      </div>
    </>
  );
}