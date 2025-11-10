import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, RefreshCw, ArrowRight } from 'lucide-react';
import axios from 'axios';

interface TrendingStock {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sentiment: number;
  sentimentLabel: 'Bullish' | 'Bearish' | 'Neutral';
  articleCount: number;
  confidence: number;
}

interface TrendingResponse {
  trending: TrendingStock[];
  timestamp: string;
  count: number;
}

const TrendingStocks: React.FC = () => {
  const [trending, setTrending] = useState<TrendingStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const fetchTrending = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<TrendingResponse>('http://localhost:5000/api/trending');
      setTrending(response.data.trending);
      setLastUpdate(new Date(response.data.timestamp).toLocaleTimeString());
    } catch (err) {
      setError('Failed to fetch trending stocks. Please try again.');
      console.error('Trending fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load once on mount; no auto-refresh
    fetchTrending();
  }, []);

  const getSentimentIcon = (label: string) => {
    if (label === 'Bullish') return <TrendingUp className="w-5 h-5 text-green-500" />;
    if (label === 'Bearish') return <TrendingDown className="w-5 h-5 text-red-500" />;
    return <Minus className="w-5 h-5 text-yellow-500" />;
  };

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 30) return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
    if (sentiment < -30) return 'from-red-500/20 to-rose-500/20 border-red-500/30';
    return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30';
  };

  const getSentimentTextColor = (sentiment: number) => {
    if (sentiment > 30) return 'text-green-600 dark:text-green-400';
    if (sentiment < -30) return 'text-red-600 dark:text-red-400';
    return 'text-yellow-600 dark:text-yellow-400';
  };

  return (
    <section id="trending" className="py-20 bg-gradient-to-b from-light-bg to-white dark:from-dark-bg dark:to-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:max-w-xl text-center md:text-left"
            >
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-purple-500/30">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Market Pulse
                </h2>
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
                Trending Stocks with AI Sentiment Analysis
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 justify-center md:justify-start mt-2">
                {lastUpdate && (
                  <span className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />Last updated {lastUpdate}
                  </span>
                )}
                {/* Auto-refresh removed by request */}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-3 md:pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchTrending}
                disabled={loading}
                aria-label="Refresh trending stocks"
                className="relative px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Refreshing…' : 'Refresh'}
                {!loading && (
                  <span className="absolute -top-2 -right-2 text-[10px] bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-700 shadow">
                    Now
                  </span>
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Loading State */}
        {loading && !trending.length && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded mb-3"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-600 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 text-center border-2 border-red-500/30"
          >
            <p className="text-red-600 dark:text-red-400 text-lg mb-4">{error}</p>
            <button
              onClick={fetchTrending}
              className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Trending Stocks Grid */}
        {!loading && !error && trending.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trending.map((stock, index) => (
              <motion.div
                key={stock.ticker}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`glass-card p-6 border-2 bg-gradient-to-br ${getSentimentColor(stock.sentiment)} hover:shadow-lg transition-all cursor-pointer group`}
                onClick={() => {
                  // Navigate to full analysis (you can wire this to your existing search/analyze flow)
                  window.location.hash = 'dashboard';
                  // Trigger analysis for this ticker (integrate with your existing flow)
                  console.log('Analyze:', stock.ticker);
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {stock.ticker}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                      {stock.name}
                    </p>
                  </div>
                  {getSentimentIcon(stock.sentimentLabel)}
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    ₹{stock.price.toFixed(2)}
                  </div>
                  <div className={`text-sm font-semibold ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                  </div>
                </div>

                {/* Sentiment */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Sentiment:</span>
                    <span className={`text-sm font-bold ${getSentimentTextColor(stock.sentiment)}`}>
                      {stock.sentimentLabel} ({stock.sentiment > 0 ? '+' : ''}{stock.sentiment.toFixed(1)})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Confidence:</span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {stock.confidence.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Articles:</span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {stock.articleCount}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-4 pt-4 border-t border-slate-300 dark:border-slate-600">
                  <div className="flex items-center justify-between text-sm text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-1 transition-transform">
                    <span>View Full Analysis</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && trending.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-12 text-center"
          >
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-2xl font-semibold mb-2 text-slate-900 dark:text-white">
              No Trending Stocks Available
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Check back soon for market pulse updates
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TrendingStocks;
