import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/productsApi';
import ProductCard from '../components/product/ProductCard';
import Spinner from '../components/common/Spinner';
import ErrorMessage from '../components/common/ErrorMessage';
import Pagination from '../components/ui/Pagination';

const PRODUCTS_PER_PAGE = 10;

const ProductListPage = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['products', currentPage, PRODUCTS_PER_PAGE],
    queryFn: () => fetchProducts({ skip: currentPage * PRODUCTS_PER_PAGE, limit: PRODUCTS_PER_PAGE }),
    keepPreviousData: true,
  });

  if (isLoading && !isFetching) return <Spinner />;
  if (isError) return <ErrorMessage message={error?.message || 'Failed to load products.'} />;

  const products = data?.products || [];
  const totalProducts = data?.total || 0;
  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Our Awesome Products
        </h1>
        <p className="text-gray-600 mt-2">Browse through our collection of high-quality items.</p>
      </header>

      {isFetching && <div className="fixed top-4 right-4 z-50"><Spinner size="sm" /></div>}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        !isFetching && <p className="text-center text-gray-500 py-10">No products found for this page.</p>
      )}


      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

    </div>
  );
};

export default ProductListPage;