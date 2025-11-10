// Core data types for the application

export interface TimelineDataPoint {
  date: string;
  sentiment: number;
  price: number;
  volume: number;
}

export interface DimensionsData {
  marketSentiment: number;
  emotionalTone: number;
  uncertainty: number;
  urgency: number;
  futureOutlook: number;
  riskAssessment: number;
}

export interface SourceBreakdown {
  source: string;
  sentiment: number;
  articles: number;
  logo: string;
}

export type SentimentLabel = 'Positive' | 'Negative' | 'Neutral';
export type EmotionType = 'joy' | 'fear' | 'anger' | 'surprise' | 'concern' | 'trust' | 'anticipation';

export interface Headline {
  id: number;
  title: string;
  source: string;
  timestamp: string;
  timeAgo: string;
  sentiment: number;
  sentimentLabel: SentimentLabel;
  confidence: number;
  emotions: EmotionType[];
  url: string;
  summary: string;
}

export interface CalendarDataPoint {
  date: string;
  sentiment: number;
}

export interface InsightsData {
  summary: string;
  trend: string;
  keyTopics: string[];
  volatility: string;
  correlation: string;
  prediction: string;
}

export interface CorrelationDataPoint {
  sentiment: number;
  priceChange: number;
}

export interface DataWarning {
  type: string;
  message: string;
}

export interface SentimentData {
  ticker: string;
  companyName: string;
  overallScore: number;
  confidence: number;
  totalArticles: number;
  dateRange: string;
  timeline: TimelineDataPoint[];
  dimensions: DimensionsData;
  sourceBreakdown: SourceBreakdown[];
  headlines: Headline[];
  calendarData: CalendarDataPoint[];
  insights: InsightsData;
  correlationData: CorrelationDataPoint[];
  correlationCoefficient: number;
  dataSource?: string;
  warning?: DataWarning;
}

export type DateRange = '24h' | '7d' | '30d' | 'custom';

export interface SearchFilters {
  dateRange: DateRange;
  sources: string[];
  minConfidence: number;
  customStartDate?: string;
  customEndDate?: string;
}

export interface AlertConfig {
  email: string;
  threshold: number;
  frequency: 'realtime' | 'hourly' | 'daily';
  sources: string[];
}

export type Theme = 'light' | 'dark';

export interface AppState {
  theme: Theme;
  isLoading: boolean;
  currentTicker: string;
  sentimentData: SentimentData | null;
  recentSearches: string[];
  filters: SearchFilters;
  error: string | null;
}
