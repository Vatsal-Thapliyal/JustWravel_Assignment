import Navbar from '@/components/navbar';
import ProductDetailClient from './product-detail-client';
import axios from 'axios';

async function getProduct(id: string) {
  const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return res.data;
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
