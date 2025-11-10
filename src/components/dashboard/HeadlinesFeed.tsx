import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import type { Headline } from '@/types';

interface Props {
  headlines: Headline[];
}

const HeadlinesFeed: React.FC<Props> = ({ headlines }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');

  const filteredHeadlines = headlines.filter((h) => {
    if (filter === 'all') return true;
    return h.sentimentLabel.toLowerCase() === filter;
  });

  const getSentimentBadgeColor = (label: string) => {
    switch (label.toLowerCase()) {
      case 'positive':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'negative':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default:
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
    }
  };

  const getEmotionColor = (emotion: string) => {
    const colors: Record<string, string> = {
      joy: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      fear: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
      anger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
      surprise: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      trust: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400',
      anticipation: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
    };
    return colors[emotion] || 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400';
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          Top Headlines
        </h3>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {filteredHeadlines.length} articles
        </span>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {(['all', 'positive', 'negative', 'neutral'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all capitalize ${
              filter === f
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Headlines List */}
      <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
        {filteredHeadlines.map((headline, index) => (
          <motion.div
            key={headline.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border border-light-border dark:border-dark-border rounded-lg p-4 hover:shadow-md transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                {/* Sentiment Badge */}
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getSentimentBadgeColor(headline.sentimentLabel)}`}>
                  {headline.sentimentLabel}
                </span>
                
                {/* Title */}
                <h4 className="font-semibold text-slate-900 dark:text-white mt-2 leading-tight">
                  {headline.title}
                </h4>
                
                {/* Meta */}
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-500">
                  <span>{headline.source}</span>
                  <span>•</span>
                  <span>{headline.timeAgo}</span>
                  <span>•</span>
                  <span>{(headline.confidence * 100).toFixed(0)}% confidence</span>
                </div>
              </div>

              {/* Expand Button */}
              <button
                onClick={() => setExpandedId(expandedId === headline.id ? null : headline.id)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                aria-label="Expand details"
              >
                {expandedId === headline.id ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Sentiment Bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-400">Sentiment Score</span>
                <span className="font-medium">{headline.sentiment.toFixed(1)}</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className={`h-full rounded-full transition-all ${
                    headline.sentiment > 0 ? 'bg-green-500' : headline.sentiment < 0 ? 'bg-red-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${Math.abs(headline.sentiment)}%` }}
                />
              </div>
            </div>

            {/* Emotion Tags */}
            {headline.emotions && headline.emotions.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {headline.emotions.map((emotion) => (
                  <span
                    key={emotion}
                    className={`px-2 py-1 rounded text-xs font-medium capitalize ${getEmotionColor(emotion)}`}
                  >
                    {emotion}
                  </span>
                ))}
              </div>
            )}

            {/* Expanded Content */}
            <AnimatePresence>
              {expandedId === headline.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-4 pt-4 border-t border-light-border dark:border-dark-border"
                >
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    {headline.summary}
                  </p>
                  <a
                    href={headline.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Read Full Article
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HeadlinesFeed;
