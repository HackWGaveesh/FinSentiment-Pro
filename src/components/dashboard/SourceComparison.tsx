import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { SourceBreakdown } from '@/types';

interface Props {
  sources: SourceBreakdown[];
}

const SourceComparison: React.FC<Props> = ({ sources }) => {
  const getColor = (sentiment: number) => {
    if (sentiment > 30) return '#10b981';
    if (sentiment < -30) return '#ef4444';
    return '#f59e0b';
  };

  return (
    <div className="glass-card p-6 h-full min-h-[460px] flex flex-col">
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
        Sentiment by News Source
      </h3>

      <div className="flex-grow flex">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sources} layout="vertical" margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.12} />
            <XAxis type="number" domain={[-100, 100]} stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <YAxis
              type="category"
              dataKey="source"
              stroke="#9ca3af"
              style={{ fontSize: '11px' }}
              width={110}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(30, 30, 40, 0.92)',
                border: '1px solid #4b5563',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="sentiment" radius={[0, 8, 8, 0]}>
              {sources.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.sentiment)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Article Counts */}
      <div className="mt-4 space-y-2">
        {sources.map((source) => (
          <div key={source.source} className="flex items-center justify-between text-sm">
            <span className="text-slate-700 dark:text-slate-300">{source.logo} {source.source}</span>
            <span className="text-slate-500 dark:text-slate-500">{source.articles} articles</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourceComparison;
