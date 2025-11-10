import React from 'react';
import { motion } from 'framer-motion';
import SearchSection from './dashboard/SearchSection';
import OverallSentimentGauge from './dashboard/OverallSentimentGauge';
import TimelineChart from './dashboard/TimelineChart';
import RadarChart from './dashboard/RadarChart';
import SourceComparison from './dashboard/SourceComparison';
import HeadlinesFeed from './dashboard/HeadlinesFeed';
import CalendarHeatmap from './dashboard/CalendarHeatmap';
import AIInsights from './dashboard/AIInsights';
import ExportPanel from './dashboard/ExportPanel';
import CorrelationScatter from './dashboard/CorrelationScatter';
import LoadingSkeleton from './dashboard/LoadingSkeleton';
import { useStore } from '@/store/useStore';

const Dashboard: React.FC = () => {
  const { sentimentData, isLoading, error } = useStore();

  return (
    <section id="dashboard" className="py-20 bg-light-bg dark:bg-dark-bg">
      <div className="container mx-auto px-4">
        {/* Search Section - Always Visible */}
        <SearchSection />

        {/* Loading State */}
        {isLoading && <LoadingSkeleton />}

        {/* Error State */}
        {error && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 text-center mt-8"
          >
            <div className="text-red-500 dark:text-red-400 text-lg font-semibold mb-2">
              {error}
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Please try again with a different ticker or check your connection.
            </p>
          </motion.div>
        )}

        {/* Results Dashboard */}
        {sentimentData && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-12 space-y-8"
          >
            {/* Data Source Warning */}
            {sentimentData.warning && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-4 border-l-4 border-yellow-500 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⚠️</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                      Synthetic Data Warning
                    </h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      {sentimentData.warning.message}
                    </p>
                    {sentimentData.dataSource && (
                      <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                        Data source: <span className="font-mono">{sentimentData.dataSource}</span>
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Overall Sentiment Score - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <OverallSentimentGauge data={sentimentData} />
            </motion.div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Timeline Chart - Spans 2 columns */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <TimelineChart data={sentimentData.timeline} />
              </motion.div>

              {/* Radar Chart */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <RadarChart dimensions={sentimentData.dimensions} />
              </motion.div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Source Comparison */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <SourceComparison sources={sentimentData.sourceBreakdown} />
              </motion.div>

              {/* AI Insights */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <AIInsights insights={sentimentData.insights} />
              </motion.div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Headlines Feed - Spans 2 columns */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="lg:col-span-2"
              >
                <HeadlinesFeed headlines={sentimentData.headlines} />
              </motion.div>

              {/* Calendar Heatmap */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <CalendarHeatmap calendarData={sentimentData.calendarData} />
              </motion.div>
            </div>

            {/* Fourth Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Correlation Scatter - Spans 2 columns */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="lg:col-span-2"
              >
                <CorrelationScatter
                  data={sentimentData.correlationData}
                  coefficient={sentimentData.correlationCoefficient}
                />
              </motion.div>

              {/* Export Panel */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <ExportPanel ticker={sentimentData.ticker} />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!sentimentData && !isLoading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-12 text-center mt-12"
          >
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-2xl font-semibold mb-2 text-slate-900 dark:text-white">
              Enter a stock ticker to begin analysis
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try popular tickers like AAPL, TSLA, GOOGL, MSFT, or AMZN
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
