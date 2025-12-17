import Navbar from '@/components/navbar';
import ProductDetailClient from './product-detail-client';

async function getProduct(id: string) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error('Failed to fetch product:', res.status);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Product fetch error:', error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <>
        <Navbar />
        <p className="p-6 text-center text-red-500">
          Product not found.
        </p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 px-6 py-10">
        <ProductDetailClient product={product} />
      </div>
    </>
  );
}
