import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { DimensionsData } from '@/types';

interface Props {
  dimensions: DimensionsData;
}

const RadarChartComponent: React.FC<Props> = ({ dimensions }) => {
  // Validate and ensure all values are within 0-100 range
  const validateValue = (value: number | undefined): number => {
    if (typeof value !== 'number' || isNaN(value)) return 50;
    return Math.max(0, Math.min(100, value));
  };

  const data = [
    { 
      dimension: 'Market\nSentiment', 
      value: validateValue(dimensions.marketSentiment),
      fullName: 'Market Sentiment'
    },
    { 
      dimension: 'Emotional\nTone', 
      value: validateValue(dimensions.emotionalTone),
      fullName: 'Emotional Tone'
    },
    { 
      dimension: 'Uncertainty', 
      value: validateValue(dimensions.uncertainty),
      fullName: 'Uncertainty'
    },
    { 
      dimension: 'Urgency', 
      value: validateValue(dimensions.urgency),
      fullName: 'Urgency'
    },
    { 
      dimension: 'Future\nOutlook', 
      value: validateValue(dimensions.futureOutlook),
      fullName: 'Future Outlook'
    },
    { 
      dimension: 'Risk', 
      value: validateValue(dimensions.riskAssessment),
      fullName: 'Risk Assessment'
    },
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
          <p className="font-semibold text-slate-900 dark:text-white">{payload[0].payload.fullName}</p>
          <p className="text-indigo-600 dark:text-indigo-400 font-medium">
            {payload[0].value.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 h-full flex flex-col min-h-[500px]">
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
        Multi-Dimensional Analysis
      </h3>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid stroke="#4b5563" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="dimension"
              stroke="#9ca3af"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              style={{ fontWeight: 500 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              stroke="#6b7280"
              tick={{ fill: '#6b7280', fontSize: 10 }}
              tickCount={6}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="Sentiment Metrics"
              dataKey="value"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.5}
              strokeWidth={2}
              dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 6 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Dimension Explanations with Values */}
      <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
        <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">Market Sentiment</span>
            <p className="text-slate-500 dark:text-slate-400 text-[10px]">Overall market view</p>
          </div>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            {validateValue(dimensions.marketSentiment).toFixed(1)}
          </span>
        </div>
        <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">Emotional Tone</span>
            <p className="text-slate-500 dark:text-slate-400 text-[10px]">Positive/negative emotions</p>
          </div>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            {validateValue(dimensions.emotionalTone).toFixed(1)}
          </span>
        </div>
        <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">Uncertainty</span>
            <p className="text-slate-500 dark:text-slate-400 text-[10px]">Market doubt level</p>
          </div>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            {validateValue(dimensions.uncertainty).toFixed(1)}
          </span>
        </div>
        <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">Urgency</span>
            <p className="text-slate-500 dark:text-slate-400 text-[10px]">Breaking news signals</p>
          </div>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            {validateValue(dimensions.urgency).toFixed(1)}
          </span>
        </div>
        <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">Future Outlook</span>
            <p className="text-slate-500 dark:text-slate-400 text-[10px]">Forward predictions</p>
          </div>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            {validateValue(dimensions.futureOutlook).toFixed(1)}
          </span>
        </div>
        <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          <div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">Risk Assessment</span>
            <p className="text-slate-500 dark:text-slate-400 text-[10px]">Threat level</p>
          </div>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            {validateValue(dimensions.riskAssessment).toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RadarChartComponent;
