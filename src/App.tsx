import React, { useEffect } from 'react';
import { useStore } from './store/useStore';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import TrendingStocks from './components/TrendingStocks';
import Dashboard from './components/Dashboard';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // / - Focus search
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>('#ticker-search');
        searchInput?.focus();
      }
      
      // D - Toggle dark mode
      if (e.key === 'd' && !e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement;
        if (activeElement?.tagName !== 'INPUT' && activeElement?.tagName !== 'TEXTAREA') {
          useStore.getState().toggleTheme();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      
      <Header />
      
      <main id="main-content">
        <Hero />
        <Features />
        <TrendingStocks />
        <Dashboard />
        <About />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
