import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Mic, LineChart, Sparkles, Search, TrendingUp, ArrowRight, X, Loader2 } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '@/config/api';

interface StockSuggestion {
  name: string;
  ticker: string;
  exchange: string;
  country: string;
}

const Hero: React.FC = () => {
  const [quickTicker, setQuickTicker] = useState('');
  const [suggestions, setSuggestions] = useState<StockSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  // Search for stocks in database
  const searchStocks = async (query: string) => {
    if (!query || query.length < 1) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get(`${API_ENDPOINTS.search}?q=${encodeURIComponent(query)}&limit=8`);
      setSuggestions(response.data);
      setShowSuggestions(response.data.length > 0);
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle input change with debounce
  const handleInputChange = (value: string) => {
    const upperValue = value.toUpperCase();
    setQuickTicker(upperValue);

    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      searchStocks(value);
    }, 300);
  };

  // Select suggestion
  const handleSelectSuggestion = (suggestion: StockSuggestion) => {
    setQuickTicker(suggestion.ticker);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToDashboard = () => {
    const dashboard = document.querySelector('#dashboard');
    dashboard?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTrending = () => {
    const trending = document.querySelector('#trending');
    trending?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickSearch = (ticker: string) => {
    setQuickTicker(ticker);
    setSuggestions([]);
    setShowSuggestions(false);
    scrollToDashboard();
    // Trigger search after scroll
    setTimeout(() => {
      const searchInput = document.querySelector<HTMLInputElement>('#ticker-search');
      if (searchInput) {
        searchInput.value = ticker;
        searchInput.focus();
      }
    }, 800);
  };

  const popularStocks = ['RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 'ICICIBANK.NS'];

  const features = [
    {
      icon: Brain,
      title: 'Multi-Model AI',
      description: 'FinBERT + Emotion Detection',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: Mic,
      title: 'Voice Input',
      description: 'Speak your stock ticker',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: LineChart,
      title: 'Real-Time Data',
      description: 'Live news and prices',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Sparkles,
      title: 'AI Insights',
      description: 'Automated analysis',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <section id="hero" className="relative overflow-hidden min-h-screen flex items-center">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 gradient-bg opacity-10 dark:opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 animate-pulse-slow"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl float-1"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl float-2"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl float-3"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 mb-6"
          >
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              Powered by Advanced NLP & FinBERT
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 gradient-text leading-tight"
          >
            Decode Market Sentiment
            <br />
            <span className="text-slate-900 dark:text-white">Make Smarter Trades</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 text-balance max-w-3xl mx-auto"
          >
            Real-time AI-powered sentiment analysis from thousands of news sources. 
            Get instant insights on any stock's market mood.
          </motion.p>

          {/* Quick Search with Autocomplete */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="max-w-2xl mx-auto mb-6"
          >
            <div className="relative" ref={suggestionsRef}>
              <div className="relative">
                <input
                  type="text"
                  value={quickTicker}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && quickTicker && handleQuickSearch(quickTicker)}
                  onFocus={() => {
                    if (suggestions.length > 0) setShowSuggestions(true);
                  }}
                  placeholder="Search by company name or ticker (e.g., Reliance, TCS, HDFC)..."
                  className="w-full pl-12 pr-32 py-4 text-lg rounded-2xl bg-white dark:bg-dark-card border-2 border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all shadow-lg"
                  autoComplete="off"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                {isSearching && (
                  <div className="absolute right-32 top-1/2 -translate-y-1/2">
                    <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
                  </div>
                )}
                {quickTicker && (
                  <button
                    onClick={() => {
                      setQuickTicker('');
                      setSuggestions([]);
                      setShowSuggestions(false);
                    }}
                    className="absolute right-32 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => quickTicker && handleQuickSearch(quickTicker)}
                  disabled={!quickTicker}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Analyze
                </button>
              </div>

              {/* Autocomplete Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 w-full mt-2 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl shadow-2xl max-h-80 overflow-y-auto"
                  >
                    {suggestions.map((suggestion, index) => (
                      <motion.button
                        key={`${suggestion.ticker}-${index}`}
                        whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
                        onClick={() => handleSelectSuggestion(suggestion)}
                        className="w-full px-4 py-3 text-left hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors border-b border-light-border dark:border-dark-border last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-semibold text-slate-900 dark:text-slate-100">
                              {suggestion.name}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
                              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                                {suggestion.ticker}
                              </span>
                              <span>•</span>
                              <span>{suggestion.exchange}</span>
                              <span>•</span>
                              <span>{suggestion.country}</span>
                            </div>
                          </div>
                          <TrendingUp className="w-5 h-5 text-indigo-400" />
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
              Try these: {popularStocks.slice(0, 5).map((stock, i) => (
                <button
                  key={stock}
                  onClick={() => handleQuickSearch(stock)}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium mx-1"
                >
                  {stock}{i < 4 ? ',' : ''}
                </button>
              ))}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToDashboard}
              className="btn-primary text-lg px-10 py-4 flex items-center justify-center gap-2"
            >
              Start Free Analysis
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTrending}
              className="btn-secondary text-lg px-10 py-4 flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              View Trending Stocks
            </motion.button>
          </motion.div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-6 group cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
