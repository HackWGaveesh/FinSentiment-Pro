import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Rocket,
  Award,
  Users,
  Target
} from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Award, value: '99%+', label: 'Accuracy' },
    { icon: Users, value: '1000+', label: 'Users' },
    { icon: Code2, value: '10+', label: 'Data Sources' },
    { icon: Rocket, value: '24/7', label: 'Real-time' },
  ];

  const team = [
    {
      name: 'AI Research Team',
      role: 'Machine Learning & NLP',
      description: 'Specialized in financial sentiment analysis using FinBERT and advanced NLP techniques.',
    },
    {
      name: 'Data Engineering',
      role: 'API Integration',
      description: 'Building robust data pipelines from multiple sources including Indian Stock API and Alpha Vantage.',
    },
    {
      name: 'Frontend Development',
      role: 'User Experience',
      description: 'Creating beautiful, responsive interfaces with React, TypeScript, and modern design patterns.',
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            About FinSentiment Pro
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Revolutionizing financial analysis with cutting-edge AI technology
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="glass-card p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                  Our Mission
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  FinSentiment Pro empowers investors and traders with real-time, AI-powered sentiment analysis 
                  to make informed decisions in today's fast-paced financial markets.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  By combining advanced natural language processing with financial domain expertise, we transform 
                  market news into actionable insights, helping you stay ahead of market trends and sentiment shifts.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card p-6 text-center"
            >
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team/Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold text-center mb-10 text-slate-900 dark:text-white">
            Built with Excellence
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.05, duration: 0.4 }}
                whileHover={{ y: -10 }}
                className="glass-card p-6"
              >
                <h4 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                  {member.name}
                </h4>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass-card p-8"
        >
          <h3 className="text-2xl font-bold text-center mb-6 text-slate-900 dark:text-white">
            Technology Stack
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {['React', 'TypeScript', 'Python', 'Flask', 'FinBERT', 'HuggingFace', 'Recharts', 'Tailwind CSS'].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + index * 0.03, duration: 0.25 }}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-3 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg border-2 border-indigo-200 dark:border-indigo-800 font-semibold text-slate-700 dark:text-slate-300"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
