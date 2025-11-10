import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  Zap, 
  Globe, 
  BarChart3, 
  Sparkles,
  Target,
  LineChart,
  Activity
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'FinBERT Sentiment Analysis',
      description: 'Advanced financial language model trained specifically for market sentiment detection with high accuracy.',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: Activity,
      title: 'Multi-Dimensional Analysis',
      description: 'Track market sentiment, emotional tone, uncertainty, urgency, future outlook, and risk assessment simultaneously.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Stock Data',
      description: 'Live price tracking with integration of Indian Stock API and Alpha Vantage for comprehensive market coverage.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Globe,
      title: 'Global Market Coverage',
      description: 'Support for both US stocks (NYSE, NASDAQ) and Indian stocks (NSE, BSE) with automatic exchange detection.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Sparkles,
      title: 'Emotion Detection',
      description: 'Identify joy, fear, anger, surprise, concern, trust, and anticipation in market news articles.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: BarChart3,
      title: 'Visual Analytics',
      description: 'Interactive charts including timeline correlations, radar charts, heatmaps, and source comparisons.',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Zap,
      title: 'Instant Insights',
      description: 'AI-powered recommendations and key takeaways generated automatically from sentiment analysis.',
      color: 'from-yellow-500 to-amber-500',
    },
    {
      icon: Target,
      title: 'Source Tracking',
      description: 'Compare sentiment across multiple news sources to identify bias and get a balanced view.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: LineChart,
      title: 'Historical Analysis',
      description: 'Analyze sentiment trends over 24 hours, 7 days, 30 days, or a full year for long-term insights.',
      color: 'from-violet-500 to-fuchsia-500',
    },
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Powerful Features
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Everything you need to make informed investment decisions with AI-powered sentiment analysis
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card p-6 group cursor-pointer"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => {
              const dashboard = document.querySelector('#dashboard');
              dashboard?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary text-lg px-10 py-4"
          >
            Try It Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
