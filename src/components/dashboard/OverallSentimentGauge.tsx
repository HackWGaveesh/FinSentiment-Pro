import React from 'react';
import { motion } from 'framer-motion';
import type { SentimentData } from '@/types';

interface Props {
  data: SentimentData;
}

const OverallSentimentGauge: React.FC<Props> = ({ data }) => {
  const getSentimentColor = (score: number) => {
    if (score > 30) return 'text-green-500';
    if (score < -30) return 'text-red-500';
    return 'text-yellow-500';
  };

  const getSentimentBg = (score: number) => {
    if (score > 30) return 'from-green-500 to-emerald-500';
    if (score < -30) return 'from-red-500 to-rose-500';
    return 'from-yellow-500 to-amber-500';
  };

  const getSentimentLabel = (score: number) => {
    if (score > 60) return 'Very Positive';
    if (score > 30) return 'Positive';
    if (score > -30) return 'Neutral';
    if (score > -60) return 'Negative';
    return 'Very Negative';
  };

  // Normalize score to percentage (0-100)
  const normalizedScore = ((data.overallScore + 100) / 200) * 100;

  return (
    <div className="glass-card p-8">
      <h3 className="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-white">
        Overall Sentiment Score
      </h3>

      <div className="flex flex-col md:flex-row items-center justify-around gap-8">
        {/* Gauge Visualization */}
        <div className="relative w-64 h-64">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Background Circle */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="currentColor"
              strokeWidth="20"
              className="text-slate-200 dark:text-slate-700"
            />
            
            {/* Sentiment Arc */}
            <motion.circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              strokeWidth="20"
              strokeLinecap="round"
              className={`bg-gradient-to-r ${getSentimentBg(data.overallScore)}`}
              stroke="url(#gradient)"
              strokeDasharray={`${(normalizedScore / 100) * 502} 502`}
              initial={{ strokeDasharray: '0 502' }}
              animate={{ strokeDasharray: `${(normalizedScore / 100) * 502} 502` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              transform="rotate(-90 100 100)"
            />

            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className={data.overallScore < 0 ? 'stop-red-500' : 'stop-green-500'} />
                <stop offset="100%" className={data.overallScore < 0 ? 'stop-rose-500' : 'stop-emerald-500'} />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Score */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className={`text-5xl font-bold ${getSentimentColor(data.overallScore)}`}
            >
              {data.overallScore.toFixed(1)}
            </motion.div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {getSentimentLabel(data.overallScore)}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Confidence */}
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {data.confidence}%
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Confidence
            </div>
            <div className="mt-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${data.confidence}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              />
            </div>
          </div>

          {/* Articles Analyzed */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-3xl font-bold text-purple-600 dark:text-purple-400"
            >
              {data.totalArticles}
            </motion.div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Articles Analyzed
            </div>
          </div>

          {/* Ticker Info */}
          <div className="col-span-2 text-center pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="text-xl font-semibold text-slate-900 dark:text-white">
              {data.ticker}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {data.companyName}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
              {data.dateRange}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallSentimentGauge;
