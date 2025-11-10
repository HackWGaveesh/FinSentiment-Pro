import React from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import type { DimensionsData } from '@/types';

interface Props {
  dimensions: DimensionsData;
}

const RadarChartComponent: React.FC<Props> = ({ dimensions }) => {
  const data = [
    { dimension: 'Market\nSentiment', value: dimensions.marketSentiment },
    { dimension: 'Emotional\nTone', value: dimensions.emotionalTone },
    { dimension: 'Uncertainty', value: dimensions.uncertainty },
    { dimension: 'Urgency', value: dimensions.urgency },
    { dimension: 'Future\nOutlook', value: dimensions.futureOutlook },
    { dimension: 'Risk', value: dimensions.riskAssessment },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
        Multi-Dimensional Analysis
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="#4b5563" />
          <PolarAngleAxis
            dataKey="dimension"
            stroke="#9ca3af"
            style={{ fontSize: '11px', lineHeight: 1.2 }}
          />
          <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" />
          <Radar
            name="Metrics"
            dataKey="value"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Dimension Explanations */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="font-medium text-slate-700 dark:text-slate-300">Market Sentiment:</span>
          <span className="text-slate-600 dark:text-slate-400"> Overall market view</span>
        </div>
        <div>
          <span className="font-medium text-slate-700 dark:text-slate-300">Emotional Tone:</span>
          <span className="text-slate-600 dark:text-slate-400"> Positive/negative emotions</span>
        </div>
        <div>
          <span className="font-medium text-slate-700 dark:text-slate-300">Uncertainty:</span>
          <span className="text-slate-600 dark:text-slate-400"> Market doubt level</span>
        </div>
        <div>
          <span className="font-medium text-slate-700 dark:text-slate-300">Urgency:</span>
          <span className="text-slate-600 dark:text-slate-400"> Breaking news signals</span>
        </div>
        <div>
          <span className="font-medium text-slate-700 dark:text-slate-300">Future Outlook:</span>
          <span className="text-slate-600 dark:text-slate-400"> Forward predictions</span>
        </div>
        <div>
          <span className="font-medium text-slate-700 dark:text-slate-300">Risk:</span>
          <span className="text-slate-600 dark:text-slate-400"> Threat assessment</span>
        </div>
      </div>
    </div>
  );
};

export default RadarChartComponent;
