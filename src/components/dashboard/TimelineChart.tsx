import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { TimelineDataPoint } from '@/types';

interface Props {
  data: TimelineDataPoint[];
}

const TimelineChart: React.FC<Props> = ({ data }) => {
  const [showSentiment, setShowSentiment] = useState(true);
  const [showPrice, setShowPrice] = useState(true);

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          Sentiment & Price Timeline
        </h3>
        
        {/* Toggle Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowSentiment(!showSentiment)}
            className={`px-3 py-1 rounded text-sm font-medium transition-all ${
              showSentiment
                ? 'bg-blue-500 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            Sentiment
          </button>
          <button
            onClick={() => setShowPrice(!showPrice)}
            className={`px-3 py-1 rounded text-sm font-medium transition-all ${
              showPrice
                ? 'bg-green-500 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            Price
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            yAxisId="left"
            domain={[-100, 100]}
            stroke="#3b82f6"
            style={{ fontSize: '12px' }}
            label={{ value: 'Sentiment Score', angle: -90, position: 'insideLeft' }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#10b981"
            style={{ fontSize: '12px' }}
            label={{ value: 'Stock Price ($)', angle: 90, position: 'insideRight' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(30, 30, 40, 0.9)',
              border: '1px solid #4b5563',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#f3f4f6' }}
          />
          <Legend />
          {showSentiment && (
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sentiment"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Sentiment Score"
            />
          )}
          {showPrice && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="price"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Stock Price"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelineChart;
