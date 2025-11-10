import React from 'react';
import { motion } from 'framer-motion';
import { FileDown, Mail, Bell, FileSpreadsheet } from 'lucide-react';

interface Props {
  ticker: string;
}

const ExportPanel: React.FC<Props> = ({ ticker }) => {
  const handleExportPDF = () => {
    alert('PDF export feature - Would generate comprehensive PDF report');
  };

  const handleExportCSV = () => {
    alert('CSV export feature - Would download raw sentiment data');
  };

  const handleSetAlert = () => {
    alert('Alert configuration - Would open alert setup modal');
  };

  const handleEmailReport = () => {
    alert('Email report feature - Would open email configuration');
  };

  const actions = [
    {
      icon: FileDown,
      label: 'Export PDF Report',
      color: 'from-red-500 to-rose-500',
      onClick: handleExportPDF,
    },
    {
      icon: FileSpreadsheet,
      label: 'Download CSV Data',
      color: 'from-green-500 to-emerald-500',
      onClick: handleExportCSV,
    },
    {
      icon: Bell,
      label: 'Set Alert',
      color: 'from-yellow-500 to-amber-500',
      onClick: handleSetAlert,
    },
    {
      icon: Mail,
      label: 'Email Report',
      color: 'from-blue-500 to-cyan-500',
      onClick: handleEmailReport,
    },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
        Export & Alerts
      </h3>

      <div className="space-y-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={action.onClick}
            className="w-full flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r hover:shadow-lg transition-all border border-light-border dark:border-dark-border group"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-slate-900 dark:text-white text-left">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
        <p className="text-sm text-indigo-700 dark:text-indigo-300">
          💡 <strong>Pro Tip:</strong> Set up alerts to get notified when sentiment changes significantly for {ticker}
        </p>
      </div>
    </div>
  );
};

export default ExportPanel;
