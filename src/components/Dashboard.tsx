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
            className="mt-8"
          >
            {/* Data Source Warning */}
            {sentimentData.warning && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-4 mb-6 border-l-4 border-yellow-500 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
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
              className="mb-8"
            >
              <OverallSentimentGauge data={sentimentData} />
            </motion.div>

            {/* Main Dashboard Grid - All 8 Components Properly Aligned */}
            <div className="space-y-8">
              {/* Row 1: Sentiment & Price Timeline + Multi-Dimensional Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Timeline Chart - Spans 2 columns */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2 h-full"
                >
                  <TimelineChart data={sentimentData.timeline} />
                </motion.div>

                {/* Radar Chart - Multi-Dimensional Analysis */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="h-full"
                >
                  <RadarChart dimensions={sentimentData.dimensions} />
                </motion.div>
              </div>

              {/* Row 2: Sentiment by News Source + AI-Generated Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Source Comparison */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="h-full"
                >
                  <SourceComparison sources={sentimentData.sourceBreakdown} />
                </motion.div>

                {/* AI Insights */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="h-full"
                >
                  <AIInsights insights={sentimentData.insights} headlines={sentimentData.headlines} />
                </motion.div>
              </div>

              {/* Row 3: Top Headlines + Sentiment Calendar */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Headlines Feed - Spans 2 columns */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="lg:col-span-2 h-full"
                >
                  <HeadlinesFeed headlines={sentimentData.headlines} />
                </motion.div>

                {/* Calendar Heatmap */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="h-full"
                >
                  <CalendarHeatmap calendarData={sentimentData.calendarData} />
                </motion.div>
              </div>

              {/* Row 4: Sentiment vs. Price Correlation + Export & Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Correlation Scatter - Spans 2 columns */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="lg:col-span-2 h-full"
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
                  className="h-full"
                >
                  <ExportPanel data={sentimentData} />
                </motion.div>
              </div>
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
              Try popular tickers like RELIANCE.NS, TCS.NS, HDFCBANK.NS, INFY.NS, or ICICIBANK.NS
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
