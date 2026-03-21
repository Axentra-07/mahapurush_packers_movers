
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
<<<<<<< HEAD
=======
import AIAssistant from './components/AIAssistant';
>>>>>>> 40193b5dc3b4a1d8c1ed15e3d9823b660efa7157
import FloatingCTA from './components/FloatingCTA';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
      <FloatingCTA />
<<<<<<< HEAD
=======
      <AIAssistant />
>>>>>>> 40193b5dc3b4a1d8c1ed15e3d9823b660efa7157
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
