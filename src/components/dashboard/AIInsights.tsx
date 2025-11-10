import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import type { InsightsData } from '@/types';

interface Props {
  insights: InsightsData;
}

const AIInsights: React.FC<Props> = ({ insights }) => {
  const [isTyping, setIsTyping] = useState(false);

  const allInsights = [
    insights.summary,
    insights.trend,
    `Key topics driving sentiment: ${insights.keyTopics.join(', ')}`,
    insights.volatility,
    insights.correlation,
    insights.prediction,
  ];

  const handleRegenerate = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  return (
    <div className="glass-card p-6 border-2 border-transparent bg-gradient-to-br from-purple-500/10 to-indigo-500/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            AI-Generated Insights
          </h3>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05, rotate: 180 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRegenerate}
          className="p-2 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
          aria-label="Regenerate insights"
          title="Regenerate insights"
        >
          <RefreshCw className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </motion.button>
      </div>

      <div className="space-y-3">
        {allInsights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-3"
          >
            <div className="mt-1">
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500" />
            </div>
            <p className={`text-sm text-slate-700 dark:text-slate-300 ${isTyping ? 'animate-pulse' : ''}`}>
              {insight}
            </p>
          </motion.div>
        ))}
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
