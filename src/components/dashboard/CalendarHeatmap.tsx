import React from 'react';
import { motion } from 'framer-motion';
import type { CalendarDataPoint } from '@/types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

interface Props {
  calendarData: CalendarDataPoint[];
}

const CalendarHeatmap: React.FC<Props> = ({ calendarData }) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getSentimentColor = (sentiment: number) => {
    if (sentiment === 0) return 'bg-slate-100 dark:bg-slate-800';
    if (sentiment > 60) return 'bg-green-700 dark:bg-green-600';
    if (sentiment > 20) return 'bg-green-500 dark:bg-green-500';
    if (sentiment > -20) return 'bg-yellow-500 dark:bg-yellow-500';
    if (sentiment > -60) return 'bg-red-500 dark:bg-red-400';
    return 'bg-red-700 dark:bg-red-600';
  };

  const getSentimentForDay = (day: Date) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const found = calendarData.find((d) => d.date === dateStr);
    return found?.sentiment || 0;
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
        Sentiment Calendar
      </h3>

      <div className="text-center text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">
        {format(today, 'MMMM yyyy')}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day Headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-slate-500 dark:text-slate-400 pb-2"
          >
            {day}
          </div>
        ))}

        {/* Empty cells for alignment */}
        {Array.from({ length: monthStart.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Day cells */}
        {daysInMonth.map((day, index) => {
          const sentiment = getSentimentForDay(day);
          const isToday = isSameDay(day, today);
          
          return (
            <motion.div
              key={day.toString()}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.01 }}
              whileHover={{ scale: 1.1 }}
              className={`
                aspect-square rounded-lg flex items-center justify-center text-xs font-medium
                ${getSentimentColor(sentiment)}
                ${isToday ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900' : ''}
                cursor-pointer transition-all
                ${sentiment !== 0 ? 'text-white' : 'text-slate-600 dark:text-slate-400'}
              `}
              title={`${format(day, 'MMM d')}: ${sentiment.toFixed(1)}`}
            >
              {format(day, 'd')}
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-light-border dark:border-dark-border">
        <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">Sentiment Intensity</div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-500">Very Negative</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded bg-red-700 dark:bg-red-600" />
            <div className="w-4 h-4 rounded bg-red-500 dark:bg-red-400" />
            <div className="w-4 h-4 rounded bg-yellow-500 dark:bg-yellow-500" />
            <div className="w-4 h-4 rounded bg-green-500 dark:bg-green-500" />
            <div className="w-4 h-4 rounded bg-green-700 dark:bg-green-600" />
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-500">Very Positive</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeatmap;
