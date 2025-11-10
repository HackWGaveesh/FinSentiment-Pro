import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = true,
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' } : undefined}
      className={`glass-card ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '', icon }) => {
  return (
    <div className={`flex items-center justify-between mb-4 pb-4 border-b border-light-border dark:border-dark-border ${className}`}>
      <div className="flex items-center gap-3">
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{children}</h3>
      </div>
    </div>
  );
};

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => {
  return <div className={`flex-1 ${className}`}>{children}</div>;
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`mt-4 pt-4 border-t border-light-border dark:border-dark-border ${className}`}>
      {children}
    </div>
  );
};

// Skeleton Loader
export const CardSkeleton: React.FC<{ lines?: number }> = ({ lines = 3 }) => {
  return (
    <div className="glass-card p-6 animate-pulse">
      <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-slate-200 dark:bg-slate-600 rounded mb-3"
          style={{ width: `${100 - i * 10}%` }}
        ></div>
      ))}
    </div>
  );
};
