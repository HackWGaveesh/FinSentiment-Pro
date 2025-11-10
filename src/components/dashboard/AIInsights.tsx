import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, ArrowUpCircle, ArrowDownCircle, LineChart } from 'lucide-react';
import type { InsightsData, Headline } from '@/types';

interface Props {
  insights: InsightsData;
  headlines?: Headline[]; // optional: to surface top/bottom sentiment drivers
}

const AIInsights: React.FC<Props> = ({ insights, headlines = [] }) => {
  const [isTyping, setIsTyping] = useState(false);

  // Compute strongest positive and negative headlines by sentiment score
  const { topHeadline, bottomHeadline } = useMemo(() => {
    if (!headlines.length) return { topHeadline: null, bottomHeadline: null } as {
      topHeadline: Headline | null;
      bottomHeadline: Headline | null;
    };
    const sorted = [...headlines].sort((a, b) => b.sentiment - a.sentiment);
    const top = sorted.find(h => h.sentiment !== 0) || sorted[0] || null;
    const bottom = [...sorted].reverse().find(h => h.sentiment !== 0) || sorted[sorted.length - 1] || null;
    return { topHeadline: top, bottomHeadline: bottom };
  }, [headlines]);

  const allInsights = [
    insights.summary,
    insights.trend,
    `Key topics driving sentiment: ${insights.keyTopics.join(', ') || 'N/A'}`,
    insights.volatility,
    insights.correlation,
    insights.prediction,
    topHeadline
      ? `Most positive driver: "${topHeadline.title}" (${topHeadline.sentimentLabel}, score ${topHeadline.sentiment.toFixed(1)})`
      : 'Most positive driver: Not enough positive variance yet',
    bottomHeadline
      ? `Most negative driver: "${bottomHeadline.title}" (${bottomHeadline.sentimentLabel}, score ${bottomHeadline.sentiment.toFixed(1)})`
      : 'Most negative driver: Not enough negative variance yet',
  ];

  const handleRegenerate = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  return (
    <div className="glass-card px-6 py-8 border-2 border-transparent bg-gradient-to-br from-purple-500/10 to-indigo-500/10 flex flex-col items-center text-center h-full min-h-[460px]">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
          <Sparkles className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          AI-Generated Insights
        </h3>
        <p className="text-xs uppercase tracking-wider font-medium text-purple-600/80 dark:text-purple-300/80 flex items-center gap-1">
          <LineChart className="w-3 h-3" /> Sentiment Drivers
        </p>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl flex-1">
        {/* Left: bullet insights */}
        <div className="space-y-3 text-left">
          {allInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex gap-3"
            >
              <div className="mt-1">
                <div className="w-2 h-2 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500" />
              </div>
              <p className={`text-sm leading-relaxed text-slate-700 dark:text-slate-300 ${isTyping ? 'animate-pulse' : ''}`}>
                {insight}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Right: extremes */}
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-purple-400/30 bg-white/40 dark:bg-purple-950/30 backdrop-blur-sm p-4 flex flex-col gap-2 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <ArrowUpCircle className="w-5 h-5 text-green-600" />
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Top Positive Headline</h4>
            </div>
            {topHeadline ? (
              <div className="text-xs text-slate-600 dark:text-slate-300">
                <p className="font-medium line-clamp-2">{topHeadline.title}</p>
                <p className="mt-1 flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 text-[10px] font-semibold">{topHeadline.sentimentLabel}</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 text-[10px] font-semibold">{topHeadline.sentiment.toFixed(1)}</span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 text-[10px] font-semibold">{topHeadline.source}</span>
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">Not enough positive signal yet.</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-purple-400/30 bg-white/40 dark:bg-purple-950/30 backdrop-blur-sm p-4 flex flex-col gap-2 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <ArrowDownCircle className="w-5 h-5 text-red-600" />
              <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Top Negative Headline</h4>
            </div>
            {bottomHeadline ? (
              <div className="text-xs text-slate-600 dark:text-slate-300">
                <p className="font-medium line-clamp-2">{bottomHeadline.title}</p>
                <p className="mt-1 flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 text-[10px] font-semibold">{bottomHeadline.sentimentLabel}</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 text-[10px] font-semibold">{bottomHeadline.sentiment.toFixed(1)}</span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 text-[10px] font-semibold">{bottomHeadline.source}</span>
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">Not enough negative signal yet.</p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.05, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRegenerate}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium shadow hover:shadow-lg transition-all"
          aria-label="Regenerate insights"
          title="Regenerate insights"
        >
          Regenerate
          <RefreshCw className="inline-block ml-2 w-4 h-4" />
        </motion.button>
      </div>

      {isTyping && (
        <div className="mt-4 text-xs text-purple-600 dark:text-purple-400 animate-pulse">
          Analyzing data...
        </div>
      )}
    </div>
  );
};

export default AIInsights;
