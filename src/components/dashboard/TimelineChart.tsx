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

  // Calculate dynamic price domain with padding
  const getPriceDomain = () => {
    if (!data || data.length === 0) return [0, 100];
    
    const prices = data.map(d => d.price).filter(p => p !== undefined && p !== null);
    if (prices.length === 0) return [0, 100];
    
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    
    // Add 5% padding on top and bottom for better visualization
    const padding = (maxPrice - minPrice) * 0.05;
    const paddedMin = Math.max(0, minPrice - padding);
    const paddedMax = maxPrice + padding;
    
    return [Math.floor(paddedMin), Math.ceil(paddedMax)];
  };

  // Get currency symbol based on price magnitude ($ for US stocks, ₹ for Indian stocks)
  const getCurrencySymbol = () => {
    if (!data || data.length === 0) return '$';
    const avgPrice = data.reduce((sum, d) => sum + (d.price || 0), 0) / data.length;
    // Indian stocks typically have prices > 100 (in rupees)
    // US stocks typically < 1000 (in dollars)
    return avgPrice > 500 ? '₹' : '$';
  };

  const priceDomain = getPriceDomain();
  const currencySymbol = getCurrencySymbol();

  return (
    <div className="glass-card p-6 h-full flex flex-col min-h-[500px]">
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

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
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
            domain={priceDomain}
            stroke="#10b981"
            style={{ fontSize: '12px' }}
            label={{ value: `Stock Price (${currencySymbol})`, angle: 90, position: 'insideRight' }}
            tickFormatter={(value) => `${currencySymbol}${value.toFixed(0)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(30, 30, 40, 0.9)',
              border: '1px solid #4b5563',
              borderRadius: '8px',
            }}
            labelStyle={{ color: '#f3f4f6' }}
            formatter={(value: any, name: string) => {
              if (name === 'Stock Price') {
                return [`${currencySymbol}${Number(value).toFixed(2)}`, name];
              }
              return [value, name];
            }}
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
    </div>
  );
};

export default TimelineChart;
