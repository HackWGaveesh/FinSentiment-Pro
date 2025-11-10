import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="mt-12 space-y-8 animate-pulse">
      {/* Overall Sentiment */}
      <div className="glass-card p-8">
        <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6">
          <div className="h-80 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
        </div>
        <div className="glass-card p-6">
          <div className="h-80 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
        </div>
      </div>

      {/* More sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div key={i} className="glass-card p-6">
            <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
