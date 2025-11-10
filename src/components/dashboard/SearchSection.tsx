import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Mic, X, Loader2, Calendar, TrendingUp } from 'lucide-react';
import { useStore } from '@/store/useStore';
import axios from 'axios';

const POPULAR_TICKERS = ['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'AMZN', 'NVDA', 'META', 'NFLX'];

interface StockSuggestion {
  name: string;
  ticker: string;
  exchange: string;
  country: string;
}

const SearchSection: React.FC = () => {
  const [ticker, setTicker] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognizedTicker, setRecognizedTicker] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [dateRange, setDateRange] = useState<'24h' | '7d' | '30d' | '365d'>('7d');
  const [suggestions, setSuggestions] = useState<StockSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const recognitionRef = useRef<any>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const {
    setLoading,
    setSentimentData,
    setCurrentTicker,
    addRecentSearch,
    recentSearches,
    setError,
  } = useStore();

  // Search for stocks in database
  const searchStocks = async (query: string) => {
    if (!query || query.length < 1) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}&limit=8`);
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
    setTicker(upperValue);

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
    setTicker(suggestion.ticker);
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

  // Voice Input Handler
  const handleVoiceInput = () => {
    // Check browser support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Voice input not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const extractedTicker = transcript.toUpperCase().replace(/[^A-Z]/g, '');
      
      setRecognizedTicker(extractedTicker);
      setShowConfirmation(true);
      setTicker(extractedTicker);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setError('Voice recognition failed. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  // Analyze Handler
  const handleAnalyze = async () => {
    if (!ticker.trim()) {
      setError('Please enter a stock ticker');
      return;
    }

    const upperTicker = ticker.toUpperCase().trim();
    
    setLoading(true);
    setError(null);
    setCurrentTicker(upperTicker);
    addRecentSearch(upperTicker);

    try {
      // Convert date range to days
      const daysMap = { '24h': 1, '7d': 7, '30d': 30, '365d': 365 };
      const days = daysMap[dateRange];

      const response = await axios.post('http://localhost:5000/api/analyze', {
        ticker: upperTicker,
        days,
      });

      setSentimentData(response.data);
      setShowConfirmation(false);
    } catch (error: any) {
      console.error('Analysis error:', error);
      
      if (error.response?.status === 404) {
        setError(`No data found for ${upperTicker}. Please try another ticker.`);
      } else if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError('Failed to analyze sentiment. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnalyze();
    }
  };

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 sm:p-8"
      >
        {/* Header Section */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold gradient-text mb-2">
            Stock Sentiment Analysis
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Analyze real-time market sentiment for any stock
          </p>
        </div>

        {/* Main Search Input */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative" ref={suggestionsRef}>
            <div className="relative">
              <input
                id="ticker-search"
                type="text"
                value={ticker}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
                placeholder="Search by company name or ticker (e.g., Apple, AAPL)"
                className="input-field pr-10 w-full"
                autoComplete="off"
                aria-label="Stock ticker input"
              />
              {isSearching && (
                <div className="absolute right-10 top-1/2 -translate-y-1/2">
                  <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
                </div>
              )}
              {ticker && (
                <button
                  onClick={() => {
                    setTicker('');
                    setSuggestions([]);
                    setShowSuggestions(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  aria-label="Clear input"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Autocomplete Suggestions */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-50 w-full mt-2 bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl shadow-2xl max-h-80 overflow-y-auto custom-scrollbar"
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

          {/* Voice Input Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleVoiceInput}
            className={`p-3 sm:p-4 rounded-xl transition-all shadow-md ${
              isListening
                ? 'bg-red-500 text-white animate-pulse shadow-red-500/50'
                : 'bg-white dark:bg-dark-card border-2 border-light-border dark:border-dark-border hover:border-indigo-500 hover:shadow-lg'
            }`}
            aria-label="Voice input"
            title="Voice input (V)"
          >
            <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          {/* Analyze Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAnalyze}
            className="btn-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl"
          >
            Analyze
          </motion.button>
        </div>

        {/* Voice Listening Indicator */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
              <div className="flex items-center justify-center space-x-2 text-red-600 dark:text-red-400">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <span className="font-medium">Listening...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Voice Confirmation */}
        <AnimatePresence>
          {showConfirmation && recognizedTicker && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg"
            >
              <p className="text-indigo-600 dark:text-indigo-400 text-center">
                Did you mean: <strong>{recognizedTicker}</strong>?
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Date Range Selector */}
        <div className="mb-6">
          <label className="flex items-center text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
            <Calendar className="w-4 h-4 mr-2" />
            Time Period
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(['24h', '7d', '30d', '365d'] as const).map((range) => (
              <motion.button
                key={range}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setDateRange(range)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all shadow-md ${
                  dateRange === range
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/50 shadow-lg'
                    : 'bg-white dark:bg-dark-card border-2 border-light-border dark:border-dark-border hover:border-indigo-500 text-slate-700 dark:text-slate-300 hover:shadow-lg'
                }`}
              >
                {range === '24h' ? '24 Hours' : range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '1 Year'}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
              Recent Searches
            </label>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search) => (
                <motion.button
                  key={search}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTicker(search)}
                  className="px-4 py-2 bg-white dark:bg-dark-card border-2 border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:border-indigo-500 hover:shadow-md transition-all text-slate-700 dark:text-slate-300"
                >
                  {search}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Popular Tickers */}
        <div>
          <label className="block text-sm font-semibold mb-3 text-slate-700 dark:text-slate-300">
            Popular Tickers
          </label>
          <div className="flex flex-wrap gap-2">
            {POPULAR_TICKERS.map((popularTicker) => (
              <motion.button
                key={popularTicker}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTicker(popularTicker)}
                className="px-4 py-2 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 border-2 border-indigo-200 dark:border-indigo-800 rounded-lg text-sm font-semibold text-indigo-700 dark:text-indigo-300 hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/40 dark:hover:to-purple-900/40 hover:shadow-md transition-all"
              >
                {popularTicker}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchSection;
