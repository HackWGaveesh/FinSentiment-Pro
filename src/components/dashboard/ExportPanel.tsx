import React from 'react';
import { motion } from 'framer-motion';
import { FileDown, Mail, Bell, FileSpreadsheet } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { SentimentData } from '@/types';

interface Props {
  data: SentimentData;
}

const ExportPanel: React.FC<Props> = ({ data }) => {
  const ticker = data.ticker;

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    // Build CSV from timeline data
    const header = ['Date', 'Sentiment', 'Price', 'Volume'];
    const rows = data.timeline.map((t) => [t.date, t.sentiment.toFixed(2), t.price.toFixed(2), t.volume.toString()]);
    const csv = [header, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, `${ticker}_timeline.csv`);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF({ unit: 'pt' });
    const marginX = 40;

    // Header
    doc.setFontSize(18);
    doc.text(`Sentiment Report: ${data.companyName} (${ticker})`, marginX, 40);
    doc.setFontSize(11);
    doc.text(`Date Range: ${data.dateRange}`, marginX, 60);
    if (data.dataSource) doc.text(`Data Source: ${data.dataSource}`, marginX, 76);

    // Dimensions table
    autoTable(doc, {
      startY: 95,
      head: [['Dimension', 'Score']],
      body: [
        ['Market Sentiment', data.dimensions.marketSentiment.toFixed(1)],
        ['Emotional Tone', data.dimensions.emotionalTone.toFixed(1)],
        ['Uncertainty', data.dimensions.uncertainty.toFixed(1)],
        ['Urgency', data.dimensions.urgency.toFixed(1)],
        ['Future Outlook', data.dimensions.futureOutlook.toFixed(1)],
        ['Risk Assessment', data.dimensions.riskAssessment.toFixed(1)],
      ],
      styles: { fontSize: 10 },
      headStyles: { fillColor: [99, 102, 241] },
      margin: { left: marginX, right: marginX },
    });

    // Headlines table (top 5)
    const topHeadlines = data.headlines.slice(0, 5).map((h) => [h.title, h.source, h.sentimentLabel, h.sentiment.toFixed(1)]);
    autoTable(doc, {
      head: [['Headline', 'Source', 'Label', 'Score']],
      body: topHeadlines.length ? topHeadlines : [['No headlines', '-', '-', '-']],
      styles: { fontSize: 9, cellWidth: 'wrap' },
      columnStyles: { 0: { cellWidth: 330 } },
      headStyles: { fillColor: [79, 70, 229] },
      margin: { left: marginX, right: marginX },
    });

    // Footer note
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(9);
    doc.text(`Generated on ${new Date().toLocaleString()}`, marginX, pageHeight - 30);

    const blob = doc.output('blob');
    downloadBlob(blob, `${ticker}_sentiment_report.pdf`);
  };

  const handleSetAlert = () => {
    alert('Alert configuration - Would open alert setup modal');
  };

  const handleEmailReport = () => {
    // Build email body with summary
    const subject = `Sentiment Report: ${data.companyName} (${ticker})`;
    const topHeadlines = data.headlines.slice(0, 3);
    const body = `
Hi,

Here is the sentiment analysis report for ${data.companyName} (${ticker}):

Date Range: ${data.dateRange}
Overall Sentiment: ${data.overallScore.toFixed(1)}
Confidence: ${data.confidence.toFixed(1)}%
Total Articles: ${data.totalArticles}

Top Dimensions:
- Market Sentiment: ${data.dimensions.marketSentiment.toFixed(1)}
- Emotional Tone: ${data.dimensions.emotionalTone.toFixed(1)}
- Future Outlook: ${data.dimensions.futureOutlook.toFixed(1)}

Top Headlines:
${topHeadlines.map((h, i) => `${i + 1}. ${h.title} (${h.source}, ${h.sentimentLabel})`).join('\n')}

Correlation: r = ${data.correlationCoefficient.toFixed(2)}

Generated on ${new Date().toLocaleString()}

Best regards,
FinSentiment Pro
`.trim();

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
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
  <div className="glass-card p-6 h-full min-h-[460px] flex flex-col">
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
        Export & Alerts
      </h3>

      <div className="space-y-3 flex-grow">
        {actions.map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={action.onClick}
              className="w-full flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r hover:shadow-md transition-all border border-light-border dark:border-dark-border group"
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
