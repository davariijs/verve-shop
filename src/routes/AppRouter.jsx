import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListPage from '../pages/ProductListPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollToTopBottom from '../components/ui/ScrollToTopBottom';
// import NotFoundPage from '../pages/NotFoundPage'; 

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>
      <Footer />
      <ScrollToTopBottom />
    </Router>
  );
};

export default AppRouter;