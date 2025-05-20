import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollToTopBottom from '../components/ui/ScrollToTopBottom';
import Spinner from '../components/common/Spinner';

const ProductListPage = lazy(() => import('../pages/ProductListPage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage')); 

const PageLoader = () => (
  <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
    <Spinner size="lg" />
  </div>
);

const AppRouter = () => {
  return (
    <Router>
      <Navbar storeName="Verve" />
      <main className="flex-grow bg-bg-page">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/:productId" element={<ProductDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer storeName="Verve" />
      <ScrollToTopBottom />
    </Router>
  );
};

export default AppRouter;