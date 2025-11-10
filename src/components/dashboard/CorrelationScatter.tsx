import React from 'react';
import { motion } from 'framer-motion';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import type { CorrelationDataPoint } from '@/types';

interface Props {
  data: CorrelationDataPoint[];
  coefficient: number;
}

const CorrelationScatter: React.FC<Props> = ({ data, coefficient }) => {
  const getQuadrantColor = (point: CorrelationDataPoint) => {
    if (point.sentiment > 0 && point.priceChange > 0) return '#10b981'; // Green - positive/positive
    if (point.sentiment < 0 && point.priceChange < 0) return '#f59e0b'; // Orange - negative/negative
    if (point.sentiment > 0 && point.priceChange < 0) return '#3b82f6'; // Blue - positive/negative
    return '#ef4444'; // Red - negative/positive
  };

  const getCorrelationStrength = (coef: number) => {
    const abs = Math.abs(coef);
    if (abs > 0.7) return 'Strong';
    if (abs > 0.4) return 'Moderate';
    if (abs > 0.2) return 'Weak';
    return 'Very Weak';
  };

  const getCorrelationColor = (coef: number) => {
    const abs = Math.abs(coef);
    if (abs > 0.7) return 'text-green-600 dark:text-green-400';
    if (abs > 0.4) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          Sentiment vs. Price Correlation
        </h3>
        
        <div className="text-right">
          <div className={`text-2xl font-bold ${getCorrelationColor(coefficient)}`}>
            r = {coefficient.toFixed(2)}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {getCorrelationStrength(coefficient)} {coefficient >= 0 ? 'Positive' : 'Negative'}
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis
            type="number"
            dataKey="sentiment"
            name="Sentiment"
            domain={[-100, 100]}
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
            label={{ value: 'Sentiment Score', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            type="number"
            dataKey="priceChange"
            name="Price Change"
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
            label={{ value: 'Price Change (%)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              backgroundColor: 'rgba(30, 30, 40, 0.9)',
              border: '1px solid #4b5563',
              borderRadius: '8px',
            }}
            formatter={(value: any) => value.toFixed(2)}
          />
          <ReferenceLine x={0} stroke="#6b7280" strokeDasharray="3 3" />
          <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="3 3" />
          <Scatter
            name="Data Points"
            data={data}
            fill="#6366f1"
          >
            {data.map((entry, index) => (
              <circle
                key={`dot-${index}`}
                cx={0}
                cy={0}
                r={6}
                fill={getQuadrantColor(entry)}
                opacity={0.7}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      {/* Quadrant Explanation */}
      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-slate-600 dark:text-slate-400">Positive Sentiment + Price Up</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-slate-600 dark:text-slate-400">Positive Sentiment + Price Down</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-slate-600 dark:text-slate-400">Negative Sentiment + Price Up</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500" />
          <span className="text-slate-600 dark:text-slate-400">Negative Sentiment + Price Down</span>
        </div>
      </div>
    </div>
  );
};

export default CorrelationScatter;
