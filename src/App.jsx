import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Cursor from './components/Cursor.jsx';
import Home from './pages/Home.jsx';
import Work from './pages/Work.jsx';
import Studio from './pages/Studio.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div className="k-grain min-h-screen">
        <Cursor />
        <Nav />
        <ScrollToTop />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
}
